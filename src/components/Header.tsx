/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, Bell, AlertOctagon, User } from 'lucide-react';
import { Usuario } from '../types';
import { useState } from 'react';

interface HeaderProps {
  usuario: Usuario;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  incidenciasCount: number;
}

export default function Header({ usuario, searchTerm, onSearchChange, incidenciasCount }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 border-b border-[#e0e3e5] bg-white px-8 flex items-center justify-between z-40 relative">
      {/* Search Input */}
      <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full w-96 border border-[#e0e3e5] focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-150">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-transparent border-none-none focus:outline-none text-sm w-full p-0 text-slate-800 placeholder:text-slate-400"
          placeholder="Buscar lotes, alérgenos o registros..."
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="text-xs text-slate-400 hover:text-slate-600 px-1 font-bold"
          >
            ×
          </button>
        )}
      </div>

      {/* Action Buttons & User Profile */}
      <div className="flex items-center gap-4">
        {/* Urgent Actions Button */}
        {incidenciasCount > 0 && (
          <button
            onClick={() => alert(`Hay ${incidenciasCount} incidencias que requieren atención inminente en Obrador Artesano Demo.`)}
            className="p-2 rounded-full hover:bg-red-50 text-red-600 transition-colors relative flex items-center justify-center animate-pulse"
            title="Incidencias críticas abiertas"
          >
            <AlertOctagon size={20} />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
              {incidenciasCount}
            </span>
          </button>
        )}

        {/* Notificaciones */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors relative"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 text-slate-700">
              <div className="border-b border-slate-100 px-4 py-2 flex items-center justify-between">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-400">Notificaciones</span>
                <span className="text-[10px] text-primary font-bold bg-blue-50 px-1.5 py-0.5 rounded">3 Hoy</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                <div className="p-3 text-xs hover:bg-slate-50 flex flex-col gap-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-red-600">Alerta Alérgeno Crítico</span>
                    <span className="text-[10px] text-slate-400">Hace 10m</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">Altramuz no etiquetado detectado en Harina Premium.</p>
                </div>
                <div className="p-3 text-xs hover:bg-slate-50 flex flex-col gap-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-amber-600">Temperatura fuera de rango</span>
                    <span className="text-[10px] text-slate-400">Hace 1h</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">Congelador V-04 registró -12.5°C (Requerido &lt; -18°C).</p>
                </div>
                <div className="p-3 text-xs hover:bg-slate-50 flex flex-col gap-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-green-600">Control Completado</span>
                    <span className="text-[10px] text-slate-400">Hace 2h</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">Limpieza en Amasadora Industrial validada por Marta Soler.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>

        {/* Active User Slot */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-tight">{usuario.nombre}</p>
            <p className="text-[10px] font-medium text-slate-400 tracking-wide uppercase">{usuario.rol}</p>
          </div>
          {usuario.avatar ? (
            <img
              src={usuario.avatar}
              alt={usuario.nombre}
              className="w-10 h-10 rounded-full border border-slate-200 object-cover"
              onError={(e) => {
                // fallback
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 text-primary flex items-center justify-center font-bold text-sm border border-blue-200">
              <User size={16} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
