/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AlergenoType =
  | 'Gluten'
  | 'Crustáceos'
  | 'Huevos'
  | 'Pescado'
  | 'Cacahuetes'
  | 'Soja'
  | 'Leche'
  | 'Frutos de cáscara'
  | 'Apio'
  | 'Mostaza'
  | 'Sésamo'
  | 'Sulfitos'
  | 'Altramuces'
  | 'Moluscos';

export type CategoriaProducto =
  | 'Panadería'
  | 'Repostería'
  | 'Pre-cocinados'
  | 'Salsas'
  | 'Conservas'
  | 'Lácteos'
  | 'Cárnicos'
  | 'Otros';

export type EstadoLote = 'Activo' | 'Vendido' | 'Caducado' | 'Retirado' | 'Bloqueado';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'Owner' | 'Admin' | 'Responsable de calidad' | 'Trabajador' | 'Viewer';
  avatar?: string;
}

export interface Proveedor {
  id: string;
  nombre: string;
  contacto: string;
  telefono: string;
  email: string;
  direccion: string;
  tipoProducto: string;
  documentos: string[]; // Nombres de documentos
  estado: 'Activo' | 'Inactivo';
}

export interface Ingrediente {
  id: string; // p. ej. ING-001
  nombre: string;
  proveedorId: string;
  proveedorNombre: string;
  categoria: string;
  loteProveedor: string;
  fechaEntrada: string; // YYYY-MM-DD
  fechaCaducidad: string; // YYYY-MM-DD
  alergenos: AlergenoType[];
  stock: number;
  unidad: 'kg' | 'g' | 'L' | 'ml' | 'uds';
  condicionesConservacion: string;
  notas?: string;
  documentoAsociado?: string;
}

export interface RecetaIngrediente {
  ingredienteId: string;
  nombre: string;
  cantidad: number;
  unidad: 'kg' | 'g' | 'L' | 'ml' | 'uds';
}

export interface Receta {
  id: string;
  nombre: string;
  productoAsociadoId?: string;
  productoNombre?: string;
  ingredientes: RecetaIngrediente[];
  procesoElaboracion: string;
  tiempoPreparacionMinutos: number;
  temperaturaRecomendadaC?: number;
  rendimientoEstimado: string;
  costeEstimadoPorUnidad: number;
  alergenosHeredados: AlergenoType[];
}

export interface Producto {
  id: string;
  nombre: string;
  categoria: CategoriaProducto;
  fotoUrl: string;
  recetaAsociadaId?: string;
  vidaUtilDias: number;
  temperaturaConservacionC: number;
  alergenos: AlergenoType[];
  estado: 'Disponible' | 'Sin Stock' | 'En Producción';
  ultimoLoteCodigo?: string;
  stockEstimadoUds: number;
  condicionesConservacion: string;
  descripcion: string;
}

export interface LoteIngredienteUtilizado {
  ingredienteId: string;
  nombre: string;
  loteProveedor: string;
  proveedorNombre: string;
  cantidadUtilizada: number;
  unidad: string;
}

export interface Lote {
  codigo: string; // p. ej. L2310-01 o PRODUCTO-YYYYMMDD-XXX
  productoId: string;
  productoNombre: string;
  recetaId?: string;
  fechaProduccion: string; // YYYY-MM-DD
  fechaCaducidad: string; // YYYY-MM-DD
  cantidadProducida: number;
  unidad: string;
  responsableNombre: string;
  ingredientesUtilizados: LoteIngredienteUtilizado[];
  alergenos: AlergenoType[];
  estado: EstadoLote;
  incidenciasId?: string[];
  documentos?: string[];
}

export interface RegistroTemperatura {
  id: string;
  zonaId: string;
  zonaNombre: string;
  temperaturaC: number;
  hora: string; // HH:MM o YYYY-MM-DD HH:MM
  responsableNombre: string;
  estado: 'Correcto' | 'Advertencia' | 'Fuera de rango';
  observaciones?: string;
  fotoUrl?: string;
}

export interface ZonaTemperatura {
  id: string;
  nombre: string;
  categoria: 'Cámara frigorífica' | 'Congelador' | 'Obrador' | 'Vitrina' | 'Transporte' | 'Cocción' | 'Enfriamiento';
  temperaturaMinC: number;
  temperaturaMaxC: number;
  temperaturaActualC: number;
  unidadAsociada?: string;
}

export interface PlanLimpieza {
  id: string;
  zona: string;
  frecuencia: 'Diaria' | 'Semanal' | 'Mensual' | 'Después de usar';
  responsableRol: string;
  ultimaLimpiezaFecha?: string;
  proximaLimpiezaFecha: string;
  estado: 'Pendiente' | 'Completada' | 'Vencida';
  productoUsado: string;
  observaciones?: string;
  firmaValidador?: string;
}

export interface Incidencia {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: 'Temperatura' | 'Contaminación' | 'Caducidad' | 'Proveedor' | 'Limpieza' | 'Etiquetado' | 'Reclamación cliente' | 'Otro';
  prioridad: 'Baja' | 'Media' | 'Alta' | 'Crítica';
  productoAfectado?: string;
  loteAfectado?: string;
  ingredienteAfectado?: string;
  proveedorAfectado?: string;
  responsableNombre: string;
  accionCorrectiva?: string;
  estado: 'Abierta' | 'En revisión' | 'Acción correctiva aplicada' | 'Cerrada';
  fotoUrl?: string;
  fecha: string;
}

export interface DocumentoSector {
  id: string;
  nombre: string;
  categoria: 'Registro sanitario' | 'Ficha técnica' | 'Certificado proveedor' | 'Albarán' | 'Informe trazabilidad' | 'Plan limpieza' | 'APPCC' | 'Inspección' | 'Etiqueta' | 'Otro';
  relacionNombre: string; // p. ej. "Proveedor Harinas El Molino", "Lote L2310-01"
  estado: 'Vigente' | 'Caducado' | 'Pendiente de actualización';
  fechaSubida: string;
  fechaCaducidadDoc?: string;
  urlSimulada: string;
  usuarioSubio: string;
}

export interface LogActividad {
  id: string;
  tipo: 'lote' | 'temperatura' | 'limpieza' | 'incidencia' | 'ingrediente';
  descripcion: string;
  detalles: string;
  fechaHora: string; // 2026-06-03 14:00
}
