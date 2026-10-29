"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  StoreConfig,
  Vehicle,
  buildWhatsAppUrl,
  formatBRL,
  formatKM,
} from "@/lib/vehicles";
import {
  MessageCircle,
  Eye,
  Gauge,
  Settings2,
  Fuel,
  Palette,
  CheckCircle2,
  Clock3,
  Archive,
  ChevronRight,
} from "lucide-react";

interface VehicleCardProps {
  vehicle: Vehicle;
  config: StoreConfig;
}

export function VehicleCard({ vehicle, config }: VehicleCardProps) {
  const [originBase, setOriginBase] = useState<string>("");

  useEffect(() => {
    setOriginBase(window.location.origin);
  }, []);

  const whatsappUrl = buildWhatsAppUrl(vehicle, config, originBase);

  const statusConfig = {
    disponivel: {
      label: "Disponível",
      badgeClass: "bg-emerald-600 text-white",
      Icon: CheckCircle2,
    },
    reservado: {
      label: "Reservado",
      badgeClass: "bg-amber-600 text-white",
      Icon: Clock3,
    },
    vendido: {
      label: "Vendido",
      badgeClass: "bg-slate-600 text-white",
      Icon: Archive,
    },
  }[vehicle.status];

  const StatusIcon = statusConfig.Icon;

  return (
    <article className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Photo Container */}
        <Link
          href={`/veiculos/${vehicle.slug}`}
          className="block relative aspect-16/10 w-full overflow-hidden bg-slate-100"
        >
          <img
            src={vehicle.fotos[0] || "/assets/plates/card1-photo.png"}
            alt={`${vehicle.marca} ${vehicle.modelo} ${vehicle.versao}`}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              vehicle.status === "vendido" ? "grayscale-30 opacity-90" : ""
            }`}
          />

          {/* Status Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-xs ${statusConfig.badgeClass}`}
            >
              <StatusIcon size={13} />
              <span>{statusConfig.label}</span>
            </span>
          </div>

          {/* Year Badge */}
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-slate-900/80 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-lg">
              {vehicle.anoFabricacao}/{vehicle.anoModelo}
            </span>
          </div>

          {/* Hover hint */}
          <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white/95 text-slate-900 text-xs font-bold px-3.5 py-2 rounded-xl shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Eye size={14} />
              <span>Ver Fotos & Detalhes</span>
            </span>
          </div>
        </Link>

        {/* Card Content */}
        <div className="p-5">
          <Link
            href={`/veiculos/${vehicle.slug}`}
            className="no-underline block group/link"
          >
            <h3 className="font-bold text-lg text-slate-900 group-hover/link:text-emerald-700 transition-colors line-clamp-1">
              {vehicle.marca} {vehicle.modelo}
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-1 line-clamp-1">
              {vehicle.versao}
            </p>
          </Link>

          {/* Specs Chips */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
              <Gauge size={14} className="text-emerald-600 shrink-0" />
              <span className="truncate">{formatKM(vehicle.quilometragem)}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
              <Settings2 size={14} className="text-emerald-600 shrink-0" />
              <span className="truncate">{vehicle.cambio}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
              <Fuel size={14} className="text-slate-400 shrink-0" />
              <span className="truncate">{vehicle.combustivel}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
              <Palette size={14} className="text-slate-400 shrink-0" />
              <span className="truncate">{vehicle.cor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Price & Action */}
      <div className="px-5 pb-5 pt-1">
        <div className="mb-3.5">
          <div className="text-xs font-medium text-slate-500">Valor à vista / troca</div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {formatBRL(vehicle.preco)}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-3 px-4 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs ${
              vehicle.status === "vendido"
                ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            <MessageCircle size={17} />
            <span>
              {vehicle.status === "vendido"
                ? "Procuro Semelhante"
                : "Tenho Interesse"}
            </span>
          </a>

          <Link
            href={`/veiculos/${vehicle.slug}`}
            className="w-full py-2 text-center text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-1"
          >
            <span>Ver ficha completa</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
