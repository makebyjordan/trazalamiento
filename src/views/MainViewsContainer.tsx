/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BookOpen, Plus, Sparkles, Sliders, Play, Trash2, Wheat, Calendar,
  ShieldAlert, UserCheck, AlertTriangle, Truck, Check, RefreshCw, Thermometer,
  ShieldCheck, CheckSquare, Edit3, Camera, FileText, Download, Printer, Users,
  Settings, Building2, Briefcase, ChevronRight, Eye, RefreshCw as LoopIcon
} from 'lucide-react';
import {
  Receta, Ingrediente, Proveedor, AlergenoType, PlanLimpieza,
  Incidencia, DocumentoSector, Usuario
} from '../types';

// ==========================================
// 1. RECETAS VIEW
// ==========================================
interface RecetasViewProps {
  recetas: Receta[];
  ingredientes: Ingrediente[];
  onAddReceta: (nueva: Omit<Receta, 'id'>) => void;
  searchTerm: string;
}

export function RecetasView({ recetas, ingredientes, onAddReceta, searchTerm }: RecetasViewProps) {
  const [selectedReceta, setSelectedReceta] = useState<Receta | null>(recetas[0] || null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [nombre, setNombre] = useState('');
  const [proceso, setProceso] = useState('');
  const [tiempo, setTiempo] = useState(30);
  const [rendimiento, setRendimiento] = useState('10 raciones');
  const [costo, setCosto] = useState(1.50);

  // Auto-calculated allergens based on selected ingredients
  const [selectedIngredientsAndQty, setSelectedIngredientsAndQty] = useState<{ id: string; qty: number }[]>([]);

  const handleAddIngredientRow = () => {
    const firstIng = ingredientes[0];
    if (firstIng) {
      setSelectedIngredientsAndQty([...selectedIngredientsAndQty, { id: firstIng.id, qty: 1 }]);
    }
  };

  const handleRemoveIngredientRow = (idx: number) => {
    setSelectedIngredientsAndQty(selectedIngredientsAndQty.filter((_, i) => i !== idx));
  };

  const handleSelectIngredient = (idx: number, id: string) => {
    const updated = [...selectedIngredientsAndQty];
    updated[idx].id = id;
    setSelectedIngredientsAndQty(updated);
  };

  const handleQtyChange = (idx: number, qty: number) => {
    const updated = [...selectedIngredientsAndQty];
    updated[idx].qty = qty;
    setSelectedIngredientsAndQty(updated);
  };

  // Derive alérgenos list based on currently added ingredients
  const autoCalculatedAlergenos: AlergenoType[] = [];
  selectedIngredientsAndQty.forEach(row => {
    const origIng = ingredientes.find(i => i.id === row.id);
    if (origIng) {
      origIng.alergenos.forEach(al => {
        if (!autoCalculatedAlergenos.includes(al)) {
          autoCalculatedAlergenos.push(al);
        }
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    // Map ingredients structures
    const recipeIngs = selectedIngredientsAndQty.map(row => {
      const orig = ingredientes.find(i => i.id === row.id)!;
      return {
        ingredienteId: row.id,
        nombre: orig.nombre,
        cantidad: row.qty,
        unidad: orig.unidad
      };
    });

    onAddReceta({
      nombre,
      ingredientes: recipeIngs,
      procesoElaboracion: proceso,
      tiempoPreparacionMinutos: Number(tiempo),
      rendimientoEstimado: rendimiento,
      costeEstimadoPorUnidad: Number(costo),
      alergenosHeredados: autoCalculatedAlergenos
    });

    setNombre('');
    setProceso('');
    setTiempo(30);
    setRendimiento('10 raciones');
    setCosto(1.5);
    setSelectedIngredientsAndQty([]);
    setShowAddForm(false);
  };

  const filteredRecetas = recetas.filter(r =>
    r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.productoNombre && r.productoNombre.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar List (Column 4) */}
      <div className="lg:col-span-5 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Formulario y Recetario</h3>
            <p className="text-xs text-slate-500">Recetas maestras con ingredientes y costes.</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="p-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg flex items-center justify-center"
            title="Crear Nueva Receta"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="bg-white border border-[#e0e3e5] rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {filteredRecetas.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setSelectedReceta(r);
                setShowAddForm(false);
              }}
              className={`w-full text-left p-4 hover:bg-slate-50 transition-colors flex justify-between items-center ${
                selectedReceta?.id === r.id ? 'bg-blue-50/50 border-l-4 border-l-primary' : ''
              }`}
            >
              <div>
                <p className="font-bold text-sm text-slate-900 leading-tight">{r.nombre}</p>
                <p className="text-xs text-slate-400 mt-1">Rendimiento: {r.rendimientoEstimado}</p>
              </div>
              <ChevronRight size={16} className="text-slate-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Detail / Add Panel (Column 8) */}
      <div className="lg:col-span-7">
        {showAddForm ? (
          <form onSubmit={handleSubmit} className="bg-white border border-[#e0e3e5] rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Crear Nueva Fórmula de Receta</h3>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">Nombre de la Receta</label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="ej. Receta Panettone Clásico de Otoño"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block">Tiempo Prep (min)</label>
                <input
                  type="number"
                  required
                  value={tiempo}
                  onChange={(e) => setTiempo(Number(e.target.value))}
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block">Rendimiento</label>
                <input
                  type="text"
                  required
                  value={rendimiento}
                  onChange={(e) => setRendimiento(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block">Costo Est. (€ / ud)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={costo}
                  onChange={(e) => setCosto(Number(e.target.value))}
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none"
                />
              </div>
            </div>

            {/* Ingredients rows */}
            <div className="space-y-2 border-t border-slate-100 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700">Composición de Ingredientes (Simulador Alérgenos)</span>
                <button
                  type="button"
                  onClick={handleAddIngredientRow}
                  className="text-xs text-primary font-bold hover:underline"
                >
                  + Añadir Ingrediente
                </button>
              </div>

              {selectedIngredientsAndQty.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No ha seleccionado ningún componente de materia prima.</p>
              ) : (
                <div className="space-y-2">
                  {selectedIngredientsAndQty.map((row, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <select
                        value={row.id}
                        onChange={(e) => handleSelectIngredient(idx, e.target.value)}
                        className="flex-1 bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none"
                      >
                        {ingredientes.map(i => (
                          <option key={i.id} value={i.id}>{i.nombre} ({i.unidad})</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={row.qty}
                        onChange={(e) => handleQtyChange(idx, Number(e.target.value))}
                        className="w-20 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none text-center"
                        placeholder="Cant"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredientRow(idx)}
                        className="text-red-500 hover:text-red-700 p-1 bg-red-50 rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Auto-calculated allergens banner */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Alérgenos Auto-Calculados del Obrador</span>
              {autoCalculatedAlergenos.length === 0 ? (
                <span className="text-green-700 font-bold text-xs">✓ Libre de alérgenos</span>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {autoCalculatedAlergenos.map(al => (
                    <span key={al} className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full uppercase">
                      {al}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">Proceso de Elaboración Paso a Paso</label>
              <textarea
                value={proceso}
                onChange={(e) => setProceso(e.target.value)}
                required
                className="w-full border border-slate-200 rounded-lg p-2 text-xs focus:outline-none"
                rows={4}
                placeholder="Amase, repose y hornee a..."
              ></textarea>
            </div>

            <div className="flex justify-end gap-2 border-t pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white font-bold rounded-lg text-xs"
              >
                Añadir Receta
              </button>
            </div>
          </form>
        ) : selectedReceta ? (
          <div className="bg-white border border-[#e0e3e5] rounded-2xl p-6 shadow-sm space-y-6 animate-fade-in">
            <div className="flex justify-between items-start border-b border-outline-border pb-4 bg-slate-50/50 -m-6 mb-0 p-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#0058be] font-bold">Instrucción de Obrador</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedReceta.nombre}</h3>
                <p className="text-xs text-slate-500 font-medium">Producto: {selectedReceta.productoNombre || 'Ficha única'}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Costo Est.</p>
                <p className="font-bold text-lg text-[#0058be] font-mono">{(selectedReceta.costeEstimadoPorUnidad || 0).toFixed(2)} €</p>
              </div>
            </div>

            {/* Micro details */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Tiempo Elaboración</span>
                <p className="text-sm font-bold text-slate-800 mt-0.5">{selectedReceta.tiempoPreparacionMinutos} minutos</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Rendimiento</span>
                <p className="text-sm font-bold text-slate-800 mt-0.5">{selectedReceta.rendimientoEstimado}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Temp. Recomendada</span>
                <p className="text-sm font-bold text-slate-800 mt-0.5">{selectedReceta.temperaturaRecomendadaC || 'Ambiente'}°C</p>
              </div>
            </div>

            {/* Ingredients table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ingredientes de Composición básica:</h4>
              <div className="border border-[#e0e3e5] rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-[#e0e3e5] text-xs">
                      <th className="px-4 py-2 font-bold text-slate-600">Materia Prima</th>
                      <th className="px-4 py-2 text-right font-bold text-slate-600">Proporción / Cantidad</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium">
                    {selectedReceta.ingredientes.map((ing, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-slate-800">{ing.nombre}</td>
                        <td className="px-4 py-3 text-right text-slate-900 font-mono font-bold">{ing.cantidad} {ing.unidad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Process */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Metodología de Trabajo de Calidad:</h4>
              <div className="p-4 bg-slate-50 rounded-xl leading-relaxed text-xs text-slate-700 font-medium whitespace-pre-line border border-slate-100">
                {selectedReceta.procesoElaboracion}
              </div>
            </div>

            {/* Inherited allergens */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Alérgenos Heredados de Materia Prima:</h4>
              {selectedReceta.alergenosHeredados.length === 0 ? (
                <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full inline-block">
                  ✓ Alérgeno Neutro (Sin alérgenos de riesgo declarados)
                </span>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {selectedReceta.alergenosHeredados.map((al) => (
                    <span
                      key={al}
                      className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200/50 px-2.5 py-1 rounded-full uppercase tracking-wider"
                    >
                      ⚠️ {al}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-200">
            <BookOpen size={48} className="text-slate-300 mx-auto" />
            <h4 className="font-bold text-slate-700 mt-2">No se ha seleccionado ninguna receta</h4>
            <p className="text-xs text-slate-400">Haga clic en una receta en la barra lateral para ver sus datos.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 2. INGREDIENTES VIEW
// ==========================================
interface IngredientesViewProps {
  ingredientes: Ingrediente[];
  proveedores: Proveedor[];
  onAddIngrediente: (ing: Omit<Ingrediente, 'id'>) => void;
  searchTerm: string;
}

export function IngredientesView({ ingredientes, proveedores, onAddIngrediente, searchTerm }: IngredientesViewProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [nombre, setNombre] = useState('');
  const [proveedorId, setProveedorId] = useState(proveedores[0]?.id || '');
  const [categoria, setCategoria] = useState('Harinas');
  const [loteProveedor, setLoteProveedor] = useState('');
  const [caducidad, setCaducidad] = useState('2026-06-15');
  const [stock, setStock] = useState(10);
  const [unidad, setUnidad] = useState<'kg' | 'g' | 'L' | 'ml' | 'uds'>('kg');
  const [conservandoles, setConservandoles] = useState('Almacenamiento seco');
  const [alergenos, setAlergenos] = useState<AlergenoType[]>([]);

  const availableAlergenos: AlergenoType[] = [
    'Gluten', 'Crustáceos', 'Huevos', 'Pescado', 'Cacahuetes', 'Soja', 'Leche', 'Frutos de cáscara', 'Apio', 'Mostaza', 'Sésamo', 'Sulfitos', 'Altramuces', 'Moluscos'
  ];

  const handleToggleAl = (al: AlergenoType) => {
    if (alergenos.includes(al)) {
      setAlergenos(alergenos.filter(x => x !== al));
    } else {
      setAlergenos([...alergenos, al]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    const matchedProv = proveedores.find(p => p.id === proveedorId);

    onAddIngrediente({
      nombre,
      proveedorId,
      proveedorNombre: matchedProv ? matchedProv.nombre : 'Producción Interna',
      categoria,
      loteProveedor,
      fechaEntrada: '2026-06-03', // current mock date
      fechaCaducidad: caducidad,
      alergenos,
      stock,
      unidad,
      condicionesConservacion: conservandoles
    });

    setNombre('');
    setLoteProveedor('');
    setStock(10);
    setAlergenos([]);
    setConservandoles('Almacenamiento seco');
    setShowAdd(false);
  };

  const filtered = ingredientes.filter(i =>
    i.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.proveedorNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.loteProveedor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Registro de Materias Primas / Ingredientes</h2>
          <p className="text-slate-500 text-xs">Entradas de stock de proveedores y control de alérgenos.</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-primary hover:bg-primary-hover text-white rounded-xl py-2.5 px-4 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
        >
          <Plus size={14} />
          <span>Registrar Entrada Materia</span>
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleSubmit} className="bg-white border border-[#e0e3e5] p-6 rounded-2xl max-w-xl mx-auto space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Registrar Entrada de Materia Prima</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">Nombre del Ingrediente</label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="ej. Semillas de Sésamo Tostadas"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">Proveedor Certificado</label>
              <select
                value={proveedorId}
                onChange={(e) => setProveedorId(e.target.value)}
                className="w-full border rounded-lg p-2.5 text-xs bg-white focus:outline-none"
              >
                {proveedores.map(p => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">Lote del Proveedor</label>
              <input
                type="text"
                required
                value={loteProveedor}
                onChange={(e) => setLoteProveedor(e.target.value)}
                className="w-full border rounded-lg p-2.5 text-xs focus:outline-none"
                placeholder="ej. S-99221"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">Fecha Caducidad</label>
              <input
                type="date"
                required
                value={caducidad}
                onChange={(e) => setCaducidad(e.target.value)}
                className="w-full border rounded-lg p-2.5 text-xs focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">Cantidad Entrada</label>
              <div className="flex gap-1">
                <input
                  type="number"
                  min="1"
                  required
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full border rounded-lg p-2.5 text-xs focus:outline-none text-center"
                />
                <select
                  value={unidad}
                  onChange={(e) => setUnidad(e.target.value as any)}
                  className="border rounded-lg p-2 bg-white text-xs"
                >
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="L">L</option>
                  <option value="uds">uds</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 block">Condiciones Almacenado</label>
            <input
              type="text"
              value={conservandoles}
              onChange={(e) => setConservandoles(e.target.value)}
              className="w-full border rounded-lg p-2.5 text-xs focus:outline-none"
              placeholder="Cámara fría 2-4C"
            />
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-slate-700 block">Alérgenos Declarados en Albarán</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 bg-slate-50 rounded-lg max-h-24 overflow-y-auto">
              {availableAlergenos.map(a => {
                const holds = alergenos.includes(a);
                return (
                  <button
                    type="button"
                    key={a}
                    onClick={() => handleToggleAl(a)}
                    className={`p-1.5 text-left rounded text-[10px] font-semibold flex justify-between uppercase tracking-wide ${
                      holds ? 'bg-amber-100 text-amber-900 font-bold' : 'bg-white text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <span>{a}</span>
                    {holds && <span>⚠️</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t text-xs">
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 bg-white border border-slate-200 font-bold rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white font-bold rounded-lg"
            >
              Guardar Entrada
            </button>
          </div>
        </form>
      )}

      {/* Ingredients list table */}
      <div className="bg-white border border-[#e0e3e5] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-[#e0e3e5] text-xs">
              <th className="px-6 py-4 font-bold text-slate-600">Ingrediente</th>
              <th className="px-6 py-4 font-bold text-slate-600">Lote Propor.</th>
              <th className="px-6 py-4 font-bold text-slate-600">Proveedor</th>
              <th className="px-6 py-4 font-bold text-slate-600 text-right">Stock</th>
              <th className="px-6 py-4 font-bold text-slate-600">Caducidad</th>
              <th className="px-6 py-4 font-bold text-slate-600">Alérgenos</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium">
            {filtered.map((ing) => {
              const daysLeft = Math.ceil((new Date(ing.fechaCaducidad).getTime() - new Date('2026-06-03').getTime()) / (1000 * 60 * 60 * 24));
              const isExpired = daysLeft <= 0;
              const isExpiringSoon = daysLeft <= 7 && daysLeft > 0;

              return (
                <tr key={ing.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-900">{ing.nombre}</td>
                  <td className="px-6 py-4 font-mono font-bold text-primary">{ing.loteProveedor}</td>
                  <td className="px-6 py-4 text-slate-500">{ing.proveedorNombre}</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-950 font-mono">{ing.stock} {ing.unidad}</td>
                  <td className="px-6 py-4">
                    {isExpired ? (
                      <span className="text-red-700 bg-red-100 px-2 py-0.5 rounded font-bold uppercase tracking-wider">¡CADUCADO!</span>
                    ) : isExpiringSoon ? (
                      <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-bold">Exp: {daysLeft}d</span>
                    ) : (
                      <span className="text-slate-500">{ing.fechaCaducidad}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {ing.alergenos.length === 0 ? (
                      <span className="text-[10px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-bold uppercase">Sin alérg.</span>
                    ) : (
                      <div className="flex flex-wrap gap-0.5">
                        {ing.alergenos.map(a => (
                          <span key={a} className="text-[9px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full font-bold">
                            {a.slice(0, 5)}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// 3. CADUCIDADES VIEW
// ==========================================
interface CaducidadesViewProps {
  ingredientes: Ingrediente[];
}

export function CaducidadesView({ ingredientes }: CaducidadesViewProps) {
  const evaluateItems = () => {
    const today = new Date('2026-06-03');
    
    const caducados: Ingrediente[] = [];
    const caducanHoy: Ingrediente[] = [];
    const prox3Dias: Ingrediente[] = [];
    const prox7Dias: Ingrediente[] = [];
    const esteMes: Ingrediente[] = [];

    ingredientes.forEach(i => {
      const expD = new Date(i.fechaCaducidad);
      const diffMs = expD.getTime() - today.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        caducados.push(i);
      } else if (diffDays === 0) {
        caducanHoy.push(i);
      } else if (diffDays > 0 && diffDays <= 3) {
        prox3Dias.push(i);
      } else if (diffDays > 3 && diffDays <= 7) {
        prox7Dias.push(i);
      } else if (diffDays > 7 && diffDays <= 30) {
        esteMes.push(i);
      }
    });

    return { caducados, caducanHoy, prox3Dias, prox7Dias, esteMes };
  };

  const { caducados, caducanHoy, prox3Dias, prox7Dias, esteMes } = evaluateItems();

  const renderSection = (title: string, items: Ingrediente[], colorType: 'red' | 'orange' | 'amber' | 'blue' | 'slate', advice: string) => {
    if (items.length === 0) return null;

    const bgMap = {
      red: 'bg-red-50 text-red-850 border-red-200/50',
      orange: 'bg-orange-50 text-orange-800 border-orange-200/50',
      amber: 'bg-amber-50 text-amber-800 border-amber-200/40',
      blue: 'bg-blue-50 text-blue-900 border-blue-200/40',
      slate: 'bg-slate-50 text-slate-800 border-slate-200/40'
    };

    const countColorMap = {
      red: 'bg-red-600',
      orange: 'bg-orange-600',
      amber: 'bg-amber-600',
      blue: 'bg-blue-600',
      slate: 'bg-slate-500'
    };

    return (
      <div className="space-y-3 bg-white border border-[#e0e3e5] rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${countColorMap[colorType]}`}></span>
            <span>{title}</span>
          </h4>
          <span className="text-[10px] font-bold px-2.5 py-1 bg-slate-100 rounded text-slate-600 uppercase tracking-wider font-mono">
            {items.length} Lotes
          </span>
        </div>

        {/* Action card recommended */}
        <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-semibold ${bgMap[colorType]}`}>
          <AlertTriangle size={16} />
          <span>Acción correctiva obligatoria recomendada: <span className="font-bold uppercase underline">{advice}</span></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {items.map(i => {
            const expD = new Date(i.fechaCaducidad);
            const diffDays = Math.ceil((expD.getTime() - new Date('2026-06-03').getTime()) / (1000 * 60 * 60 * 24));
            return (
              <div key={i.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center hover-scale">
                <div>
                  <p className="font-bold text-slate-900 text-sm leading-snug">{i.nombre}</p>
                  <p className="text-[10px] text-slate-400 font-bold tracking-wide mt-1">Lote: <span className="text-[#0058be] font-mono">{i.loteProveedor}</span></p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Prov: {i.proveedorNombre}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xs font-mono text-slate-800">{i.stock} {i.unidad}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Caduca: {i.fechaCaducidad}</p>
                  {diffDays >= 0 ? (
                    <span className="text-[9px] font-bold bg-slate-200 text-slate-700 rounded px-1.5 py-0.5 inline-block mt-1 font-mono">Quedan {diffDays}d</span>
                  ) : (
                    <span className="text-[9px] font-bold bg-red-600 text-white rounded px-1.5 py-0.5 inline-block mt-1 font-mono">HACE {-diffDays}d</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Alerta de Seguridad Sanitaria y Caducidades</h2>
        <p className="text-slate-500 text-xs">Monitoreo continuo de vencimientos de lotes en Obradores.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-50 p-4 border border-red-100 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-red-900 uppercase font-bold tracking-wider">Ya Caducados</p>
            <p className="text-3xl font-extrabold text-red-700 font-mono mt-0.5">{caducados.length}</p>
          </div>
          <AlertTriangle size={24} className="text-red-700 animate-bounce" />
        </div>
        <div className="bg-amber-50 p-4 border border-amber-100 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-amber-950 uppercase font-bold tracking-wider">Esta Semana</p>
            <p className="text-3xl font-extrabold text-amber-700 font-mono mt-0.5">{caducanHoy.length + prox3Dias.length + prox7Dias.length}</p>
          </div>
          <Calendar size={24} className="text-amber-700" />
        </div>
        <div className="bg-blue-50 p-4 border border-blue-100 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-blue-900 uppercase font-bold tracking-wider">Este Mes (Próximos 30d)</p>
            <p className="text-3xl font-extrabold text-[#0058be] font-mono mt-0.5">{esteMes.length}</p>
          </div>
          <CheckSquare size={24} className="text-[#0058be]" />
        </div>
      </div>

      <div className="space-y-6">
        {renderSection('PRODUCTOS CADUCADOS TOTALMENTE', caducados, 'red', 'Retirar inmediatamente del stock del obrador y desechar')}
        {renderSection('CADUCAN HOY', caducanHoy, 'orange', 'Procesar prioritariamente hoy o bloquear lote preventivamente')}
        {renderSection('VENCIMIENTO INMINENTE (1 - 3 DÍAS)', prox3Dias, 'amber', 'Planificar consumo prioritario en recetas maestras')}
        {renderSection('VENCIMIENTO PRÓXIMO (4 - 7 DÍAS)', prox7Dias, 'blue', 'Revisar bolsas de conservación e integraciones')}
        {renderSection('VENCIMIENTO MEDIO (8 - 30 DÍAS)', esteMes, 'slate', 'Rotación estándar de stock tipo FIFO')}
      </div>
    </div>
  );
}

// ==========================================
// 4. PROVEEDORES VIEW
// ==========================================
interface ProveedoresViewProps {
  proveedores: Proveedor[];
  onAddProveedor: (prov: Omit<Proveedor, 'id'>) => void;
  searchTerm: string;
}

export function ProveedoresView({ proveedores, onAddProveedor, searchTerm }: ProveedoresViewProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [tipo, setTipo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    onAddProveedor({
      nombre,
      contacto,
      telefono,
      email,
      direccion,
      tipoProducto: tipo,
      documentos: ['Certificado Sanitario Estándar.pdf'],
      estado: 'Activo'
    });

    setNombre('');
    setContacto('');
    setTelefono('');
    setEmail('');
    setDireccion('');
    setTipo('');
    setShowAdd(false);
  };

  const filtered = proveedores.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tipoProducto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Directorio de Proveedores Homologados</h2>
          <p className="text-slate-500 text-xs">Controles sanitarios de proveedores homologados y trazabilidad comercial.</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-primary hover:bg-primary-hover text-white rounded-xl py-2.5 px-4 font-bold text-xs flex items-center gap-1.5 transition-all outline-none"
        >
          <Plus size={14} />
          <span>Homologar Proveedor</span>
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleSubmit} className="bg-white border p-6 rounded-2xl max-w-lg mx-auto space-y-4 shadow-xl">
          <h3 className="font-bold text-slate-900 text-base">Registrar Nuevo Proveedor</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">Razón Social</label>
              <input type="text" required value={nombre} onChange={e => setNombre(e.target.value)} className="w-full border p-2.5 text-xs focus:ring-1 focus:ring-primary rounded-lg focus:outline-none" placeholder="ej. Frutas del Jerte Cooperativa" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">Contacto Administrativo</label>
              <input type="text" required value={contacto} onChange={e => setContacto(e.target.value)} className="w-full border p-2.5 text-xs focus:outline-none rounded-lg" placeholder="Nombres" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">Teléfono Comercial</label>
              <input type="text" required value={telefono} onChange={e => setTelefono(e.target.value)} className="w-full border p-2.5 text-xs focus:outline-none rounded-lg" placeholder="Telégrafo" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">Correo Calidad</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2.5 text-xs focus:outline-none rounded-lg" placeholder="email" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 block">Tipo Producto / Categoría de Suministros</label>
            <input type="text" required value={tipo} onChange={e => setTipo(e.target.value)} className="w-full border p-2.5 text-xs focus:outline-none rounded-lg" placeholder="ej. Frutas, Especias de molienda" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 block">Dirección Fiscal / Almacenes</label>
            <input type="text" required value={direccion} onChange={e => setDireccion(e.target.value)} className="w-full border p-2.5 text-xs focus:outline-none rounded-lg" placeholder="Dirección" />
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t text-xs">
            <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 bg-white border font-bold rounded-lg">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white font-bold rounded-lg">Guardar Homologación</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="bg-white border border-[#e0e3e5] rounded-2xl p-5 shadow-sm space-y-4 hover-scale">
            <div className="flex justify-between items-start border-b border-outline-border pb-3 bg-slate-50/40 -m-5 mb-0 p-5">
              <div>
                <span className="text-[9px] bg-blue-50 text-primary border border-primary/10 px-2 py-0.5 rounded uppercase font-bold tracking-wider">{p.tipoProducto}</span>
                <h3 className="font-bold text-slate-900 text-sm mt-1">{p.nombre}</h3>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">{p.id}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">Contacto</span>
                <p className="text-slate-800 font-medium mt-0.5">{p.contacto}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">Teléfono / Fax</span>
                <p className="text-slate-800 font-medium mt-0.5">{p.telefono}</p>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] text-slate-400 font-bold block">Email Certificaciones</span>
                <p className="text-slate-800 font-medium mt-0.5">{p.email}</p>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] text-slate-400 font-bold block">Almacenes Fiscales</span>
                <p className="text-slate-800 font-medium mt-0.5">{p.direccion}</p>
              </div>
            </div>
            <div className="pt-3 border-t flex gap-2 items-center justify-between text-xs font-medium text-slate-500">
              <span className="text-[10px] flex items-center gap-1 text-slate-400">
                <FileText size={12} className="text-[#0058be]" />
                <span>{p.documentos.length} Calidad docs</span>
              </span>
              <span className="text-[10px] bg-green-100 text-green-800 uppercase px-2 py-0.5 rounded font-bold">Estado: Homologado</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 5. ALERGENOS VIEW
// ==========================================
interface AlergenosViewProps {
  ingredientes: Ingrediente[];
}

export function AlergenosView({ ingredientes }: AlergenosViewProps) {
  const [activeAllergen, setActiveAllergen] = useState<AlergenoType>('Gluten');

  const availableAlergenos: AlergenoType[] = [
    'Gluten', 'Crustáceos', 'Huevos', 'Pescado', 'Cacahuetes', 'Soja', 'Leche',
    'Frutos de cáscara', 'Apio', 'Mostaza', 'Sésamo', 'Sulfitos', 'Altramuces', 'Moluscos'
  ];

  // Map how many ingredients contain each allergen
  const getAllergenCounts = () => {
    const counts: Record<string, number> = {};
    availableAlergenos.forEach(al => {
      counts[al] = ingredientes.filter(i => i.alergenos.includes(al)).length;
    });
    return counts;
  };

  const counts = getAllergenCounts();
  const affectedIngredients = ingredientes.filter(i => i.alergenos.includes(activeAllergen));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Mapeo Estructural de Alérgenos (1169/2011)</h2>
        <p className="text-slate-500 text-xs">Auditoría cruzada en tiempo real de alérgenos presentes en Obradores.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Allergen select board (Column 5) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Los 14 Alérgenos de Declaración Obligatoria:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto pr-1">
            {availableAlergenos.map(al => {
              const matches = counts[al] || 0;
              const hasMatches = matches > 0;
              const isSelected = activeAllergen === al;
              return (
                <button
                  key={al}
                  onClick={() => setActiveAllergen(al)}
                  className={`p-3 text-left rounded-xl transition-all border flex flex-col justify-between h-20 ${
                    isSelected
                      ? 'bg-[#0058be] text-white border-[#0058be] shadow-sm shadow-blue-100'
                      : hasMatches
                        ? 'bg-amber-50 text-amber-950 border-amber-200/50 hover:bg-amber-100/50'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-bold text-xs uppercase tracking-wide leading-tight">{al}</span>
                  <span className={`text-[10px] font-bold ${isSelected ? 'text-blue-100' : 'text-slate-400'} font-mono mt-2 block`}>
                    {matches} {matches === 1 ? 'Ingrediente común' : 'Ingredientes'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Affected lists details (Column 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-100 border p-4.5 rounded-2xl border-slate-200/50 leading-relaxed text-xs">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
              <span>Materia Prima afectada por {activeAllergen}</span>
              <span className="font-bold bg-[#0058be] text-white text-[10px] font-mono px-2 py-0.5 rounded-full">{affectedIngredients.length}</span>
            </h4>
          </div>

          {affectedIngredients.length === 0 ? (
            <div className="bg-white border p-12 text-center rounded-2xl border-dashed">
              <ShieldCheck className="text-green-600 mx-auto" size={48} />
              <h4 className="font-bold text-slate-700 mt-2">¡Totalmente libre de {activeAllergen}!</h4>
              <p className="text-xs text-slate-400">Ningún ingrediente del almacén o receta contiene este componente alergénico.</p>
            </div>
          ) : (
            <div className="bg-white border border-[#e0e3e5] rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100">
              {affectedIngredients.map(ing => (
                <div key={ing.id} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                  <div>
                    <span className="text-[9px] bg-red-100 text-red-800 uppercase px-2 py-0.5 font-bold rounded">ALERG: {activeAllergen}</span>
                    <p className="font-bold text-slate-900 text-sm mt-1">{ing.nombre}</p>
                    <p className="text-[10px] text-slate-400 font-bold tracking-wide mt-0.5">Lote proveedor: <span className="font-mono">{ing.loteProveedor}</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Stock activo</p>
                    <p className="font-bold text-slate-800 font-mono text-sm leading-snug">{ing.stock} {ing.unidad}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. LIMPIEZA VIEW
// ==========================================
interface LimpiezaViewProps {
  limpiezas: PlanLimpieza[];
  onToggleLimpieza: (id: string) => void;
  onAddLimpieza: (plan: Omit<PlanLimpieza, 'id'>) => void;
}

export function LimpiezaView({ limpiezas, onToggleLimpieza, onAddLimpieza }: LimpiezaViewProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [zona, setZona] = useState('');
  const [frecuencia, setFrecuencia] = useState<'Diaria' | 'Semanal' | 'Mensual' | 'Después de usar'>('Diaria');
  const [responsable, setResponsable] = useState('');
  const [producto, setProducto] = useState('');
  const [observ, setObserv] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zona.trim()) return;

    onAddLimpieza({
      zona,
      frecuencia,
      responsableRol: responsable || 'Todo el personal',
      ultimaLimpiezaFecha: undefined,
      proximaLimpiezaFecha: '2026-06-04',
      estado: 'Pendiente',
      productoUsado: producto || 'Sanitizante común alimentario',
      observaciones: observ
    });

    setZona('');
    setResponsable('');
    setProducto('');
    setObserv('');
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Plan Integral de Higiene y Limpieza (L&D)</h2>
          <p className="text-slate-500 text-xs">Comprobantes y firmas electrónicas de sanitización de superficies alimentarias.</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-primary hover:bg-primary-hover text-white rounded-xl py-2.5 px-4 font-bold text-xs flex items-center gap-1.5 transition-all outline-none"
        >
          <Plus size={14} />
          <span>Registrar Protocolo Limpieza</span>
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleCreate} className="bg-white border border-[#e0e3e5] p-6 rounded-2xl max-w-lg mx-auto space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Añadir Protocolo de Limpieza en Plan L&D</h3>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 block">Zonificación / Superficie o Maquinaria</label>
            <input type="text" required value={zona} onChange={e => setZona(e.target.value)} className="w-full border p-2.5 text-xs focus:ring-1 focus:ring-primary rounded-lg focus:outline-none" placeholder="ej. Hornos Giratorios de Solera" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">Frecuencia Regulada</label>
              <select value={frecuencia} onChange={e => setFrecuencia(e.target.value as any)} className="w-full border p-2.5 bg-white text-xs rounded-lg focus:outline-none">
                <option value="Diaria">Diaria</option>
                <option value="Semanal">Semanal</option>
                <option value="Mensual">Mensual</option>
                <option value="Después de usar">Después de usar</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">Producto Sanitizante Usado</label>
              <input type="text" required value={producto} onChange={e => setProducto(e.target.value)} className="w-full border p-2.5 text-xs rounded-lg focus:outline-none" placeholder="ej. Cloro activo jabonoso" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 block">Trabajador asignado para firma</label>
            <input type="text" value={responsable} onChange={e => setResponsable(e.target.value)} className="w-full border p-2.5 text-xs rounded-lg focus:outline-none" placeholder="ej. Ana Belén" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 block">Observaciones adicionales</label>
            <input type="text" value={observ} onChange={e => setObserv(e.target.value)} className="w-full border p-2.5 text-xs rounded-lg focus:outline-none" placeholder="Condición física de estriado" />
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t text-xs">
            <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 bg-white border font-bold rounded-lg">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white font-bold rounded-lg">Guardar Protocolo</button>
          </div>
        </form>
      )}

      {/* Grid checklists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {limpiezas.map(l => (
          <div
            key={l.id}
            className={`border rounded-2xl p-5 bg-white shadow-sm flex flex-col justify-between ${
              l.estado === 'Completada' ? 'border-green-400 bg-green-50/10' : l.estado === 'Vencida' ? 'border-red-400 bg-red-50/5' : 'border-slate-200'
            }`}
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Punto de verificación L&D</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-0.5 leading-snug">{l.zona}</h4>
                </div>
                {l.estado === 'Completada' ? (
                  <span className="text-[9px] font-bold bg-green-100 text-green-800 rounded px-2 py-0.5 uppercase">Completado</span>
                ) : l.estado === 'Vencida' ? (
                  <span className="text-[9px] font-bold bg-red-100 text-red-800 rounded px-2 py-0.5 uppercase tracking-wide">Vencido</span>
                ) : (
                  <span className="text-[9px] font-bold bg-amber-100 text-amber-800 rounded px-2 py-0.5 uppercase">Pendiente</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-medium">
                <div>
                  <span className="text-[8px] uppercase text-slate-400 block">Frecuencia</span>
                  <p className="text-slate-800 font-bold">{l.frecuencia}</p>
                </div>
                <div>
                  <span className="text-[8px] uppercase text-slate-400 block">Firma Validadora</span>
                  <p className="text-slate-800">{l.firmaValidador || 'Firma pendiente'}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-[8px] uppercase text-slate-400 block">Producto químico utilizado</span>
                  <p className="text-slate-800">{l.productoUsado}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t flex justify-between items-center mt-4">
              <span className="text-[10px] text-slate-400">Próxima sanitización: {l.proximaLimpiezaFecha}</span>
              {l.estado !== 'Completada' ? (
                <button
                  onClick={() => onToggleLimpieza(l.id)}
                  className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded font-bold text-[10px] uppercase flex items-center gap-1 transition-colors"
                >
                  <Check size={12} />
                  <span>Validar Firma</span>
                </button>
              ) : (
                <span className="text-[10px] text-green-700 bg-green-50 px-2 py-1.5 rounded font-bold flex items-center gap-1 border border-green-100">
                  <ShieldCheck size={12} />
                  <span>Firmado digitalmente</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 7. INCIDENCIAS VIEW
// ==========================================
interface IncidenciasViewProps {
  incidencias: Incidencia[];
  onAddIncidencia: (inc: Omit<Incidencia, 'id'>) => void;
  onResolveIncidencia: (id: string, accionCorrectiva: string) => void;
}

export function IncidenciasView({ incidencias, onAddIncidencia, onResolveIncidencia }: IncidenciasViewProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [showSolveId, setShowSolveId] = useState<string | null>(null);
  const [accionSolve, setAccionSolve] = useState('');

  // form state
  const [titulo, setTitulo] = useState('');
  const [desc, setDesc] = useState('');
  const [tipo, setTipo] = useState<'Temperatura' | 'Contaminación' | 'Caducidad' | 'Proveedor' | 'Limpieza' | 'Etiquetado' | 'Reclamación cliente' | 'Otro'>('Temperatura');
  const [prioridad, setPrioridad] = useState<'Baja' | 'Media' | 'Alta' | 'Crítica'>('Alta');
  const [responsable, setResponsable] = useState('');
  const [afectado, setAfectado] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    onAddIncidencia({
      titulo,
      descripcion: desc,
      tipo,
      prioridad,
      responsableNombre: responsable || 'Dr. Manuel García',
      productoAfectado: afectado || 'Saco o Maquinaria Común',
      estado: 'Abierta',
      fecha: '2026-06-03'
    });

    setTitulo('');
    setDesc('');
    setShowAdd(false);
  };

  const handleResolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showSolveId || !accionSolve.trim()) return;

    onResolveIncidencia(showSolveId, accionSolve);
    setAccionSolve('');
    setShowSolveId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">Registro de No Conformidades / Incidencias</h2>
          <p className="text-slate-500 text-xs">Acciones correctivas reglamentarias e incidencias sanitarias del sistema APPCC.</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-red-600 hover:bg-red-700 text-white rounded-xl py-2.5 px-4 font-bold text-xs flex items-center gap-1.5 transition-all outline-none animate-pulse"
        >
          <Plus size={14} />
          <span>Abrir Incidencia Crítica</span>
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleSubmit} className="bg-white border p-6 rounded-2xl max-w-lg mx-auto space-y-4 shadow-xl">
          <h3 className="font-bold text-slate-900 text-sm">Abrir Registro de No Conformidad</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">Título de la Anomalía</label>
              <input type="text" required value={titulo} onChange={e => setTitulo(e.target.value)} className="w-full border p-2.5 text-xs focus:ring-1 focus:ring-primary rounded-lg focus:outline-none" placeholder="ej. Presencia condensado techo" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">Tipo No Conformidad</label>
              <select value={tipo} onChange={e => setTipo(e.target.value as any)} className="w-full border p-2.5 bg-white text-xs rounded-lg focus:outline-none">
                <option value="Temperatura">Temperatura</option>
                <option value="Contaminación">Contaminación</option>
                <option value="Caducidad">Caducidad</option>
                <option value="Proveedor">Proveedor</option>
                <option value="Limpieza">Limpieza</option>
                <option value="Etiquetado">Etiquetado</option>
                <option value="Reclamación cliente">Reclamación de cliente</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">Prioridad Sanitaria</label>
              <select value={prioridad} onChange={e => setPrioridad(e.target.value as any)} className="w-full border p-2.5 bg-white text-xs rounded-lg focus:outline-none">
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
                <option value="Crítica">Crítica</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">Persona Responsable</label>
              <input type="text" required value={responsable} onChange={e => setResponsable(e.target.value)} className="w-full border p-2.5 text-xs rounded-lg fold-none focus:outline-none" placeholder="Responsable de área" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 block">Lote / Producto afectado</label>
            <input type="text" value={afectado} onChange={e => setAfectado(e.target.value)} className="w-full border p-2.5 text-xs rounded-lg focus:outline-none" placeholder="Harina altramuz Premium" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 block">Descripción detallada del hallazgo</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} required className="w-full border p-2 text-xs rounded-lg focus:outline-none" rows={3}></textarea>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t text-xs">
            <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 bg-white border font-bold rounded-lg">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg">Registrar No Conformidad</button>
          </div>
        </form>
      )}

      {showSolveId && (
        <form onSubmit={handleResolve} className="bg-white border border-slate-300 p-6 rounded-2xl max-w-lg mx-auto space-y-4">
          <h3 className="font-bold text-slate-950 text-sm">Aplicar Acción Correctiva Sanitizante</h3>
          <p className="text-xs text-slate-400">Describa legalmente qué operaciones se han desarrollado para solventar la anomalía y mitigar riesgos.</p>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Acción Correctiva Realizada</label>
            <textarea value={accionSolve} onChange={e => setAccionSolve(e.target.value)} required className="w-full border p-2 text-xs rounded-lg focus:outline-none" rows={3} placeholder="ej. Se retiró la partida afectada e higienizó el área con DD-40..."></textarea>
          </div>
          <div className="flex justify-end gap-2 text-xs">
            <button type="button" onClick={() => setShowSolveId(null)} className="px-4 py-2 bg-white border rounded">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white font-bold rounded font-medium">Cerrar No Conformidad</button>
          </div>
        </form>
      )}

      {/* Directory listing of occurrences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {incidencias.map(inc => (
          <div
            key={inc.id}
            className={`bg-white border rounded-2xl p-5 flex flex-col justify-between ${
              inc.prioridad === 'Crítica' ? 'border-red-400 border-l-[6px] border-l-red-600' : 'border-slate-200'
            }`}
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Hallazgo de APPCC</span>
                    <span className={`text-[8px] font-bold uppercase rounded px-1.5 py-0.5 ${
                      inc.prioridad === 'Crítica' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {inc.prioridad}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mt-0.5 leading-snug">{inc.titulo}</h4>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">ID: {inc.id}</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-semibold">{inc.descripcion}</p>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 pt-2 border-t font-medium">
                <div>
                  <span className="text-[8px] uppercase text-slate-400 block">Incidencia sobre</span>
                  <p className="text-slate-900 font-bold">{inc.productoAfectado || 'Genérica'}</p>
                </div>
                <div>
                  <span className="text-[8px] uppercase text-slate-400 block">Responsable Supervisor</span>
                  <p className="text-slate-800 font-bold">{inc.responsableNombre}</p>
                </div>
                {inc.accionCorrectiva && (
                  <div className="col-span-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100/50">
                    <span className="text-[8px] uppercase text-slate-400 block font-bold">Respuesta e Higienización Aplicada:</span>
                    <p className="text-slate-800 text-[10px] mt-0.5 leading-relaxed font-semibold">{inc.accionCorrectiva}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t flex justify-between items-center mt-4">
              <span className="text-[10px] text-slate-400">Fecha registro: {inc.fecha}</span>
              {inc.estado === 'Abierta' || inc.estado === 'En revisión' ? (
                <button
                  onClick={() => setShowSolveId(inc.id)}
                  className="px-3.5 py-1.5 bg-[#0058be] hover:bg-primary text-white rounded font-bold text-[10px] uppercase flex items-center gap-0.5"
                >
                  <Edit3 size={12} />
                  <span>Aplicar Corrección</span>
                </button>
              ) : (
                <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-1 rounded-full uppercase border border-green-100">
                  CERRADA - Mitigado
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 8. DOCUMENTOS VIEW
// ==========================================
interface DocumentosViewProps {
  documentos: DocumentoSector[];
  onUpload: (doc: Omit<DocumentoSector, 'id'>) => void;
}

export function DocumentosView({ documentos, onUpload }: DocumentosViewProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState<'Registro sanitario' | 'Ficha técnica' | 'Certificado proveedor' | 'Albarán' | 'Informe trazabilidad' | 'Plan limpieza' | 'APPCC' | 'Inspección' | 'Etiqueta' | 'Otro'>('Registro sanitario');
  const [relacion, setRelacion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    onUpload({
      nombre,
      categoria,
      relacionNombre: relacion || 'Directorio general',
      estado: 'Vigente',
      fechaSubida: '2026-06-03',
      usuarioSubio: 'Dr. Manuel García',
      urlSimulada: '#'
    });

    setNombre('');
    setRelacion('');
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">Gestión Documental Sanitaria</h2>
          <p className="text-slate-500 text-xs">Repositorio legal de autocontrol, auditorías internas y albaranes de proveedores.</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-primary hover:bg-primary-hover text-white rounded-xl py-2.5 px-4 font-bold text-xs flex items-center gap-1.5 transition-all outline-none"
        >
          <Camera size={14} />
          <span>Subir Documento Sanitario</span>
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleSubmit} className="bg-white border p-6 rounded-2xl max-w-lg mx-auto space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Cargar Expediente al Almacén</h3>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 block">Nombre del Expediente / Documento</label>
            <input type="text" required value={nombre} onChange={e => setNombre(e.target.value)} className="w-full border p-2.5 text-xs focus:ring-1 focus:ring-primary rounded-lg focus:outline-none" placeholder="ej. Albarán Harina #3221" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">Categoría Legal</label>
              <select value={categoria} onChange={e => setCategoria(e.target.value as any)} className="w-full border p-2.5 bg-white text-xs rounded-lg focus:outline-none">
                <option value="Registro sanitario">Registro sanitario</option>
                <option value="Ficha técnica">Ficha técnica</option>
                <option value="Certificado proveedor">Certificado proveedor</option>
                <option value="Albarán">Albarán</option>
                <option value="Informe trazabilidad">Informe de trazabilidad</option>
                <option value="Plan limpieza">Plan de limpieza</option>
                <option value="APPCC">Manual APPCC</option>
                <option value="Inspección">Inspección de alimentos</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">Punto / Lote vinculación</label>
              <input type="text" required value={relacion} onChange={e => setRelacion(e.target.value)} className="w-full border p-2.5 text-xs focus:outline-none rounded-lg" placeholder="ej. Lote L2310-01" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t text-xs">
            <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 bg-white border font-bold rounded-lg">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white font-bold rounded-lg pointer">Cargar Archivo</button>
          </div>
        </form>
      )}

      <div className="bg-white border border-[#e0e3e5] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-[#e0e3e5] text-xs">
              <th className="px-6 py-4 font-bold text-slate-600">Expediente</th>
              <th className="px-6 py-4 font-bold text-slate-600">Categoría</th>
              <th className="px-6 py-4 font-bold text-slate-600">Punto de Asociación</th>
              <th className="px-6 py-4 font-bold text-slate-600">Fecha Carga</th>
              <th className="px-6 py-4 font-bold text-slate-600">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium">
            {documentos.map(doc => (
              <tr key={doc.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <span className="font-bold text-slate-900 block">{doc.nombre}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">Subido por: {doc.usuarioSubio}</span>
                </td>
                <td className="px-6 py-4 text-[#0058be] font-semibold">{doc.categoria}</td>
                <td className="px-6 py-4 text-slate-700 font-bold">{doc.relacionNombre}</td>
                <td className="px-6 py-4 text-slate-400 font-mono">{doc.fechaSubida}</td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-bold bg-green-100 text-green-800 uppercase px-2 py-0.5 rounded">
                    Vigente
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// 9. INFORMES VIEW (Simulated exporter UI)
// ==========================================
interface InformesViewProps {
  onGenerateReport: (type: string) => void;
}

export function InformesView({ onGenerateReport }: InformesViewProps) {
  const reports = [
    { title: 'Informe Sanitario de Trazabilidad por Lote', desc: 'Mapea la trazabilidad completa hacia atrás, composición e incidencias.', filter: 'Lote producc' },
    { title: 'Informe de Registro de Temperaturas APPCC', desc: 'Monitoreo de equipos frigoríficos y auditorías térmicas diarias.', filter: 'Rango fecha' },
    { title: 'Informe de Fichas Técnicas de Alérgenos Declarados', desc: 'Consolidación de ingredientes, alérgenos y recetas maestras para sanidad.', filter: 'Todo obrador' },
    { title: 'Informe de Auditoría y Control Higiénico L&D', desc: 'Comprobación de firmas, productos y frecuencias de plan de limpieza.', filter: 'Fecha / Mes' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">Generador de Informes de Calidad</h2>
        <p className="text-slate-500 text-xs">Generación de informes de exportación en formato oficial homologado para auditores de sanidad.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((rep, idx) => (
          <div key={idx} className="bg-white border border-[#e0e3e5] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover-scale">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-primary tracking-wider flex items-center gap-1">
                <Sliders size={12} />
                <span>Parámetro: {rep.filter}</span>
              </span>
              <h4 className="font-bold text-slate-900 text-sm leading-snug">{rep.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{rep.desc}</p>
            </div>

            <div className="pt-4 border-t flex justify-end gap-2 mt-4 text-xs font-bold">
              <button
                onClick={() => onGenerateReport(`${rep.title} (XLS)`)}
                className="px-3.5 py-2 hover:bg-slate-50 text-slate-700 bg-white border rounded-lg flex items-center gap-1 border-slate-200"
              >
                <Download size={14} />
                <span>CSV</span>
              </button>
              <button
                onClick={() => onGenerateReport(`${rep.title} (PDF)`)}
                className="px-3.5 py-2 bg-[#0058be] hover:bg-primary text-white rounded-lg flex items-center gap-1 shadow-sm"
              >
                <Printer size={14} />
                <span>Exportar PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 10. EQUIPO VIEW
// ==========================================
export function EquipoView() {
  const users = [
    { name: 'Dr. Manuel García', role: 'Responsable de calidad', mail: 'm.garcia@trazalimento.com', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClpjRkPw99YlTQPKus-JGTgUXbntwaf8h7SW6W9GfjOtBwRAYrUdLOkHZlVTxSBAnQdvDorfMWFgYHkm7MXWZg7ORKKNygOwI3ba6zfGvDi4N5zRp-q5FyqdjzVKSPFIx6SBP2Sa7A7uaNMwzIWK4c-X0LPvoHj9dIXx05pSoL1LeVoGrHiMyItL9cEW1jfwyuk26JcRrVjYTwxvm2ofwebjia-g3dFzMS0bByLKpmh-0hgsSnOhCiCoTfeUaHlUdayHpxJo2I7LR4' },
    { name: 'Ana Belén Rivas', role: 'Trabajador de Obrador', mail: 'ana.belen@trazalimento.com', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJkkC2HvBL4pcY0QSqxge6E3dgMPeOlR3t4EUZf5i_O8njsym87pnoy3mL1WPsXiVOkz0vUI3vbcQbkaN4hX8kq1cxbM9rhQzdMOoQxFpR4EI-yg_J6iwODDRTi8Z3kcNzXo9I4H_nl-cAgOfpYBSwl0sw4wucpyxSqPZkyzat8KlWSvzP-aHDQrCKh9L_vifgImnBGSPwdvTuWRRMEm32DjtVH0UlitwA8gyNFYazcbTghrtT4RAk4zJhEON_HmrBfP3qetFa8nTS' },
    { name: 'Carlos Ruíz Blanco', role: 'Trabajador de Obrador', mail: 'carlos.ruiz@trazalimento.com', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClpjRkPw99YlTQPKus-JGTgUXbntwaf8h7SW6W9GfjOtBwRAYrUdLOkHZlVTxSBAnQdvDorfMWFgYHkm7MXWZg7ORKKNygOwI3ba6zfGvDi4N5zRp-q5FyqdjzVKSPFIx6SBP2Sa7A7uaNMwzIWK4c-X0LPvoHj9dIXx05pSoL1LeVoGrHiMyItL9cEW1jfwyuk26JcRrVjYTwxvm2ofwebjia-g3dFzMS0bByLKpmh-0hgsSnOhCiCoTfeUaHlUdayHpxJo2I7LR4' },
    { name: 'Marta Soler Gil', role: 'Supervisor de Calidad', mail: 'marta.soler@trazalimento.com' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">Organigrama de Personal y Roles</h2>
        <p className="text-slate-500 text-xs">Asignación de privilegios de firma y validación documental.</p>
      </div>

      <div className="bg-white border border-[#e0e3e5] rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100">
        {users.map((u, idx) => (
          <div key={idx} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              {u.avatar ? (
                <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-full border border-slate-200 object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm">
                  {u.name.charAt(0)}
                </div>
              )}
              <div>
                <h4 className="font-bold text-slate-950 text-sm leading-tight">{u.name}</h4>
                <p className="text-xs text-[#0058be] font-bold mt-1 uppercase tracking-wide">{u.role}</p>
              </div>
            </div>

            <div className="text-right text-xs">
              <span className="text-slate-400 block font-mono">{u.mail}</span>
              <span className="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded uppercase mt-1.5 inline-block">Firma Habilitada</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 11. CONFIGURACION VIEW
// ==========================================
export function ConfiguracionView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[#191b23]">Configuración del Sistema</h2>
        <p className="text-slate-500 text-xs">Configuración del SaaS y datos del registro sanitario industrial del obrador.</p>
      </div>

      <div className="bg-white border border-[#e0e3e5] rounded-2xl p-6 shadow-sm space-y-6 max-w-xl">
        <div className="flex items-center gap-3 border-b pb-4">
          <Building2 size={24} className="text-[#0058be]" />
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Obrador Artesano Demo</h3>
            <p className="text-[11px] text-slate-400">ID de Suscripción: TRZ-2026-62KA8</p>
          </div>
        </div>

        <div className="space-y-4 text-xs font-semibold">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-500 text-[10px] uppercase block">Registro Sanitario Nacional</label>
              <input type="text" readOnly value="RGSEAA: 20.041122/RI" className="w-full border p-2 text-xs bg-slate-50 font-bold font-mono focus:outline-none rounded-lg" />
            </div>
            <div className="space-y-1">
              <label className="text-slate-500 text-[10px] uppercase block">Días de Alertas Preventivas</label>
              <input type="number" defaultValue="7" className="w-full border p-2 text-xs focus:ring-1 focus:ring-primary rounded-lg focus:outline-none" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-500 text-[10px] uppercase block">Dirección de Instalaciones</label>
            <input type="text" readOnly value="Polígono Industrial El Sequero, Logroño, España" className="w-full border p-2 text-xs bg-slate-50 rounded-lg focus:outline-none" />
          </div>

          <div className="space-y-1 pt-2 border-t flex justify-between items-center text-slate-400">
            <span className="text-[10px]">Sincronización con base de datos en nube en tiempo real habilitada con claves de encriptado SSL.</span>
            <button
              onClick={() => alert('Parámetros de calidad grabados de forma integral.')}
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold"
            >
              Grabar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
