"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DEFAULT_STORE_CONFIG,
  INITIAL_VEHICLES,
  StoreConfig,
  Vehicle,
  buildWhatsAppUrl,
  formatBRL,
  formatKM,
  getStoredConfig,
  getStoredVehicles,
} from "@/lib/vehicles";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ArrowLeft,
  CheckCircle2,
  Expand,
  MapPin,
  MessageCircle,
  ShieldCheck,
  X,
  ChevronLeft,
  ChevronRight,
  Car,
  Calendar,
  Layers,
  Gauge,
  Settings2,
  Fuel,
  Palette,
  Hash,
  Clock3,
  Archive,
  Check,
} from "lucide-react";

export function VehicleDetailClient({ slug }: { slug: string }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [config, setConfig] = useState<StoreConfig>(DEFAULT_STORE_CONFIG);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [originBase, setOriginBase] = useState<string>("");

  useEffect(() => {
    setOriginBase(window.location.origin);
    const sync = () => {
      setVehicles(getStoredVehicles());
      setConfig(getStoredConfig());
    };
    sync();
    window.addEventListener("serra-storage-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("serra-storage-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const vehicle =
    vehicles.find((v) => v.slug === slug || v.id === slug) || null;

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-8 py-20 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Car size={32} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Veículo não encontrado
          </h1>
          <p className="text-slate-600 mt-2 max-w-md mx-auto text-sm">
            Este veículo pode ter sido vendido ou o link está incorreto. Confira outros modelos em nosso estoque.
          </p>
          <Link
            href="/estoque"
            className="mt-6 inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Voltar para o Estoque</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const photos =
    vehicle.fotos && vehicle.fotos.length > 0
      ? vehicle.fotos
      : ["/assets/plates/card1-photo.png"];

  const safePhotoIndex =
    activePhotoIndex < photos.length ? activePhotoIndex : 0;

  const statusConfig = {
    disponivel: {
      label: "Disponível no Pátio",
      badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
      icon: CheckCircle2,
    },
    reservado: {
      label: "Veículo Reservado",
      badgeClass: "bg-amber-50 text-amber-800 border-amber-200",
      icon: Clock3,
    },
    vendido: {
      label: "Veículo Vendido",
      badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
      icon: Archive,
    },
  }[vehicle.status];

  const StatusIcon = statusConfig.icon;
  const whatsappUrl = buildWhatsAppUrl(vehicle, config, originBase);

  const specsTable = [
    { label: "Marca", value: vehicle.marca, icon: Car },
    { label: "Modelo", value: vehicle.modelo, icon: Car },
    {
      label: "Ano Fab / Mod",
      value: `${vehicle.anoFabricacao} / ${vehicle.anoModelo}`,
      icon: Calendar,
    },
    { label: "Versão", value: vehicle.versao, icon: Layers },
    {
      label: "Quilometragem",
      value: formatKM(vehicle.quilometragem),
      icon: Gauge,
    },
    { label: "Câmbio", value: vehicle.cambio, icon: Settings2 },
    {
      label: "Combustível",
      value: vehicle.combustivel,
      icon: Fuel,
    },
    { label: "Cor Externa", value: vehicle.cor, icon: Palette },
    {
      label: "Final de Placa",
      value: `Final ${vehicle.finalPlaca}`,
      icon: Hash,
    },
    {
      label: "Laudo Cautelar",
      value: "100% Aprovado",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-8 py-8">
        {/* Breadcrumb & Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200">
          <Link
            href="/estoque"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Voltar para o Estoque</span>
          </Link>

          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border inline-flex items-center gap-1.5 shadow-2xs ${statusConfig.badgeClass}`}
            >
              <StatusIcon size={14} />
              <span>{statusConfig.label}</span>
            </span>
          </div>
        </div>

        {/* Vehicle Detail Grid: Left (Photos + Optionals) | Right (Sticky Card + WhatsApp CTA) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Gallery & Optionals (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Main Photo Gallery */}
            <section
              aria-label="Fotos do veículo"
              className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs"
            >
              <div className="relative aspect-16/10 w-full bg-slate-100 rounded-xl overflow-hidden group">
                <img
                  src={photos[safePhotoIndex]}
                  alt={`${vehicle.marca} ${vehicle.modelo} - Foto ${
                    safePhotoIndex + 1
                  }`}
                  className="w-full h-full object-cover cursor-zoom-in"
                  onClick={() => setLightboxOpen(true)}
                />

                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="absolute top-3 right-3 bg-slate-900/80 hover:bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 backdrop-blur-xs transition-colors cursor-pointer"
                >
                  <Expand size={13} />
                  <span>Ampliar ({safePhotoIndex + 1}/{photos.length})</span>
                </button>

                {photos.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Foto anterior"
                      onClick={() =>
                        setActivePhotoIndex((prev) =>
                          prev === 0 ? photos.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-900 text-white p-2.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      aria-label="Próxima foto"
                      onClick={() =>
                        setActivePhotoIndex((prev) =>
                          prev === photos.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-900 text-white p-2.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {photos.length > 1 && (
                <div className="mt-3.5 grid grid-cols-4 sm:grid-cols-6 gap-2.5">
                  {photos.map((photoUrl, idx) => (
                    <button
                      key={`${photoUrl}-${idx}`}
                      type="button"
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`relative aspect-16/10 rounded-lg overflow-hidden border-2 cursor-pointer p-0 bg-slate-100 transition-all ${
                        idx === safePhotoIndex
                          ? "border-emerald-600 ring-2 ring-emerald-600/20"
                          : "border-slate-200 hover:border-slate-300 opacity-75 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={photoUrl}
                        alt={`Miniatura ${idx + 1}`}
                        className="w-full h-full object-cover block"
                      />
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Optionals & Equipment Checklist */}
            <section
              aria-label="Opcionais do veículo"
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <h2 className="text-xl font-bold text-slate-900">
                  Opcionais e Itens de Série
                </h2>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {vehicle.opcionais.length} itens verificados
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {vehicle.opcionais.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-800"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check size={13} strokeWidth={2.5} />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {vehicle.observacoes && (
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Observações do Veículo:
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 border border-slate-200/80 p-4 rounded-xl">
                    {vehicle.observacoes}
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Title, Price, Direct WhatsApp CTA, Full Specs & Location (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm sticky top-24">
              {/* Header Info */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider pb-3 border-b border-slate-100">
                <span>{vehicle.marca}</span>
                <span>{vehicle.anoFabricacao} / {vehicle.anoModelo}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                {vehicle.marca} {vehicle.modelo}
              </h1>
              <p className="text-sm text-slate-600 font-medium mt-1 mb-5">
                {vehicle.versao}
              </p>

              {/* Price Display */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 mb-5 flex items-baseline justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Preço à vista:
                </span>
                <span className="text-3xl font-black text-slate-900 tracking-tight">
                  {formatBRL(vehicle.preco)}
                </span>
              </div>

              {/* High-Conversion WhatsApp CTA Button */}
              <div className="mb-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 px-5 rounded-xl font-bold text-base shadow-sm flex items-center justify-center gap-2.5 transition-all text-white ${
                    vehicle.status === "vendido"
                      ? "bg-slate-800 hover:bg-slate-900"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  <MessageCircle size={20} />
                  <span>
                    {vehicle.status === "vendido"
                      ? "Procuro Veículo Semelhante"
                      : "Tenho Interesse Neste Veículo"}
                  </span>
                </a>
                <p className="text-xs text-slate-500 text-center mt-2">
                  Abre conversa direta no WhatsApp já com o modelo e dados do carro preenchidos.
                </p>
              </div>

              {/* Technical Specifications Sheet */}
              <div className="border-t border-slate-100 pt-5">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Ficha Técnica do Veículo
                </h3>
                <dl className="divide-y divide-slate-100 text-sm">
                  {specsTable.map((row) => {
                    const RowIcon = row.icon;
                    return (
                      <div
                        key={row.label}
                        className="py-2.5 flex items-center justify-between gap-4"
                      >
                        <dt className="text-slate-500 font-medium flex items-center gap-2">
                          <RowIcon size={14} className="text-slate-400 shrink-0" />
                          <span>{row.label}</span>
                        </dt>
                        <dd className="text-slate-900 font-semibold text-right">
                          {row.value}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>

              {/* Quality Guarantee Box */}
              <div className="mt-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3">
                <ShieldCheck size={20} className="text-emerald-700 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                  <strong>Procedência Garantida:</strong> Veículo com vistoria cautelar 100% aprovada, documentação em dia e pronto para transferência imediata.
                </p>
              </div>

              {/* Store Location Card */}
              <div className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                  <MapPin size={14} className="text-emerald-600" />
                  <span>Onde ver este veículo em Jundiaí</span>
                </div>
                <div>{config.nomeLoja} — {config.endereco}</div>
                <div className="text-slate-500 mt-0.5">{config.horarioSemana}</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/90 flex flex-col items-center justify-center p-4 backdrop-blur-xs"
        >
          <div className="w-full max-w-5xl flex items-center justify-between text-white mb-3 text-sm">
            <span>
              {vehicle.marca} {vehicle.modelo} — Foto {safePhotoIndex + 1} de {photos.length}
            </span>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="inline-flex items-center gap-1 text-white hover:text-slate-300 font-semibold cursor-pointer bg-transparent border-0 p-1"
            >
              <X size={18} />
              <span>Fechar</span>
            </button>
          </div>

          <div className="relative w-full max-w-5xl aspect-16/10 max-h-[80vh] bg-black rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={photos[safePhotoIndex]}
              alt={`${vehicle.marca} ${vehicle.modelo}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
