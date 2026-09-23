# Juego Web de Sudoku

Un juego de Sudoku adaptable a diferentes tamaños de pantalla, creado con HTML, CSS y JavaScript Vanilla (JavaScript puro). Cuenta con generación aleatoria de rompecabezas con soluciones únicas, tres niveles de dificultad, entrada mediante teclado y botones en pantalla, resaltado de filas, columnas y bloques, detección de conflictos, temporizador y contador de movimientos.

## Vista previa

* https://mrsp1twn6trk.cosine.page

## Estructura del proyecto

* sudoku-web/

  * index.html
  * style.css
  * script.js

## Características

* Generador aleatorio de Sudoku con una solución única garantizada.
* Niveles de dificultad: Fácil, Medio y Difícil.
* Se puede jugar con el teclado (1–9, flechas, Retroceso/Supr) o con el teclado numérico en pantalla.
* Resalta la fila, columna y bloque de 3×3 de la casilla seleccionada.
* Detección de conflictos en tiempo real (los números repetidos se resaltan en rojo).
* Temporizador y contador de movimientos.
* Compatible con dispositivos móviles y computadores.

## Inicio rápido (localmente)

1. Descarga o clona el repositorio.
2. Abre `sudoku-web/index.html` en tu navegador.

   * No necesita pasos de compilación ni dependencias adicionales.

## Cómo jugar

* Selecciona un nivel de dificultad.
* Haz clic en **"New Game" (Nuevo juego)**.
* Haz clic o toca una casilla e introduce un número del 1 al 9 utilizando el teclado o el teclado numérico que aparece en pantalla.
* Utiliza **Retroceso/Supr** o el botón **"Erase" (Borrar)** del teclado en pantalla para eliminar un número de una casilla.
* **"Check Solution" (Comprobar solución)** resalta los errores.
* **"Solve Puzzle" (Resolver Sudoku)** completa el tablero con la solución correcta.

## Publicar en GitHub Pages

### Opción A — Mantener los archivos dentro de `sudoku-web/` y utilizar Pages con la subcarpeta `/sudoku-web`

1. Crea un nuevo repositorio en GitHub y sube esta estructura de carpetas:

```text
git init
git add .
git commit -m "Add Sudoku web game"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/<tu-repositorio>.git
git push -u origin main
```

2. En el repositorio de GitHub:

   * Ve a **Settings → Pages**.
   * En **Build and deployment → Source**, selecciona **Deploy from a branch**.
   * Selecciona la rama **main**.
   * Selecciona la carpeta **/root** (o **/docs** si mueves los archivos de acuerdo con esa estructura).
   * Presiona **Save**.

3. Ingresa a:

https://<tu-usuario>.github.io/<tu-repositorio>/sudoku-web

### Opción B — Servir desde la raíz del repositorio

* Mueve los tres archivos (`index.html`, `style.css`, `script.js`) desde `sudoku-web/` hasta la raíz del repositorio y actualiza los enlaces si es necesario (en este caso no es necesario).
* Activa GitHub Pages utilizando la carpeta **root**.

Después podrás acceder a:

https://<tu-usuario>.github.io/<tu-repositorio>/

## Accesibilidad

* Navegación mediante el teclado utilizando las teclas de flecha.
* Roles ARIA para la cuadrícula y las celdas.
* Estados visuales para indicar el enfoque y la selección.
* Divisiones de alto contraste para separar los bloques de 3×3.

## Notas de desarrollo

* Son archivos estáticos de la parte visual y funcional del proyecto (front-end), sin utilizar frameworks.
* Para generar el Sudoku se utiliza un solucionador mediante **backtracking**, que crea primero un tablero completo y después elimina algunas pistas asegurándose de que el Sudoku siga teniendo una única solución.
* Los niveles de dificultad buscan tener aproximadamente esta cantidad de números iniciales:

  * **Fácil:** aproximadamente 40.
  * **Medio:** aproximadamente 32.
  * **Difícil:** aproximadamente 26.

## Solución de problemas

* **Si no aparece ningún Sudoku:**

  * Selecciona un nivel de dificultad y presiona **"New Game" (Nuevo juego)**.

* **Si los bordes se ven desalineados:**

  * Algunos navegadores o niveles de zoom pueden producir pequeños errores de visualización. La cuadrícula utiliza bordes específicos para los bloques de 3×3 y los bordes exteriores para evitar espacios. Si todavía notas problemas, prueba utilizando el zoom al **100 %** e indica el sistema operativo, navegador y nivel de zoom para poder ajustar el problema.

## Licencia

* Puedes utilizar, modificar y distribuir este proyecto en tus propias aplicaciones o portafolios.
* Si necesitas una licencia formal (por ejemplo, MIT), puedes solicitar que se agregue.
