/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Layers,
  CalendarClock,
  CheckCircle,
  AlertCircle,
  Thermometer,
  PlusSquare,
  ThermometerSnowflake,
  Sparkles,
  ShieldAlert,
  Download,
  ArrowRight,
  TrendingUp,
  History,
  Info
} from 'lucide-react';
import { Lote, Ingrediente, RegistroTemperatura, PlanLimpieza, Incidencia, LogActividad } from '../types';

interface DashboardViewProps {
  lotes: Lote[];
  ingredientes: Ingrediente[];
  temperaturas: RegistroTemperatura[];
  limpiezas: PlanLimpieza[];
  incidencias: Incidencia[];
  actividades: LogActividad[];
  onNavigate: (view: string) => void;
  onQuickAction: (actionType: 'lote' | 'temperatura' | 'limpieza' | 'incidencia') => void;
}

export default function DashboardView({
  lotes,
  ingredientes,
  temperaturas,
  limpiezas,
  incidencias,
  actividades,
  onNavigate,
  onQuickAction
}: DashboardViewProps) {
  // Compute metrics dynamically from state for high fidelity
  const lotesActivos = lotes.filter(l => l.estado === 'Activo').length;
  const caducidadesCount = ingredientes.filter(i => {
    const diff = Math.ceil((new Date(i.fechaCaducidad).getTime() - new Date('2026-06-03').getTime()) / (1000 * 60 * 60 * 24));
    return diff <= 7 && diff >= 0;
  }).length;
  const limpiezasCompletadasCount = limpiezas.filter(l => l.estado === 'Completada').length;
  const limpiezasTotal = limpiezas.length;
  const incidenciasAbiertas = incidencias.filter(i => i.estado === 'Abierta' || i.estado === 'En revisión').length;
  const alarmasTemp = temperaturas.filter(t => t.estado === 'Fuera de rango').length;

  // Food specific warnings from mock
  const altramuzWarning = incidencias.find(i => i.id === 'INC-772');

  return (
    <div className="space-y-6">
      {/* Dashboard Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-sans text-3xl font-bold text-slate-900 tracking-tight">Dashboard General</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Resumen de trazabilidad y seguridad alimentaria del <span className="font-semibold text-slate-700">03 de Junio de 2026</span>
          </p>
        </div>
        <button
          onClick={() => {
            alert('Generando archivo XLS consolidado de autocontrol sanitario para inspección de alimentos...');
          }}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold text-sm transition-all shadow-sm shadow-blue-100"
        >
          <Download size={16} />
          <span>Exportar Reporte APPCC</span>
        </button>
      </div>

      {/* KPI Row (Stitch Visual Harmony) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* KPI 1 */}
        <div
          onClick={() => onNavigate('lotes')}
          className="bg-white p-5 rounded-2xl border border-[#e0e3e5] hover-scale cursor-pointer flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <span className="p-2.5 bg-blue-50 text-primary rounded-xl">
              <Layers size={20} />
            </span>
            <span className="text-[11px] font-bold text-green-600 flex items-center gap-0.5">
              <TrendingUp size={12} />
              +12%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-bold text-slate-900 font-mono tracking-tight">{lotesActivos}</p>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wide">Lotes activos</p>
          </div>
        </div>

        {/* KPI 2 (Warning Stripe) */}
        <div
          onClick={() => onNavigate('caducidades')}
          className="bg-white p-5 rounded-2xl border border-[#e0e3e5] border-l-4 border-l-amber-500 hover-scale cursor-pointer flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <span className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <CalendarClock size={20} />
            </span>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Urgente
            </span>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-bold text-slate-900 font-mono tracking-tight">{caducidadesCount}</p>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wide">Caducidades próximas</p>
          </div>
        </div>

        {/* KPI 3 */}
        <div
          onClick={() => onNavigate('limpieza')}
          className="bg-white p-5 rounded-2xl border border-[#e0e3e5] hover-scale cursor-pointer flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <span className="p-2.5 bg-slate-100 text-slate-700 rounded-xl">
              <CheckCircle size={20} />
            </span>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              {Math.round((limpiezasCompletadasCount / (limpiezasTotal || 1)) * 100)}% completado
            </span>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-bold text-slate-900 font-mono tracking-tight">
              {limpiezasCompletadasCount} <span className="text-lg text-slate-400 font-normal">/ {limpiezasTotal}</span>
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wide">Controles hoy</p>
          </div>
        </div>

        {/* KPI 4 (Critical Alert Stripe) */}
        <div
          onClick={() => onNavigate('incidencias')}
          className="bg-white p-5 rounded-2xl border border-[#e0e3e5] border-l-4 border-l-red-500 hover-scale cursor-pointer flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <span className="p-2.5 bg-red-50 text-red-600 rounded-xl">
              <AlertCircle size={20} />
            </span>
            <span className="text-[10px] font-bold bg-red-100 text-red-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Sin resolver
            </span>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-bold text-slate-900 font-mono tracking-tight">{incidenciasAbiertas}</p>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wide">Incidencias abiertas</p>
          </div>
        </div>

        {/* KPI 5 */}
        <div
          onClick={() => onNavigate('temperaturas')}
          className="bg-white p-5 rounded-2xl border border-[#e0e3e5] border-l-4 border-l-emerald-500 hover-scale cursor-pointer flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <span className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <Thermometer size={20} />
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
              alarmasTemp > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              {alarmasTemp > 0 ? `${alarmasTemp} Alertas` : 'Normal'}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-bold text-slate-900 font-mono tracking-tight">{alarmasTemp}</p>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wide">Alarmas Temp</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left and Right Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8-span: Actions, Recent Operations and Temperature */}
        <div className="lg:col-span-8 space-y-6 animate-fade-in">
          {/* Bento Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button
              onClick={() => onQuickAction('lote')}
              className="flex flex-col items-center justify-center p-6 bg-primary hover:bg-primary-hover text-white rounded-2xl shadow-sm hover:shadow-md transition-all h-36 border border-transparent group active:scale-95 text-center"
            >
              <PlusSquare size={32} className="mb-2 group-hover:scale-105 transition-transform" />
              <span className="text-sm font-semibold">Crear Lote</span>
              <span className="text-[10px] text-blue-100 mt-1 hidden sm:block">Ficha Técnica + Trazado</span>
            </button>

            <button
              onClick={() => onQuickAction('temperatura')}
              className="flex flex-col items-center justify-center p-6 bg-white hover:bg-blue-50/50 text-slate-800 hover:text-primary rounded-2xl shadow-sm hover:shadow-md transition-all h-36 border border-[#e0e3e5] group active:scale-95 text-center"
            >
              <ThermometerSnowflake size={32} className="mb-2 text-primary group-hover:scale-105 transition-transform" />
              <span className="text-sm font-semibold">Log Temperatura</span>
              <span className="text-[10px] text-slate-400 mt-1 hidden sm:block">Control de Sensores</span>
            </button>

            <button
              onClick={() => onQuickAction('limpieza')}
              className="flex flex-col items-center justify-center p-6 bg-white hover:bg-blue-50/50 text-slate-800 hover:text-primary rounded-2xl shadow-sm hover:shadow-md transition-all h-36 border border-[#e0e3e5] group active:scale-95 text-center"
            >
              <Sparkles size={32} className="mb-2 text-primary group-hover:scale-105 transition-transform" />
              <span className="text-sm font-semibold">Log Limpieza</span>
              <span className="text-[10px] text-slate-400 mt-1 hidden sm:block">Sanitizado de Equipos</span>
            </button>

            <button
              onClick={() => onQuickAction('incidencia')}
              className="flex flex-col items-center justify-center p-6 bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-sm hover:shadow-md transition-all h-36 border border-transparent group active:scale-95 text-center"
            >
              <AlertCircle size={32} className="mb-2 group-hover:scale-105 transition-transform" />
              <span className="text-sm font-semibold">Añadir Incidencia</span>
              <span className="text-[10px] text-red-100 mt-1 hidden sm:block">Alerta Alimentaria</span>
            </button>
          </div>

          {/* Actividad Reciente */}
          <div className="bg-white border border-[#e0e3e5] rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-outline-border flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <History size={18} className="text-slate-500" />
                <span>Actividad Reciente del Obrador</span>
              </h3>
              <button
                onClick={() => onNavigate('lotes')}
                className="text-primary font-semibold text-xs hover:underline flex items-center gap-1"
              >
                <span>Ver todo el historial</span>
                <ArrowRight size={14} />
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {actividades.map((log) => (
                <div key={log.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    log.tipo === 'lote' ? 'bg-blue-100 text-primary' :
                    log.tipo === 'limpieza' ? 'bg-purple-100 text-purple-700' :
                    log.tipo === 'temperatura' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'
                  }`}>
                    {log.tipo === 'lote' ? <Layers size={18} /> :
                     log.tipo === 'limpieza' ? <Sparkles size={18} /> :
                     log.tipo === 'temperatura' ? <Thermometer size={18} /> : <AlertCircle size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm truncate">{log.descripcion}</p>
                    <p className="text-xs text-slate-500 font-medium truncate">{log.detalles}</p>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium whitespace-nowrap">{log.fechaHora}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Control de Temperaturas en Tiempo Real */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-800 px-1 flex items-center gap-2">
              <Thermometer size={18} className="text-slate-500" />
              <span>Sensores de Temperatura en Tiempo Real</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-[#e0e3e5] p-5 rounded-2xl shadow-sm flex items-center justify-between hover-scale">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cámara Frío 01</p>
                  <p className="text-2xl font-bold text-slate-900 font-mono mt-0.5">3.4°C</p>
                </div>
                <div className="h-4 w-4 rounded-full bg-green-500 border border-white outline outline-4 outline-green-50 animate-pulse"></div>
              </div>
              <div className="bg-white border border-[#e0e3e5] p-5 rounded-2xl shadow-sm flex items-center justify-between hover-scale">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Congelador V-04</p>
                  <p className="text-2xl font-bold text-red-600 font-mono mt-0.5">-14.8°C</p>
                </div>
                <div className="h-4 w-4 rounded-full bg-red-600 border border-white outline outline-4 outline-red-50 animate-pulse"></div>
              </div>
              <div className="bg-white border border-[#e0e3e5] p-5 rounded-2xl shadow-sm flex items-center justify-between hover-scale">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Vitrina Tienda</p>
                  <p className="text-2xl font-bold text-slate-950 font-mono mt-0.5">5.1°C</p>
                </div>
                <div className="h-4 w-4 rounded-full bg-green-500 border border-white outline outline-4 outline-green-50 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4-span: Safety warnings, Inspections state */}
        <div className="lg:col-span-4 space-y-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
          {/* Critical Warnings Container */}
          <div className="bg-white border-2 border-red-500/20 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 bg-red-50 flex items-center gap-2.5 border-b border-red-100">
              <ShieldAlert className="text-red-600" size={20} />
              <h3 className="font-bold text-sm text-red-950 uppercase tracking-wide">Alertas Sanitarias Críticas</h3>
            </div>
            <div className="p-5 space-y-4">
              {/* Allergen alert */}
              {altramuzWarning && (
                <div className="p-4 bg-red-50/50 rounded-xl border border-red-100 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-red-900 leading-tight">Alérgeno No Declarado</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-red-600 text-white rounded-full uppercase">Crítico</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {altramuzWarning.descripcion}
                  </p>
                  <button
                    onClick={() => {
                      alert('Requisando lote de proveedor ING-772-B preventivamente de la producción del obrador e iniciando cuarentena.');
                    }}
                    className="text-[11px] font-bold text-red-700 flex items-center gap-0.5 hover:underline mt-1 bg-white hover:bg-slate-100 border border-red-100 rounded-lg p-2.5 justify-center w-full shadow-sm transition-all"
                  >
                    <span>BLOQUEAR LOTE PROVEEDOR</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              )}

              {/* Expiring materials warning */}
              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-xs text-amber-900 leading-tight">Caducidades Inminentes Materia</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-600 text-white rounded-full uppercase">Próximo</span>
                </div>
                <ul className="text-xs text-slate-700 space-y-2 mt-2 divide-y divide-amber-100/50">
                  <li className="flex justify-between items-center pt-2 first:pt-0">
                    <span className="font-medium text-slate-800">Queso Mozzarella 10kg</span>
                    <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Mañana</span>
                  </li>
                  <li className="flex justify-between items-center pt-2">
                    <span className="font-medium text-slate-800">Salmón Ahumado 2kg</span>
                    <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">En 2 días</span>
                  </li>
                </ul>
                <button
                  onClick={() => onNavigate('caducidades')}
                  className="w-full text-center text-xs font-semibold text-amber-800 hover:text-amber-950 mt-3 pt-3 border-t border-amber-200/50 block"
                >
                  Gestionar Caducidades
                </button>
              </div>
            </div>
          </div>

          {/* Plant Floor Monitoring Photo overlaying indicators */}
          <div className="bg-white border border-[#e0e3e5] rounded-2xl overflow-hidden shadow-sm hover-scale group">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                alt="Planta de control de alimentos"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnIyODbXi-R4Qd7iYi133P-xTSfsNU9woA3Y0CGxj_mPcZxlFigmhCbDTqqvAszMZUeMkbce3WMgMkZtdcSo47uFNrrfZsgl1gIeSsAiU02nFT8BELPa7ePHT26Mjr-s50PBkdQsV4RbIJyaB5PBBBs7HCGThlpQluYBcNLgOvyKWE9z1dNbrmSEyMU26G_w0uVoURKqRqLO_9efKaBV-lDnqaaqem9bcIfBPoFMGv7QR7aiQwEmYfFiVjWhQ2DrTNHLbE-xzRVmzS"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-5">
                <div className="text-white">
                  <p className="font-bold text-sm tracking-tight">Obrador Artesano Demo</p>
                  <p className="text-[10px] opacity-80 mt-0.5 flex items-center gap-1">
                    <Info size={10} />
                    <span>Última inspección: Hoy 08:30 AM</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <h4 className="font-bold text-slate-800 text-sm tracking-wide">Métricas de Higiene y APPCC</h4>
              
              <div className="space-y-3">
                {/* Metric 1 */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                    <span>Plan de Limpieza Diaria realizado</span>
                    <span className="font-bold text-slate-900">85%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                {/* Metric 2 */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                    <span>Verificación de control de Plagas</span>
                    <span className="font-bold text-primary flex items-center gap-1">100% OK</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
