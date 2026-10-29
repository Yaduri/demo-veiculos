"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DEFAULT_STORE_CONFIG,
  StoreConfig,
  getStoredConfig,
} from "@/lib/vehicles";
import {
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Lock,
  ChevronRight,
  CarFront,
  MessageCircle,
} from "lucide-react";

export function Footer() {
  const [config, setConfig] = useState<StoreConfig>(DEFAULT_STORE_CONFIG);

  useEffect(() => {
    const sync = () => setConfig(getStoredConfig());
    sync();
    window.addEventListener("serra-storage-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("serra-storage-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const cleanPhone = config.whatsappNumero.replace(/\D/g, "") || "5511998765432";
  const whatsappDirect = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Olá, equipe da ${config.nomeLoja}! Vim pelo site e gostaria de atendimento sobre o estoque de seminovos em Jundiaí.`
  )}`;

  return (
    <footer className="w-full bg-slate-900 text-slate-400 mt-20 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Store Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <CarFront size={20} />
              </div>
              <div>
                <div className="font-extrabold text-xl text-white tracking-tight">
                  {config.nomeLoja}
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {config.subtituloLoja} · Jundiaí / SP
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Showroom especializado em veículos seminovos selecionados, com procedência garantida, laudo cautelar aprovado e transparência total na negociação.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-lg">
              <ShieldCheck size={15} />
              <span>Laudo Cautelar 100% Aprovado</span>
            </div>
          </div>

          {/* Col 2: Address & Hours */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Localização & Expediente
            </h4>
            <ul className="space-y-3 text-sm list-none p-0 m-0">
              <li className="flex items-start gap-2.5">
                <MapPin size={17} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">{config.endereco}</strong>
                  <div className="text-xs text-slate-400 mt-0.5">{config.bairroCidade}</div>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={17} className="text-emerald-500 shrink-0" />
                <span className="text-slate-300">
                  {config.horarioSemana} · {config.horarioSabado}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={17} className="text-emerald-500 shrink-0" />
                <span className="text-slate-300">
                  WhatsApp: (11) 99876-5432
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & CTA */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                Links Rápidos
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Link
                  href="/"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Página Inicial
                </Link>
                <Link
                  href="/estoque"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Estoque Completo
                </Link>
                <Link
                  href="/estoque?status=disponivel"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Disponíveis no Pátio
                </Link>
                <Link
                  href="/admin"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <Lock size={12} />
                  <span>Área do Lojista</span>
                </Link>
              </div>
            </div>

            <div className="mt-6">
              <a
                href={whatsappDirect}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-colors shadow-xs"
              >
                <MessageCircle size={17} />
                <span>Falar no WhatsApp da Loja</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 {config.nomeLoja} — {config.subtituloLoja} · Av. Nove de Julho, Jundiaí/SP.
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Acessar Painel</span>
              <ChevronRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
