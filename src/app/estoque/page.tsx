"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
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
  RotateCcw,
  ArrowUpDown,
  Car,
  Banknote,
  Calendar,
  Settings2,
  Fuel,
  CheckCircle2,
  Clock3,
  Archive,
  ArrowRight,
  SlidersHorizontal,
} from "lucide-react";

function EstoqueContent() {
  const searchParams = useSearchParams();

  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [config, setConfig] = useState<StoreConfig>(DEFAULT_STORE_CONFIG);

  const [marca, setMarca] = useState<string>(
    searchParams.get("marca") || "Todas"
  );
  const [faixaPreco, setFaixaPreco] = useState<string>(
    searchParams.get("preco") || "Todas"
  );
  const [anoRange, setAnoRange] = useState<string>(
    searchParams.get("ano") || "Todos"
  );
  const [cambio, setCambio] = useState<string>(
    searchParams.get("cambio") || "Todos"
  );
  const [combustivel, setCombustivel] = useState<string>("Todos");
  const [statusFilter, setStatusFilter] = useState<string>(
    searchParams.get("status") || "todos"
  );
  const [ordenacao, setOrdenacao] = useState<string>("recentes");
  const [busca, setBusca] = useState<string>(searchParams.get("busca") || "");

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

  const countsByStatus = useMemo(() => {
    return {
      todos: vehicles.length,
      disponivel: vehicles.filter((v) => v.status === "disponivel").length,
      reservado: vehicles.filter((v) => v.status === "reservado").length,
      vendido: vehicles.filter((v) => v.status === "vendido").length,
    };
  }, [vehicles]);

  const filteredAndSorted = useMemo(() => {
    const list = vehicles.filter((v) => {
      if (marca !== "Todas" && v.marca !== marca) return false;
      if (cambio !== "Todos" && v.cambio !== cambio) return false;
      if (combustivel !== "Todos" && v.combustivel !== combustivel) return false;
      if (statusFilter !== "todos" && v.status !== statusFilter) return false;

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
        const text = `${v.marca} ${v.modelo} ${v.versao} ${v.cor} ${
          v.anoModelo
        } ${v.opcionais.join(" ")}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      return true;
    });

    return [...list].sort((a, b) => {
      if (ordenacao === "menor-preco") return a.preco - b.preco;
      if (ordenacao === "maior-preco") return b.preco - a.preco;
      if (ordenacao === "menor-km") return a.quilometragem - b.quilometragem;
      if (ordenacao === "mais-novos") return b.anoModelo - a.anoModelo;
      return 0;
    });
  }, [
    vehicles,
    marca,
    faixaPreco,
    anoRange,
    cambio,
    combustivel,
    statusFilter,
    ordenacao,
    busca,
  ]);

  const handleReset = () => {
    setMarca("Todas");
    setFaixaPreco("Todas");
    setAnoRange("Todos");
    setCambio("Todos");
    setCombustivel("Todos");
    setStatusFilter("todos");
    setOrdenacao("recentes");
    setBusca("");
  };

  return (
    <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-8 py-8 sm:py-10">
      {/* Header & Status Filter Pills */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Showroom Jundiaí
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Estoque Completo de Veículos
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Explore todos os seminovos revisados e periciados disponíveis em nossa loja.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setStatusFilter("todos")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
              statusFilter === "todos"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Todos ({countsByStatus.todos})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("disponivel")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all inline-flex items-center gap-1.5 ${
              statusFilter === "disponivel"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-white text-emerald-800 border border-slate-200 hover:bg-emerald-50"
            }`}
          >
            <CheckCircle2 size={14} />
            <span>Disponíveis ({countsByStatus.disponivel})</span>
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("reservado")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all inline-flex items-center gap-1.5 ${
              statusFilter === "reservado"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-white text-amber-800 border border-slate-200 hover:bg-amber-50"
            }`}
          >
            <Clock3 size={14} />
            <span>Reservados ({countsByStatus.reservado})</span>
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("vendido")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all inline-flex items-center gap-1.5 ${
              statusFilter === "vendido"
                ? "bg-slate-600 text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Archive size={14} />
            <span>Vendidos ({countsByStatus.vendido})</span>
          </button>
        </div>
      </div>

      {/* Filter Box */}
      <section
        aria-label="Filtros do estoque"
        className="mt-6 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs"
      >
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <SlidersHorizontal size={16} className="text-emerald-600" />
            <span>Filtrar Veículos</span>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer bg-transparent border-0 p-0"
          >
            <RotateCcw size={13} />
            <span>Resetar Filtros</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Busca Textual */}
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Busca
            </label>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Modelo, versão..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
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
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <select
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-sm text-slate-900 font-medium focus:bg-white focus:border-slate-400 focus:outline-none appearance-none cursor-pointer"
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
              Preço
            </label>
            <div className="relative">
              <Banknote
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <select
                value={faixaPreco}
                onChange={(e) => setFaixaPreco(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-sm text-slate-900 font-medium focus:bg-white focus:border-slate-400 focus:outline-none appearance-none cursor-pointer"
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
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <select
                value={anoRange}
                onChange={(e) => setAnoRange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-sm text-slate-900 font-medium focus:bg-white focus:border-slate-400 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="Todos">Todos os anos</option>
                <option value="2023-2024">2023 — 2024</option>
                <option value="2021-2022">2021 — 2022</option>
                <option value="ate-2020">Até 2020</option>
              </select>
            </div>
          </div>

          {/* Câmbio */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Câmbio
            </label>
            <div className="relative">
              <Settings2
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <select
                value={cambio}
                onChange={(e) => setCambio(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-sm text-slate-900 font-medium focus:bg-white focus:border-slate-400 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="Todos">Todos os câmbios</option>
                <option value="Automático">Automático</option>
                <option value="CVT">CVT</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
          </div>
        </div>

        {/* Secondary Row: Combustível + Ordenação + Contador */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Fuel size={13} className="text-slate-400" />
              <span>Combustível:</span>
            </span>
            {["Todos", "Flex", "Diesel", "Gasolina", "Híbrido"].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCombustivel(c)}
                className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                  combustivel === c
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ArrowUpDown size={14} className="text-slate-400" />
              <span className="font-medium text-slate-500">Ordenar por:</span>
              <select
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="recentes">Padrão</option>
                <option value="menor-preco">Menor Preço</option>
                <option value="maior-preco">Maior Preço</option>
                <option value="menor-km">Menor KM</option>
                <option value="mais-novos">Ano Mais Novo</option>
              </select>
            </div>

            <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
              {filteredAndSorted.length} veículo(s)
            </span>
          </div>
        </div>
      </section>

      {/* Vehicle Grid */}
      <section aria-label="Grade de veículos" className="mt-8">
        {filteredAndSorted.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
            <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={22} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Nenhum veículo corresponde aos filtros selecionados
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Experimente limpar ou ampliar os filtros para visualizar os outros {vehicles.length} modelos de nosso estoque.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-5 inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw size={15} />
              <span>Limpar Filtros e Ver Todos</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSorted.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                config={config}
              />
            ))}
          </div>
        )}
      </section>

      {/* Bottom Admin Hint */}
      <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 shadow-xs">
        <span>
          <strong>Área Administrativa:</strong> Adicione veículos novos ou altere status (Disponível, Reservado, Vendido) em tempo real pelo painel da loja.
        </span>
        <Link
          href="/admin"
          className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-xl transition-colors inline-flex items-center gap-1.5"
        >
          <span>Acessar Painel Lojista</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </main>
  );
}

export default function EstoquePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-8 py-20 text-center text-sm text-slate-500 font-medium">
            Carregando catálogo de veículos...
          </div>
        }
      >
        <EstoqueContent />
      </Suspense>
      <Footer />
    </div>
  );
}
