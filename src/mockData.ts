/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Proveedor,
  Ingrediente,
  Receta,
  Producto,
  Lote,
  ZonaTemperatura,
  RegistroTemperatura,
  PlanLimpieza,
  Incidencia,
  DocumentoSector,
  LogActividad,
  Usuario
} from './types';

export const COMPANIA_DEMO = "Obrador Artesano Demo";

export const USUARIOS_DEMO: Usuario[] = [
  {
    id: 'U-01',
    nombre: 'Dr. Manuel García',
    email: 'm.garcia@trazalimento.com',
    rol: 'Responsable de calidad',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClpjRkPw99YlTQPKus-JGTgUXbntwaf8h7SW6W9GfjOtBwRAYrUdLOkHZlVTxSBAnQdvDorfMWFgYHkm7MXWZg7ORKKNygOwI3ba6zfGvDi4N5zRp-q5FyqdjzVKSPFIx6SBP2Sa7A7uaNMwzIWK4c-X0LPvoHj9dIXx05pSoL1LeVoGrHiMyItL9cEW1jfwyuk26JcRrVjYTwxvm2ofwebjia-g3dFzMS0bByLKpmh-0hgsSnOhCiCoTfeUaHlUdayHpxJo2I7LR4'
  },
  {
    id: 'U-02',
    nombre: 'Ana Belén Rivas',
    email: 'ana.belen@trazalimento.com',
    rol: 'Trabajador'
  },
  {
    id: 'U-03',
    nombre: 'Carlos Ruíz Blanco',
    email: 'carlos.ruiz@trazalimento.com',
    rol: 'Trabajador'
  },
  {
    id: 'U-04',
    nombre: 'Marta Soler Gil',
    email: 'marta.soler@trazalimento.com',
    rol: 'Admin'
  }
];

export const PROVEEDORES_MOCK: Proveedor[] = [
  {
    id: 'PROV-01',
    nombre: 'Harinas El Molino S.L.',
    contacto: 'Julián Rodríguez',
    telefono: '945 22 11 00',
    email: 'pedidos@harinaselmolino.com',
    direccion: 'Polígono Industrial El Sequero, Parcela 14, La Rioja',
    tipoProducto: 'Harinas y Cereales',
    documentos: ['Certificado Ecológico 2026.pdf', 'Ficha Técnica Harina Trigo.pdf'],
    estado: 'Activo'
  },
  {
    id: 'PROV-02',
    nombre: 'Lácteos del Norte S.A.',
    contacto: 'Lucía Fernández',
    telefono: '985 64 32 10',
    email: 'calidad@lacteosdelnorte.com',
    direccion: 'Lugar de Muñás, Valdés, Asturias',
    tipoProducto: 'Lácteos, Mantequillas y Natas',
    documentos: ['Registro Sanitario LA-40121.pdf'],
    estado: 'Activo'
  },
  {
    id: 'PROV-03',
    nombre: 'Salineras del Sur',
    contacto: 'Antonio Peralta',
    telefono: '956 78 89 90',
    email: 'ventas@salinerasdelsur.com',
    direccion: 'Salinas de San Fernando, Cádiz',
    tipoProducto: 'Sales y Especias',
    documentos: ['Análisis Químico Sal 2026.pdf'],
    estado: 'Activo'
  },
  {
    id: 'PROV-04',
    nombre: 'Eco-Granja Huevo de Oro',
    contacto: 'Beatriz Pascual',
    telefono: '921 50 12 34',
    email: 'beatriz@huevodeoro.es',
    direccion: 'Camino del Prado s/n, Turégano, Segovia',
    tipoProducto: 'Huevos y Ovoproductos',
    documentos: ['Certificación Bienestar Animal.pdf', 'Análisis Salmonela Mayo 2026.pdf'],
    estado: 'Activo'
  },
  {
    id: 'PROV-05',
    nombre: 'Sabor y Especias Import',
    contacto: 'Sanjay Kapoor',
    telefono: '934 88 77 66',
    email: 's.kapoor@saboryespecias.com',
    direccion: 'Calle Lepanto 342, Barcelona',
    tipoProducto: 'Frutos Secos, Aceites, Semillas',
    documentos: ['Aduanas Alérgenos Declarados.pdf'],
    estado: 'Activo'
  }
];

