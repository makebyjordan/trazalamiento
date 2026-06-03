/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent } from 'react';
import { Plus, CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';
import { RegistroTemperatura, ZonaTemperatura } from '../types';
import { ZONAS_TEMPERATURA_MOCK } from '../mockData';

interface TemperaturasViewProps {
  registros: RegistroTemperatura[];
  onAddRegistro: (nuevo: Omit<RegistroTemperatura, 'id'>) => void;
  searchTerm: string;
}

export default function TemperaturasView({
  registros,
  onAddRegistro,
  searchTerm
}: TemperaturasViewProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [zonaId, setZonaId] = useState<string>(ZONAS_TEMPERATURA_MOCK[0]?.id || '');
  const [temperatureVal, setTemperatureVal] = useState<number>(4.0);
  const [operador, setOperador] = useState<string>('Carlos Ruíz');
  const [observ, setObserv] = useState<string>('');

  const handleUpdateZoneId = (zId: string) => {
    setZonaId(zId);
    const z = ZONAS_TEMPERATURA_MOCK.find(item => item.id === zId);
    if (z) {
      if (z.categoria === 'Congelador') {
        setTemperatureVal(-18.0);
      } else if (z.categoria === 'Obrador') {
        setTemperatureVal(18.0);
      } else {
        setTemperatureVal(4.0);
      }
    }
  };

  const calculateStatus = (z: ZonaTemperatura, t: number): 'Correcto' | 'Advertencia' | 'Fuera de rango' => {
    if (t < z.temperaturaMinC || t > z.temperaturaMaxC) {
      const diffMin = z.temperaturaMinC - t;
      const diffMax = t - z.temperaturaMaxC;

      if (diffMin > 1.5 || diffMax > 1.5) {
        return 'Fuera de rango';
      }
      return 'Advertencia';
    }
    return 'Correcto';
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const matchedZone = ZONAS_TEMPERATURA_MOCK.find(z => z.id === zonaId);
    if (!matchedZone) return;

    const tState = calculateStatus(matchedZone, Number(temperatureVal));

    onAddRegistro({
      zonaId,
      zonaNombre: matchedZone.nombre,
      temperaturaC: Number(temperatureVal),
      hora: new Date().toISOString().slice(0, 16).replace('T', ' '),
      responsableNombre: operador,
      estado: tState,
      observaciones: observ || 'Lectura manual reglamentaria'
    });

    setObserv('');
    setShowAdd(false);
  };

  const filtered = registros.filter(r =>
    r.zonaNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.responsableNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.estado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">Control de Temperaturas APPCC</h2>
          <p className="text-slate-500 text-xs">Monitoreo continuo y registros legales de cadena de frío en planta.</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-primary hover:bg-primary-hover text-white rounded-xl py-2.5 px-4 font-bold text-xs flex items-center gap-1.5 transition-all outline-none"
        >
          <Plus size={14} />
          <span>Registrar Temperatura Manual</span>
        </button>
      </div>

      {/* Sensor Zone Cards (Top Row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {ZONAS_TEMPERATURA_MOCK.map(z => {
          // get latest log for this zone
          const zoneRegs = registros.filter(r => r.zonaId === z.id);
          const latest = zoneRegs[0];
          const currentT = latest ? latest.temperaturaC : z.temperaturaMaxC - 1;
          const status = latest ? latest.estado : 'Correcto';

          return (
            <div key={z.id} className="bg-white border border-[#e0e3e5] rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden flex flex-col justify-between hover-scale">
              <div>
                <span className="text-[9px] bg-slate-100 text-slate-500 font-bold uppercase rounded px-1.5 py-0.5">{z.categoria}</span>
                <h4 className="font-bold text-slate-900 text-xs mt-1.5 truncate">{z.nombre}</h4>
                <p className="text-[10px] text-slate-400 font-medium font-sans">Req: {z.temperaturaMinC}°C a {z.temperaturaMaxC}°C</p>
              </div>

              <div className="flex justify-between items-end mt-4">
                <span className={`text-2xl font-mono font-extrabold ${
                  status === 'Fuera de rango' ? 'text-red-600' : status === 'Advertencia' ? 'text-amber-600' : 'text-slate-900'
                }`}>
                  {currentT.toFixed(1)}°C
                </span>
                {status === 'Correcto' && (
                  <CheckCircle size={18} className="text-green-500" />
                )}
                {status === 'Advertencia' && (
                  <AlertTriangle size={18} className="text-amber-500" />
                )}
                {status === 'Fuera de rango' && (
                  <AlertOctagon size={18} className="text-red-600 animate-pulse" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showAdd && (
        <form onSubmit={handleSubmit} className="bg-white border border-[#e0e3e5] p-6 rounded-2xl max-w-lg mx-auto space-y-4 shadow-xl animate-scale-up">
          <h3 className="font-bold text-slate-900 text-sm">Registrar Temperatura de Control (HACCP)</h3>

          <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
            <div className="space-y-1">
              <label className="text-slate-600 block">Zonificación / Sensor</label>
              <select
                value={zonaId}
                onChange={e => handleUpdateZoneId(e.target.value)}
                className="w-full border p-2.5 bg-white text-xs rounded-lg focus:outline-none"
              >
                {ZONAS_TEMPERATURA_MOCK.map(z => (
                  <option key={z.id} value={z.id}>{z.nombre} (Req: {z.temperaturaMinC}C a {z.temperaturaMaxC}C)</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-slate-600 block">Temperatura registrada (°C)</label>
              <input
                type="number"
                step="0.1"
                required
                value={temperatureVal}
                onChange={e => setTemperatureVal(Number(e.target.value))}
                className="w-full border p-2.5 focus:outline-none rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
            <div className="space-y-1">
              <label className="text-slate-600 block">Operador Responsable</label>
              <input
                type="text"
                required
                value={operador}
                onChange={e => setOperador(e.target.value)}
                className="w-full border p-2.5 focus:outline-none rounded-lg text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-600 block">Observaciones adicionales</label>
              <input
                type="text"
                value={observ}
                onChange={e => setObserv(e.target.value)}
                className="w-full border p-2.5 focus:outline-none rounded-lg text-xs"
                placeholder="ej. Se comprueba junta de silicona"
              />
            </div>
          </div>

          {/* Guidelines on calculated status */}
          <div className="p-3 bg-blue-50 border border-blue-100 text-blue-900 rounded-xl leading-relaxed text-xs">
            <p className="font-bold uppercase tracking-wide">Validación estructural del autocontrol:</p>
            <p className="font-medium mt-1">El sistema verificará las cotas mínimas/máximas pre-configuradas legalmente. Valores excedidos levantarán alarmas de no conformidad.</p>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t text-xs">
            <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 bg-white border font-bold rounded-lg">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white font-bold rounded-lg cursor-pointer">Guardar Lectura</button>
          </div>
        </form>
      )}

      {/* Historical table list */}
      <div className="bg-white border border-[#e0e3e5] rounded-xl overflow-hidden shadow-sm animate-fade-in">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-[#e0e3e5] text-xs">
              <th className="px-6 py-4 font-bold text-slate-600">Zona de Control Termométrico</th>
              <th className="px-6 py-4 font-bold text-slate-600 text-right">Temperatura Grabada</th>
              <th className="px-6 py-4 font-bold text-slate-600">Fecha y Hora</th>
              <th className="px-6 py-4 font-bold text-slate-600">Operador</th>
              <th className="px-6 py-4 font-bold text-slate-600">Resultado / Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium">
            {filtered.map(r => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-slate-900 font-bold">{r.zonaNombre}</td>
                <td className={`px-6 py-4 text-right font-mono font-bold text-sm ${
                  r.estado === 'Fuera de rango' ? 'text-red-700 font-extrabold' : r.estado === 'Advertencia' ? 'text-amber-700' : 'text-slate-800'
                }`}>
                  {r.temperaturaC.toFixed(1)}°C
                </td>
                <td className="px-6 py-4 text-slate-400 font-mono">{r.hora}</td>
                <td className="px-6 py-4 text-slate-600 font-bold">{r.responsableNombre}</td>
                <td className="px-6 py-4">
                  {r.estado === 'Correcto' && (
                    <span className="text-[9px] bg-green-100 text-green-800 px-2 py-0.5 rounded uppercase font-bold">✓ Conforme</span>
                  )}
                  {r.estado === 'Advertencia' && (
                    <span className="text-[9px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded uppercase font-bold">⚠️ Advertencia</span>
                  )}
                  {r.estado === 'Fuera de rango' && (
                    <span className="text-[9px] bg-red-100 text-red-800 px-2 py-0.5 rounded uppercase font-bold">❌ Fuera Rango</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
