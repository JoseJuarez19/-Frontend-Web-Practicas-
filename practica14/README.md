# Práctica 14 · La tienda contra su API

Tópico de Aplicaciones Web (Plan 2023) · Unidad III · ITSON

La tienda de la Práctica 13 ahora pide sus productos a su propia API (`tienda-backend`, NestJS + Prisma + MySQL), maneja los tres estados de toda petición (cargando, error y datos) y completa un pago simulado con un formulario controlado. **Los componentes de la práctica anterior no se modificaron** (`Layout`, `Encabezado`, `PiePagina`, `Filtros`, `Catalogo` y `TarjetaProducto` quedaron idénticos).



Requiere Node.js 20.19 o 22.12 en adelante y MySQL 8 corriendo.

**1. Backend** (repositorio `tienda-backend`, puerto 3000):

```bash
cd tienda-backend
npm install
cp .env.ejemplo .env            # poner la contraseña de root de MySQL
npx prisma migrate dev --name inicial
npx prisma db seed              # carga los 12 productos
npx prisma generate
npm run start:dev
```

**2. Frontend** (esta carpeta, puerto 5173 de Vite):

```bash
npm install
npm run dev
```

> Para repetir las pruebas con el inventario original: `npx prisma db seed` en el backend.

## Estructura

```
src/
├── api/
│   ├── cliente.ts             # la ÚNICA instancia de Axios (baseURL + timeout)
│   └── errores.ts             # convierte errores de Axios en mensajes legibles
├── servicios/
│   ├── productos.ts           # obtenerProductos(): saca la lista del sobre { data, meta }
│   └── pedidos.ts             # crearPedido(): POST /pedidos, regresa { folio, total }
├── hooks/
│   └── useProductos.ts        # efecto + estados: cargando, error, productos (y recargar)
├── componentes/
│   ├── Cargando.tsx           # NUEVO · estado "cargando"
│   ├── ErrorCarga.tsx         # NUEVO · mensaje de error + botón Reintentar
│   ├── FormularioPago.tsx     # NUEVO · formulario controlado (correo, teléfono)
│   └── (Layout, Encabezado, PiePagina, Filtros, Catalogo, TarjetaProducto: sin cambios)
├── App.tsx                    # usa el hook, elige qué pintar y maneja el pago
├── datos.ts                   # tipo Producto y formato de pesos
└── index.css                  # estilos (código base)
evidencias/                    # capturas
```

Flujo: **componente → hook → servicio → instancia de Axios → API**. Ningún componente importa Axios.





Porque en desarrollo la app corre dentro de `<StrictMode>` (ver `main.tsx`). Para ayudar a detectar efectos mal escritos, React **monta el componente, ejecuta el efecto, lo "desmonta" (ejecuta la limpieza) y lo vuelve a montar**, así que el efecto corre dos veces y se hacen dos `GET /productos`. No es un error: sólo pasa en desarrollo (`npm run dev`); en la versión de producción (`npm run build`) sale una sola petición. Por eso el efecto tiene una limpieza (`vigente = false`): la respuesta de la ejecución descartada se ignora y no pisa el estado.



Sin el arreglo (`useEffect(() => { ... })`) el efecto se ejecuta **después de cada render**. Como el efecto termina cambiando el estado (`setProductos`, `setCargando`), eso provoca otro render, que vuelve a ejecutar el efecto, que vuelve a pedir los productos… en un **ciclo infinito de peticiones**. En la prueba hecha con esa variante salieron **272 peticiones `GET /productos` en 3 segundos** y no se detenían (evidencia `09-red-sin-dependencias.png`). Con `[intento]` el efecto sólo corre al montar y cuando se pide recargar (Reintentar o después de pagar); con `[]` correría sólo al montar.



Cancela el comportamiento por defecto del navegador al enviar un formulario: enviar los datos a la URL de la página y **recargar la página completa**. Con `preventDefault()` el envío lo controla React: se validan los campos, se manda el pedido con Axios y la pantalla se actualiza sin recargar. Si lo quitas, al presionar «Pagar» el navegador recarga la página, se pierde todo el estado de React (carrito, valores del formulario, mensajes) y la respuesta de la API nunca se llega a mostrar.



- **Una sola instancia de Axios** (`api/cliente.ts`) con `baseURL` y `timeout` de 5 s; los componentes sólo conocen funciones de servicio.
- **El servicio saca la lista del sobre:** la API responde `{ data, meta }`; `obtenerProductos()` regresa directamente `Producto[]`.
- **Hook `useProductos`:** regresa `{ productos, cargando, error, recargar }`. `recargar` incrementa un contador que está en las dependencias del efecto, y sirve tanto para «Reintentar» como para refrescar la existencia después de pagar.
- **Formulario controlado:** el valor de `correo` y `telefono` vive en el estado; se valida que el correo tenga `@` y que el teléfono tenga 10 dígitos antes de enviar.
- **Errores de la API:** si el servidor rechaza el pedido (400, 404, 409) se muestra su `message` dentro del formulario; si la API está apagada, se muestra un mensaje de conexión.
- **Después de pagar:** se muestra el folio, se vacía el carrito y se vuelve a pedir la lista para ver la existencia actualizada.



| Archivo | Qué muestra |
| --- | --- |
| `01-catalogo-desde-api.png` | Catálogo cargado desde la API |
| `02-carrito-formulario.png` | Carrito con productos y formulario de pago |
| `03-pedido-confirmado.png` | Pedido confirmado con su folio (existencia actualizada) |
| `04-error-409.png` | Mensaje 409 de la API dentro del formulario |
| `05-error-api-apagada.png` | Error con la API apagada y botón «Reintentar» |
| `06-reintento-exitoso.png` | Reintento con la API encendida |
| `07-validacion-correo.png` | Validación del formulario antes de enviar |
| `08-red-dos-peticiones.png` | Peticiones al cargar (dos por StrictMode) |
| `09-red-sin-dependencias.png` | Peticiones sin arreglo de dependencias |
| `10-red-pedido-y-refresco.png` | `POST /pedidos` y nueva petición de productos |
