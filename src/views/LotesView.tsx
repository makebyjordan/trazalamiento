/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent } from 'react';
import { Layers, Plus, Clipboard, User, ArrowRight, CheckSquare, Download } from 'lucide-react';
import { Lote, Producto, Receta, Ingrediente, LoteIngredienteUtilizado } from '../types';

interface LotesViewProps {
  lotes: Lote[];
  productos: Producto[];
  recetas: Receta[];
  ingredientes: Ingrediente[];
  onAddLote: (nuevo: Lote) => void;
  searchTerm: string;
}

export default function LotesView({
  lotes,
  productos,
  recetas,
  ingredientes,
  onAddLote,
  searchTerm
}: LotesViewProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLoteId, setSelectedLoteId] = useState<string | null>(lotes[0]?.codigo || null);

  // Form state
  const [step, setStep] = useState(1);
  const [productoId, setProductoId] = useState('');
  const [recetaId, setRecetaId] = useState('');
  const [cantidadElaborada, setCantidadElaborada] = useState(10);
  const [responsable, setResponsable] = useState('Carlos Ruíz');
  const [selectedIngredients, setSelectedIngredients] = useState<LoteIngredienteUtilizado[]>([]);

  const handleSelectProduct = (pId: string) => {
    setProductoId(pId);
    const prod = productos.find(p => p.id === pId);
    if (prod && prod.recetaAsociadaId) {
      setRecetaId(prod.recetaAsociadaId);
      // Auto-populate required ingredients with first available lots
      const matchedReceta = recetas.find(r => r.id === prod.recetaAsociadaId);
      if (matchedReceta) {
        const prep = matchedReceta.ingredientes.map(ri => {
          // find raw material with that ingredient name
          const materials = ingredientes.filter(i =>
            i.nombre.toLowerCase().includes(ri.nombre.toLowerCase()) ||
            ri.nombre.toLowerCase().includes(i.nombre.toLowerCase())
          );
          const chosenMat = materials[0];

          return {
            ingredienteId: chosenMat ? chosenMat.id : 'ING-999',
            nombre: ri.nombre,
            loteProveedor: chosenMat ? chosenMat.loteProveedor : 'LT-DEFAULT',
            proveedorNombre: chosenMat ? chosenMat.proveedorNombre : 'Proveedor Externo',
            cantidadUtilizada: ri.cantidad,
            unidad: 'kg'
          };
        });
        setSelectedIngredients(prep);
      }
    }
    setStep(2);
  };

  const generateAutoCode = (prodNombre: string) => {
    const cleanProd = prodNombre.toUpperCase().replace(/\s+/g, '').slice(0, 4);
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const rand = Math.floor(Math.random() * 900) + 100;
    return `L${cleanProd}-${dateStr}-${rand}`;
  };

  const handleCreateLote = (e: FormEvent) => {
    e.preventDefault();
    const prod = productos.find(p => p.id === productoId)!;

    // Calculate expiration date
    const today = new Date();
    today.setDate(today.getDate() + prod.vidaUtilDias);
    const caducidadStr = today.toISOString().slice(0, 10);

    const generatedCode = generateAutoCode(prod.nombre);

    onAddLote({
      codigo: generatedCode,
      productoId,
      productoNombre: prod.nombre,
      recetaId: recetaId || undefined,
      fechaProduccion: new Date().toISOString().slice(0, 10),
      fechaCaducidad: caducidadStr,
      cantidadProducida: cantidadElaborada,
      responsableNombre: responsable,
      ingredientesUtilizados: selectedIngredients,
      estado: 'Activo',
      alergenos: prod.alergenos,
      unidad: 'uds'
    });

    // Reset Form
    setProductoId('');
    setRecetaId('');
    setCantidadElaborada(10);
    setSelectedIngredients([]);
    setStep(1);
    setShowAddModal(false);
  };

  const selectedLote = lotes.find(l => l.codigo === selectedLoteId);

  const filteredLotes = lotes.filter(l =>
    l.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.productoNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.responsableNombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Control de Lotes y Trazabilidad Alimentaria</h2>
          <p className="text-slate-500 text-xs">Registro automatizado, análisis de procedencia y grafos de trazabilidad forward / backward.</p>
        </div>
        <button
          onClick={() => {
            setStep(1);
            setShowAddModal(true);
          }}
          className="bg-primary hover:bg-primary-hover text-white rounded-xl py-3 px-5 font-bold text-sm flex items-center gap-1.5 transition-all outline-none"
        >
          <Plus size={16} />
          <span>Registrar Nuevo Lote</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (4): Search & Batches List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-[#e0e3e5] rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100 max-h-[75vh] overflow-y-auto custom-scrollbar animate-fade-in">
            {filteredLotes.length === 0 ? (
              <p className="p-4 text-xs text-slate-400 italic">No se han encontrado lotes registrados.</p>
            ) : (
              filteredLotes.map(l => (
                <button
                  key={l.codigo}
                  onClick={() => setSelectedLoteId(l.codigo)}
                  className={`w-full text-left p-4 hover:bg-slate-50 transition-colors flex justify-between items-start ${
                    selectedLoteId === l.codigo ? 'bg-blue-50/50 border-l-4 border-l-primary' : ''
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#0058be]">{l.codigo}</span>
                    <h4 className="font-bold text-slate-900 text-xs mt-1">{l.productoNombre}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Operador: {l.responsableNombre}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-bold bg-green-100 text-green-800 rounded px-1.5 py-0.5 uppercase tracking-wide">
                      {l.estado}
                    </span>
                    <p className="text-[10px] text-slate-400 font-mono mt-2">{l.fechaProduccion}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Column (8): Detailed batch trace sheet & maps */}
        <div className="lg:col-span-8">
          {selectedLote ? (
            <div className="bg-white border border-[#e0e3e5] rounded-2xl p-6 shadow-sm space-y-6 animate-fade-in">
              {/* Batch Banner */}
              <div className="flex justify-between items-start border-b pb-4 -m-6 mb-0 p-6 bg-slate-50/40">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-mono font-extrabold text-[#0058be]">{selectedLote.codigo}</span>
                    <span className="text-[10px] bg-green-100 text-green-800 border border-green-200 uppercase px-2 py-0.5 rounded font-bold font-mono">
                      {selectedLote.estado}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{selectedLote.productoNombre}</h3>
                  <p className="text-xs text-slate-500 font-medium font-sans">Asociado a formulación de calidad de obrador</p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-slate-400 block font-bold uppercase">Cantidad Producida</p>
                  <p className="text-xl font-extrabold text-slate-900 font-mono">{selectedLote.cantidadProducida} uds</p>
                </div>
              </div>

              {/* Attributes block */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Responsable</span>
                  <p className="text-slate-800 font-bold mt-1 flex items-center gap-1">
                    <User size={12} className="text-primary" />
                    <span>{selectedLote.responsableNombre}</span>
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Elaboración</span>
                  <p className="text-slate-800 font-mono font-bold mt-1 tracking-wide">{selectedLote.fechaProduccion}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Fecha Caducidad</span>
                  <p className="text-red-700 font-mono font-bold mt-1 tracking-wide">{selectedLote.fechaCaducidad}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Alerta APPCC</span>
                  <p className="text-green-700 font-bold mt-1">Conforme ✓</p>
                </div>
              </div>

              {/* Composition ingredients used list */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Procedencia de Materia Prima Utilizada:</h4>
                <div className="border border-[#e0e3e5] rounded-xl overflow-hidden bg-white">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-[#e0e3e5] text-[10px] uppercase font-bold text-slate-400">
                        <th className="px-4 py-2">Materia Prima</th>
                        <th className="px-4 py-2">Lote Proveedor Usado</th>
                        <th className="px-4 py-2">Establecimiento Prov.</th>
                        <th className="px-4 py-2 text-right">Cant. Utilizada</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-medium">
                      {selectedLote.ingredientesUtilizados?.map((ing, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="px-4 py-3 text-slate-900 font-bold">{ing.nombre}</td>
                          <td className="px-4 py-3 font-mono font-bold text-primary">{ing.loteProveedor}</td>
                          <td className="px-4 py-3 text-slate-500">{ing.proveedorNombre}</td>
                          <td className="px-4 py-3 text-right font-mono text-slate-900 font-bold">{ing.cantidadUtilizada} {ing.unidad}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Visual Flowchart Mapping (Backward / Forward) */}
              <div className="border border-[#e0e3e5] rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mapa de Trazabilidad Comercial Integral:</h4>
                  <span className="text-[9px] font-bold bg-blue-50 text-primary border border-primary/20 rounded px-2 py-0.5 uppercase">Auditado</span>
                </div>

                <div className="flex flex-col gap-3 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-blue-100 text-xs text-slate-700 font-sans">
                  {/* Step 1: Proveedor */}
                  <div className="flex items-start gap-4 z-10">
                    <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-primary text-primary flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800">Trazabilidad hacia atrás (Proveedores)</h5>
                      <p className="text-slate-500 leading-normal mt-0.5">
                        Materia prima certificada provista por:{' '}
                        <span className="font-bold text-slate-800">
                          {selectedLote.ingredientesUtilizados?.map(u => u.proveedorNombre).filter((v, i, a) => a.indexOf(v) === i).join(', ')}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Step 2: Elaboracion */}
                  <div className="flex items-start gap-4 z-10">
                    <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-primary text-primary flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800">Formulación Interna del Lote (Obrador)</h5>
                      <p className="text-slate-500 leading-normal mt-0.5">
                        Lanzado en obrador bajo registro <span className="font-mono text-[#0058be] font-semibold">{selectedLote.codigo}</span> por {selectedLote.responsableNombre}.
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Distribucion */}
                  <div className="flex items-start gap-4 z-10">
                    <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-primary text-primary flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800">Trazabilidad hacia adelante (Destino)</h5>
                      <p className="text-slate-500 leading-normal mt-0.5">
                        Asignado a expedición hacia: <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Vitrina Tienda Principal & Distribuidoras</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Report Button */}
              <div className="flex justify-end gap-2 border-t pt-4">
                <button
                  onClick={() => {
                    alert(`Descargando certificado de trazabilidad sanidad para el lote ${selectedLote.codigo}...`);
                  }}
                  className="px-4 py-2.5 bg-primary font-bold text-xs text-white rounded-xl flex items-center gap-1.5 active:scale-95 transition-all shadow-sm"
                >
                  <Download size={14} />
                  <span>Obtener Certificado Trazabilidad</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-200">
              <Layers size={48} className="text-slate-300 mx-auto" />
              <h4 className="font-bold text-slate-700 mt-2">Seleccione un lote para auditar</h4>
              <p className="text-xs text-slate-400 font-sans">Haga clic en un lote en la barra lateral para abrir su ficha.</p>
            </div>
          )}
        </div>
      </div>

      {/* MULTI_STEP CREATE NEW LOT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-xl border border-slate-100 shadow-2xl overflow-hidden animate-scale-up">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-sans font-bold text-slate-900 text-sm flex items-center gap-2">
                <Clipboard size={18} className="text-primary" />
                <span>Asistente de Elaboración y Lotes</span>
              </h3>
              <div className="text-right flex items-center gap-2">
                <span className="text-[10px] bg-blue-100 text-[#0058be] uppercase font-bold px-2 py-0.5 rounded">Paso {step} de 3</span>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateLote} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {step === 1 && (
                <div className="space-y-4">
                  <h4 className="font-bold text-xs text-slate-400 uppercase tracking-widest block mb-2">Seleccione el Producto a Elaborar</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                    {productos.map(p => (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => handleSelectProduct(p.id)}
                        className="p-4 rounded-xl border border-slate-200 hover:border-primary text-left bg-white transition-all hover:bg-slate-50 flex flex-col justify-between"
                      >
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{p.categoria}</span>
                        <span className="font-bold text-slate-900 text-xs mt-1 block">{p.nombre}</span>
                        <span className="text-[10px] text-primary mt-2 flex items-center gap-0.5">
                          <span>Usar receta vinculada</span>
                          <ArrowRight size={10} />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h4 className="font-bold text-xs text-slate-400 uppercase tracking-widest block mb-2">Asignación de Lotes de Materias Primas</h4>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Validamos los lotes específicos de los sacos o bolsas de materia prima para mantener el registro sanitario en planta.
                  </p>

                  <div className="space-y-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    {selectedIngredients.map((row, idx) => (
                      <div key={idx} className="flex flex-col gap-1 border-b pb-2 last:border-b-0">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-800">{row.nombre}</span>
                          <span className="text-[10px] text-slate-400">Prov: {row.proveedorNombre}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-[10px] text-slate-400 uppercase">Lote:</span>
                          <span className="font-mono text-[11px] text-[#0058be] font-bold bg-white px-2 py-0.5 rounded border border-blue-100">
                            {row.loteProveedor}
                          </span>
                          <span className="text-slate-300">|</span>
                          <span className="text-[10px] text-slate-400 uppercase">Proporc:</span>
                          <span className="text-xs text-slate-700 font-bold font-mono">
                            {row.cantidadUtilizada} kg
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 bg-white border border-slate-200 text-xs font-bold rounded-lg"
                    >
                      Atrás
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h4 className="font-bold text-xs text-slate-400 uppercase tracking-widest block mb-1">Firma y Especificaciones del Operador</h4>

                  <div className="space-y-3 text-xs font-semibold">
                    <div className="space-y-1">
                      <label className="text-slate-500 block">Cantidad a Elaborar (uds / kg)</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={cantidadElaborada}
                        onChange={(e) => setCantidadElaborada(Number(e.target.value))}
                        className="w-full border p-2.5 focus:outline-none rounded-lg text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-500 block">Operador Responsable de Calidad</label>
                      <input
                        type="text"
                        required
                        value={responsable}
                        onChange={(e) => setResponsable(e.target.value)}
                        className="w-full border p-2.5 focus:outline-none rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  {/* Allergen validation checks */}
                  <div className="p-3 bg-green-50 rounded-xl border border-green-100 flex items-center gap-2 text-xs font-semibold text-green-800 font-sans">
                    <CheckSquare size={16} />
                    <span>Se ha validado la no presencia cruzada de alérgenos de riesgo. Lote conforme para expedición alimentaria.</span>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 bg-white border border-slate-200 text-xs font-bold rounded-lg"
                    >
                      Atrás
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg"
                    >
                      Generar Lote e Iniciar Trazabilidad
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