export const INGREDIENTES_MOCK: Ingrediente[] = [
  {
    id: 'ING-01',
    nombre: 'Harina de Trigo Eco',
    proveedorId: 'PROV-01',
    proveedorNombre: 'Harinas El Molino S.L.',
    categoria: 'Harinas',
    loteProveedor: 'HT-20260412-A',
    fechaEntrada: '2026-04-15',
    fechaCaducidad: '2026-10-15',
    alergenos: ['Gluten'],
    stock: 250,
    unidad: 'kg',
    condicionesConservacion: 'Lugar seco y aireado, alejado del suelo',
    documentoAsociado: 'Ficha Técnica Harina Trigo.pdf'
  },
  {
    id: 'ING-02',
    nombre: 'Masa Madre Activa',
    proveedorId: 'PROV-01', // produccion interna o asociada
    proveedorNombre: 'Producción Interna',
    categoria: 'Fermentos',
    loteProveedor: 'MM-20260601-01',
    fechaEntrada: '2026-06-01',
    fechaCaducidad: '2026-06-10',
    alergenos: ['Gluten'],
    stock: 12,
    unidad: 'kg',
    condicionesConservacion: 'Cámara refrigerada a 4°C'
  },
  {
    id: 'ING-03',
    nombre: 'Sal Marina del Atlántico Gorda',
    proveedorId: 'PROV-03',
    proveedorNombre: 'Salineras del Sur',
    categoria: 'Minerales',
    loteProveedor: 'SAL-05881',
    fechaEntrada: '2026-05-10',
    fechaCaducidad: '2029-05-10',
    alergenos: [],
    stock: 50,
    unidad: 'kg',
    condicionesConservacion: 'Mantener seco'
  },
  {
    id: 'ING-04',
    nombre: 'Huevo Líquido Pasteurizado Pasteur',
    proveedorId: 'PROV-04',
    proveedorNombre: 'Eco-Granja Huevo de Oro',
    categoria: 'Ovoproductos',
    loteProveedor: 'HUE-260528-04',
    fechaEntrada: '2026-05-30',
    fechaCaducidad: '2026-06-15',
    alergenos: ['Huevos'],
    stock: 80,
    unidad: 'L',
    condicionesConservacion: 'Cámara de frío 0-4°C',
    documentoAsociado: 'Análisis Salmonela Mayo 2026.pdf'
  },
  {
    id: 'ING-05',
    nombre: 'Queso Mozzarella de Búfala',
    proveedorId: 'PROV-02',
    proveedorNombre: 'Lácteos del Norte S.A.',
    categoria: 'Lácteos',
    loteProveedor: 'MOZ-0522-XP',
    fechaEntrada: '2026-05-24',
    fechaCaducidad: '2026-06-04', // Urgent warning - expires tomorrow
    alergenos: ['Leche'],
    stock: 10,
    unidad: 'kg',
    condicionesConservacion: 'Cámara de frío 2-4°C'
  },
  {
    id: 'ING-06',
    nombre: 'Salmón Ahumado Superior',
    proveedorId: 'PROV-05',
    proveedorNombre: 'Sabor y Especias Import',
    categoria: 'Pescados',
    loteProveedor: 'SALM-9912',
    fechaEntrada: '2026-05-29',
    fechaCaducidad: '2026-06-05', // Expires in 2 days
    alergenos: ['Pescado'],
    stock: 4,
    unidad: 'kg',
    condicionesConservacion: 'Cámara de frío 0-2°C'
  },
  {
    id: 'ING-07',
    nombre: 'Aceite de Oliva Virgen Extra Eco',
    proveedorId: 'PROV-05',
    proveedorNombre: 'Sabor y Especias Import',
    categoria: 'Aceites',
    loteProveedor: 'AOVE-2026-03',
    fechaEntrada: '2026-04-01',
    fechaCaducidad: '2027-10-01',
    alergenos: [],
    stock: 120,
    unidad: 'L',
    condicionesConservacion: 'Lugar oscuro a temperatura constante (15-20°C)'
  },
  {
    id: 'ING-08',
    nombre: 'Leche Entera UHT',
    proveedorId: 'PROV-02',
    proveedorNombre: 'Lácteos del Norte S.A.',
    categoria: 'Lácteos',
    loteProveedor: 'LECH-2405-A',
    fechaEntrada: '2026-05-28',
    fechaCaducidad: '2026-09-28',
    alergenos: ['Leche'],
    stock: 150,
    unidad: 'L',
    condicionesConservacion: 'Consumir refrigerada tras abrir'
  },
  {
    id: 'ING-09',
    nombre: 'Azúcar Moreno de Caña',
    proveedorId: 'PROV-05',
    proveedorNombre: 'Sabor y Especias Import',
    categoria: 'Otros',
    loteProveedor: 'AZU-1022',
    fechaEntrada: '2026-04-10',
    fechaCaducidad: '2028-04-10',
    alergenos: [],
    stock: 60,
    unidad: 'kg',
    condicionesConservacion: 'Almacenar en lugar seco'
  },
  {
    id: 'ING-10',
    nombre: 'Levadura Seca de Panadería',
    proveedorId: 'PROV-01',
    proveedorNombre: 'Harinas El Molino S.L.',
    categoria: 'Fermentos',
    loteProveedor: 'LEV-5511',
    fechaEntrada: '2026-05-02',
    fechaCaducidad: '2027-05-02',
    alergenos: [],
    stock: 15,
    unidad: 'kg',
    condicionesConservacion: 'Mantener herméticamente cerrado en seco'
  },
  {
    id: 'ING-11',
    nombre: 'Tomate Triturado Eco',
    proveedorId: 'PROV-05',
    proveedorNombre: 'Sabor y Especias Import',
    categoria: 'Otros',
    loteProveedor: 'TOM-2601',
    fechaEntrada: '2026-05-05',
    fechaCaducidad: '2027-11-05',
    alergenos: [],
    stock: 80,
    unidad: 'kg',
    condicionesConservacion: 'Lugar fresco y seco'
  },
  {
    id: 'ING-12',
    nombre: 'Albahaca Fresca en Hojas',
    proveedorId: 'PROV-05',
    proveedorNombre: 'Sabor y Especias Import',
    categoria: 'Otros',
    loteProveedor: 'ALB-3005-B',
    fechaEntrada: '2026-05-31',
    fechaCaducidad: '2026-06-03', // Expired today
    alergenos: [],
    stock: 2.5,
    unidad: 'kg',
    condicionesConservacion: 'Cámara de verduras a 8°C'
  },
  {
    id: 'ING-13',
    nombre: 'Quinoa Real Blanca Orgánica',
    proveedorId: 'PROV-05',
    proveedorNombre: 'Sabor y Especias Import',
    categoria: 'Otros',
    loteProveedor: 'QUI-0112',
    fechaEntrada: '2026-05-10',
    fechaCaducidad: '2026-06-25',
    alergenos: [],
    stock: 45,
    unidad: 'kg',
    condicionesConservacion: 'Almacén en seco'
  },
  {
    id: 'ING-14',
    nombre: 'Aguacate Fresh',
    proveedorId: 'PROV-05',
    proveedorNombre: 'Sabor y Especias Import',
    categoria: 'Otros',
    loteProveedor: 'AGU-1505',
    fechaEntrada: '2026-05-20',
    fechaCaducidad: '2026-06-06', // Expiracy in 3 days
    alergenos: [],
    stock: 15,
    unidad: 'kg',
    condicionesConservacion: 'Lugar templado para maduración'
  },
  {
    id: 'ING-15',
    nombre: 'Atún en Conserva en AOVE',
    proveedorId: 'PROV-05',
    proveedorNombre: 'Sabor y Especias Import',
    categoria: 'Otros',
    loteProveedor: 'ATU-2411-C',
    fechaEntrada: '2026-02-15',
    fechaCaducidad: '2029-02-15',
    alergenos: ['Pescado'],
    stock: 90,
    unidad: 'uds',
    condicionesConservacion: 'Estantería en despensa'
  },
  {
    id: 'ING-16',
    nombre: 'Mantequilla de Soria DOP',
    proveedorId: 'PROV-02',
    proveedorNombre: 'Lácteos del Norte S.A.',
    categoria: 'Lácteos',
    loteProveedor: 'MANT-S-77',
    fechaEntrada: '2026-05-22',
    fechaCaducidad: '2026-06-12', // Expiring in 9 days
    alergenos: ['Leche'],
    stock: 40,
    unidad: 'kg',
    condicionesConservacion: 'Refrigerado a 2-4°C'
  },
  {
    id: 'ING-17',
    nombre: 'Harina de Centeno Integral',
    proveedorId: 'PROV-01',
    proveedorNombre: 'Harinas El Molino S.L.',
    categoria: 'Harinas',
    loteProveedor: 'HC-5542',
    fechaEntrada: '2026-04-18',
    fechaCaducidad: '2026-10-18',
    alergenos: ['Gluten'],
    stock: 100,
    unidad: 'kg',
    condicionesConservacion: 'Seco y oscuro'
  },
  {
    id: 'ING-18',
    nombre: 'Chocolate Corazón Negro 70% Gotas',
    proveedorId: 'PROV-05',
    proveedorNombre: 'Sabor y Especias Import',
    categoria: 'Otros',
    loteProveedor: 'CHOCO-70-G',
    fechaEntrada: '2026-05-01',
    fechaCaducidad: '2027-05-01',
    alergenos: ['Leche', 'Frutos de cáscara'], // Mapped
    stock: 60,
    unidad: 'kg',
    condicionesConservacion: 'Temperatura templada controlada 16-18°C'
  },
  {
    id: 'ING-19',
    nombre: 'Almendra Molida Repostería',
    proveedorId: 'PROV-05',
    proveedorNombre: 'Sabor y Especias Import',
    categoria: 'Otros',
    loteProveedor: 'ALM-2504',
    fechaEntrada: '2026-04-20',
    fechaCaducidad: '2026-10-20',
    alergenos: ['Frutos de cáscara'],
    stock: 30,
    unidad: 'kg',
    condicionesConservacion: 'Seco, hermético'
  },
  {
    id: 'ING-20',
    nombre: 'Harina de Altramuz Premium',
    proveedorId: 'PROV-01',
    proveedorNombre: 'Harinas El Molino S.L.',
    categoria: 'Harinas',
    loteProveedor: 'ING-772-B', // Matches INC-772 / Warning
    fechaEntrada: '2026-05-18',
    fechaCaducidad: '2026-12-18',
    alergenos: ['Altramuces'],
    stock: 25,
    unidad: 'kg',
    condicionesConservacion: 'Lugar fresco y seco',
    notas: 'No contiene etiquetado explícito sobre alérgenos, se genera incidencia'
  }
];

