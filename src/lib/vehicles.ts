export type VehicleStatus = "disponivel" | "reservado" | "vendido";

export interface Vehicle {
  id: string;
  slug: string;
  marca: string;
  modelo: string;
  versao: string;
  anoFabricacao: number;
  anoModelo: number;
  quilometragem: number;
  cambio: "Automático" | "Manual" | "CVT" | "Automatizado";
  combustivel: "Flex" | "Gasolina" | "Diesel" | "Híbrido" | "Elétrico";
  cor: string;
  finalPlaca: string;
  preco: number;
  status: VehicleStatus;
  destaqueHome: boolean;
  laudoCodigo: string;
  opcionais: string[];
  observacoes: string;
  fotos: string[];
  criadoEm: string;
}

export interface StoreConfig {
  nomeLoja: string;
  subtituloLoja: string;
  whatsappNumero: string; // digits only, e.g. 5511999999999
  endereco: string;
  bairroCidade: string;
  horarioSemana: string;
  horarioSabado: string;
}

export const DEFAULT_STORE_CONFIG: StoreConfig = {
  nomeLoja: "SERRA MULTIMARCAS",
  subtituloLoja: "SEMINOVOS SELECIONADOS",
  whatsappNumero: "5511998765432",
  endereco: "Av. Nove de Julho, 1850",
  bairroCidade: "Anhangabaú · Jundiaí / SP",
  horarioSemana: "Seg a Sex: 08h30 às 18h30",
  horarioSabado: "Sábado: 08h30 às 14h00",
};

