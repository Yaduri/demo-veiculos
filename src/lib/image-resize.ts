export interface ResizedPhotoResult {
  dataUrl: string;
  originalSizeKB: number;
  compressedSizeKB: number;
  reductionPercent: number;
  width: number;
  height: number;
  fileName: string;
}

/**
 * Redimensiona e comprime automaticamente fotos enviadas pelo lojista
 * diretamente no navegador (Canvas -> WebP/JPEG), evitando lentidão no site.
 */
export async function resizeAndCompressImage(
  file: File,
  maxWidth = 1280,
  maxHeight = 960,
  quality = 0.82
): Promise<ResizedPhotoResult> {
  const originalSizeKB = Math.max(1, Math.round(file.size / 1024));

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Falha ao ler arquivo de imagem."));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Arquivo de imagem inválido."));
      img.onload = () => {
        let targetWidth = img.width;
        let targetHeight = img.height;

        if (targetWidth > maxWidth || targetHeight > maxHeight) {
          const ratio = Math.min(
            maxWidth / targetWidth,
            maxHeight / targetHeight
          );
          targetWidth = Math.round(targetWidth * ratio);
          targetHeight = Math.round(targetHeight * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Não foi possível inicializar o motor de imagem."));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // Prefer WebP for best compression, fallback to JPEG
        let dataUrl = canvas.toDataURL("image/webp", quality);
        if (!dataUrl.startsWith("data:image/webp")) {
          dataUrl = canvas.toDataURL("image/jpeg", quality);
        }

        const base64Length = dataUrl.split(",")[1]?.length || 0;
        const compressedBytes = Math.round((base64Length * 3) / 4);
        const compressedSizeKB = Math.max(1, Math.round(compressedBytes / 1024));
        const reductionPercent = Math.max(
          0,
          Math.min(
            99,
            Math.round(
              ((originalSizeKB - compressedSizeKB) / originalSizeKB) * 100
            )
          )
        );

        resolve({
          dataUrl,
          originalSizeKB,
          compressedSizeKB,
          reductionPercent,
          width: targetWidth,
          height: targetHeight,
          fileName: file.name,
        });
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
