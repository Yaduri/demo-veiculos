"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DEFAULT_STORE_CONFIG,
  INITIAL_VEHICLES,
  StoreConfig,
  Vehicle,
  getStoredConfig,
  getStoredVehicles,
} from "@/lib/vehicles";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VehicleCard } from "@/components/VehicleCard";
import {
  Search,
  ShieldCheck,
  Gauge,
  ArrowRight,
  MessageCircle,
  MapPin,
  Car,
  Banknote,
  Calendar,
  Settings2,
  RotateCcw,
  BadgeCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [config, setConfig] = useState<StoreConfig>(DEFAULT_STORE_CONFIG);

  const [marca, setMarca] = useState<string>("Todas");
  const [faixaPreco, setFaixaPreco] = useState<string>("Todas");
  const [anoRange, setAnoRange] = useState<string>("Todos");
  const [cambio, setCambio] = useState<string>("Todos");
  const [busca, setBusca] = useState<string>("");

  useEffect(() => {
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

  const marcasDisponiveis = useMemo(() => {
    const set = new Set(vehicles.map((v) => v.marca));
    return ["Todas", ...Array.from(set).sort()];
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      if (marca !== "Todas" && v.marca !== marca) return false;
      if (cambio !== "Todos" && v.cambio !== cambio) return false;

      if (faixaPreco === "ate-100") {
        if (v.preco > 100000) return false;
      } else if (faixaPreco === "ate-150") {
        if (v.preco > 150000) return false;
      } else if (faixaPreco === "150-220") {
        if (v.preco < 150000 || v.preco > 220000) return false;
      } else if (faixaPreco === "acima-220") {
        if (v.preco <= 220000) return false;
      }

      if (anoRange === "2023-2024") {
        if (v.anoModelo < 2023) return false;
      } else if (anoRange === "2021-2022") {
        if (v.anoModelo < 2021 || v.anoModelo > 2022) return false;
      } else if (anoRange === "ate-2020") {
        if (v.anoModelo > 2020) return false;
      }

      if (busca.trim() !== "") {
        const q = busca.toLowerCase();
        const text =
          `${v.marca} ${v.modelo} ${v.versao} ${v.cor} ${v.anoModelo}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      return true;
    });
  }, [vehicles, marca, faixaPreco, anoRange, cambio, busca]);

  const hasActiveFilter =
    marca !== "Todas" ||
    faixaPreco !== "Todas" ||
    anoRange !== "Todos" ||
    cambio !== "Todos" ||
    busca.trim() !== "";

  const homeVehicles = useMemo(() => {
    if (hasActiveFilter) return filteredVehicles;
    const featured = vehicles.filter((v) => v.destaqueHome);
    return (featured.length >= 3 ? featured : vehicles).slice(0, 6);
  }, [vehicles, filteredVehicles, hasActiveFilter]);

  const handleGoToFullStock = () => {
    const params = new URLSearchParams();
    if (marca !== "Todas") params.set("marca", marca);
    if (faixaPreco !== "Todas") params.set("preco", faixaPreco);
    if (anoRange !== "Todos") params.set("ano", anoRange);
    if (cambio !== "Todos") params.set("cambio", cambio);
    if (busca.trim() !== "") params.set("busca", busca.trim());
    const qs = params.toString();
    router.push(qs ? `/estoque?${qs}` : "/estoque");
  };

  const handleResetFilters = () => {
    setMarca("Todas");
    setFaixaPreco("Todas");
    setAnoRange("Todos");
    setCambio("Todos");
    setBusca("");
  };

  const cleanPhone = config.whatsappNumero.replace(/\D/g, "") || "5511998765432";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Modern Clean Hero Banner with Integrated Search */}
        <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80 pt-10 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4">
                <MapPin size={13} className="text-emerald-600" />
                <span>Showroom em Jundiaí · Av. Nove de Julho</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Seminovos de procedência selecionados para você
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl">
                Veículos revisados e com laudo cautelar aprovado. Encontre o carro ideal em nosso estoque e negocie diretamente pelo WhatsApp.
              </p>
            </div>

            {/* Clean Floating Search & Filter Box */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-5 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {/* Search Text */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Buscar Modelo
                  </label>
                  <div className="relative">
                    <Search
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                      placeholder="Ex: Compass, Corolla..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Marca */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Marca
                  </label>
                  <div className="relative">
                    <Car
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <select
                      value={marca}
                      onChange={(e) => setMarca(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-8 py-2.5 text-sm text-slate-900 font-medium focus:bg-white focus:border-slate-400 focus:outline-none appearance-none cursor-pointer transition-colors"
                    >
                      {marcasDisponiveis.map((m) => (
                        <option key={m} value={m}>
                          {m === "Todas" ? "Todas as marcas" : m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Faixa de Preço */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Faixa de Preço
                  </label>
                  <div className="relative">
                    <Banknote
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <select
                      value={faixaPreco}
                      onChange={(e) => setFaixaPreco(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-8 py-2.5 text-sm text-slate-900 font-medium focus:bg-white focus:border-slate-400 focus:outline-none appearance-none cursor-pointer transition-colors"
                    >
                      <option value="Todas">Qualquer valor</option>
                      <option value="ate-100">Até R$ 100 mil</option>
                      <option value="ate-150">Até R$ 150 mil</option>
                      <option value="150-220">R$ 150 a R$ 220 mil</option>
                      <option value="acima-220">Acima de R$ 220 mil</option>
                    </select>
                  </div>
                </div>

                {/* Ano */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Ano
                  </label>
                  <div className="relative">
                    <Calendar
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <select
                      value={anoRange}
                      onChange={(e) => setAnoRange(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-8 py-2.5 text-sm text-slate-900 font-medium focus:bg-white focus:border-slate-400 focus:outline-none appearance-none cursor-pointer transition-colors"
                    >
                      <option value="Todos">Todos os anos</option>
                      <option value="2023-2024">2023 — 2024</option>
                      <option value="2021-2022">2021 — 2022</option>
                      <option value="ate-2020">Até 2020</option>
                    </select>
                  </div>
                </div>

                {/* Action button */}
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleGoToFullStock}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-2.5 px-4 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer h-[42px]"
                  >
                    <span>Ver Veículos</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {hasActiveFilter && (
                <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">
                    Filtros ativos: {filteredVehicles.length} veículo(s) encontrado(s)
                  </span>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-semibold cursor-pointer bg-transparent border-0 p-0"
                  >
                    <RotateCcw size={13} />
                    <span>Limpar Filtros</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured Vehicles Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-8 py-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {hasActiveFilter ? "Veículos Encontrados" : "Destaques do Pátio"}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {hasActiveFilter
                  ? `Exibindo ${filteredVehicles.length} veículo(s) de acordo com os filtros selecionados.`
                  : "Seleção especial de seminovos prontos para entrega imediata em Jundiaí."}
              </p>
            </div>

            <Link
              href="/estoque"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-emerald-700 bg-white border border-slate-200 hover:border-slate-300 px-4 py-2 rounded-xl transition-all shadow-xs"
            >
              <span>Ver Estoque Completo ({vehicles.length})</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {homeVehicles.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
              <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Nenhum veículo encontrado com esses critérios
              </h3>
              <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                Tente ajustar os filtros de marca, preço ou ano para visualizar outros modelos disponíveis em nossa loja.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-5 inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RotateCcw size={15} />
                <span>Limpar Filtros e Ver Todos</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {homeVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  config={config}
                />
              ))}
            </div>
          )}

          {/* Quick banner to full inventory */}
          <div className="mt-10 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Quer ver todos os modelos disponíveis?
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                Consulte nosso catálogo completo com fotos detalhadas, histórico e fichas técnicas completas.
              </p>
            </div>
            <Link
              href="/estoque"
              className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors inline-flex items-center gap-2 shadow-xs"
            >
              <span>Explorar Todos os {vehicles.length} Veículos</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Confidence & Benefits Section */}
        <section
          id="diferenciais"
          className="bg-white border-y border-slate-200 py-16 px-4 sm:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Procedência & Segurança
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                Por que comprar na Serra Multimarcas?
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Trabalhamos com transparência total para você realizar sua compra com tranquilidade e garantia em Jundiaí.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <ShieldCheck size={26} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Laudo Cautelar Aprovado
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Todos os veículos passam por perícia minuciosa de estrutura e pintura. Garantia comprovada de procedência, sem passagem por leilão ou sinistro.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <Gauge size={26} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Quilometragem Real Auditada
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Conferência eletrônica via scanner dos módulos e histórico de manutenção. Você sabe exatamente o que está comprando.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                  <BadgeCheck size={26} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Avaliação Justa na Troca
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Aceitamos seu veículo usado como entrada com avaliação justa e competitiva de mercado, além das melhores taxas de financiamento.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Contact Section */}
        <section
          id="localizacao"
          className="mx-auto max-w-7xl px-4 sm:px-8 py-16"
        >
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-3">
                <MapPin size={13} />
                <span>Loja Física em Jundiaí</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Venha conhecer nosso showroom na Av. Nove de Julho
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
                Estamos localizados em um dos principais corredores comerciais de Jundiaí, com fácil acesso pelas rodovias Anhanguera e Bandeirantes. Venha tomar um café conosco e fazer um test-drive.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="font-bold text-slate-900">Endereço</div>
                  <div className="text-slate-600 mt-1">{config.endereco}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{config.bairroCidade}</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="font-bold text-slate-900">Horário de Atendimento</div>
                  <div className="text-slate-600 mt-1">{config.horarioSemana}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{config.horarioSabado}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3.5 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">
                Atendimento Imediato
              </h3>
              <p className="text-xs text-slate-600">
                Tire dúvidas, envie sua proposta ou peça um vídeo detalhado do carro de seu interesse.
              </p>
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  `Olá, equipe da ${config.nomeLoja}! Gostaria de atendimento sobre os seminovos da loja de Jundiaí.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors text-sm"
              >
                <MessageCircle size={18} />
                <span>Conversar pelo WhatsApp</span>
              </a>
              <Link
                href="/estoque"
                className="w-full bg-white hover:bg-slate-100 text-slate-900 font-semibold py-3 px-4 rounded-xl border border-slate-200 flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <span>Ver Todos os Veículos</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