export const COMMON_OPTIONALS: string[] = [
  "Laudo Cautelar 100% Aprovado",
  "Único Dono",
  "Revisões em Concessionária",
  "Bancos em Couro",
  "Central Multimídia c/ CarPlay & Android Auto",
  "Câmera de Ré + Sensor de Estacionamento",
  "Teto Solar Panorâmico",
  "Chave Presencial (Keyless)",
  "Ar-Condicionado Digital Dual Zone",
  "Piloto Automático Adaptativo (ACC)",
  "Faróis Full LED",
  "Rodas de Liga Leve Diamantadas",
  " Seis Airbags + Controle de Estabilidade",
  "Manual e Chave Reserva",
  "IPVA 2026 Pago",
];

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: "1",
    slug: "jeep-compass-longitude-2023",
    marca: "Jeep",
    modelo: "Compass",
    versao: "1.3 T270 Turbo Flex Longitude AT6",
    anoFabricacao: 2023,
    anoModelo: 2023,
    quilometragem: 28400,
    cambio: "Automático",
    combustivel: "Flex",
    cor: "Cinza Granite",
    finalPlaca: "4",
    preco: 138900,
    status: "disponivel",
    destaqueHome: true,
    laudoCodigo: "LC-JDI-2026-014",
    opcionais: [
      "Laudo Cautelar 100% Aprovado",
      "Único Dono",
      "Revisões em Concessionária",
      "Bancos em Couro",
      "Central Multimídia c/ CarPlay & Android Auto",
      "Ar-Condicionado Digital Dual Zone",
      "Chave Presencial (Keyless)",
      "Faróis Full LED",
      "Câmera de Ré + Sensor de Estacionamento",
      "Manual e Chave Reserva",
    ],
    observacoes:
      "Veículo de único dono em Jundiaí, todas as revisões carimbadas na concessionária Jeep. Sem retoques de pintura, 4 pneus Michelin em excelente estado e laudo cautelar 100% aprovado.",
    fotos: [
      "/assets/plates/card1-photo.png",
      "/assets/plates/card2-photo.png",
      "/assets/plates/card3-photo.png",
    ],
    criadoEm: "2026-10-15",
  },
  {
    id: "2",
    slug: "toyota-corolla-xei-2022",
    marca: "Toyota",
    modelo: "Corolla",
    versao: "2.0 VVT-iE Flex XEi Direct Shift",
    anoFabricacao: 2022,
    anoModelo: 2022,
    quilometragem: 41200,
    cambio: "Automático",
    combustivel: "Flex",
    cor: "Prata Supernova",
    finalPlaca: "7",
    preco: 124500,
    status: "reservado",
    destaqueHome: true,
    laudoCodigo: "LC-JDI-2026-019",
    opcionais: [
      "Laudo Cautelar 100% Aprovado",
      "Revisões em Concessionária",
      "Bancos em Couro",
      "Central Multimídia c/ CarPlay & Android Auto",
      "Chave Presencial (Keyless)",
      "Piloto Automático Adaptativo (ACC)",
      "Faróis Full LED",
      "Câmera de Ré + Sensor de Estacionamento",
      "Manual e Chave Reserva",
    ],
    observacoes:
      "Sedã impecável na garantia de fábrica Toyota até 2027. Histórico completo de revisões na concessionária de Jundiaí.",
    fotos: [
      "/assets/plates/card2-photo.png",
      "/assets/plates/card1-photo.png",
      "/assets/plates/card3-photo.png",
    ],
    criadoEm: "2026-10-16",
  },
  {
    id: "3",
    slug: "volkswagen-nivus-highline-2023",
    marca: "Volkswagen",
    modelo: "Nivus",
    versao: "1.0 200 TSI Total Flex Highline AT6",
    anoFabricacao: 2023,
    anoModelo: 2023,
    quilometragem: 19800,
    cambio: "Automático",
    combustivel: "Flex",
    cor: "Branco Cristal",
    finalPlaca: "2",
    preco: 119900,
    status: "vendido",
    destaqueHome: true,
    laudoCodigo: "LC-JDI-2026-022",
    opcionais: [
      "Laudo Cautelar 100% Aprovado",
      "Único Dono",
      "Painel Digital Active Info Display",
      "VW Play 10 pol c/ CarPlay Sem Fio",
      "Piloto Automático Adaptativo (ACC)",
      "Bancos em Couro",
      "Faróis Full LED",
      "Chave Presencial (Keyless)",
    ],
    observacoes:
      "Versão topo de linha Highline com painel 100% digital e ACC. Baixíssima quilometragem.",
    fotos: [
      "/assets/plates/card3-photo.png",
      "/assets/plates/card1-photo.png",
      "/assets/plates/card2-photo.png",
    ],
    criadoEm: "2026-10-17",
  },
  {
    id: "4",
    slug: "toyota-hilux-srx-2022",
    marca: "Toyota",
    modelo: "Hilux",
    versao: "2.8 D-4D Turbo Diesel CD SRX 4x4 AT6",
    anoFabricacao: 2022,
    anoModelo: 2022,
    quilometragem: 52000,
    cambio: "Automático",
    combustivel: "Diesel",
    cor: "Prata Metálico",
    finalPlaca: "9",
    preco: 248900,
    status: "disponivel",
    destaqueHome: true,
    laudoCodigo: "LC-JDI-2026-031",
    opcionais: [
      "Laudo Cautelar 100% Aprovado",
      "Tração 4x4 com Reduzida",
      "Som Premium JBL",
      "Bancos em Couro Perfis Elétricos",
      "Piloto Automático Adaptativo (ACC)",
      "Câmera 360°",
      "Capota Marítima e Protetor de Caçamba",
      "Revisões em Concessionária",
    ],
    observacoes:
      "Picape de uso exclusivamente urbano e rodoviário em Jundiaí e região, nunca carregou peso. Versão SRX topo de linha com som JBL de fábrica.",
    fotos: ["/assets/plates/car4-hilux.png", "/assets/plates/card1-photo.png"],
    criadoEm: "2026-10-18",
  },
  {
    id: "5",
    slug: "bmw-320i-m-sport-2022",
    marca: "BMW",
    modelo: "320i",
    versao: "2.0 TwinPower Turbo ActiveFlex M Sport",
    anoFabricacao: 2021,
    anoModelo: 2022,
    quilometragem: 31500,
    cambio: "Automático",
    combustivel: "Flex",
    cor: "Preto Safira",
    finalPlaca: "8",
    preco: 239900,
    status: "disponivel",
    destaqueHome: true,
    laudoCodigo: "LC-JDI-2026-035",
    opcionais: [
      "Laudo Cautelar 100% Aprovado",
      "Pacote M Sport Original",
      "Teto Solar Elétrico",
      "Som Harman Kardon",
      "BMW Live Cockpit Professional",
      "Assistente de Reversão Automática",
      "Bancos Esportivos em Couro Vernasca",
      "Faróis Laserlight",
    ],
    observacoes:
      "Configuração Preto Safira com interno Mocha. Pacote M Sport completo, vitrificação cerâmica recém-aplicada e 4 pneus RunFlat novos.",
    fotos: ["/assets/plates/car5-bmw320i.png", "/assets/plates/card2-photo.png"],
    criadoEm: "2026-10-18",
  },
  {
    id: "6",
    slug: "hyundai-creta-platinum-2023",
    marca: "Hyundai",
    modelo: "Creta",
    versao: "1.0 TGDI Flex Platinum Automático",
    anoFabricacao: 2023,
    anoModelo: 2023,
    quilometragem: 24100,
    cambio: "Automático",
    combustivel: "Flex",
    cor: "Azul Sapphire",
    finalPlaca: "5",
    preco: 132900,
    status: "disponivel",
    destaqueHome: true,
    laudoCodigo: "LC-JDI-2026-041",
    opcionais: [
      "Laudo Cautelar 100% Aprovado",
      "Teto Solar Panorâmico",
      "Câmera 360° + Monitor de Ponto Cego",
      "Banco do Motorista com Ventilação",
      "Bancos em Couro Marrom/Bege",
      "Central Multimídia 10,25 pol",
      "Freio de Estacionamento Eletrônico c/ Auto Hold",
      "Único Dono",
    ],
    observacoes:
      "Creta Platinum com teto solar panorâmico e câmera 360°. Garantia de fábrica Hyundai vigente e laudo cautelar sem apontamentos.",
    fotos: ["/assets/plates/car6-creta.png", "/assets/plates/card3-photo.png"],
    criadoEm: "2026-10-19",
  },
  {
    id: "7",
    slug: "honda-hrv-exl-sensing-2023",
    marca: "Honda",
    modelo: "HR-V",
    versao: "1.5 DI i-VTEC Flex EXL Honda Sensing CVT",
    anoFabricacao: 2023,
    anoModelo: 2023,
    quilometragem: 22900,
    cambio: "CVT",
    combustivel: "Flex",
    cor: "Cinza Basalto",
    finalPlaca: "1",
    preco: 144900,
    status: "disponivel",
    destaqueHome: false,
    laudoCodigo: "LC-JDI-2026-044",
    opcionais: [
      "Laudo Cautelar 100% Aprovado",
      "Pacote Honda Sensing (ACC + Frenagem Autônoma)",
      "Bancos Magic Seat em Couro",
      "Honda LaneWatch",
      "Chave Presencial (Keyless)",
      "Faróis Full LED",
      "Único Dono",
    ],
    observacoes:
      "Nova geração do Honda HR-V EXL com pacote completo Honda Sensing de condução semiautônoma.",
    fotos: ["/assets/plates/card1-photo.png"],
    criadoEm: "2026-10-19",
  },
  {
    id: "8",
    slug: "chevrolet-onix-premier-turbo-2023",
    marca: "Chevrolet",
    modelo: "Onix",
    versao: "1.0 Turbo Flex Premier Automático",
    anoFabricacao: 2022,
    anoModelo: 2023,
    quilometragem: 33400,
    cambio: "Automático",
    combustivel: "Flex",
    cor: "Branco Summit",
    finalPlaca: "6",
    preco: 89900,
    status: "disponivel",
    destaqueHome: false,
    laudoCodigo: "LC-JDI-2026-048",
    opcionais: [
      "Laudo Cautelar 100% Aprovado",
      "Seis Airbags + Controle de Estabilidade",
      "Carregador de Celular por Indução",
      "Alerta de Ponto Cego",
      "Easy Park (Estacionamento Automático)",
      "Bancos com Revestimento Premium",
      "Wi-Fi Nativo + MyLink",
    ],
    observacoes:
      "Hatch turbo extremamente econômico (faz mais de 16 km/l na rodovia Anhanguera/Bandeirantes). Versão topo de linha Premier.",
    fotos: ["/assets/plates/card3-photo.png"],
    criadoEm: "2026-10-20",
  },
  {
    id: "9",
    slug: "volkswagen-tcross-highline-2022",
    marca: "Volkswagen",
    modelo: "T-Cross",
    versao: "1.4 250 TSI Total Flex Highline AT6",
    anoFabricacao: 2022,
    anoModelo: 2022,
    quilometragem: 38700,
    cambio: "Automático",
    combustivel: "Flex",
    cor: "Prata Sargas",
    finalPlaca: "3",
    preco: 126900,
    status: "disponivel",
    destaqueHome: false,
    laudoCodigo: "LC-JDI-2026-052",
    opcionais: [
      "Laudo Cautelar 100% Aprovado",
      "Motor 1.4 250 TSI de 150 cv",
      "Teto Solar Panorâmico Sky View",
      "Pacote Tech & Beats Sound",
      "Bancos em Couro",
      "Painel Digital Active Info Display",
    ],
    observacoes:
      "Motorização 1.4 Turbo de 150 cv com pacote opcional Sky View (teto solar panorâmico) e som Beats.",
    fotos: ["/assets/plates/card2-photo.png"],
    criadoEm: "2026-10-20",
  },
  {
    id: "10",
    slug: "fiat-fastback-impetus-2023",
    marca: "Fiat",
    modelo: "Fastback",
    versao: "1.0 Turbo 200 Flex Impetus CVT",
    anoFabricacao: 2023,
    anoModelo: 2023,
    quilometragem: 18500,
    cambio: "CVT",
    combustivel: "Flex",
    cor: "Cinza Strato",
    finalPlaca: "0",
    preco: 127900,
    status: "reservado",
    destaqueHome: false,
    laudoCodigo: "LC-JDI-2026-055",
    opcionais: [
      "Laudo Cautelar 100% Aprovado",
      "Único Dono",
      "Painel Digital de 7 polegadas",
      "Central Multimídia 10,1 pol",
      "Bancos em Couro",
      "Frenagem Autônoma de Emergência",
      "Rodas Esportivas Aro 18",
    ],
    observacoes:
      "Na cor mais procurada (Cinza Strato com teto bicolor preto), porta-malas de 600 litros e estado de 0km.",
    fotos: ["/assets/plates/card1-photo.png"],
    criadoEm: "2026-10-21",
  },
  {
    id: "11",
    slug: "honda-civic-touring-turbo-2021",
    marca: "Honda",
    modelo: "Civic",
    versao: "1.5 16V Turbo Gasolina Touring CVT",
    anoFabricacao: 2020,
    anoModelo: 2021,
    quilometragem: 49200,
    cambio: "CVT",
    combustivel: "Gasolina",
    cor: "Preto Cristal",
    finalPlaca: "5",
    preco: 142900,
    status: "disponivel",
    destaqueHome: false,
    laudoCodigo: "LC-JDI-2026-059",
    opcionais: [
      "Laudo Cautelar 100% Aprovado",
      "Motor 1.5 Turbo 173 cv",
      "Teto Solar Elétrico",
      "Sistema de Som Premium 452W",
      "Carregador por Indução",
      "Banco do Motorista c/ Ajuste Elétrico",
      "Faróis Full LED",
    ],
    observacoes:
      "Último ano do lendário Civic G10 Touring 1.5 Turbo com som premium e saídas de ar traseiras. Exemplar de colecionador.",
    fotos: ["/assets/plates/car5-bmw320i.png"],
    criadoEm: "2026-10-21",
  },
  {
    id: "12",
    slug: "hyundai-hb20-platinum-plus-2023",
    marca: "Hyundai",
    modelo: "HB20",
    versao: "1.0 TGDI Flex Platinum Plus Automático",
    anoFabricacao: 2023,
    anoModelo: 2023,
    quilometragem: 21000,
    cambio: "Automático",
    combustivel: "Flex",
    cor: "Prata Brisk",
    finalPlaca: "4",
    preco: 94900,
    status: "disponivel",
    destaqueHome: false,
    laudoCodigo: "LC-JDI-2026-063",
    opcionais: [
      "Laudo Cautelar 100% Aprovado",
      "Único Dono",
      "Pacote SmartSense Completo",
      "Bancos em Couro",
      "Partida Remota pela Chave",
      "Painel Digital Supervision Cluster",
      "Central Multimídia Bluelink",
    ],
    observacoes:
      "Versão topo de linha Platinum Plus com pacote de segurança ativa e partida remota do motor.",
    fotos: ["/assets/plates/car6-creta.png"],
    criadoEm: "2026-10-22",
  },
];

