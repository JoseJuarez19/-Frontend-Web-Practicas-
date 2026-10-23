import type { ReactNode } from 'react'

// Layout: el marco de la página. Tiene tres huecos y no sabe nada de la tienda:
//   - encabezado  (lo que va arriba)
//   - pie         (lo que va abajo)
//   - children    (lo que se escribe entre <Layout> y </Layout>)
interface LayoutProps {
  encabezado: ReactNode
  pie: ReactNode
  children: ReactNode
}

export default function Layout({ encabezado, pie, children }: LayoutProps) {
  return (
    <div className="tienda">
      {encabezado}
      <main className="contenido">{children}</main>
      {pie}
    </div>
  )
}
