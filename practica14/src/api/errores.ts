// errores.ts — convierte cualquier error de Axios en un mensaje legible para el usuario.
import axios from 'axios'

export function mensajeDeError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    // La API respondió con un error (400, 404, 409...): Nest manda { message } como texto
    // o como arreglo de textos (cuando falla la validación de varios campos).
    if (error.response) {
      const mensaje = (error.response.data as { message?: string | string[] } | undefined)?.message
      if (Array.isArray(mensaje)) return mensaje.join('. ')
      if (mensaje) return mensaje
      return `La API respondió con el error ${error.response.status}`
    }
    // Se acabó el tiempo límite de la instancia.
    if (error.code === 'ECONNABORTED') return 'La API tardó demasiado en responder'
    // No hubo respuesta: la API está apagada o no se puede alcanzar.
    return 'No se pudo conectar con la API. Revisa que el backend esté corriendo.'
  }
  return 'Ocurrió un error inesperado'
}