export const PRODUCTOS_MOCK: Producto[] = [
  {
    id: 'PROD-01',
    nombre: 'Pan de Masa Madre',
    categoria: 'Panadería',
    fotoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJkkC2HvBL4pcY0QSqxge6E3dgMPeOlR3t4EUZf5i_O8njsym87pnoy3mL1WPsXiVOkz0vUI3vbcQbkaN4hX8kq1cxbM9rhQzdMOoQxFpR4EI-yg_J6iwODDRTi8Z3kcNzXo9I4H_nl-cAgOfpYBSwl0sw4wucpyxSqPZkyzat8KlWSvzP-aHDQrCKh9L_vifgImnBGSPwdvTuWRRMEm32DjtVH0UlitwA8gyNFYazcbTghrtT4RAk4zJhEON_HmrBfP3qetFa8nTS',
    recetaAsociadaId: 'REC-01',
    vidaUtilDias: 3,
    temperaturaConservacionC: 20,
    alergenos: ['Gluten'],
    estado: 'Disponible',
    ultimoLoteCodigo: 'L2310-01',
    stockEstimadoUds: 45,
    condicionesConservacion: 'Mantener en bolsa de tela o papel a temperatura ambiente',
    descripcion: 'Artisanal sourdough bread loaves prepared with organic wheat and active internal strain ferment lines.'
  },
  {
    id: 'PROD-02',
    nombre: 'Tarta Chocolate 70%',
    categoria: 'Repostería',
    fotoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3r7j3TtnwDu9Q_WJCnJojEDm2_a_Kpim1cJPPXYe9zTvqxVwIqw80DrCC3Vk73n3exav2630z8b_zwd8_yXwGdFJzbMoTMmoFOTV8K4JwozlBtYs-PGqhd3yRXgtMW5GsDHUWQaU32KKEJ0p6orFdS4_a-1xnlX0MNJhLUiZ3v-RmCL-tIIVd-OTUZ9IIbxM4JDJtGQ6ckxWKqKpTseGVo_Fk53WFVdLixvnoP1HUanKpGB7f-fmTe2LuVJ1jJS2bVuZ6ARsV19yP',
    recetaAsociadaId: 'REC-02',
    vidaUtilDias: 5,
    temperaturaConservacionC: 4,
    alergenos: ['Leche', 'Frutos de cáscara', 'Huevos'],
    estado: 'Disponible',
    ultimoLoteCodigo: 'L2310-02',
    stockEstimadoUds: 8,
    condicionesConservacion: 'Conserve en cámara frigorífica entre 2 y 6°C',
    descripcion: 'Rich dark chocolate cake slice crafted with intense cocoa and dairy butter.'
  },
  {
    id: 'PROD-03',
    nombre: 'Crema de Tomate Organ.',
    categoria: 'Salsas',
    fotoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkZ40mQxfmUe-oAFAbAZUQZXscQ_P2kw8sDpHGxE-bprF42eSS9X1dvrp4-yisaglyja_GHN-ZF8c9YJMr3SdpU9EFfq72ZL1xqAkeOUx2lH3z8y_TB6WHqFUBNBEfkYXrL9VUKZKmHcI0nhwne4XDfkeafcskJdexAerBEnx8RCim_Lm-wPyvOYDKJWKZi46r_4-Ekoop4tbIXdcGR3ITWO71zf2JM7-jBRFwNHcvZWrnW2zOo-awsZDfAD1TGtk1MyzqYIjNp8sy',
    recetaAsociadaId: 'REC-03',
    vidaUtilDias: 7,
    temperaturaConservacionC: 4,
    alergenos: [],
    estado: 'Disponible',
    ultimoLoteCodigo: 'L2310-04',
    stockEstimadoUds: 22,
    condicionesConservacion: 'Refrigeración en recipiente hermético',
    descripcion: 'Vibrant tomato pure soup base cooked with premium extra virgin olive oils.'
  },
  {
    id: 'PROD-04',
    nombre: 'Bowl Quinoa & Veggies',
    categoria: 'Pre-cocinados',
    fotoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9hngTtl9oYM1XiBpa0s1P6Dy8wASb1EkvwtKquVZIujk_gXc8aK1F0ciR8aPn8AGOSXDkhT8b6IHBWlCpPQuXKUqcJPPJQNQBldTgWjYsRdNK1MzXaNAH6r9mRIwpXU-kkcih-52AKO-8QgrwhI4-vYSP-f6jwgf1yiB-iW5Rf3bWdjQa9pqTXE1wy5IMKulG8Znsc9Hg-WT0Mu-xFNoqIeuRxKjQyoVYOA2pGwkci-QvLjBMpd16gs6oA7mPOYnn20ACICQHHC3v',
    recetaAsociadaId: 'REC-04',
    vidaUtilDias: 2,
    temperaturaConservacionC: 4,
    alergenos: ['Frutos de cáscara'], // Mapped from toppings
    estado: 'Disponible',
    stockEstimadoUds: 15,
    condicionesConservacion: 'Consumo directo frío',
    descripcion: 'Nutritious grains side with chopped fresh avocados, greens and olive oil vinaigrette.'
  },
  {
    id: 'PROD-05',
    nombre: 'Croissant Mantequilla',
    categoria: 'Repostería',
    fotoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtmmabzbjbjrIuguB5JxuTo_LSENyVnPjYAnQK0ie-pMQmYnuPglN3n0Bpvs_nAisBXg4YdRJovzgpGnRPxOkSWoxHiQ8DfIH_BcxPs3nzT7RQOYCv5_h1ayF0hue71iDTxRTJnEaRf_skDzyPRgqeWxY6J5mcfFZH8JxwgGQC0LpgDMSxPDonh43gUOy1lLm2C-bs8Cfxg2q_eXleHwIwO5BaCIT_7XwP0Ed08HT72t9VMmnWpN9MPowAmCUZQpdxqYTBh7IhTVIF',
    recetaAsociadaId: 'REC-05',
    vidaUtilDias: 2,
    temperaturaConservacionC: 18,
    alergenos: ['Gluten', 'Leche', 'Huevos'],
    estado: 'Disponible',
    ultimoLoteCodigo: 'L2310-05',
    stockEstimadoUds: 60,
    condicionesConservacion: 'Lugar fresco, consumir preferentemente en 24h',
    descripcion: 'Puff pastry croissant layers prepared with high-ratio butter sheets.'
  },
  {
    id: 'PROD-06',
    nombre: 'Baguette Tradición',
    categoria: 'Panadería',
    fotoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJkkC2HvBL4pcY0QSqxge6E3dgMPeOlR3t4EUZf5i_O8njsym87pnoy3mL1WPsXiVOkz0vUI3vbcQbkaN4hX8kq1cxbM9rhQzdMOoQxFpR4EI-yg_J6iwODDRTi8Z3kcNzXo9I4H_nl-cAgOfpYBSwl0sw4wucpyxSqPZkyzat8KlWSvzP-aHDQrCKh9L_vifgImnBGSPwdvTuWRRMEm32DjtVH0UlitwA8gyNFYazcbTghrtT4RAk4zJhEON_HmrBfP3qetFa8nTS',
    recetaAsociadaId: 'REC-06',
    vidaUtilDias: 1,
    temperaturaConservacionC: 20,
    alergenos: ['Gluten'],
    estado: 'Disponible',
    ultimoLoteCodigo: 'L2310-03',
    stockEstimadoUds: 120,
    condicionesConservacion: 'Consumir en el día',
    descripcion: 'French traditional baguette loaf, crusty and airy crumb.'
  },
  {
    id: 'PROD-07',
    nombre: 'Focaccia de Olivas',
    categoria: 'Panadería',
    fotoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtmmabzbjbjrIuguB5JxuTo_LSENyVnPjYAnQK0ie-pMQmYnuPglN3n0Bpvs_nAisBXg4YdRJovzgpGnRPxOkSWoxHiQ8DfIH_BcxPs3nzT7RQOYCv5_h1ayF0hue71iDTxRTJnEaRf_skDzyPRgqeWxY6J5mcfFZH8JxwgGQC0LpgDMSxPDonh43gUOy1lLm2C-bs8Cfxg2q_eXleHwIwO5BaCIT_7XwP0Ed08HT72t9VMmnWpN9MPowAmCUZQpdxqYTBh7IhTVIF',
    recetaAsociadaId: 'REC-07',
    vidaUtilDias: 2,
    temperaturaConservacionC: 20,
    alergenos: ['Gluten'],
    estado: 'Disponible',
    ultimoLoteCodigo: 'L2309-88',
    stockEstimadoUds: 18,
    condicionesConservacion: 'Lugar fresco hermético',
    descripcion: 'Soft historical Italian bread base enriched with olive oil drops and fresh sea salt flakes.'
  },
  {
    id: 'PROD-08',
    nombre: 'Salsa de Pesto Casera',
    categoria: 'Salsas',
    fotoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkZ40mQxfmUe-oAFAbAZUQZXscQ_P2kw8sDpHGxE-bprF42eSS9X1dvrp4-yisaglyja_GHN-ZF8c9YJMr3SdpU9EFfq72ZL1xqAkeOUx2lH3z8y_TB6WHqFUBNBEfkYXrL9VUKZKmHcI0nhwne4XDfkeafcskJdexAerBEnx8RCim_Lm-wPyvOYDKJWKZi46r_4-Ekoop4tbIXdcGR3ITWO71zf2JM7-jBRFwNHcvZWrnW2zOo-awsZDfAD1TGtk1MyzqYIjNp8sy',
    recetaAsociadaId: 'REC-08',
    vidaUtilDias: 10,
    temperaturaConservacionC: 4,
    alergenos: ['Frutos de cáscara', 'Leche'],
    estado: 'En Producción',
    stockEstimadoUds: 35,
    condicionesConservacion: 'Conservar con fina capa de aceite encima, refrigerado.',
    descripcion: 'Intense green basil emulsion with almonds, olive oil, and parmesan flakes.'
  }
];

