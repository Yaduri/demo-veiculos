# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Next.js 15 (App Router, TypeScript, Tailwind CSS v4, Lucide Icons) configurado para exportação 100% estática (`output: 'export'`) gratuita para Cloudflare Pages ou Vercel. Persistência no navegador via IndexedDB / localStorage com estoque inicial de fábrica, edição/exclusão/cadastro instantâneos e suporte a restauração de demonstração.

## Users
1. **Compradores de seminovos em Jundiaí e região (Várzea Paulista, Campo Limpo Paulista, Itupeva, Louveira, Cabreúva)**: pessoas buscando trocar ou comprar um carro de procedência garantida, navegando pelo celular ou desktop. Buscam filtros rápidos (marca, preço, ano, câmbio), fotos reais e contato imediato via WhatsApp sem burocracia ou cadastros demorados.
2. **Lojistas / Donos de revendas de seminovos em Jundiaí (usuários do Painel Admin e público da demonstração comercial)**: lojistas que precisam cadastrar veículos rapidamente, subir fotos diretamente do celular com compressão automática client-side, alternar status (Disponível, Reservado, Vendido) com 1 clique e receber leads no WhatsApp já contextualizados com o veículo de interesse.

## Product Purpose
Showroom digital e painel administrativo para revenda de veículos seminovos em Jundiaí ("Serra Multimarcas — Seminovos Selecionados"). Funciona simultaneamente como vitrine pública de alta conversão para o comprador final e como ferramenta de vendas e demonstração comercial para oferecer a lojistas da região.

## Positioning
Vitrine própria focada em conversão direta para o WhatsApp do lojista com velocidade instantânea e zero custo de hospedagem (Cloudflare Pages). Diferente de portais pesados e poluídos de anúncios concorrentes (Webmotors, OLX, iCarros), oferece experiência rápida, confiável, com fotos comprimidas localmente (WebP) e prova social imediata de veículos negociados.

## Operating Context
- **Demonstração Comercial B2B em Jundiaí**: Apresentação ao vivo em lojas físicas (ex: corredores automotivos da Av. Nove de Julho, Av. Jundiaí, Av. Frederico Ozanan). No `/admin`, o apresentador pode configurar o WhatsApp da loja para o número do próprio cliente e testar o clique na vitrine em tempo real.
- **Rotina da Loja**: O lojista fotografa o veículo no pátio, acessa o painel `/admin`, cadastra as especificações técnicas, anexa fotos (com compressão automática para WebP leve) e gerencia o giro do estoque.

## Capabilities and Constraints
- **Página Inicial (`/`)**:
  - Hero institucional com barra de busca rápida por Marca, Faixa de Preço, Ano e Câmbio.
  - Carrossel / grid de veículos em destaque selecionados pelo lojista.
  - Diferenciais da loja (laudo cautelar 100% aprovado, garantia, avaliação de usado na troca) e localização no mapa/expediente.
- **Estoque Completo (`/estoque`)**:
  - Catálogo completo com filtros combinados por marca, câmbio, combustível, faixa de preço, ano e busca textual.
  - Ordenação por menor preço, maior preço, ano mais recente e menor quilometragem.
  - Selos visuais de status ("Disponível", "Reservado", "Vendido") em cada card.
- **Página de Detalhes (`/veiculos/[slug]`)**:
  - Galeria de fotos destacada com visualização em tela cheia / pop-up.
  - Ficha técnica completa (Ano, KM, Câmbio, Combustível, Cor, Final da Placa).
  - Lista de opcionais com selo de vistoria cautelar.
  - Botão principal destacado de WhatsApp com mensagem pré-formatada contendo nome do veículo e URL direta.
- **Painel Administrativo (`/admin`)**:
  - Login simples com botão de "Entrar com 1 Clique (Modo Demonstração)".
  - Gestão e KPIs de estoque (Total no Pátio, Disponíveis, Reservados, Vendidos).
  - Configuração do WhatsApp de atendimento da loja com atualização em tempo real.
  - Cadastro e edição de veículos com upload de fotos e compressão automática para WebP leve.
  - Botões de status com 1 clique (Disponível, Reservado, Vendido) na tabela de veículos.
  - Botão de "Resetar Fábrica" para restaurar o acervo de demonstração.

## Brand Commitments
- **Identidade da Loja**: "Serra Multimarcas — Seminovos Selecionados", com showroom físico na Av. Nove de Julho, Jundiaí/SP.
- **Direção Visual (Clean, Moderno e Confiável)**:
  - Fundo neutro e limpo (`#f8fafc`), cartões brancos com bordas suaves (`border-slate-200`) e sombras sutis.
  - Tipografia contemporânea `Manrope` (pesos 400 a 800) para máxima legibilidade automotiva.
  - Cor verde esmeralda (`#059669`) reservada exclusivamente para ações de WhatsApp e conversão.
  - 100% de ícones padronizados via **Lucide Icons** (`lucide-react`).
  - Sem ruídos visuais de IA, sem texturas amareladas de papel ou estética de dossiê/laudo pericial.
- **Perfil do Acervo**: Seminovos de alto giro no mercado de Jundiaí (SUVs, sedãs e hatches como Jeep Compass, Toyota Corolla, VW Nivus, Toyota Hilux, Honda HR-V, BMW 320i, Chevrolet Tracker, etc.).

## Evidence on Hand
- Base de código Next.js 15 App Router estática (`output: 'export'`) funcional com build limpo para Cloudflare Pages.
- Repositório Git configurado e sincronizado em `https://github.com/Yaduri/demo-veiculos.git`.
- Biblioteca completa de 12 veículos com dados técnicos realistas de Jundiaí/SP e fotos integradas.

## Product Principles
1. **Conversão Imediata pelo WhatsApp**: A jornada do comprador conduz de forma natural e sem atrito para o WhatsApp com veículo e link pré-configurados.
2. **Pé no Chão & Sem Cara de IA**: Visual moderno, confiável e profissional de uma revenda real de Jundiaí, com tipografia Manrope e paleta sóbria.
3. **Agilidade no Pátio**: O lojista cadastra e altera status com 1 clique, e fotos pesadas são redimensionadas no navegador antes do upload sem sobrecarregar o site.
4. **Zero Custo de Hospedagem**: Arquitetura estática pura pronta para Cloudflare Pages ou Vercel.
