import type { Producto } from '../datos'
import TarjetaProducto from './TarjetaProducto'

// Catalogo: una tarjeta por producto, con .map y una key única (el id).
interface CatalogoProps {
  productos: Producto[]
  onAgregar: (producto: Producto) => void
}

export default function Catalogo({ productos, onAgregar }: CatalogoProps) {
  return (
    <section className="catalogo">
      {productos.map((producto) => (
        <TarjetaProducto key={producto.id} producto={producto} onAgregar={onAgregar} />
      ))}
    </section>
  )
}