export const RECETAS_MOCK: Receta[] = [
  {
    id: 'REC-01',
    nombre: 'Receta Pan de Masa Madre Tradicional',
    productoAsociadoId: 'PROD-01',
    productoNombre: 'Pan de Masa Madre',
    ingredientes: [
      { ingredienteId: 'ING-01', nombre: 'Harina de Trigo Eco', cantidad: 0.5, unidad: 'kg' },
      { ingredienteId: 'ING-02', nombre: 'Masa Madre Activa', cantidad: 0.1, unidad: 'kg' },
      { ingredienteId: 'ING-03', nombre: 'Sal Marina del Atlántico Gorda', cantidad: 0.01, unidad: 'kg' }
    ],
    procesoElaboracion: 'Mezclar la harina con el agua (autólisis). Añadir la masa madre activa. Reposar. Añadir la sal diluida. Realizar pliegues cada 45 minutos durante 3 horas. Formar los panes e introducir en banetones. Fermentación retardada en cámara frigorífica a 4°C durante 16 horas. Hornear a 240°C en olla de hierro fundido con vapor.',
    tiempoPreparacionMinutos: 1200, // incluye reposos largos
    temperaturaRecomendadaC: 20,
    rendimientoEstimado: '1 hogaza de 800g',
    costeEstimadoPorUnidad: 1.25,
    alergenosHeredados: ['Gluten']
  },
  {
    id: 'REC-02',
    nombre: 'Receta Tarta Chocolate Intensa',
    productoAsociadoId: 'PROD-02',
    productoNombre: 'Tarta Chocolate 70%',
    ingredientes: [
      { ingredienteId: 'ING-18', nombre: 'Chocolate Corazón Negro 70% Gotas', cantidad: 0.3, unidad: 'kg' },
      { ingredienteId: 'ING-16', nombre: 'Mantequilla de Soria DOP', cantidad: 0.2, unidad: 'kg' },
      { ingredienteId: 'ING-04', nombre: 'Huevo Líquido Pasteurizado Pasteur', cantidad: 0.15, unidad: 'L' },
      { ingredienteId: 'ING-09', nombre: 'Azúcar Moreno de Caña', cantidad: 0.15, unidad: 'kg' }
    ],
    procesoElaboracion: 'Fundir el chocolate negro junto con la mantequilla al baño maría. Batir los huevos pasteurizados con el azúcar moreno hasta doblar volumen. Incorporar delicadamente la emulsión de chocolate templado. Verter en moldes encamisados y hornear a 170°C durante 35 minutos de forma que el centro quede húmedo.',
    tiempoPreparacionMinutos: 60,
    temperaturaRecomendadaC: 4,
    rendimientoEstimado: '1 tarta de 8 raciones',
    costeEstimadoPorUnidad: 4.80,
    alergenosHeredados: ['Leche', 'Frutos de cáscara', 'Huevos']
  },
  {
    id: 'REC-03',
    nombre: 'Receta Crema de Tomate Organ.',
    productoAsociadoId: 'PROD-03',
    productoNombre: 'Crema de Tomate Organ.',
    ingredientes: [
      { ingredienteId: 'ING-11', nombre: 'Tomate Triturado Eco', cantidad: 0.8, unidad: 'kg' },
      { ingredienteId: 'ING-07', nombre: 'Aceite de Oliva Virgen Extra Eco', cantidad: 0.05, unidad: 'L' },
      { ingredienteId: 'ING-12', nombre: 'Albahaca Fresca en Hojas', cantidad: 0.01, unidad: 'kg' },
      { ingredienteId: 'ING-03', nombre: 'Sal Marina del Atlántico Gorda', cantidad: 0.005, unidad: 'kg' }
    ],
    procesoElaboracion: 'Sofreír ligeramente las hierbas en el aceite de oliva virgen extra. Añadir el tomate triturado y cocinar a fuego lento durante 40 minutos. Emulsionar e introducir en botellas térmicas en caliente para forzar vacío natural.',
    tiempoPreparacionMinutos: 50,
    temperaturaRecomendadaC: 4,
    rendimientoEstimado: '2 botellas de 500ml',
    costeEstimadoPorUnidad: 1.10,
    alergenosHeredados: []
  },
  {
    id: 'REC-04',
    nombre: 'Receta Bowl Quinoa & Veggies',
    productoAsociadoId: 'PROD-04',
    productoNombre: 'Bowl Quinoa & Veggies',
    ingredientes: [
      { ingredienteId: 'ING-13', nombre: 'Quinoa Real Blanca Orgánica', cantidad: 0.1, unidad: 'kg' },
      { ingredienteId: 'ING-14', nombre: 'Aguacate Fresh', cantidad: 0.08, unidad: 'kg' },
      { ingredienteId: 'ING-07', nombre: 'Aceite de Oliva Virgen Extra Eco', cantidad: 0.02, unidad: 'L' },
      { ingredienteId: 'ING-19', nombre: 'Almendra Molida Repostería', cantidad: 0.01, unidad: 'kg' } // topping
    ],
    procesoElaboracion: 'Cocer la quinoa en proporción 1:2 de agua salada durante 15 minutos hasta que el grano tape. Enfriar inmediatamente. Montar el bowl colocando base de quinoa, dados de aguacate, aliño emulsionado de aceite y espolvorear almendras.',
    tiempoPreparacionMinutos: 25,
    temperaturaRecomendadaC: 4,
    rendimientoEstimado: '1 ración individual',
    costeEstimadoPorUnidad: 2.15,
    alergenosHeredados: ['Frutos de cáscara']
  },
  {
    id: 'REC-05',
    nombre: 'Receta Croissant Mantequilla Laminado',
    productoAsociadoId: 'PROD-05',
    productoNombre: 'Croissant Mantequilla',
    ingredientes: [
      { ingredienteId: 'ING-01', nombre: 'Harina de Trigo Eco', cantidad: 0.4, unidad: 'kg' },
      { ingredienteId: 'ING-16', nombre: 'Mantequilla de Soria DOP', cantidad: 0.25, unidad: 'kg' },
      { ingredienteId: 'ING-04', nombre: 'Huevo Líquido Pasteurizado Pasteur', cantidad: 0.04, unidad: 'L' },
      { ingredienteId: 'ING-09', nombre: 'Azúcar Moreno de Caña', cantidad: 0.05, unidad: 'kg' },
      { ingredienteId: 'ING-03', nombre: 'Sal Marina del Atlántico Gorda', cantidad: 0.008, unidad: 'kg' }
    ],
    procesoElaboracion: 'Hacer masa base (amasijo) y reposar en frío. Estirar la mantequilla fría en placa uniforme. Realizar encamisado e iniciar 1 pliegue sencillo y 1 doble con reposos de 30 minutos a 2°C. Cortar triángulos, dar forma y fermentar a 24°C antes de pintar con huevo y hornear a 190°C.',
    tiempoPreparacionMinutos: 360,
    temperaturaRecomendadaC: 18,
    rendimientoEstimado: '10 croissants de 70g',
    costeEstimadoPorUnidad: 0.55,
    alergenosHeredados: ['Gluten', 'Leche', 'Huevos']
  },
  {
    id: 'REC-06',
    nombre: 'Receta Baguette Tradición Francesa',
    productoAsociadoId: 'PROD-06',
    productoNombre: 'Baguette Tradición',
    ingredientes: [
      { ingredienteId: 'ING-01', nombre: 'Harina de Trigo Eco', cantidad: 1, unidad: 'kg' },
      { ingredienteId: 'ING-10', nombre: 'Levadura Seca de Panadería', cantidad: 0.01, unidad: 'kg' },
      { ingredienteId: 'ING-03', nombre: 'Sal Marina del Atlántico Gorda', cantidad: 0.018, unidad: 'kg' }
    ],
    procesoElaboracion: 'Amasado lento sin calentar masa. Autólisis opcional. Añadir levadura y sal. Fermentación en bloque por 2h a 22°C. División en piezas de 350g, preformado cilíndrico. Reposo y formado final alargado. Greñar y hornear a 250°C con aporte masivo de vapor.',
    tiempoPreparacionMinutos: 180,
    temperaturaRecomendadaC: 20,
    rendimientoEstimado: '4 baguettes de 250g',
    costeEstimadoPorUnidad: 0.35,
    alergenosHeredados: ['Gluten']
  },
  {
    id: 'REC-07',
    nombre: 'Receta Focaccia de Olivas Negras',
    productoAsociadoId: 'PROD-07',
    productoNombre: 'Focaccia de Olivas',
    ingredientes: [
      { ingredienteId: 'ING-01', nombre: 'Harina de Trigo Eco', cantidad: 1, unidad: 'kg' },
      { ingredienteId: 'ING-07', nombre: 'Aceite de Oliva Virgen Extra Eco', cantidad: 0.15, unidad: 'L' },
      { ingredienteId: 'ING-10', nombre: 'Levadura Seca de Panadería', cantidad: 0.015, unidad: 'kg' },
      { ingredienteId: 'ING-03', nombre: 'Sal Marina del Atlántico Gorda', cantidad: 0.02, unidad: 'kg' }
    ],
    procesoElaboracion: 'Amasado de alta hidratación (80%). Incorporar aceite al final. Reposo de fermentación en bandeja aceitada. Presionar con los dedos creando oquedades típicas. Añadir olivas deshuesadas y esparcir sal gorda marina. Hornear a 230°C.',
    tiempoPreparacionMinutos: 150,
    temperaturaRecomendadaC: 20,
    rendimientoEstimado: '2 bandejas de focaccia',
    costeEstimadoPorUnidad: 1.40,
    alergenosHeredados: ['Gluten']
  },
  {
    id: 'REC-08',
    nombre: 'Receta Salsa de Pesto Almendra DOP',
    productoAsociadoId: 'PROD-08',
    productoNombre: 'Salsa de Pesto Casera',
    ingredientes: [
      { ingredienteId: 'ING-12', nombre: 'Albahaca Fresca en Hojas', cantidad: 0.1, unidad: 'kg' },
      { ingredienteId: 'ING-07', nombre: 'Aceite de Oliva Virgen Extra Eco', cantidad: 0.25, unidad: 'L' },
      { ingredienteId: 'ING-19', nombre: 'Almendra Molida Repostería', cantidad: 0.05, unidad: 'kg' },
      { ingredienteId: 'ING-05', nombre: 'Queso Mozzarella de Búfala', cantidad: 0.05, unidad: 'kg' } // base láctea
    ],
    procesoElaboracion: 'Escaldar levemente las hojas de albahaca para conservar el color verde brillante. Triturar pulsando intermitentemente con el aceite y la almendra molida. Integrar el queso muy fino emulsionando en frío.',
    tiempoPreparacionMinutos: 15,
    temperaturaRecomendadaC: 4,
    rendimientoEstimado: '5 tarros de 100ml',
    costeEstimadoPorUnidad: 1.85,
    alergenosHeredados: ['Frutos de cáscara', 'Leche']
  }
];

