// ================================================
// MENÚ CAJÓN — funciona igual en todas las páginas
// ================================================

// "getElementById" busca en el HTML un elemento que tenga ese id="..."
// y lo guarda en una variable para poder usarlo después.
// Es como decir: "quiero tener a mano este elemento del HTML"
const menu_cajon  = document.getElementById('menu_cajon');
const capa_oscura = document.getElementById('capa_oscura');
const btn_abrir   = document.getElementById('btn_abrir');
const btn_cerrar  = document.getElementById('btn_cerrar');

// Una "función" es un bloque de instrucciones con nombre.
// Se define una vez y se puede usar (llamar) varias veces.

function abrirMenu() {
  // classList.add('abierto') → le AGREGA la clase CSS "abierto" al elemento.
  // Eso hace que el CSS lo detecte y aplique los estilos de .menu_cajon.abierto
  // (que lo hace deslizarse hacia adentro).
  menu_cajon.classList.add('abierto');
  // También mostramos la capa oscura de fondo
  capa_oscura.classList.add('visible');
}

function cerrarMenu() {
  // classList.remove('abierto') → le QUITA la clase CSS.
  // El menú vuelve a estar fuera de pantalla (vuelve a estar oculto).
  menu_cajon.classList.remove('abierto');
  capa_oscura.classList.remove('visible');
}

// addEventListener('click', función) → "escucha" cuando el usuario hace clic.
// Cuando el botón hamburguesa recibe un clic → llama a abrirMenu()
btn_abrir.addEventListener('click', abrirMenu);

// Cuando el botón X recibe un clic → llama a cerrarMenu()
btn_cerrar.addEventListener('click', cerrarMenu);

// Si el usuario hace clic en la capa oscura (el fondo) → también cierra el menú
capa_oscura.addEventListener('click', cerrarMenu);

// querySelectorAll devuelve TODOS los elementos que coincidan con ese selector CSS.
// Aquí selecciona todos los links del menú lateral.
// .forEach recorre cada uno y le aplica lo que está dentro de la función.
document.querySelectorAll('.menu_cajon__lista a').forEach(link => {
  // Cada link del menú: cuando se haga clic, cerrar el menú
  // (útil en móvil para que el menú no quede abierto al navegar)
  link.addEventListener('click', cerrarMenu);
});


// ── Marcar el link activo según la página actual ──────────────────────────────

// window.location.pathname devuelve la ruta de la URL actual.
// Ejemplo: si estás en "misitio.com/varones.html" → devuelve "/varones.html"
// .split('/') la divide por las barras → ["", "varones.html"]
// .pop() toma el último elemento → "varones.html"
// Si está vacío (página raíz), usamos 'index.html' como valor por defecto.
const pagina_actual = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.menu_cajon__lista a').forEach(link => {
  // getAttribute('href') lee el valor del atributo href de ese link
  // Ejemplo: <a href="varones.html"> → devuelve "varones.html"
  const href = link.getAttribute('href');

  // Si el href del link coincide con la página actual → le agrega la clase "activo"
  // Eso hace que el CSS lo muestre con color dorado y una línea a la izquierda
  if (href === pagina_actual) link.classList.add('activo');
});


// ================================================
// SLIDER 3D — solo se ejecuta si hay slider en la página
// ================================================

// Busca TODOS los elementos con clase "diapositiva" en la página
const diapositivas = document.querySelectorAll('.diapositiva');