const STORAGE_KEY_VEHICLES = "serra_multimarcas_vehicles_v1";
const STORAGE_KEY_CONFIG = "serra_multimarcas_config_v1";

export function getStoredVehicles(): Vehicle[] {
  if (typeof window === "undefined") return INITIAL_VEHICLES;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_VEHICLES);
    if (!raw) {
      window.localStorage.setItem(
        STORAGE_KEY_VEHICLES,
        JSON.stringify(INITIAL_VEHICLES)
      );
      return INITIAL_VEHICLES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_VEHICLES;
  } catch {
    return INITIAL_VEHICLES;
  }
}

export function saveStoredVehicles(vehicles: Vehicle[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY_VEHICLES, JSON.stringify(vehicles));
  window.dispatchEvent(new Event("serra-storage-updated"));
}

export function resetFactoryVehicles(): Vehicle[] {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      STORAGE_KEY_VEHICLES,
      JSON.stringify(INITIAL_VEHICLES)
    );
    window.dispatchEvent(new Event("serra-storage-updated"));
  }
  return INITIAL_VEHICLES;
}

export function getStoredConfig(): StoreConfig {
  if (typeof window === "undefined") return DEFAULT_STORE_CONFIG;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_CONFIG);
    if (!raw) return DEFAULT_STORE_CONFIG;
    return { ...DEFAULT_STORE_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STORE_CONFIG;
  }
}

