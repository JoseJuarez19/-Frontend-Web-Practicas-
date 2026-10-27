import { useState } from 'react'
import type { Producto } from './datos'
import { useProductos } from './hooks/useProductos'
import Layout from './componentes/Layout'
import Encabezado from './componentes/Encabezado'
import PiePagina from './componentes/PiePagina'
import Filtros from './componentes/Filtros'
import Catalogo from './componentes/Catalogo'
import Cargando from './componentes/Cargando'
import ErrorCarga from './componentes/ErrorCarga'
import FormularioPago from './componentes/FormularioPago'

const categorias = ['todas', 'calzado', 'ropa', 'accesorios']

export default function App() {
  // Los productos ya no están en un arreglo: vienen de la API, con sus tres estados.
  const { productos, cargando, error, recargar } = useProductos()

  // Lo que cambia y la pantalla debe recordar.
  const [filtro, setFiltro] = useState('todas')
  const [carrito, setCarrito] = useState<Producto[]>([])
  const [folio, setFolio] = useState<string | null>(null)

  // Lo que se puede calcular NO se guarda en el estado.
  const visibles =
    filtro === 'todas' ? productos : productos.filter((p) => p.categoria === filtro)
  const piezas = carrito.length
  const total = carrito.reduce((suma, p) => suma + p.precio, 0)

  function agregar(producto: Producto) {
    setFolio(null) // empieza una compra nueva: se quita la confirmación anterior
    setCarrito([...carrito, producto])
  }

  // El pago salió bien: se muestra el folio, se vacía el carrito y se vuelve a pedir
  // los productos para ver la existencia actualizada.
  function pagado(nuevoFolio: string) {
    setFolio(nuevoFolio)
    setCarrito([])
    recargar()
  }

  return (
    <Layout
      encabezado={<Encabezado piezas={piezas} />}
      pie={<PiePagina piezas={piezas} total={total} />}
    >
      <section className="portada">
        <h1>Catálogo de temporada</h1>
        <p>{cargando ? 'Cargando…' : `${visibles.length} productos`}</p>
      </section>
      {folio && (
        <p className="confirmacion">
          ¡Pedido confirmado! Tu folio es {folio}. Total pagado de forma simulada.
        </p>
      )}

      <Filtros categorias={categorias} activa={filtro} onCambiar={setFiltro} />

      {/* Según el estado de la petición: cargando, error o el catálogo */}
      {cargando ? (
        <Cargando />
      ) : error ? (
        <ErrorCarga mensaje={error} onReintentar={recargar} />
      ) : (
        <Catalogo productos={visibles} onAgregar={agregar} />
      )}

      {piezas > 0 && (
        <FormularioPago productos={carrito.map((p) => p.id)} onPagado={pagado} />
      )}
    </Layout>
  )
}