export const LOTES_MOCK: Lote[] = [
  {
    codigo: 'L2310-01',
    productoId: 'PROD-01',
    productoNombre: 'Pan de Masa Madre',
    recetaId: 'REC-01',
    fechaProduccion: '2026-06-02',
    fechaCaducidad: '2026-06-05',
    cantidadProducida: 250,
    unidad: 'uds',
    responsableNombre: 'Ana Belén Rivas',
    ingredientesUtilizados: [
      { ingredienteId: 'ING-01', nombre: 'Harina de Trigo Eco', loteProveedor: 'HT-20260412-A', proveedorNombre: 'Harinas El Molino S.L.', cantidadUtilizada: 125, unidad: 'kg' },
      { ingredienteId: 'ING-02', nombre: 'Masa Madre Activa', loteProveedor: 'MM-20260601-01', proveedorNombre: 'Producción Interna', cantidadUtilizada: 25, unidad: 'kg' },
      { ingredienteId: 'ING-03', nombre: 'Sal Marina del Atlántico Gorda', loteProveedor: 'SAL-05881', proveedorNombre: 'Salineras del Sur', cantidadUtilizada: 2.5, unidad: 'kg' }
    ],
    alergenos: ['Gluten'],
    estado: 'Activo',
    documentos: ['Certificado de Laboratorio L2310-01.pdf']
  },
  {
    codigo: 'L2310-02',
    productoId: 'PROD-02',
    productoNombre: 'Tarta Chocolate 70%',
    recetaId: 'REC-02',
    fechaProduccion: '2026-05-31',
    fechaCaducidad: '2026-06-04', // Expiry tomorrow relative to 2026-06-03
    cantidadProducida: 120,
    unidad: 'uds',
    responsableNombre: 'Carlos Ruíz Blanco',
    ingredientesUtilizados: [
      { ingredienteId: 'ING-18', nombre: 'Chocolate Corazón Negro 70% Gotas', loteProveedor: 'CHOCO-70-G', proveedorNombre: 'Sabor y Especias Import', cantidadUtilizada: 36, unidad: 'kg' },
      { ingredienteId: 'ING-16', nombre: 'Mantequilla de Soria DOP', loteProveedor: 'MANT-S-77', proveedorNombre: 'Lácteos del Norte S.A.', cantidadUtilizada: 24, unidad: 'kg' },
      { ingredienteId: 'ING-04', nombre: 'Huevo Líquido Pasteurizado Pasteur', loteProveedor: 'HUE-260528-04', proveedorNombre: 'Eco-Granja Huevo de Oro', cantidadUtilizada: 18, unidad: 'L' }
    ],
    alergenos: ['Leche', 'Frutos de cáscara', 'Huevos'],
    estado: 'Bloqueado', // Locked in screenshot
    incidenciasId: ['INC-001']
  },
  {
    codigo: 'L2310-03',
    productoId: 'PROD-06',
    productoNombre: 'Baguette Tradición',
    recetaId: 'REC-06',
    fechaProduccion: '2026-05-29',
    fechaCaducidad: '2026-05-30', // Already expired/sold
    cantidadProducida: 500,
    unidad: 'uds',
    responsableNombre: 'Ana Belén Rivas',
    ingredientesUtilizados: [
      { ingredienteId: 'ING-01', nombre: 'Harina de Trigo Eco', loteProveedor: 'HT-20260412-A', proveedorNombre: 'Harinas El Molino S.L.', cantidadUtilizada: 125, unidad: 'kg' },
      { ingredienteId: 'ING-10', nombre: 'Levadura Seca de Panadería', loteProveedor: 'LEV-5511', proveedorNombre: 'Harinas El Molino S.L.', cantidadUtilizada: 2.5, unidad: 'kg' }
    ],
    alergenos: ['Gluten'],
    estado: 'Vendido' // Sold in screenshot
  },
  {
    codigo: 'L2309-88',
    productoId: 'PROD-07',
    productoNombre: 'Focaccia de Olivas',
    recetaId: 'REC-07',
    fechaProduccion: '2026-06-01',
    fechaCaducidad: '2026-06-03', // Expires today
    cantidadProducida: 45,
    unidad: 'uds',
    responsableNombre: 'Marta Soler Gil',
    ingredientesUtilizados: [
      { ingredienteId: 'ING-01', nombre: 'Harina de Trigo Eco', loteProveedor: 'HT-20260412-A', proveedorNombre: 'Harinas El Molino S.L.', cantidadUtilizada: 22.5, unidad: 'kg' },
      { ingredienteId: 'ING-07', nombre: 'Aceite de Oliva Virgen Extra Eco', loteProveedor: 'AOVE-2026-03', proveedorNombre: 'Sabor y Especias Import', cantidadUtilizada: 4, unidad: 'L' }
    ],
    alergenos: ['Gluten'],
    estado: 'Activo'
  },
  {
    codigo: 'LOT-2024-0524-A', // From activity feed - Pasta Fresca
    productoId: 'PROD-04',
    productoNombre: 'Bowl Quinoa & Veggies',
    recetaId: 'REC-04',
    fechaProduccion: '2026-06-03',
    fechaCaducidad: '2026-06-05',
    cantidadProducida: 45,
    unidad: 'uds',
    responsableNombre: 'Marta Soler Gil',
    ingredientesUtilizados: [
      { ingredienteId: 'ING-13', nombre: 'Quinoa Real Blanca Orgánica', loteProveedor: 'QUI-0112', proveedorNombre: 'Sabor y Especias Import', cantidadUtilizada: 4.5, unidad: 'kg' },
      { ingredienteId: 'ING-14', nombre: 'Aguacate Fresh', loteProveedor: 'AGU-1505', proveedorNombre: 'Sabor y Especias Import', cantidadUtilizada: 3.6, unidad: 'kg' }
    ],
    alergenos: ['Frutos de cáscara'],
    estado: 'Activo'
  },
  {
    codigo: 'L2310-04',
    productoId: 'PROD-03',
    productoNombre: 'Crema de Tomate Organ.',
    recetaId: 'REC-03',
    fechaProduccion: '2026-06-01',
    fechaCaducidad: '2026-06-08',
    cantidadProducida: 120,
    unidad: 'uds',
    responsableNombre: 'Carlos Ruíz Blanco',
    ingredientesUtilizados: [
      { ingredienteId: 'ING-11', nombre: 'Tomate Triturado Eco', loteProveedor: 'TOM-2601', proveedorNombre: 'Sabor y Especias Import', cantidadUtilizada: 48, unidad: 'kg' },
      { ingredienteId: 'ING-07', nombre: 'Aceite de Oliva Virgen Extra Eco', loteProveedor: 'AOVE-2026-03', proveedorNombre: 'Sabor y Especias Import', cantidadUtilizada: 3, unidad: 'L' }
    ],
    alergenos: [],
    estado: 'Activo'
  },
  {
    codigo: 'L2310-05',
    productoId: 'PROD-05',
    productoNombre: 'Croissant Mantequilla',
    recetaId: 'REC-05',
    fechaProduccion: '2026-06-02',
    fechaCaducidad: '2026-06-04',
    cantidadProducida: 60,
    unidad: 'uds',
    responsableNombre: 'Ana Belén Rivas',
    ingredientesUtilizados: [
      { ingredienteId: 'ING-01', nombre: 'Harina de Trigo Eco', loteProveedor: 'HT-20260412-A', proveedorNombre: 'Harinas El Molino S.L.', cantidadUtilizada: 24, unidad: 'kg' },
      { ingredienteId: 'ING-16', nombre: 'Mantequilla de Soria DOP', loteProveedor: 'MANT-S-77', proveedorNombre: 'Lácteos del Norte S.A.', cantidadUtilizada: 15, unidad: 'kg' }
    ],
    alergenos: ['Gluten', 'Leche', 'Huevos'],
    estado: 'Activo'
  }
];