export function saveStoredConfig(config: StoreConfig): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  window.dispatchEvent(new Event("serra-storage-updated"));
}

export function formatBRL(value: number): string {
  const formatted = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `R$ ${formatted}`;
}

export function formatKM(value: number): string {
  const formatted = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${formatted} KM`;
}

export function buildWhatsAppUrl(
  vehicle: Vehicle,
  config: StoreConfig,
  originBase?: string
): string {
  const cleanPhone = config.whatsappNumero.replace(/\D/g, "") || "5511998765432";
  const carFullName = `${vehicle.marca} ${vehicle.modelo} ${vehicle.versao} (${vehicle.anoFabricacao}/${vehicle.anoModelo})`;
  const priceFormatted = formatBRL(vehicle.preco);
  const base = originBase || "https://serramultimarcas.com.br";
  const pageLink = `${base}/veiculos/${vehicle.slug}`;

  const message =
    vehicle.status === "vendido"
      ? `Olá, equipe da ${config.nomeLoja}! Vi no site que o veículo *${carFullName}* (${priceFormatted}) já foi vendido e procuro um veículo semelhante no estoque de Jundiaí.\n\nLink de referência: ${pageLink}`
      : `Olá, equipe da ${config.nomeLoja}! Tenho interesse neste veículo que vi no site:\n\n*${carFullName}*\nValor: *${priceFormatted}*\nQuilometragem: ${formatKM(vehicle.quilometragem)}\nCódigo Cautelar: ${vehicle.laudoCodigo}\n\nLink do veículo: ${pageLink}`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