// Si diapositivas.length > 0 significa que hay al menos una diapositiva en la página.
// Si no hay ninguna (ej: en varones.html no hay slider), todo este bloque se saltea.
if (diapositivas.length > 0) {

  // Busca el contenedor donde van a aparecer los puntitos de navegación
  const contenedor_puntos = document.querySelector('.puntos');

  // total = cuántas diapositivas hay en total
  const total = diapositivas.length;

  // actual = índice de la diapositiva que se está mostrando ahora
  // Los índices empiezan en 0 (la primera es 0, la segunda es 1, etc.)
  let actual = 0;

  // Crea un puntito por cada diapositiva y lo agrega al HTML dinámicamente
  diapositivas.forEach((_, i) => {
    // Crea un nuevo elemento <div> en memoria (aún no está en la página)
    const punto = document.createElement('div');

    // Le agrega la clase CSS "punto" para que se vea como un círculo
    punto.classList.add('punto');

    // El primer puntito (i === 0) empieza como activo (más grande y dorado)
    if (i === 0) punto.classList.add('activo');

    // Al hacer clic en un puntito → ir directamente a esa diapositiva
    punto.addEventListener('click', () => irA(i));

    // Agrega el puntito al contenedor en el HTML real
    contenedor_puntos.appendChild(punto);
  });


  function actualizarSlider() {
    // Recorre cada diapositiva y le asigna la clase que le corresponde
    diapositivas.forEach((diap, i) => {

      // Primero borra todas las clases y deja solo "diapositiva" (la clase base)
      diap.className = 'diapositiva';

      if (i === actual) {
        // Esta es la diapositiva del centro → se ve grande y nítida
        diap.classList.add('activa');
      }
      else if (i === (actual - 1 + total) % total) {
        // Esta es la diapositiva a la IZQUIERDA de la actual
        // El % total es para que cuando estás en la primera, el "anterior" sea la última
        // Ejemplo: actual=0, total=5 → (0 - 1 + 5) % 5 = 4 → última diapositiva
        diap.classList.add('anterior');
      }
      else if (i === (actual + 1) % total) {
        // Esta es la diapositiva a la DERECHA de la actual
        // Ejemplo: actual=4, total=5 → (4 + 1) % 5 = 0 → vuelve a la primera
        diap.classList.add('siguiente');
      }
      else {
        // Las demás diapositivas están ocultas (ni se ven)
        diap.classList.add('oculta');
      }
    });

    // Actualiza también los puntitos: solo el del índice actual queda dorado
    document.querySelectorAll('.punto').forEach((p, i) =>
      // classList.toggle('activo', condición):
      // Si condición es true → agrega 'activo'; si es false → la quita
      p.classList.toggle('activo', i === actual)
    );
  }


  // Cambia a una diapositiva específica por su índice
  function irA(indice) {
    actual = indice;       // actualiza cuál es la actual
    actualizarSlider();    // redibuja el slider con las nuevas clases
  }

  // Botón "siguiente" (flecha derecha):
  // (actual + 1) % total → avanza 1, y si llega al final vuelve al principio
  document.querySelector('.btn_siguiente').addEventListener('click', () =>
    irA((actual + 1) % total)
  );

  // Botón "anterior" (flecha izquierda):
  // (actual - 1 + total) % total → retrocede 1, y si está en 0 va al último
  document.querySelector('.btn_anterior').addEventListener('click', () =>
    irA((actual - 1 + total) % total)
  );

  // setInterval(función, milisegundos) → ejecuta la función cada X milisegundos.
  // 4000 ms = 4 segundos. Aquí avanza automáticamente al siguiente cada 4 segundos.
  let autoplay = setInterval(() => irA((actual + 1) % total), 4000);

  const cc = document.querySelector('.carrusel_contenedor');

  // Cuando el mouse ENTRA al carrusel → pausa el autoplay para que el usuario pueda ver
  cc.addEventListener('mouseenter', () => clearInterval(autoplay));

  // Cuando el mouse SALE del carrusel → reinicia el autoplay
  cc.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => irA((actual + 1) % total), 4000);
  });

  // Ejecuta una primera vez para que el slider empiece con las clases correctas
  actualizarSlider();
}


// ================================================
// FORMULARIO DE CONTACTO — solo se ejecuta si existe
// ================================================

// Busca el formulario por su id. Si la página no tiene formulario, devuelve null.
const formulario_contacto = document.getElementById('formulario_contacto');

// Solo entra aquí si realmente existe un formulario en la página
if (formulario_contacto) {

  // 'submit' es el evento que se dispara cuando el usuario hace clic en "Enviar"
  formulario_contacto.addEventListener('submit', (e) => {

    // e.preventDefault() → cancela el comportamiento por defecto del formulario.
    // Sin esto, el formulario recarga la página al enviarse (comportamiento nativo del HTML).
    e.preventDefault();

    // .value obtiene el texto que el usuario escribió en ese campo.
    // .trim() elimina los espacios en blanco al inicio y al final del texto.
    const nombre  = document.getElementById('campo_nombre').value.trim();
    const email   = document.getElementById('campo_email').value.trim();
    const asunto  = document.getElementById('campo_asunto').value;
    const mensaje = document.getElementById('campo_mensaje').value.trim();

    // Validación: el símbolo ! significa "no". Entonces !nombre = "si nombre está vacío".
    // Si cualquiera de los tres campos obligatorios está vacío → muestra alerta y para.
    // "return" dentro de una función la detiene ahí mismo, no sigue ejecutando.
    if (!nombre || !email || !mensaje) {
      alert('Por favor completa todos los campos obligatorios.');
      return; // ← detiene la función, no sigue
    }

    // Busca el botón de enviar dentro del formulario
    const btn = formulario_contacto.querySelector('.btn_enviar');

    // Cambia el texto del botón para que el usuario sepa que está procesando
    btn.textContent = 'Enviando...';

    // Desactiva el botón para que no hagan clic dos veces
    btn.disabled = true;

    // setTimeout(función, milisegundos) → espera X ms y luego ejecuta la función.
    // Aquí simula un "envío al servidor" esperando 1.2 segundos.
    // En un proyecto real, aquí iría el código que manda los datos a un backend.
    setTimeout(() => {
      // Oculta el formulario agregándole la clase "oculto" (display:none en CSS)
      formulario_contacto.classList.add('oculto');

      // Muestra el mensaje de éxito quitándole la clase "oculto"
      document.getElementById('form_exitoso').classList.remove('oculto');
    }, 1200); // ← 1200 milisegundos = 1.2 segundos de espera
  });
}
