# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Next.js (App Router, TypeScript, Tailwind CSS) otimizado para deploy na Vercel, com persistência instantânea no navegador (IndexedDB / localStorage com estoque inicial realista de fábrica e opção de restaurar dados de demonstração) e arquitetura desacoplada pronta para conectar ao Supabase (Postgres + Storage) para clientes finais.

## Users
1. **Compradores de veículos seminovos em Jundiaí e região (Várzea Paulista, Campo Limpo Paulista, Itupeva, Louveira, Cabreúva)**: pessoas buscando trocar ou comprar um carro seminovo de procedência, que pesquisam pelo celular ou computador, filtram rapidamente por marca, preço, ano e câmbio, avaliam fotos reais e ficha técnica, e querem atendimento imediato via WhatsApp sem formulários burocráticos.
2. **Lojistas / Donos de revendas de seminovos em Jundiaí (usuários do Painel Admin e público-alvo comercial da demonstração)**: comerciantes automotivos que precisam cadastrar veículos rapidamente, subir fotos do celular ou computador sem se preocupar com peso/lentidão do site, atualizar status de venda (Disponível, Reservado, Vendido) com 1 clique e receber leads qualificados direto no WhatsApp com o nome e link do carro.

## Product Purpose
Plataforma web de vitrine pública e gestão administrativa de estoque para loja de veículos seminovos em Jundiaí ("Serra Multimarcas — Seminovos Selecionados", localizada na Av. Nove de Julho, Jundiaí/SP). Serve simultaneamente como produto final de alta conversão para revendas automotivas e como demonstração comercial ao vivo para prospectar lojistas da região. Sucesso significa: (1) o comprador encontra o carro ideal em segundos e inicia conversa no WhatsApp com mensagem contextualizada; (2) o lojista gerencia o estoque e fotos sem fricção técnica.

## Positioning
Foco absoluto na conversão direta via WhatsApp e agilidade operacional para revendas independentes de Jundiaí: diferentemente de portais genéricos abarrotados de anúncios de concorrentes (Webmotors, OLX, iCarros), este é o showroom digital próprio da loja, com carregamento instantâneo, compressão/redimensionamento automático de fotos no próprio navegador antes do envio, prova social integrada (veículos Reservados e Vendidos visíveis com selo de destaque) e configuração ao vivo do WhatsApp de atendimento.

## Operating Context
- **Demonstração Comercial B2B em Jundiaí**: apresentado ao vivo para proprietários e gerentes de lojas de seminovos (ex: corredores automotivos da Av. Nove de Julho, Av. Jundiaí, Vila Arens, Av. Frederico Ozanan). Durante a reunião, o apresentador pode alterar o número de WhatsApp no Painel Admin para o número do próprio lojista testar o recebimento do lead no celular dele em tempo real.
- **Rotina da Loja**: o lojista fotografa o carro no pátio, acessa o `/admin`, faz login (com botão de Acesso Rápido Demo para testes), cadastra Marca, Modelo, Ano, Versão, Quilometragem, Câmbio, Cor, Combustível, Preço e Opcionais, faz upload das fotos com redimensionamento automático e altera o status na tabela conforme negociações acontecem.

## Capabilities and Constraints
- **Vitrine Pública (`/`)**:
  - Busca e filtros rápidos combinados: Marca, Faixa de Preço, Ano e Câmbio (além de busca textual por modelo/versão).
  - Exibição de todos os veículos com selo visual de status ("Disponível", "Reservado", "Vendido").
  - Veículos marcados como "Vendido" permanecem na vitrine como prova social de giro de estoque, mudando o CTA para "Procuro um veículo semelhante" no WhatsApp.
- **Página de Detalhes do Veículo (`/veiculos/[slug]`)**:
  - Layout enxuto e direto ao ponto: galeria de fotos em destaque (com visualização ampliada), ficha técnica completa (Marca, Modelo, Ano, Versão, KM, Câmbio, Cor, Combustível, Preço), lista de opcionais, localização da loja em Jundiaí e botão único de WhatsApp de alta conversão ("Tenho interesse neste veículo", enviando nome do carro + link direto na mensagem pré-pronta).
  - Sem calculadoras complexas de financiamento ou múltiplos botões concorrentes que distraiam do CTA principal de WhatsApp.
- **Painel Administrativo (`/admin`)**:
  - Tela simples de login do lojista com botão de "Acesso Rápido Demo" (1 clique).
  - Cadastro e edição completa de veículos (Marca, Modelo, Ano, Versão, Quilometragem, Câmbio, Cor, Combustível, Preço e Opcionais).
  - Upload de múltiplas fotos com redimensionamento e compressão automática client-side (Canvas/WebP) para manter o site leve e rápido.
  - Botões rápidos de status (Disponível, Reservado, Vendido) acionáveis diretamente na listagem com 1 clique.
  - Configuração rápida do número de WhatsApp da loja e botão "Restaurar Dados de Fábrica" para resetar o estoque após demonstrações.

## Brand Commitments
- **Identidade da Loja Modelo**: "Serra Multimarcas — Seminovos Selecionados", showroom físico na Av. Nove de Julho, Jundiaí/SP.
- **Direção Visual (Clean & Confiável)**: Estilo moderno, simples e direto ao ponto (inspirado nas melhores revendas de alto padrão e portais como Webmotors, AutoShopping e Kavak). Fundo branco e cinza neutro claro (`#f8fafc`), cartões brancos com cantos suaves (`rounded-xl` / `rounded-2xl`), sombras sutis (`shadow-sm` / `shadow-md`), tipografia sans-serif limpa e moderna (Plus Jakarta Sans / Inter).
- **Sem elementos artificiais ("Sem cara de IA / Sem inventar moda")**: Eliminação total de papéis envelhecidos/amarelados, códigos de dossiê/laudo pericial rebuscados, carimbos inclinados e fontes monoespaçadas decorativas. Foco em clareza comercial, fotografia real de qualidade, especificações limpas e botão verde destacado exclusivo para o WhatsApp.
- **Perfil de Estoque**: Multimarcas de médio a alto padrão representativo do mercado de Jundiaí (SUVs, sedãs e hatches de alto giro como Jeep Compass, Toyota Corolla, VW Nivus, Toyota Hilux, Honda Civic, Hyundai Creta, BMW 320i, Chevrolet Onix Premier).
- **Apresentação Limpa**: Sem barras flutuantes artificiais de "Modo Apresentação" na vitrine pública; a loja parece e funciona como uma loja real.

## Evidence on Hand
- Projeto greenfield (sem código prévio no repositório).
- Estoque inicial de demonstração será populado com dados realistas de mercado (preços reais praticados em SP/Jundiaí, especificações técnicas fiéis de cada versão e fotografias automotivas reais verificadas), devidamente identificados como acervo de demonstração da loja fictícia.

## Product Principles
1. **Conversão Sem Atrito no WhatsApp**: Toda a jornada pública existe para levar o comprador a clicar no botão de WhatsApp com o veículo exato e o link já preenchidos na mensagem.
2. **Operação de Pátio em Segundos**: O lojista não é técnico; subir fotos sem travar o site e mudar um carro para "Reservado" ou "Vendido" deve levar apenas um clique.
3. **Credibilidade Regional de Jundiaí**: A vitrine transmite a solidez de uma loja física estabelecida em Jundiaí, usando transparência de quilometragem, opcionais claros e prova social de veículos reservados/vendidos.
4. **Enxuto e Direto ao Ponto**: Na página do veículo, nada compete com as fotos, a ficha técnica e o botão principal de WhatsApp.
