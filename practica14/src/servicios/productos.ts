// productos.ts — función de servicio: pide los productos y los saca del sobre { data, meta }.
import { api } from '../api/cliente'
import type { Producto } from '../datos'

// El sobre con el que la API envuelve toda respuesta exitosa (Práctica 9B).
export interface Sobre<T> {
  data: T
  meta: { ruta: string; duracionMs: number; timestamp: string }
}

export async function obtenerProductos(): Promise<Producto[]> {
  const respuesta = await api.get<Sobre<Producto[]>>('/productos')
  // respuesta.data es el sobre de la API; respuesta.data.data es la lista.
  return respuesta.data.data
}
