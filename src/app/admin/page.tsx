"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  COMMON_OPTIONALS,
  DEFAULT_STORE_CONFIG,
  INITIAL_VEHICLES,
  StoreConfig,
  Vehicle,
  VehicleStatus,
  formatBRL,
  formatKM,
  getStoredConfig,
  getStoredVehicles,
  resetFactoryVehicles,
  saveStoredConfig,
  saveStoredVehicles,
} from "@/lib/vehicles";
import {
  ResizedPhotoResult,
  resizeAndCompressImage,
} from "@/lib/image-resize";
import {
  ArrowLeft,
  Check,
  Edit3,
  ExternalLink,
  ImagePlus,
  Lock,
  LogOut,
  Plus,
  RotateCcw,
  Save,
  ShieldCheck,
  Smartphone,
  Trash2,
  X,
  CheckCircle2,
  Clock3,
  Archive,
  Car,
  FileImage,
  Sparkles,
  KeyRound,
  LayoutDashboard,
} from "lucide-react";

const AUTH_SESSION_KEY = "serra_admin_authenticated_v1";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("lojista@serramultimarcas.com.br");
  const [password, setPassword] = useState<string>("jundiai2026");
  const [loginError, setLoginError] = useState<string>("");

  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [config, setConfig] = useState<StoreConfig>(DEFAULT_STORE_CONFIG);
  const [configSavedToast, setConfigSavedToast] = useState<boolean>(false);

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Vehicle Form State
  const [marca, setMarca] = useState<string>("Jeep");
  const [modelo, setModelo] = useState<string>("");
  const [versao, setVersao] = useState<string>("");
  const [anoFabricacao, setAnoFabricacao] = useState<number>(2023);
  const [anoModelo, setAnoModelo] = useState<number>(2023);
  const [quilometragem, setQuilometragem] = useState<number>(25000);
  const [cambio, setCambio] = useState<Vehicle["cambio"]>("Automático");
  const [combustivel, setCombustivel] =
    useState<Vehicle["combustivel"]>("Flex");
  const [cor, setCor] = useState<string>("Branco");
  const [finalPlaca, setFinalPlaca] = useState<string>("5");
  const [preco, setPreco] = useState<number>(125900);
  const [status, setStatus] = useState<VehicleStatus>("disponivel");
  const [destaqueHome, setDestaqueHome] = useState<boolean>(true);
  const [opcionais, setOpcionais] = useState<string[]>([
    "Laudo Cautelar 100% Aprovado",
    "Bancos em Couro",
    "Central Multimídia c/ Apple CarPlay & Android Auto",
  ]);
  const [novoOpcional, setNovoOpcional] = useState<string>("");
  const [observacoes, setObservacoes] = useState<string>("");
  const [fotos, setFotos] = useState<string[]>(["/assets/plates/card1-photo.png"]);
  const [uploadLogs, setUploadLogs] = useState<ResizedPhotoResult[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    setVehicles(getStoredVehicles());
    setConfig(getStoredConfig());
    if (
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(AUTH_SESSION_KEY) === "true"
    ) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      setIsAuthenticated(true);
      setLoginError("");
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(AUTH_SESSION_KEY, "true");
      }
    } else {
      setLoginError("Informe o e-mail e a senha de acesso do lojista.");
    }
  };

  const handleQuickDemoLogin = () => {
    setEmail("lojista@serramultimarcas.com.br");
    setPassword("jundiai2026");
    setIsAuthenticated(true);
    setLoginError("");
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(AUTH_SESSION_KEY, "true");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(AUTH_SESSION_KEY);
    }
  };

  const handleStatusChange = (vehicleId: string, newStatus: VehicleStatus) => {
    const updated = vehicles.map((v) =>
      v.id === vehicleId ? { ...v, status: newStatus } : v
    );
    setVehicles(updated);
    saveStoredVehicles(updated);
  };

  const handleDeleteVehicle = (vehicleId: string) => {
    if (confirm("Tem certeza que deseja remover este veículo?")) {
      const updated = vehicles.filter((v) => v.id !== vehicleId);
      setVehicles(updated);
      saveStoredVehicles(updated);
    }
  };

  const handleResetDemo = () => {
    if (confirm("Deseja restaurar os veículos originais de fábrica?")) {
      const restored = resetFactoryVehicles();
      setVehicles(restored);
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredConfig(config);
    setConfigSavedToast(true);
    setTimeout(() => setConfigSavedToast(false), 3000);
  };

  const openNewVehicleForm = () => {
    setEditingId(null);
    setMarca("Jeep");
    setModelo("");
    setVersao("");
    setAnoFabricacao(2023);
    setAnoModelo(2024);
    setQuilometragem(18000);
    setCambio("Automático");
    setCombustivel("Flex");
    setCor("Cinza");
    setFinalPlaca("8");
    setPreco(135900);
    setStatus("disponivel");
    setDestaqueHome(true);
    setOpcionais([
      "Laudo Cautelar 100% Aprovado",
      "Único Dono",
      "Bancos em Couro",
      "Central Multimídia",
      "Câmera de Ré",
    ]);
    setObservacoes(
      "Veículo periciado com Laudo Cautelar 100% aprovado, sem detalhes e pronto para transferência."
    );
    setFotos(["/assets/plates/card1-photo.png"]);
    setUploadLogs([]);
    setIsFormOpen(true);
  };

  const openEditVehicleForm = (v: Vehicle) => {
    setEditingId(v.id);
    setMarca(v.marca);
    setModelo(v.modelo);
    setVersao(v.versao);
    setAnoFabricacao(v.anoFabricacao);
    setAnoModelo(v.anoModelo);
    setQuilometragem(v.quilometragem);
    setCambio(v.cambio);
    setCombustivel(v.combustivel);
    setCor(v.cor);
    setFinalPlaca(v.finalPlaca);
    setPreco(v.preco);
    setStatus(v.status);
    setDestaqueHome(v.destaqueHome);
    setOpcionais(v.opcionais);
    setObservacoes(v.observacoes);
    setFotos(v.fotos.length > 0 ? v.fotos : ["/assets/plates/card1-photo.png"]);
    setUploadLogs([]);
    setIsFormOpen(true);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setIsUploading(true);
    try {
      const results: ResizedPhotoResult[] = [];
      for (let i = 0; i < fileList.length; i++) {
        const resized = await resizeAndCompressImage(fileList[i]);
        results.push(resized);
      }
      setFotos((prev) => [
        ...results.map((r) => r.dataUrl),
        ...prev.filter((p) => !p.startsWith("/assets/plates/")),
      ]);
      setUploadLogs((prev) => [...results, ...prev]);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const toggleOpcional = (item: string) => {
    setOpcionais((prev) =>
      prev.includes(item) ? prev.filter((o) => o !== item) : [...prev, item]
    );
  };

  const handleAddCustomOpcional = () => {
    const clean = novoOpcional.trim();
    if (!clean) return;
    if (!opcionais.includes(clean)) {
      setOpcionais((prev) => [...prev, clean]);
    }
    setNovoOpcional("");
  };

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelo.trim()) return;

    const generatedSlug = `${marca}-${modelo}-${anoModelo}-${Date.now()
      .toString()
      .slice(-4)}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-");

    if (editingId) {
      const updated = vehicles.map((v) =>
        v.id === editingId
          ? {
              ...v,
              marca,
              modelo,
              versao,
              anoFabricacao: Number(anoFabricacao),
              anoModelo: Number(anoModelo),
              quilometragem: Number(quilometragem),
              cambio,
              combustivel,
              cor,
              finalPlaca,
              preco: Number(preco),
              status,
              destaqueHome,
              opcionais,
              observacoes,
              fotos:
                fotos.length > 0 ? fotos : ["/assets/plates/card1-photo.png"],
            }
          : v
      );
      setVehicles(updated);
      saveStoredVehicles(updated);
    } else {
      const newVehicle: Vehicle = {
        id: String(Date.now()),
        slug: generatedSlug,
        marca,
        modelo,
        versao: versao || "Completo",
        anoFabricacao: Number(anoFabricacao),
        anoModelo: Number(anoModelo),
        quilometragem: Number(quilometragem),
        cambio,
        combustivel,
        cor,
        finalPlaca: finalPlaca || "0",
        preco: Number(preco),
        status,
        destaqueHome,
        laudoCodigo: `LC-JDI-${Math.floor(100 + Math.random() * 899)}`,
        opcionais,
        observacoes,
        fotos: fotos.length > 0 ? fotos : ["/assets/plates/card1-photo.png"],
        criadoEm: new Date().toISOString().slice(0, 10),
      };
      const updated = [newVehicle, ...vehicles];
      setVehicles(updated);
      saveStoredVehicles(updated);
    }

    setIsFormOpen(false);
  };

  const stats = useMemo(() => {
    const disp = vehicles.filter((v) => v.status === "disponivel").length;
    const res = vehicles.filter((v) => v.status === "reservado").length;
    const vend = vehicles.filter((v) => v.status === "vendido").length;
    return { disp, res, vend };
  }, [vehicles]);

  // 1. Simple Dealer Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-4 sm:p-8 font-sans">
        <div className="mx-auto w-full max-w-7xl flex items-center justify-between pb-4 border-b border-slate-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Voltar para o Site</span>
          </Link>
          <span className="text-xs font-medium text-slate-500">
            Painel do Lojista · {config.nomeLoja}
          </span>
        </div>

        <main className="mx-auto w-full max-w-md my-12 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-5">
            <Lock size={22} />
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Área do Lojista
          </h1>
          <p className="text-sm text-slate-600 mt-1 mb-6">
            Acesse para cadastrar veículos, subir fotos com compressão automática e gerenciar status.
          </p>

          {/* 1-Click Demo Login Button */}
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full mb-5 py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck size={16} className="text-emerald-600" />
            <span>Entrar com 1 Clique (Modo Demonstração)</span>
          </button>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
                required
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <KeyRound size={16} />
              <span>Acessar Painel</span>
            </button>
          </form>
        </main>

        <div className="text-center text-xs text-slate-400">
          Demonstração comercial para lojas de veículos em Jundiaí e região.
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <LayoutDashboard size={18} />
            </div>
            <div>
              <div className="font-extrabold text-base text-slate-900 leading-tight">
                Painel do Lojista — {config.nomeLoja}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Gestão rápida de estoque e fotos
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink size={13} />
              <span>Ver Site</span>
            </Link>
            <Link
              href="/estoque"
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink size={13} />
              <span>Ver Estoque</span>
            </Link>
            <button
              type="button"
              onClick={handleResetDemo}
              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Resetar Fábrica</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1.5 text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut size={13} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-8 pt-8 space-y-8">
        {/* Top KPIs + Live WhatsApp Config */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* KPI Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
              <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Car size={14} className="text-slate-400" />
                <span>Total no Pátio</span>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2">
                {vehicles.length}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">Cadastrados</div>
            </div>

            <div className="bg-white rounded-2xl border border-emerald-200 bg-emerald-50/20 p-4 shadow-xs">
              <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>Disponíveis</span>
              </div>
              <div className="text-2xl font-black text-emerald-700 mt-2">
                {stats.disp}
              </div>
              <div className="text-xs text-emerald-600/80 mt-0.5">À venda</div>
            </div>

            <div className="bg-white rounded-2xl border border-amber-200 bg-amber-50/20 p-4 shadow-xs">
              <div className="text-xs font-semibold text-amber-700 flex items-center gap-1.5">
                <Clock3 size={14} className="text-amber-600" />
                <span>Reservados</span>
              </div>
              <div className="text-2xl font-black text-amber-700 mt-2">
                {stats.res}
              </div>
              <div className="text-xs text-amber-600/80 mt-0.5">Negociação</div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
              <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <Archive size={14} className="text-slate-500" />
                <span>Vendidos</span>
              </div>
              <div className="text-2xl font-black text-slate-700 mt-2">
                {stats.vend}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">Giro concluído</div>
            </div>
          </div>

          {/* WhatsApp Direct Lead Config (5 cols) */}
          <form
            onSubmit={handleSaveConfig}
            className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <Smartphone size={14} className="text-emerald-600" />
                <span>WhatsApp de Atendimento da Loja</span>
              </div>
              {configSavedToast && (
                <span className="text-xs font-bold text-emerald-600 inline-flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  <span>Salvo com sucesso!</span>
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Telefone (DDD + Número)
                </label>
                <input
                  type="text"
                  value={config.whatsappNumero}
                  onChange={(e) =>
                    setConfig({ ...config, whatsappNumero: e.target.value })
                  }
                  placeholder="5511999999999"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Nome da Loja
                </label>
                <input
                  type="text"
                  value={config.nomeLoja}
                  onChange={(e) =>
                    setConfig({ ...config, nomeLoja: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Altere para o número do cliente na reunião para testar.
              </span>
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                Salvar Configuração
              </button>
            </div>
          </form>
        </div>

        {/* Section Header: Add vehicle action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Veículos no Estoque ({vehicles.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Clique nos botões de status para atualizar instantaneamente na vitrine.
            </p>
          </div>

          <button
            type="button"
            onClick={openNewVehicleForm}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Plus size={16} />
            <span>Cadastrar Novo Veículo</span>
          </button>
        </div>

        {/* Vehicle Registration / Edit Drawer */}
        {isFormOpen && (
          <section
            aria-label="Cadastro e edição de veículo"
            className="bg-white rounded-2xl border border-slate-300 p-6 sm:p-8 shadow-md"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  {editingId ? "Editar Veículo" : "Novo Cadastro"}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {editingId
                    ? `Editando: ${marca} ${modelo}`
                    : "Preencha as informações do veículo"}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveVehicle} className="space-y-6">
              {/* Row 1: Marca, Modelo, Versão */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Marca *
                  </label>
                  <input
                    type="text"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    placeholder="Ex: Jeep, Toyota, VW..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Modelo *
                  </label>
                  <input
                    type="text"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    placeholder="Ex: Compass, Corolla..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Versão *
                  </label>
                  <input
                    type="text"
                    value={versao}
                    onChange={(e) => setVersao(e.target.value)}
                    placeholder="Ex: 1.3 Turbo Flex Longitude AT6"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Ano Fab, Ano Mod, KM, Câmbio, Combustível, Cor, Preço */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Ano Fab. *
                  </label>
                  <input
                    type="number"
                    value={anoFabricacao}
                    onChange={(e) => setAnoFabricacao(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Ano Modelo *
                  </label>
                  <input
                    type="number"
                    value={anoModelo}
                    onChange={(e) => setAnoModelo(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Quilometragem (KM) *
                  </label>
                  <input
                    type="number"
                    value={quilometragem}
                    onChange={(e) => setQuilometragem(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Câmbio *
                  </label>
                  <select
                    value={cambio}
                    onChange={(e) =>
                      setCambio(e.target.value as Vehicle["cambio"])
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none cursor-pointer"
                  >
                    <option value="Automático">Automático</option>
                    <option value="CVT">CVT</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Combustível *
                  </label>
                  <select
                    value={combustivel}
                    onChange={(e) =>
                      setCombustivel(e.target.value as Vehicle["combustivel"])
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none cursor-pointer"
                  >
                    <option value="Flex">Flex</option>
                    <option value="Gasolina">Gasolina</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Híbrido">Híbrido</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Cor *
                  </label>
                  <input
                    type="text"
                    value={cor}
                    onChange={(e) => setCor(e.target.value)}
                    placeholder="Ex: Prata"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Row 3: Preço, Status & Destaque */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Preço de Venda (R$) *
                  </label>
                  <input
                    type="number"
                    value={preco}
                    onChange={(e) => setPreco(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-emerald-300 rounded-xl px-3.5 py-2 text-base font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Status Inicial *
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as VehicleStatus)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none cursor-pointer"
                  >
                    <option value="disponivel">Disponível</option>
                    <option value="reservado">Reservado</option>
                    <option value="vendido">Vendido</option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="inline-flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={destaqueHome}
                      onChange={(e) => setDestaqueHome(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm font-semibold text-slate-800">
                      Exibir na Página Inicial (Home)
                    </span>
                  </label>
                </div>
              </div>

              {/* Photos & Auto-compress Upload */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Fotos do Veículo (Redimensionamento Automático)
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fotos do celular ou computador são comprimidas para WebP leve antes de salvar, mantendo o site rápido.
                    </p>
                  </div>

                  <label className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2">
                    <ImagePlus size={15} />
                    <span>{isUploading ? "Comprimindo..." : "Adicionar Fotos"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {uploadLogs.length > 0 && (
                  <div className="mb-4 bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-800 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <Sparkles size={14} className="text-emerald-600" />
                      <span>Compressão concluída com sucesso:</span>
                    </div>
                    {uploadLogs.map((log, i) => (
                      <div key={`${log.fileName}-${i}`} className="flex items-center gap-1.5">
                        <FileImage size={13} className="text-emerald-600" />
                        <span>
                          {log.fileName}: de <strong>{log.originalSizeKB} KB</strong> para <strong>{log.compressedSizeKB} KB</strong> ({log.reductionPercent}% mais leve)
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {fotos.map((url, idx) => (
                    <div
                      key={`${url.slice(0, 30)}-${idx}`}
                      className="relative aspect-16/10 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 group"
                    >
                      <img
                        src={url}
                        alt={`Foto ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFotos((prev) => prev.filter((_, i) => i !== idx))
                        }
                        className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded-md transition-colors cursor-pointer"
                        title="Remover foto"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optionals */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Opcionais e Equipamentos
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {COMMON_OPTIONALS.map((item) => {
                    const checked = opcionais.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleOpcional(item)}
                        className={`px-3 py-2 rounded-xl border text-left text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                          checked
                            ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <Check
                          size={14}
                          className={
                            checked ? "text-emerald-600" : "opacity-30"
                          }
                        />
                        <span className="truncate">{item}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3 flex gap-2 max-w-md">
                  <input
                    type="text"
                    value={novoOpcional}
                    onChange={(e) => setNovoOpcional(e.target.value)}
                    placeholder="Adicionar outro opcional..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomOpcional}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Adicionar
                  </button>
                </div>
              </div>

              {/* Observações */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Observações do Veículo
                </label>
                <textarea
                  rows={3}
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Save size={16} />
                  <span>{editingId ? "Salvar Alterações" : "Publicar Veículo"}</span>
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Vehicle Management Table */}
        <section
          aria-label="Tabela de veículos"
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Veículo</th>
                  <th className="py-3.5 px-4">Ano / KM / Câmbio</th>
                  <th className="py-3.5 px-4">Preço</th>
                  <th className="py-3.5 px-4">Status Rápido</th>
                  <th className="py-3.5 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {vehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={v.fotos[0] || "/assets/plates/card1-photo.png"}
                          alt={`${v.marca} ${v.modelo}`}
                          className="w-16 h-11 object-cover rounded-lg border border-slate-200 bg-slate-100 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-slate-900">
                            {v.marca} {v.modelo}
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1">
                            {v.versao}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-slate-600">
                      <div className="font-semibold text-slate-900">
                        {v.anoFabricacao}/{v.anoModelo}
                      </div>
                      <div className="text-slate-500 mt-0.5">
                        {formatKM(v.quilometragem)} · {v.cambio}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {formatBRL(v.preco)}
                    </td>

                    {/* 1-Click Status buttons */}
                    <td className="py-3.5 px-4">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleStatusChange(v.id, "disponivel")}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors inline-flex items-center gap-1 ${
                            v.status === "disponivel"
                              ? "bg-emerald-600 text-white shadow-2xs"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          <CheckCircle2 size={12} />
                          <span>Disponível</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStatusChange(v.id, "reservado")}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors inline-flex items-center gap-1 ${
                            v.status === "reservado"
                              ? "bg-amber-600 text-white shadow-2xs"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          <Clock3 size={12} />
                          <span>Reservado</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStatusChange(v.id, "vendido")}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors inline-flex items-center gap-1 ${
                            v.status === "vendido"
                              ? "bg-slate-600 text-white shadow-2xs"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          <Archive size={12} />
                          <span>Vendido</span>
                        </button>
                      </div>
                    </td>

                    {/* Action links */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Link
                          href={`/veiculos/${v.slug}`}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Ver na Vitrine"
                        >
                          <ExternalLink size={15} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => openEditVehicleForm(v)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Editar"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteVehicle(v.id)}
                          className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Excluir"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
