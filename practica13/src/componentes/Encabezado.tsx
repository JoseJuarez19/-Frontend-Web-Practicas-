// Encabezado: la marca y el número de piezas que hay en el carrito.
interface EncabezadoProps {
  piezas: number
}

export default function Encabezado({ piezas }: EncabezadoProps) {
  return (
    <header className="encabezado">
      <div className="encabezado__marca">
        <img src="/img/logo.svg" alt="" height="32" />
        Tienda
      </div>
      <span className="encabezado__carrito">
        Carrito: <strong>{piezas}</strong>
      </span>
    </header>
  )
}