export const ZONAS_TEMPERATURA_MOCK: ZonaTemperatura[] = [
  {
    id: 'ZONE-01',
    nombre: 'Cámara Frío 01 (Cárnicos)',
    categoria: 'Cámara frigorífica',
    temperaturaMinC: 0,
    temperaturaMaxC: 4,
    temperaturaActualC: 3.2
  },
  {
    id: 'ZONE-02',
    nombre: 'Cámara Frío 02 (Lácteos)',
    categoria: 'Cámara frigorífica',
    temperaturaMinC: 1,
    temperaturaMaxC: 5,
    temperaturaActualC: 4.1
  },
  {
    id: 'ZONE-03',
    nombre: 'Congelador V-04 (Congelados)',
    categoria: 'Congelador',
    temperaturaMinC: -25,
    temperaturaMaxC: -18,
    temperaturaActualC: -14.8 // ALARM/CRITICAL
  },
  {
    id: 'ZONE-04',
    nombre: 'Vitrina Exposición Tienda',
    categoria: 'Vitrina',
    temperaturaMinC: 2,
    temperaturaMaxC: 8,
    temperaturaActualC: 5.1
  },
  {
    id: 'ZONE-05',
    nombre: 'Obrador Principal Climatizado',
    categoria: 'Obrador',
    temperaturaMinC: 18,
    temperaturaMaxC: 22,
    temperaturaActualC: 20.2
  }
];

