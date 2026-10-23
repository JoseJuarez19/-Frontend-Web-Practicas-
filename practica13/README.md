# Práctica 13 · La tienda: composición, eventos y estado

Tópico de Aplicaciones Web (Plan 2023) · Unidad III · ITSON

Tienda en línea hecha con React + TypeScript (Vite, plantilla `react-ts`). Los productos viven en un arreglo en memoria (`src/datos.ts`); no hay red ni API.

## Cómo correrlo

Requiere Node.js 20.19 o 22.12 en adelante.

```bash
npm install
npm run dev
```

## Estructura

```
src/
├── App.tsx                    # estado (filtro, carrito) y valores calculados
├── datos.ts                   # productos, tipo Producto y formato de pesos (código base)
├── index.css                  # estilos (código base)
├── main.tsx
└── componentes/
    ├── Layout.tsx             # marco: encabezado + children + pie
    ├── Encabezado.tsx         # marca y piezas en el carrito
    ├── PiePagina.tsx          # resumen y total en pesos
    ├── Filtros.tsx            # botones por categoría
    ├── Catalogo.tsx           # .map con key única
    └── TarjetaProducto.tsx    # imagen, nombre, precio, existencia, botón
evidencias/                    # capturas de pantalla
```

## Preguntas

### Ejercicio 1 · ¿Por qué el Layout no necesita saber que es una tienda?

Porque el `Layout` sólo ofrece tres huecos (`encabezado`, `pie` y `children`) y los pinta en el orden correcto. No importa productos, ni carrito, ni precios: lo que va en cada hueco se lo pasa quien lo usa (`App`). Eso lo vuelve un marco genérico y reutilizable: el mismo `Layout` serviría para un blog o un panel de administración cambiando únicamente lo que se le pone adentro. Es composición: el componente decide *dónde* va cada cosa; el padre decide *qué* va.

### Ejercicio 2 · ¿Qué pasa si escribes `onClick={onAgregar(producto)}` sin la flecha?

La función se **ejecuta mientras React pinta la tarjeta**, no cuando se hace clic, porque `onAgregar(producto)` es una llamada y no una referencia a función. A `onClick` se le asigna el *resultado* de esa llamada (`undefined`), así que el botón tampoco hace nada al presionarlo. Peor aún: `onAgregar` llama a `setCarrito`, y actualizar el estado del padre durante el render provoca otro render, que vuelve a llamar la función, y así en bucle. En la consola aparece `Cannot update a component (App) while rendering a different component (TarjetaProducto)` y la página se queda en blanco (ver evidencias 06 y 07). Lo correcto es pasar una función: `onClick={() => onAgregar(producto)}`.

### Ejercicio 3 · ¿Por qué con `carrito.push(...)` el contador no se mueve y no sale ningún error?

Porque `push` **muta el mismo arreglo** en memoria: la referencia sigue siendo la misma y, además, `push` no avisa a React de nada (no llama a `setCarrito`). React decide si vuelve a pintar cuando el estado cambia de referencia; si nadie le entrega un valor nuevo, para él nada cambió y la pantalla se queda igual. No sale ningún error porque `push` es JavaScript perfectamente válido: el arreglo sí crece (se comprueba con un `console.log`), pero la interfaz no se entera (ver evidencias 08 y 09). Lo correcto es crear un arreglo nuevo y entregárselo a React: `setCarrito([...carrito, producto])`.

## Decisiones de diseño

- **Estado mínimo:** sólo se guardan `filtro` y `carrito`. La lista filtrada (`visibles`), el número de piezas y el total se calculan en cada pintada, así nunca quedan desincronizados.
- **Sin mutar:** el carrito siempre se reemplaza por un arreglo nuevo.
- **Funciones hacia arriba:** `TarjetaProducto` y `Filtros` no cambian el estado; avisan a `App` mediante `onAgregar` y `onCambiar`.
- **Key única:** cada tarjeta usa `producto.id` como `key`.

## Evidencias (`/evidencias`)

| Archivo | Qué muestra |
| --- | --- |
| `01-catalogo.png` | Catálogo completo, con productos «Agotado» |
| `02-filtro-calzado.png`, `03-filtro-ropa.png`, `04-filtro-accesorios.png` | Filtro por categoría (botón activo distinto) |
| `05-carrito-con-productos.png` | Carrito con productos: encabezado, resumen y total |
| `06`, `07` | Error: `onClick` sin flecha |
| `08`, `09` | Error: `carrito.push` (el contador no se mueve) |
| `10-error-sin-key-consola.png` | Advertencia por `.map` sin `key` |
