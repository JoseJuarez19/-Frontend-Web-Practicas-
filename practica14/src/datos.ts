// datos.ts — el tipo Producto y el formato de dinero.
// En la Práctica 13 aquí vivía también el arreglo de productos en memoria; ahora los
// productos vienen de la API (tienda-backend), así que el arreglo ya no se necesita.

// La forma de un producto. Es el contrato de datos de toda la tienda.
export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  imagen: string;
  existencia: number;
}

// Formato de dinero: 1299 → "$1,299.00". Se crea una vez y se reusa.
export const pesos = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });
