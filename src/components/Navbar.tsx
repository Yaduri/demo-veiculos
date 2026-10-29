"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DEFAULT_STORE_CONFIG,
  StoreConfig,
  getStoredConfig,
  getStoredVehicles,
} from "@/lib/vehicles";
import {
  ShieldCheck,
  MapPin,
  Lock,
  Phone,
  Clock,
  Car,
  Home,
  Grid,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [config, setConfig] = useState<StoreConfig>(DEFAULT_STORE_CONFIG);
  const [totalStock, setTotalStock] = useState<number>(12);

  useEffect(() => {
    const sync = () => {
      setConfig(getStoredConfig());
      setTotalStock(getStoredVehicles().length);
    };
    sync();
    window.addEventListener("serra-storage-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("serra-storage-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const navItems = [
    { href: "/", label: "Início", icon: Home },
    {
      href: "/estoque",
      label: `Estoque Completo (${totalStock})`,
      icon: Grid,
    },
    { href: "/#diferenciais", label: "Procedência Garantida", icon: ShieldCheck },
    { href: "/#localizacao", label: "Onde Estamos", icon: MapPin },
  ];

  const cleanPhone = config.whatsappNumero.replace(/\D/g, "") || "5511998765432";
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Olá, equipe da ${config.nomeLoja}! Gostaria de informações sobre o estoque de seminovos em Jundiaí.`
  )}`;

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin size={13} className="text-emerald-400" />
              <span>Av. Nove de Julho, Jundiaí - SP</span>
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Clock size={13} />
              <span>{config.horarioSemana}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <Phone size={13} />
              <span>WhatsApp: (11) 99876-5432</span>
            </a>
            <span className="text-slate-700">|</span>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <Lock size={12} />
              <span>Área do Lojista</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-3.5">
        <div className="flex items-center justify-between gap-6">
          {/* Logo / Brand */}
          <Link href="/" className="no-underline flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-sm group-hover:bg-emerald-600 transition-colors">
              <Car size={22} />
            </div>
            <div>
              <div className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                {config.nomeLoja}
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">
                {config.subtituloLoja} · Jundiaí / SP
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <Phone size={15} />
              <span className="hidden sm:inline">Chamar no WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 border-t border-slate-100 mt-3 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200"
                }`}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
