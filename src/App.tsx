/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './views/DashboardView';
import ProductosView from './views/ProductosView';
import LotesView from './views/LotesView';
import TemperaturasView from './views/TemperaturasView';
import {
  RecetasView,
  IngredientesView,
  CaducidadesView,
  ProveedoresView,
  AlergenosView,
  LimpiezaView,
  IncidenciasView,
  DocumentosView,
  InformesView,
  EquipoView,
  ConfiguracionView
} from './views/MainViewsContainer';

import {
  USUARIOS_DEMO,
  PROVEEDORES_MOCK,
  INGREDIENTES_MOCK,
  PRODUCTOS_MOCK,
  RECETAS_MOCK,
  LOTES_MOCK,
  REGISTROS_TEMPERATURA_MOCK,
  PLAN_LIMPIEZA_MOCK,
  INCIDENCIAS_MOCK,
  DOCUMENTOS_MOCK,
  ACTIVIDAD_MOCK
} from './mockData';

import {
  Usuario,
  Proveedor,
  Ingrediente,
  Producto,
  Receta,
  Lote,
  RegistroTemperatura,
  PlanLimpieza,
  Incidencia,
  DocumentoSector,
  LogActividad
} from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [usuarioActivo, setUsuarioActivo] = useState<Usuario>(USUARIOS_DEMO[0]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Sate collections
  const [proveedores, setProveedores] = useState<Proveedor[]>(PROVEEDORES_MOCK);
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>(INGREDIENTES_MOCK);
  const [productos, setProductos] = useState<Producto[]>(PRODUCTOS_MOCK);
  const [recetas, setRecetas] = useState<Receta[]>(RECETAS_MOCK);
  const [lotes, setLotes] = useState<Lote[]>(LOTES_MOCK);
  const [temperaturas, setTemperaturas] = useState<RegistroTemperatura[]>(REGISTROS_TEMPERATURA_MOCK);
  const [limpiezas, setLimpiezas] = useState<PlanLimpieza[]>(PLAN_LIMPIEZA_MOCK);
  const [incidencias, setIncidencias] = useState<Incidencia[]>(INCIDENCIAS_MOCK);
  const [documentos, setDocumentos] = useState<DocumentoSector[]>(DOCUMENTOS_MOCK);
  const [actividades, setActividades] = useState<LogActividad[]>(ACTIVIDAD_MOCK);

  // Helper helper to append activity logs
  const agregarLogActividad = (descripcion: string, detalles: string, tipo: 'lote' | 'temperatura' | 'limpieza' | 'incidencia') => {
    const nuevoLog: LogActividad = {
      id: `LOG-${Math.floor(Math.random() * 900) + 100}`,
      tipo,
      descripcion,
      detalles,
      fechaHora: 'Hoy ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setActividades(prev => [nuevoLog, ...prev]);
  };

  // State modification handlers
  const handleAddProducto = (newP: Omit<Producto, 'id'>) => {
    const created: Producto = {
      ...newP,
      id: `PROD-${Math.floor(Math.random() * 900) + 100}`
    };
    setProductos(prev => [created, ...prev]);
    agregarLogActividad(
      `Nuevo producto dado de alta`,
      `${created.nombre} (${created.categoria}) registrado en catálogo por ${usuarioActivo.nombre}.`,
      'lote'
    );
  };

  const handleAddReceta = (newR: Omit<Receta, 'id'>) => {
    const created: Receta = {
      ...newR,
      id: `REC-${Math.floor(Math.random() * 900) + 100}`
    };
    setRecetas(prev => [created, ...prev]);
    agregarLogActividad(
      `Fórmula master registrada`,
      `Se agregó la receta de formulación "${created.nombre}" por ${usuarioActivo.nombre}.`,
      'lote'
    );
  };

  const handleAddIngrediente = (newI: Omit<Ingrediente, 'id'>) => {
    const created: Ingrediente = {
      ...newI,
      id: `ING-${Math.floor(Math.random() * 900) + 100}`
    };
    setIngredientes(prev => [created, ...prev]);
    agregarLogActividad(
      `Albarán de entrada de Stock`,
      `Entrada de ${created.stock} ${created.unidad} de ${created.nombre} registrado por ${usuarioActivo.nombre}.`,
      'lote'
    );
  };

  const handleAddLote = (newL: Lote) => {
    setLotes(prev => [newL, ...prev]);
    agregarLogActividad(
      `Lote ${newL.codigo} elaborado`,
      `Se fabricaron ${newL.cantidadProducida} uds del producto terminando ${newL.productoNombre}.`,
      'lote'
    );
  };

  const handleAddRegistroTemperatura = (newT: Omit<RegistroTemperatura, 'id'>) => {
    const created: RegistroTemperatura = {
      ...newT,
      id: `TEMP-${Math.floor(Math.random() * 900) + 100}`
    };
    setTemperaturas(prev => [created, ...prev]);
    
    let notificationText = `Control de temperatura en ${created.zonaNombre} registrado: ${created.temperaturaC}°C.`;
    if (created.estado === 'Fuera de rango') {
      notificationText = `⚠️ Alarma térmica crítica disparada en ${created.zonaNombre}: ${created.temperaturaC}°C registrado por ${usuarioActivo.nombre}.`;
    }
    agregarLogActividad(
      created.estado === 'Fuera de rango' ? 'ALARMA TÉRMICA FUERA DE RANGO' : 'Registro de temperatura',
      notificationText,
      'temperatura'
    );
  };

  const handleToggleLimpieza = (id: string) => {
    setLimpiezas(prev => prev.map(l => {
      if (l.id === id) {
        return {
          ...l,
          estado: 'Completada',
          ultimaLimpiezaFecha: '2026-06-03',
          firmaValidador: `Validado por ${usuarioActivo.nombre} (${usuarioActivo.rol})`
        };
      }
      return l;
    }));
    const target = limpiezas.find(l => l.id === id);
    if (target) {
      agregarLogActividad(
        `Limpieza validada`,
        `Higiene aprobada electrónicamente en área ${target.zona} por ${usuarioActivo.nombre}.`,
        'limpieza'
      );
    }
  };

  const handleAddLimpieza = (newLim: Omit<PlanLimpieza, 'id'>) => {
    const created: PlanLimpieza = {
      ...newLim,
      id: `LIM-${Math.floor(Math.random() * 900) + 100}`
    };
    setLimpiezas(prev => [created, ...prev]);
    agregarLogActividad(
      `Nuevo protocolo de limpieza`,
      `Se introdujo el punto de verificación L&D para "${created.zona}" asignando a ${created.responsableRol}.`,
      'limpieza'
    );
  };

  const handleAddIncidencia = (newInc: Omit<Incidencia, 'id'>) => {
    const created: Incidencia = {
      ...newInc,
      id: `INC-${Math.floor(Math.random() * 900) + 100}`
    };
    setIncidencias(prev => [created, ...prev]);
    agregarLogActividad(
      `INCIDENCIA CRÍTICA REPORTADA`,
      `Alerta sanitaria abierta: ${created.titulo}. Afecta a: ${created.productoAfectado}.`,
      'incidencia'
    );
  };

  const handleResolveIncidencia = (id: string, accionCorrectiva: string) => {
    setIncidencias(prev => prev.map(inc => {
      if (inc.id === id) {
        return {
          ...inc,
          estado: 'Cerrada',
          accionCorrectiva
        };
      }
      return inc;
    }));
    const target = incidencias.find(i => i.id === id);
    if (target) {
      agregarLogActividad(
        `Incidencia mitigada y cerrada`,
        `Se aplicó acción correctora en: "${target.titulo}" disminuyendo el riesgo biológico.`,
        'incidencia'
      );
    }
  };

  const handleUploadDocumento = (newDoc: Omit<DocumentoSector, 'id'>) => {
    const created: DocumentoSector = {
      ...newDoc,
      id: `DOC-${Math.floor(Math.random() * 900) + 100}`
    };
    setDocumentos(prev => [created, ...prev]);
    agregarLogActividad(
      `Documentación cargada`,
      `Expediente legal "${created.nombre}" (${created.categoria}) cargado al repositorio por ${usuarioActivo.nombre}.`,
      'lote'
    );
  };

  // Dashboard quick-actions dispatcher
  const handleQuickAction = (actionType: 'lote' | 'temperatura' | 'limpieza' | 'incidencia') => {
    if (actionType === 'lote') {
      setCurrentView('lotes');
      alert('Se ha redirigido a Lotes. Por favor haga clic en "Registrar Nuevo Lote" para abrir el asistente de fabricación.');
    } else if (actionType === 'temperatura') {
      setCurrentView('temperaturas');
      alert('Se ha redirigido a Temperaturas. Por favor haga clic en "Registrar Temperatura Manual" para auditar frigoríficos.');
    } else if (actionType === 'limpieza') {
      setCurrentView('limpieza');
      alert('Se ha redirigido a Limpieza. Por favor haga clic en "Registrar Protocolo Limpieza" para certificar higiene.');
    } else if (actionType === 'incidencia') {
      setCurrentView('incidencias');
      alert('Se ha redirigido a Incidencias. Por favor haga clic en "Abrir Incidencia Crítica" para reportar alertas.');
    }
  };

  const handleGenerateReport = (repTitle: string) => {
    alert(`Generación certificada completa: El informe documental "${repTitle}" ha sido procesado de forma oficial conforme al APPCC de Obrador Artesano Demo.\n\nFila de salida: CSV de 42 columnas enlazadas.\nFirma validadora: ${usuarioActivo.nombre}.`);
  };

  const activeIncidenciasCount = incidencias.filter(i => i.estado === 'Abierta' || i.estado === 'En revisión').length;

  return (
    <div id="trazalimento-dashboard-wrapper" className="min-h-screen bg-[#f9f9ff] flex relative">
      {/* Sidebar navigation fixed (280px width) */}
      <Sidebar
        currentView={currentView}
        onViewChange={(v) => {
          setCurrentView(v);
          setSearchTerm(''); // clear search on switch to keep lists predictable
        }}
        usuarioActivo={usuarioActivo}
        onUsuarioChange={setUsuarioActivo}
        usuariosList={USUARIOS_DEMO}
        incidenciasActivasCount={activeIncidenciasCount}
      />

      {/* Main container offsetting sidebar (280px left padding) */}
      <div id="trazalimento-main-container" className="flex-1 pl-[280px] flex flex-col min-h-screen">
        {/* Top header bar */}
        <Header
          usuario={usuarioActivo}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          incidenciasCount={activeIncidenciasCount}
        />

        {/* Dynamic Inner Panel View Area with beautiful margins */}
        <main className="flex-grow p-8 max-w-[1400px] w-full mx-auto">
          {currentView === 'dashboard' && (
            <DashboardView
              lotes={lotes}
              ingredientes={ingredientes}
              temperaturas={temperaturas}
              limpiezas={limpiezas}
              incidencias={incidencias}
              actividades={actividades}
              onNavigate={setCurrentView}
              onQuickAction={handleQuickAction}
            />
          )}

          {currentView === 'productos' && (
            <ProductosView
              productos={productos}
              recetas={recetas}
              onAddProducto={handleAddProducto}
              searchTerm={searchTerm}
            />
          )}

          {currentView === 'recetas' && (
            <RecetasView
              recetas={recetas}
              ingredientes={ingredientes}
              onAddReceta={handleAddReceta}
              searchTerm={searchTerm}
            />
          )}

          {currentView === 'ingredientes' && (
            <IngredientesView
              ingredientes={ingredientes}
              proveedores={proveedores}
              onAddIngrediente={handleAddIngrediente}
              searchTerm={searchTerm}
            />
          )}

          {currentView === 'lotes' && (
            <LotesView
              lotes={lotes}
              productos={productos}
              recetas={recetas}
              ingredientes={ingredientes}
              onAddLote={handleAddLote}
              searchTerm={searchTerm}
            />
          )}

          {currentView === 'caducidades' && (
            <CaducidadesView
              ingredientes={ingredientes}
            />
          )}

          {currentView === 'proveedores' && (
            <ProveedoresView
              proveedores={proveedores}
              onAddProveedor={setProveedores as any} // we can use simple set or simple wrapper
              searchTerm={searchTerm}
            />
          )}

          {currentView === 'alergenos' && (
            <AlergenosView
              ingredientes={ingredientes}
            />
          )}

          {currentView === 'temperaturas' && (
            <TemperaturasView
              registros={temperaturas}
              onAddRegistro={handleAddRegistroTemperatura}
              searchTerm={searchTerm}
            />
          )}

          {currentView === 'limpieza' && (
            <LimpiezaView
              limpiezas={limpiezas}
              onToggleLimpieza={handleToggleLimpieza}
              onAddLimpieza={handleAddLimpieza}
            />
          )}

          {currentView === 'incidencias' && (
            <IncidenciasView
              incidencias={incidencias}
              onAddIncidencia={handleAddIncidencia}
              onResolveIncidencia={handleResolveIncidencia}
            />
          )}

          {currentView === 'documentos' && (
            <DocumentosView
              documentos={documentos}
              onUpload={handleUploadDocumento}
            />
          )}

          {currentView === 'informes' && (
            <InformesView
              onGenerateReport={handleGenerateReport}
            />
          )}

          {currentView === 'equipo' && (
            <EquipoView />
          )}

          {currentView === 'configuracion' && (
            <ConfiguracionView />
          )}
        </main>
      </div>
    </div>
  );
}
