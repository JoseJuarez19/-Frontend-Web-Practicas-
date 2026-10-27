// ErrorCarga: el mensaje de error con su botón para reintentar.
interface ErrorCargaProps {
  mensaje: string
  onReintentar: () => void
}

export default function ErrorCarga({ mensaje, onReintentar }: ErrorCargaProps) {
  return (
    <div className="error" role="alert">
      <p>{mensaje}</p>
      <button onClick={onReintentar}>Reintentar</button>
    </div>
  )
}
