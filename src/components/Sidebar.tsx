/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  LayoutDashboard,
  Package,
  BookOpen,
  Wheat,
  Layers,
  CalendarClock,
  Truck,
  ShieldAlert,
  Thermometer,
  Sparkles,
  AlertCircle,
  FileText,
  FilePieChart,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  ShieldAlert as RoleIcon
} from 'lucide-react';
import { Usuario } from '../types';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  usuarioActivo: Usuario;
  onUsuarioChange: (user: Usuario) => void;
  usuariosList: Usuario[];
  incidenciasActivasCount: number;
}

export default function Sidebar({
  currentView,
  onViewChange,
  usuarioActivo,
  onUsuarioChange,
  usuariosList,
  incidenciasActivasCount
}: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'productos', label: 'Productos', icon: Package },
    { id: 'recetas', label: 'Recetas', icon: BookOpen },
    { id: 'ingredientes', label: 'Ingredientes', icon: Wheat },
    { id: 'lotes', label: 'Lotes', icon: Layers },
    { id: 'caducidades', label: 'Caducidades', icon: CalendarClock },
    { id: 'proveedores', label: 'Proveedores', icon: Truck },
    { id: 'alergenos', label: 'Alérgenos', icon: ShieldAlert },
    { id: 'temperaturas', label: 'Temperaturas', icon: Thermometer },
    { id: 'limpieza', label: 'Limpieza', icon: Sparkles },
    { id: 'incidencias', label: 'Incidencias', icon: AlertCircle, badge: incidenciasActivasCount > 0 ? incidenciasActivasCount : undefined },
    { id: 'documentos', label: 'Documentos', icon: FileText },
    { id: 'informes', label: 'Informes', icon: FilePieChart },
    { id: 'equipo', label: 'Equipo', icon: Users },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
  ];

  return (
    <aside className="w-[280px] h-screen fixed left-0 top-0 overflow-y-auto bg-white border-r border-[#e0e3e5] flex flex-col py-6 z-50">
      {/* Brand Logo */}
      <div className="px-6 mb-6">
        <h1 className="font-sans text-2xl font-bold text-primary tracking-tight">Trazalimento</h1>
        <p className="text-xs text-slate-500 font-medium tracking-wide">Traceability & Quality SaaS</p>
      </div>

      {/* Role Selector Mock for high-fidelity interactive simulation */}
      <div className="px-4 mb-4">
        <div className="p-3 bg-slate-50 rounded-xl border border-[#e0e3e5] flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <RoleIcon size={12} className="text-primary" />
            <span>Rol de Simulación</span>
          </div>
          <select
            value={usuarioActivo.id}
            onChange={(e) => {
              const selectedId = e.target.value;
              const found = usuariosList.find(u => u.id === selectedId);
              if (found) onUsuarioChange(found);
            }}
            className="w-full text-xs bg-white border border-[#e2e8f0] rounded-lg p-1.5 font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {usuariosList.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre} ({u.rol})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-0.5 px-3">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 relative ${
                isActive
                  ? 'bg-blue-50 text-primary border-r-4 border-primary font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <IconComponent size={18} className={isActive ? 'text-primary' : 'text-slate-400'} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="bg-red-500 text-white font-mono text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto pt-4 border-t border-slate-100 px-3 space-y-0.5">
        <button
          onClick={() => alert('Asistencia y manuales del sistema APPCC exportados en la sección Documentos.')}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <HelpCircle size={18} className="text-slate-400" />
          <span>Ayuda</span>
        </button>
        <button
          onClick={() => alert('Sesión de demostración de Obrador Artesano Demo.')}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-700 transition-colors"
        >
          <LogOut size={18} className="text-slate-400 hover:text-red-500" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