export const REGISTROS_TEMPERATURA_MOCK: RegistroTemperatura[] = [
  {
    id: 'RT-01',
    zonaId: 'ZONE-02',
    zonaNombre: 'Cámara Frío 02 (Lácteos)',
    temperaturaC: 4.1,
    hora: '11:45 AM',
    responsableNombre: 'Dr. Manuel García',
    estado: 'Correcto',
    observaciones: 'Control rutinario de mediodía.'
  },
  {
    id: 'RT-02',
    zonaId: 'ZONE-03',
    zonaNombre: 'Congelador V-04 (Congelados)',
    temperaturaC: -12.5,
    hora: '10:20 AM',
    responsableNombre: 'Carlos Ruíz Blanco',
    estado: 'Fuera de rango',
    observaciones: 'Acción: Revisión de puerta solicitada. Hielo acumulado en junta de estanqueidad.',
    fotoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy3_BRFOzS0QcvUMttpqkHU8y4hcUg3znVetSPvv95A4vBgfHgy38V1UjeGMqQrQtAZi7xeKKW1gAzYgoCr8VXg4b06PvKXpE1BoCwyhidAqvh1Rv5mHXFdpv0m_q-nr4e5FPiYm36cTw7PytB-o_T-h5o7KM-K_7rDv6taharoXpUHLIN6nPtyhpO-oCoXdudaPInHjn3BLWelkhnPypNzwkvjcWObGC5Xjb6V9uEMJtbEHFjT5S9Dt-MD19vxJxE-7ikB4DO3ttU'
  },
  {
    id: 'RT-03',
    zonaId: 'ZONE-01',
    zonaNombre: 'Cámara Frío 01 (Cárnicos)',
    temperaturaC: 3.2,
    hora: '09:00 AM',
    responsableNombre: 'Marta Soler Gil',
    estado: 'Correcto',
    observaciones: 'Apertura de turno.'
  }
];

