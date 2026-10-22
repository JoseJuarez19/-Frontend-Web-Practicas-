Práctica 12

React, JSX y el primer proyecto con Vite

Alumno: Jose Francisco Juarez Perez
ID: 252603
Parte 1. Compilador de JSX con SWC
Resultado de compilar sin configuración

Al ejecutar SWC sobre Hola.jsx sin ninguna configuración, la salida fue:

text
  × Expression expected
   ╭─[Hola.jsx:3:1]
 3 │     <h1 className="titulo">
   ·     ─
   ╰────
  × Expected ',', got 'ident'

Caused by:
    Syntax Error
Error: Failed to compile 1 file with swc.

Explicación: sin configuración, SWC no activa el soporte de JSX, por lo que no entiende la etiqueta <h1>.

Pregunta: ¿en qué se convirtió cada etiqueta del JSX?

Respuesta:

En el modo clásico, cada etiqueta se convirtió en una llamada a React.createElement(tipo, props, ...hijos). Las etiquetas anidadas se convirtieron en llamadas anidadas.
En el modo automático, cada etiqueta se convirtió en una llamada a _jsx(...) o _jsxs(...), esta última cuando hay varios hijos. Ambas se importan de react/jsx-runtime. Los hijos van dentro de la propiedad children y ya no es necesario importar React.
Pregunta: si React es «sólo una biblioteca», ¿quién traduce el JSX?

Respuesta: lo traduce un compilador (SWC, Babel u Oxc), no React. React sólo aporta las funciones (createElement, jsx) a las que apunta el código ya traducido. En Vite, esta tarea la realiza el plugin @vitejs/plugin-react.

Parte 2. Proyecto con Vite

Contenedor vacío: se encuentra en index.html, como <div id="root"></div>.

Quién lo llena: el archivo src/main.tsx, donde createRoot(...).render(...) pinta la aplicación dentro de ese contenedor.

Parte 3. «Hola mundo» sin JSX
Pregunta: ¿qué hace createRoot y qué hace render?

Respuesta:

createRoot crea la raíz de React sobre un elemento del DOM (el #root), que es el lugar que React va a controlar.
render le indica a esa raíz qué elementos debe dibujar dentro.

Observación: armar la tarjeta sin JSX funciona, pero cada elemento es una llamada anidada a createElement y el código se vuelve difícil de leer.

Parte 4. Primer componente
Error al quitar la prop obligatoria

Al usar <Saludo /> sin la prop nombre, el editor muestra:

text
Property 'nombre' is missing in type '{}' but required in type 'SaludoProps'. ts(2741)
Pregunta: ¿por qué el nombre de un componente empieza con mayúscula?

Respuesta: porque JSX usa la mayúscula para distinguir un componente de una etiqueta HTML. <div> se traduce a la cadena 'div', pero <Saludo> se traduce a la referencia a la función Saludo. Con minúscula (<saludo>), React lo trataría como una etiqueta HTML que no existe.

Evidencias

Las capturas de pantalla se encuentran en la carpeta evidencias