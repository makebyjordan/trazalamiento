/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Package, Plus, Clipboard, Thermometer, Clock, X, Eye, AlertTriangle } from 'lucide-react';
import { Producto, CategoriaProducto, AlergenoType, Receta } from '../types';

interface ProductosViewProps {
  productos: Producto[];
  recetas: Receta[];
  onAddProducto: (nuevo: Omit<Producto, 'id'>) => void;
  searchTerm: string;
}

export default function ProductosView({
  productos,
  recetas,
  onAddProducto,
  searchTerm
}: ProductosViewProps) {
  const [selectedCat, setSelectedCat] = useState<string>('Todos');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFicha, setSelectedFicha] = useState<Producto | null>(null);

  // New product form states
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState<CategoriaProducto>('Panadería');
  const [descripcion, setDescripcion] = useState('');
  const [vidaUtil, setVidaUtil] = useState(5);
  const [temp, setTemp] = useState(4);
  const [stock, setStock] = useState(25);
  const [conservandoles, setConservandoles] = useState('Conserve refrigerado entre 2 y 6°C');
  const [alergenosSeleccionados, setAlergenosSeleccionados] = useState<AlergenoType[]>([]);
  const [recetaId, setRecetaId] = useState('');

  const availableAlergenos: AlergenoType[] = [
    'Gluten', 'Huevos', 'Leche', 'Pescado', 'Frutos de cáscara', 'Soja', 'Mostaza', 'Sésamo', 'Sulfitos', 'Altramuces'
  ];

  const handleCategoryToggle = (cat: string) => {
    setSelectedCat(cat);
  };

  const handleToggleAlergeno = (al: AlergenoType) => {
    if (alergenosSeleccionados.includes(al)) {
      setAlergenosSeleccionados(alergenosSeleccionados.filter(x => x !== al));
    } else {
      setAlergenosSeleccionados([...alergenosSeleccionados, al]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    onAddProducto({
      nombre,
      categoria,
      descripcion,
      vidaUtilDias: Number(vidaUtil),
      temperaturaConservacionC: Number(temp),
      stockEstimadoUds: Number(stock),
      condicionesConservacion: conservandoles,
      alergenos: alergenosSeleccionados,
      recetaAsociadaId: recetaId || undefined,
      fotoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkZ40mQxfmUe-oAFAbAZUQZXscQ_P2kw8sDpHGxE-bprF42eSS9X1dvrp4-yisaglyja_GHN-ZF8c9YJMr3SdpU9EFfq72ZL1xqAkeOUx2lH3z8y_TB6WHqFUBNBEfkYXrL9VUKZKmHcI0nhwne4XDfkeafcskJdexAerBEnx8RCim_Lm-wPyvOYDKJWKZi46r_4-Ekoop4tbIXdcGR3ITWO71zf2JM7-jBRFwNHcvZWrnW2zOo-awsZDfAD1TGtk1MyzqYIjNp8sy',
      estado: 'Disponible'
    });

    // Reset fields
    setNombre('');
    setDescripcion('');
    setVidaUtil(5);
    setTemp(4);
    setStock(25);
    setRecetaId('');
    setAlergenosSeleccionados([]);
    setShowAddModal(false);
  };

  // Filter items based on category and search term
  const filtered = productos.filter(p => {
    const matchesCat = selectedCat === 'Todos' || p.categoria === selectedCat;
    const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Catalogo */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-sans text-3xl font-bold text-slate-900 tracking-tight">Catálogo de Productos Elaborados</h2>
          <p className="text-sm text-slate-500 mt-0.5">Gestión y trazabilidad de productos terminados en planta.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm active:scale-95"
        >
          <Plus size={16} />
          <span>Añadir Producto</span>
        </button>
      </div>

      {/* Categories Filters & Total count */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-[#e0e3e5] p-4 rounded-xl">
        <div className="flex flex-wrap gap-2">
          {['Todos', 'Panadería', 'Repostería', 'Pre-cocinados', 'Salsas'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryToggle(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                selectedCat === cat
                  ? 'bg-blue-50 text-primary border border-primary/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total productos</span>
          <p className="text-sm font-bold text-primary">{filtered.length} Items mostrados</p>
        </div>
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="text-center p-12 bg-white border border-dashed border-[#e0e3e5] rounded-2xl flex flex-col items-center justify-center gap-2">
          <Package className="text-slate-300" size={48} />
          <h4 className="font-bold text-slate-700 mt-2">No se encontraron productos</h4>
          <p className="text-xs text-slate-400">Intente modificar los filtros o registre un nuevo producto arriba.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((prod) => (
            <article
              key={prod.id}
              className="bg-white border border-[#e0e3e5] rounded-2xl overflow-hidden hover-scale duration-300 flex flex-col group relative"
            >
              {/* Product Photo */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={prod.fotoUrl}
                  alt={prod.nombre}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                  prod.stockEstimadoUds <= 10
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-primary'
                }`}>
                  Stock: {prod.stockEstimadoUds} ud
                </span>
              </div>

              {/* Product Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wide">
                      {prod.categoria}
                    </span>
                    {/* Alergenos triggers visually */}
                    {prod.alergenos.length > 0 && (
                      <div className="flex gap-1" title="Contiene alérgenos declarados">
                        <AlertTriangle size={14} className="text-amber-500" />
                        <span className="text-[10px] font-bold text-amber-700 uppercase">
                          {prod.alergenos.length} alérg.
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-sans text-base font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {prod.nombre}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {prod.descripcion}
                  </p>
                </div>

                <div className="mt-4 space-y-4">
                  {/* Micro Specs */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Vida Útil</span>
                      <div className="flex items-center gap-1 font-bold text-slate-700 text-xs">
                        <Clock size={12} className="text-slate-400" />
                        <span>{prod.vidaUtilDias} Días</span>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Conservación</span>
                      <div className="flex items-center gap-1 font-bold text-slate-700 text-xs">
                        <Thermometer size={12} className="text-slate-400" />
                        <span>{prod.temperaturaConservacionC}°C</span>
                      </div>
                    </div>
                  </div>

                  {/* Ver Ficha Técnica Button */}
                  <button
                    onClick={() => setSelectedFicha(prod)}
                    className="w-full py-2.5 border border-[#e2e8f0] hover:bg-blue-50 hover:text-primary hover:border-blue-200 text-slate-700 font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <Eye size={14} />
                    <span>Ver Ficha Técnica</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* MODAL 1: VER FICHA TECNICA COMPLETA */}
      {selectedFicha && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl border border-slate-100 shadow-2xl overflow-hidden animate-scale-up">
            <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Ficha Técnica Alimentaria</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedFicha.nombre}</h3>
                <p className="text-xs text-slate-500 font-medium">Categoría: {selectedFicha.categoria}</p>
              </div>
              <button
                onClick={() => setSelectedFicha(null)}
                className="p-1.5 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden h-40 bg-slate-100">
                  <img
                    src={selectedFicha.fotoUrl}
                    alt={selectedFicha.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-slate-400 uppercase tracking-wider">Especificaciones de Calidad</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Vida Útil Regulada</p>
                      <p className="font-bold text-sm text-slate-800 mt-1">{selectedFicha.vidaUtilDias} Días</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Temperatura Conservación</p>
                      <p className="font-bold text-sm text-slate-800 mt-1">{selectedFicha.temperaturaConservacionC}°C</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <p className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Condiciones de Preservación</p>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">{selectedFicha.condicionesConservacion}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-1">Descripción del Producto</h4>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">{selectedFicha.descripcion}</p>
              </div>

              {/* Allergen check */}
              <div>
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">Declaración Obligatoria de Alérgenos (Directiva 1169/2011)</h4>
                {selectedFicha.alergenos.length === 0 ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full">
                    ✓ Sin Alérgenos Declarados
                  </span>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedFicha.alergenos.map((al) => (
                      <span
                        key={al}
                        className="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full uppercase tracking-wider"
                      >
                        ⚠️ Contiene {al}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Associated Formulation Recipe */}
              <div>
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">Formulación / Receta Vinculada</h4>
                {selectedFicha.recetaAsociadaId ? (
                  (() => {
                    const matchedR = recetas.find(r => r.id === selectedFicha.recetaAsociadaId);
                    return matchedR ? (
                      <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl space-y-2">
                        <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-blue-100">
                          <span className="text-xs font-bold text-primary">{matchedR.nombre}</span>
                          <span className="text-[10px] font-bold bg-blue-100 text-primary px-2 py-0.5 rounded uppercase">Rend: {matchedR.rendimientoEstimado}</span>
                        </div>
                        <div className="text-xs text-slate-600 font-medium">
                          <p className="font-bold text-slate-800 block mb-1">Ingredientes de Formulación:</p>
                          <ul className="list-disc pl-4 space-y-1">
                            {matchedR.ingredientes.map((ing, k) => (
                              <li key={k}>
                                {ing.nombre}: <span className="font-bold text-slate-900">{ing.cantidad} {ing.unidad}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">No disponible</p>
                    );
                  })()
                ) : (
                  <p className="text-xs text-slate-400 italic">No se ha asignado receta estructural a esta ficha.</p>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => {
                  alert(`Generando especificación técnica PDF homologada para sanidad de ${selectedFicha.nombre}...`);
                }}
                className="px-4 py-2 bg-primary text-white font-bold rounded-lg text-xs"
              >
                Exportar Ficha Técnica PDF
              </button>
              <button
                onClick={() => setSelectedFicha(null)}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg text-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: AÑADIR NUEVO PRODUCTO FORM */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg border border-slate-100 shadow-2xl overflow-hidden animate-scale-up">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Clipboard size={18} className="text-primary" />
                <span>Alta de Nuevo Producto Terminado</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Nombre del Producto</label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="ej. Panettone Tradicional con Frutas"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Categoría</label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value as CategoriaProducto)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Panadería">Panadería</option>
                    <option value="Repostería">Repostería</option>
                    <option value="Pre-cocinados">Pre-cocinados</option>
                    <option value="Salsas">Salsas</option>
                    <option value="Conservas">Conservas</option>
                    <option value="Lácteos">Lácteos</option>
                    <option value="Cárnicos">Cárnicos</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Fórmula de Receta Asociada</label>
                  <select
                    value={recetaId}
                    onChange={(e) => setRecetaId(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Ninguna asociada</option>
                    {recetas.map(r => (
                      <option key={r.id} value={r.id}>{r.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Vida Útil (Días)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={vidaUtil}
                    onChange={(e) => setVidaUtil(Number(e.target.value))}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Temp Conservación (°C)</label>
                  <input
                    type="number"
                    required
                    value={temp}
                    onChange={(e) => setTemp(Number(e.target.value))}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Stock Estimado Inicial</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Condición de Conservación Recomendada</label>
                <input
                  type="text"
                  value={conservandoles}
                  onChange={(e) => setConservandoles(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none"
                  placeholder="ej. Almacenar hermético fresco"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Descripción del Producto</label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2 text-xs focus:outline-none"
                  rows={2}
                  placeholder="Detalles sobre aromas, textura y etiquetado sanitario..."
                ></textarea>
              </div>

              {/* Alergenos Picker */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Alérgenos Presentes Obligatorios</label>
                <div className="grid grid-cols-2 gap-2 max-h-24 overflow-y-auto p-2 bg-slate-50 border border-slate-100 rounded-lg">
                  {availableAlergenos.map((al) => {
                    const hasAl = alergenosSeleccionados.includes(al);
                    return (
                      <button
                        type="button"
                        key={al}
                        onClick={() => handleToggleAlergeno(al)}
                        className={`text-left p-1 rounded px-2 text-[11px] font-semibold transition-colors flex items-center justify-between ${
                          hasAl
                            ? 'bg-amber-100 text-amber-950 hover:bg-amber-200'
                            : 'bg-white text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span>{al}</span>
                        {hasAl && <span className="text-[10px]">⚠️</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg text-xs"
                >
                  Dar de Alta Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
