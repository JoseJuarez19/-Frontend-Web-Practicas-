import { useState, type FormEvent } from 'react'
import { crearPedido } from '../servicios/pedidos'
import { mensajeDeError } from '../api/errores'

// FormularioPago: formulario CONTROLADO (el valor de cada campo vive en el estado).
// Valida, envía el pedido a la API y avisa al papá con onPagado cuando todo salió bien.
interface FormularioPagoProps {
  productos: string[] // ids de lo que hay en el carrito
  onPagado: (folio: string) => void
}

export default function FormularioPago({ productos, onPagado }: FormularioPagoProps) {
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [error, setError] = useState<string | null>(null) // validación o rechazo de la API
  const [enviando, setEnviando] = useState(false)

  async function enviar(e: FormEvent<HTMLFormElement>) {
    // Sin esto el navegador recarga la página al enviar el formulario.
    e.preventDefault()

    // Validación en el cliente, antes de molestar a la API.
    if (!correo.includes('@')) {
      setError('El correo debe tener @')
      return
    }
    if (!/^\d{10}$/.test(telefono)) {
      setError('El teléfono debe tener 10 dígitos')
      return
    }

    setError(null)
    setEnviando(true)
    try {
      const pedido = await crearPedido({ correo, telefono, productos })
      onPagado(pedido.folio)
    } catch (err) {
      // 400 / 404 / 409 / API apagada: se muestra el mensaje dentro del formulario.
      setError(mensajeDeError(err))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className="pago" onSubmit={enviar} noValidate>
      <h2>Pagar</h2>

      <label>
        Correo
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="tu@correo.com"
        />
      </label>

      <label>
        Teléfono
        <input
          type="tel"
          inputMode="numeric"
          maxLength={10}
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="10 dígitos"
        />
      </label>

      {error && <p className="pago__error">{error}</p>}

      <button type="submit" disabled={enviando}>
        {enviando ? 'Procesando…' : 'Pagar'}
      </button>
    </form>
  )
}
