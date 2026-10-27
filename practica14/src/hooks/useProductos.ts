// useProductos.ts — hook propio: pide los productos en un efecto y regresa los tres
// estados de toda petición: cargando, error y datos (más una función para volver a pedir).
import { useEffect, useState } from 'react'
import type { Producto } from '../datos'
import { obtenerProductos } from '../servicios/productos'
import { mensajeDeError } from '../api/errores'

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // Cada vez que este número cambia, el efecto se vuelve a ejecutar (reintentar / refrescar).
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    let vigente = true // si el efecto se limpia, se ignora la respuesta vieja

    setCargando(true)
    setError(null)

    obtenerProductos()
      .then((lista) => {
        if (vigente) setProductos(lista)
      })
      .catch((e: unknown) => {
        if (vigente) setError(mensajeDeError(e))
      })
      .finally(() => {
        if (vigente) setCargando(false)
      })

    return () => {
      vigente = false
    }
  }, [intento]) // dependencias: sólo se repite la petición cuando cambia "intento"

  const recargar = () => setIntento((n) => n + 1)

  return { productos, cargando, error, recargar }
}
