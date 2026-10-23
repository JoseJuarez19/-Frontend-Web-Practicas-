import { useState } from 'react'
import { productos, type Producto } from './datos'
import Layout from './componentes/Layout'
import Encabezado from './componentes/Encabezado'
import PiePagina from './componentes/PiePagina'
import Filtros from './componentes/Filtros'
import Catalogo from './componentes/Catalogo'

const categorias = ['todas', 'calzado', 'ropa', 'accesorios']

export default function App() {
  // Lo que cambia y la pantalla debe recordar: el filtro activo y el carrito.
  const [filtro, setFiltro] = useState('todas')
  const [carrito, setCarrito] = useState<Producto[]>([])

  // Lo que se puede calcular NO se guarda en el estado: se calcula en cada pintada.
  const visibles =
    filtro === 'todas' ? productos : productos.filter((p) => p.categoria === filtro)
  const piezas = carrito.length
  const total = carrito.reduce((suma, p) => suma + p.precio, 0)

  // Sin mutar: siempre se crea un arreglo nuevo (copia + el producto nuevo).
  function agregar(producto: Producto) {
    setCarrito([...carrito, producto])
  }

  return (
    <Layout
      encabezado={<Encabezado piezas={piezas} />}
      pie={<PiePagina piezas={piezas} total={total} />}
    >
      <section className="portada">
        <h1>Catálogo de temporada</h1>
        <p>{visibles.length} productos</p>
      </section>
      <Filtros categorias={categorias} activa={filtro} onCambiar={setFiltro} />
      <Catalogo productos={visibles} onAgregar={agregar} />
    </Layout>
  )
}
