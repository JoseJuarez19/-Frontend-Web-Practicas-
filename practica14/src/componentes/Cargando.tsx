// Cargando: lo que se ve mientras la petición está en camino.
export default function Cargando() {
  return (
    <div className="cargando" role="status">
      <div className="cargando__rueda" />
      <p>Cargando productos…</p>
    </div>
  )
}
