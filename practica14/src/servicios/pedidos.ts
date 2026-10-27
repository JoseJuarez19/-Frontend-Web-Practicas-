// pedidos.ts — función de servicio: envía el pedido (pago simulado) y regresa el folio.
import { api } from '../api/cliente'
import type { Sobre } from './productos'

export interface NuevoPedido {
  correo: string
  telefono: string
  productos: string[] // los ids del carrito; si un id se repite, son dos piezas
}

export interface PedidoCreado {
  folio: string
  total: number
}

export async function crearPedido(pedido: NuevoPedido): Promise<PedidoCreado> {
  const respuesta = await api.post<Sobre<PedidoCreado>>('/pedidos', pedido)
  return respuesta.data.data
}
