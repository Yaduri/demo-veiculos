# Serra Multimarcas — Showroom de Veículos Seminovos

Plataforma web moderna, rápida e de alta conversão para revenda de veículos seminovos em Jundiaí e região. Desenvolvida para demonstração comercial a lojistas e concessionárias independentes.

---

## 🚀 Tecnologias Utilizadas

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Static Export)
- **Biblioteca UI:** [React 19](https://react.dev/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Tipografia:** Manrope (Google Fonts)
- **Linguagem:** TypeScript

---

## ✨ Funcionalidades Principais

### Vitrine Pública (Front-end)
- **Página Inicial (`/`):** Hero moderno com busca rápida e filtros combinados (Marca, Faixa de Preço, Ano e Câmbio), grade de veículos em destaque e informações de localização e atendimento em Jundiaí.
- **Catálogo Completo (`/estoque`):** Estoque completo com abas rápidas por status (*Todos*, *Disponíveis*, *Reservados*, *Vendidos*), filtros refinados, ordenação por preço/KM/ano e contadores em tempo real.
- **Dossiê / Detalhes do Veículo (`/veiculos/[slug]`):**
  - Galeria de fotos com visualização ampliada (lightbox fullscreen).
  - Checklist de opcionais e equipamentos verificados.
  - Ficha técnica completa (KM, câmbio, combustível, cor, ano/modelo).
  - **Botão Direto de WhatsApp de Alta Conversão:** Abre a conversa diretamente com a loja já com o nome do veículo, valor, KM e link preenchidos na mensagem. Se o veículo estiver vendido, altera o CTA automaticamente para *"Procuro um veículo semelhante"*.

### Painel Administrativo (Back-end / Admin)
- **Login Simples (`/admin`):** Acesso com botão de 1 clique (*Modo Demonstração*) para apresentações comerciais ao vivo.
- **Controle de Pátio com 1 Clique:** Botões instantâneos de status (*Disponível*, *Reservado*, *Vendido*) direto na tabela que atualizam a vitrine em tempo real.
- **Cadastro e Edição Completa:** Marca, Modelo, Ano, Versão, KM, Câmbio, Cor, Combustível, Preço e Opcionais.
- **Upload Inteligente de Fotos:** Redimensionamento e compressão automática no próprio navegador do lojista antes do upload (Canvas para WebP leve), evitando lentidão no site.
- **Configuração de WhatsApp ao Vivo:** Permite alterar o número de WhatsApp da loja em tempo real para o cliente testar o recebimento de leads durante reuniões comerciais.
- **Botão Restaurar Fábrica:** Reseta o estoque para o acervo inicial demonstrativo a qualquer momento.

---

## ⚡ Como Rodar Localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Acesse http://localhost:3000 no navegador
```

---

## ☁️ Como Fazer o Deploy Gratuito na Cloudflare Pages

Este projeto já está configurado com `output: "export"` no `next.config.mjs`, gerando uma build estática pura (`out/`), compatível 100% gratuitamente com o **Cloudflare Pages**.

1. Acesse o painel da [Cloudflare Dashboard](https://dash.cloudflare.com/) e vá em **Workers & Pages**.
2. Clique em **Create application** > aba **Pages** > **Connect to Git**.
3. Selecione o repositório `Yaduri/demo-veiculos`.
4. Defina as configurações de build:
   - **Framework preset:** `None` (ou `Next.js (Static HTML Export)`)
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node.js Version (Environment variable):** `NODE_VERSION` = `20` (recomendado)
5. Clique em **Save and Deploy**.
6. Em menos de 1 minuto seu site estará no ar gratuitamente com HTTPS e CDN global!