export const PLAN_LIMPIEZA_MOCK: PlanLimpieza[] = [
  {
    id: 'PL-01',
    zona: 'Mesas Trabajo Obrador',
    frecuencia: 'Diaria',
    responsableRol: 'Trabajador del obrador',
    ultimaLimpiezaFecha: '2026-06-03',
    proximaLimpiezaFecha: '2026-06-04',
    estado: 'Completada',
    productoUsado: 'Desinfectante DD-40 Hidroalcohólico',
    firmaValidador: 'Marta Soler Gil'
  },
  {
    id: 'PL-02',
    zona: 'Amasadora Industrial',
    frecuencia: 'Después de usar',
    responsableRol: 'Ana Belén Rivas',
    ultimaLimpiezaFecha: '2026-06-03',
    proximaLimpiezaFecha: '2026-06-03',
    estado: 'Completada',
    productoUsado: 'Jabón neutro alimentario alcalino',
    observaciones: 'Limpieza profunda tras lote de Pasta de Huevo',
    firmaValidador: 'Carlos Ruíz Blanco'
  },
  {
    id: 'PL-03',
    zona: 'Cámara Frigorífica 01',
    frecuencia: 'Semanal',
    responsableRol: 'Responsable de calidad',
    ultimaLimpiezaFecha: '2026-05-28',
    proximaLimpiezaFecha: '2026-06-04',
    estado: 'Pendiente',
    productoUsado: 'Sanitizante clorado para frío'
  },
  {
    id: 'PL-04',
    zona: 'Filtros de Aire y Techos',
    frecuencia: 'Mensual',
    responsableRol: 'Equipo Mantenimiento Externo',
    ultimaLimpiezaFecha: '2026-05-01',
    proximaLimpiezaFecha: '2026-06-01',
    estado: 'Vencida', // OVERDUE
    productoUsado: 'Antifúngico nebulizador',
    observaciones: 'Retrasado por falta de proveedor homologado en zona'
  }
];

export const INCIDENCIAS_MOCK: Incidencia[] = [
  {
    id: 'INC-772', // Matches critical allergen warning
    titulo: 'Alérgeno Altramuz No Declarado',
    descripcion: 'Se recibe harina de altramuz (proveedor Harinas El Molino) sin advertencia explícita en el etiquetado exterior del saco ni en el albarán, constituyendo riesgo severo de contaminación cruzada accidental en obrador.',
    tipo: 'Etiquetado',
    prioridad: 'Crítica',
    ingredienteAfectado: 'Harina de Altramuz Premium (#ING-20)',
    proveedorAfectado: 'Harinas El Molino S.L.',
    responsableNombre: 'Dr. Manuel García',
    accionCorrectiva: 'Inmovilización inmediata del saco afectado. Creación de una alerta visual de seguridad y requisamiento temporal de la mercancía. Petición formal de etiquetado revisado al proveedor.',
    estado: 'Abierta',
    fecha: '2026-06-03'
  },
  {
    id: 'INC-002',
    titulo: 'Pico de temperatura en Congelador V-04',
    descripcion: 'El congelador de pescados marcó -12.5°C por más de 2 horas consecutivas, por encima del límite regulado de -18°C.',
    tipo: 'Temperatura',
    prioridad: 'Alta',
    loteAfectado: 'L2310-02',
    responsableNombre: 'Carlos Ruíz Blanco',
    accionCorrectiva: 'Se traslada provisionalmente el producto intacto a la Cámara de Auxilio 02. Se llama de urgencia al técnico frigorista.',
    estado: 'En revisión',
    fecha: '2026-06-03'
  }
];

export const DOCUMENTOS_MOCK: DocumentoSector[] = [
  {
    id: 'DOC-01',
    nombre: 'Registro Sanitario Trazalimento SA 2026.pdf',
    categoria: 'Registro sanitario',
    relacionNombre: 'Obrador Artesano Demo',
    estado: 'Vigente',
    fechaSubida: '2026-01-10',
    fechaCaducidadDoc: '2031-01-10',
    urlSimulada: '#',
    usuarioSubio: 'Dr. Manuel García'
  },
  {
    id: 'DOC-02',
    nombre: 'Ficha Técnica Harina Trigo.pdf',
    categoria: 'Ficha técnica',
    relacionNombre: 'Ingrediente Harina de Trigo Eco',
    estado: 'Vigente',
    fechaSubida: '2026-04-15',
    urlSimulada: '#',
    usuarioSubio: 'Ana Belén Rivas'
  },
  {
    id: 'DOC-03',
    nombre: 'Certificado Homologación Harinas El Molino.pdf',
    categoria: 'Certificado proveedor',
    relacionNombre: 'Proveedor Harinas El Molino S.L.',
    estado: 'Vigente',
    fechaSubida: '2026-04-12',
    fechaCaducidadDoc: '24-12-2026',
    urlSimulada: '#',
    usuarioSubio: 'Dr. Manuel García'
  },
  {
    id: 'DOC-04',
    nombre: 'Plan APPCC Autocontrol 2026.pdf',
    categoria: 'APPCC',
    relacionNombre: 'Manual de Calidad de la Empresa',
    estado: 'Pendiente de actualización',
    fechaSubida: '2025-06-01',
    fechaCaducidadDoc: '2026-06-01', // Expired
    urlSimulada: '#',
    usuarioSubio: 'Dr. Manuel García'
  }
];

export const ACTIVIDAD_MOCK: LogActividad[] = [
  {
    id: 'LOG-01',
    tipo: 'lote',
    descripcion: 'Nuevo Lote Producido: #LOT-2024-0524-A',
    detalles: 'Pasta Fresca de Huevo • Cantidad: 45kg',
    fechaHora: 'Hace 15 min'
  },
  {
    id: 'LOG-02',
    tipo: 'limpieza',
    descripcion: 'Limpieza de Final de Turno: Área de Amasado',
    detalles: 'Verificado por: Roberto García • Protocolo: Tipo B',
    fechaHora: 'Hace 1 hora'
  },
  {
    id: 'LOG-03',
    tipo: 'lote',
    descripcion: 'Lote Finalizado: #LOT-2024-0523-C',
    detalles: 'Salsa Pesto • Cantidad: 120 botes',
    fechaHora: 'Hace 3 horas'
  }
];
