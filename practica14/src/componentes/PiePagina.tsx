import { pesos } from '../datos'

// PiePagina: el carrito fijo abajo. Muestra el resumen y el total en pesos.
interface PiePaginaProps {
  piezas: number
  total: number
}

export default function PiePagina({ piezas, total }: PiePaginaProps) {
  return (
    <footer className="pie">
      <span className="pie__resumen">
        {piezas === 0 ? 'Tu carrito está vacío' : `${piezas} pieza(s) en el carrito`}
      </span>
      <span className="pie__total">{pesos.format(total)}</span>
    </footer>
  )
}
