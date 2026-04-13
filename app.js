/* ============================================================
   ARCHIVO: app.js
   QUÉ HACE: toda la interactividad de la web
   CÓMO SE USA: todas las páginas lo llaman con:
   <script src="app.js"></script>
   
   IMPORTANTE: cada bloque tiene comentario de inicio y fin.
   Si algo no funciona en una página, el bloque dice
   "solo se ejecuta si existe el elemento".
============================================================ */


/* ============================================================
   MENÚ CAJÓN — desde aquí
   Abre y cierra el panel lateral de navegación.
   Funciona en TODAS las páginas.
============================================================ */

// Buscamos los elementos en el HTML por su id
// getElementById busca el elemento que tenga id="ese-nombre"

// Genera el menú igual en todas las páginas
document.getElementById('menu_contenedor').innerHTML = `
  <div class="capa_oscura" id="capa_oscura"></div>
  <nav class="menu_cajon" id="menu_cajon">
    <div class="menu_cajon__header">
      <div class="menu_cajon__logo">LBP</div>
      <button class="btn_cerrar" id="btn_cerrar"></button>
    </div>
    <ul class="menu_cajon__lista">
      <li><a href="index.html">Inicio</a></li>
      <li><a href="varones.html">Hombres</a></li>
      <li><a href="mujeres.html">Mujeres</a></li>
      <li><a href="promociones.html">Promociones</a></li>
      <li><a href="ubicanos.html">Ubícanos</a></li>
      <li><a href="contacto.html">Contacto</a></li>
    </ul>
  </nav>
  <header class="barra_superior">
    <button class="btn_hamburguesa" id="btn_abrir">
      <span></span><span></span><span></span>
    </button>
    <div class="barra_superior__logo">La Tienduca de LBP</div>
    <span class="barra_superior__tag">Vintage · Lima</span>
  </header>
`;






const menu_cajon  = document.getElementById('menu_cajon');
const capa_oscura = document.getElementById('capa_oscura');
const btn_abrir   = document.getElementById('btn_abrir');
const btn_cerrar  = document.getElementById('btn_cerrar');

// Función para ABRIR el menú:
// Agrega la clase .abierto al nav → CSS lo desliza adentro
// Agrega la clase .visible al overlay → CSS lo hace visible
function abrirMenu() {
  menu_cajon.classList.add('abierto');
  capa_oscura.classList.add('visible');
}

// Función para CERRAR el menú:
// Quita las clases → CSS los anima de vuelta
function cerrarMenu() {
  menu_cajon.classList.remove('abierto');
  capa_oscura.classList.remove('visible');
}

// addEventListener escucha el evento 'click' en cada elemento
btn_abrir.addEventListener('click', abrirMenu);
btn_cerrar.addEventListener('click', cerrarMenu);
capa_oscura.addEventListener('click', cerrarMenu);
// Click en la capa oscura (fuera del menú) también cierra

// Cierra el menú al hacer click en cualquier link
document.querySelectorAll('.menu_cajon__lista a').forEach(link => {
  // querySelectorAll busca TODOS los elementos con ese selector
  // forEach recorre cada uno y hace lo mismo
  link.addEventListener('click', cerrarMenu);
});

// Marca el link activo según la página donde estás
// window.location.pathname = ruta de la URL actual
// .split('/').pop() = extrae solo el nombre del archivo
const pagina_actual = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.menu_cajon__lista a').forEach(link => {
  if (link.getAttribute('href') === pagina_actual) {
    link.classList.add('activo');
    // Si el href del link coincide con la página actual,
    // agrega la clase .activo → CSS lo pone dorado
  }
});

/* MENÚ CAJÓN — termina aquí */


/* ============================================================
   FOOTER DINÁMICO — desde aquí
   En lugar de escribir el footer en cada página HTML,
   lo generamos una sola vez con JS.
   Si necesitas cambiar algo (teléfono, dirección, etc.)
   solo lo cambias aquí y se actualiza en todas las páginas.
============================================================ */

// Buscamos el elemento <footer id="pie_pagina"> en el HTML
const pie = document.getElementById('pie_pagina');

// Si existe en esta página, lo llenamos con el HTML del footer

  pie.innerHTML = `
    <div class="pie_pagina__grid">

      <!-- Columna 1: descripción de la tienda -->
      <div class="pie_pagina__col">
        <span class="pie_pagina__col_titulo">La Tienduca de LBP</span>
        <p>Ropa vintage y de segunda mano para hombres y mujeres.</p>
        <p>Lima, Perú · Desde 2020</p>
      </div>

      <!-- Columna 2: links de navegación -->
      <div class="pie_pagina__col">
        <span class="pie_pagina__col_titulo">Páginas</span>
        <a href="index.html">Inicio</a>
        <a href="varones.html">Hombres</a>
        <a href="mujeres.html">Mujeres</a>
        <a href="promociones.html">Promociones</a>
        <a href="ubicanos.html">Ubícanos</a>
        <a href="contacto.html">Contacto</a>
      </div>

      <!-- Columna 3: datos de contacto -->
      <div class="pie_pagina__col">
        <span class="pie_pagina__col_titulo">Contacto</span>
        <p>📍 Jr. de la Unión 450, Lima</p>
        <p>📱 +51 999 888 777</p>
        <p>📧 lbp@tienduca.pe</p>
        <p>🕐 Lun–Sáb · 10am – 7pm</p>
      </div>

      <!-- Columna 4: redes sociales con íconos -->
      <div class="pie_pagina__col">
        <span class="pie_pagina__col_titulo">Síguenos</span>
        <div class="pie_pagina__redes">
          <a href="https://wa.me/51999888777" target="_blank" class="pie_pagina__red wa">
            💬 WhatsApp
          </a>
          <a href="https://instagram.com/latienduca_lbp" target="_blank" class="pie_pagina__red ig">
            📸 Instagram
          </a>
          <a href="https://facebook.com/latienduca" target="_blank" class="pie_pagina__red fb">
            👍 Facebook
          </a>
          
        </div>
      </div>

    </div>
    <p class="pie_pagina__copy">© 2026 La Tienduca de LBP · Lima, Perú · Todos los derechos reservados</p>
  `;

/* FOOTER DINÁMICO — termina aquí */


/* ============================================================
   SLIDER 3D — desde aquí
   Solo funciona en index.html donde existen .diapositiva.
   La lógica: guardamos en 'actual' el índice del slide activo.
   Cada vez que avanzamos, actualizarSlider() recorre todos
   los slides y les asigna su clase: activa/anterior/siguiente/oculta.
   CSS hace la animación automáticamente.
============================================================ */

// Buscamos todas las diapositivas en la página
const diapositivas = document.querySelectorAll('.diapositiva');

// Solo ejecutamos si existen diapositivas en esta página
if (diapositivas.length > 0) {

  const contenedor_puntos = document.querySelector('.puntos');
  const total = diapositivas.length; // cuántas diapositivas hay
  let actual  = 0; // índice del slide activo (empieza en 0)

  // Creamos los puntitos dinámicamente según cuántos slides haya
  // En lugar de escribirlos en el HTML, JS los crea aquí
  diapositivas.forEach((_, i) => {
    const punto = document.createElement('div');
    // createElement('div') crea un nuevo elemento HTML
    punto.classList.add('punto');
    if (i === 0) punto.classList.add('activo'); // el primero activo
    punto.addEventListener('click', () => irA(i)); // click = ir a ese slide
    contenedor_puntos.appendChild(punto);
    // appendChild agrega el nuevo punto al contenedor
  });

  // Función principal: asigna una clase a cada slide según su posición
  function actualizarSlider() {
    diapositivas.forEach((diap, i) => {
      diap.className = 'diapositiva'; // limpia todas las clases previas

      if (i === actual) {
        diap.classList.add('activa');  // este es el slide del centro

      } else if (i === (actual - 1 + total) % total) {
        diap.classList.add('anterior');
        // (actual - 1 + total) % total evita números negativos.
        // Ejemplo: si actual=0, queremos el ÚLTIMO a la izquierda.
        // 0 - 1 = -1 (inválido), pero (-1 + 3) % 3 = 2 ✓

      } else if (i === (actual + 1) % total) {
        diap.classList.add('siguiente');
        // % total = vuelve al 0 cuando llega al final.
        // Ejemplo: si total=3 y actual=2: (2+1)%3 = 0 ✓

      } else {
        diap.classList.add('oculta'); // los demás, invisibles
      }
    });

    // Actualiza los puntitos: solo el activo tiene la clase .activo
    document.querySelectorAll('.punto').forEach((p, i) => {
      p.classList.toggle('activo', i === actual);
      // toggle(clase, condicion): agrega si true, quita si false
    });
  }

  // Función para ir a un slide específico por su número
  function irA(indice) {
    actual = indice;
    actualizarSlider();
  }

  // Botones siguiente y anterior
  document.querySelector('.btn_siguiente').addEventListener('click', () => {
    irA((actual + 1) % total); // siguiente, vuelve a 0 si es el último
  });
  document.querySelector('.btn_anterior').addEventListener('click', () => {
    irA((actual - 1 + total) % total); // anterior, va al último si está en 0
  });

  // Autoplay: avanza solo cada 4 segundos
  let autoplay = setInterval(() => irA((actual + 1) % total), 4000);
  // setInterval ejecuta una función cada X milisegundos

  // Pausa el autoplay al pasar el mouse sobre el slider
  const cc = document.querySelector('.carrusel_contenedor');
  cc.addEventListener('mouseenter', () => clearInterval(autoplay));
  // clearInterval detiene el intervalo
  cc.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => irA((actual + 1) % total), 4000);
    // al salir, reinicia el autoplay
  });

  actualizarSlider(); // inicializa el slider al cargar la página
}

/* SLIDER 3D — termina aquí */


/* ============================================================
   CARRITO VISUAL — desde aquí
   Muestra los productos que el usuario agrega.
   Es solo visual, no procesa pagos reales.
   Al terminar, muestra un link de WhatsApp con el pedido.
============================================================ */

// Array donde guardamos los productos del carrito
// Un array es una lista: [item1, item2, item3]
let carrito = [];

// ---- Crear el botón flotante del carrito ----
// Lo creamos con JS para que aparezca en TODAS las páginas
const btn_carrito = document.createElement('button');
btn_carrito.className = 'btn_carrito_flotante';
btn_carrito.innerHTML = `
  🛍
  <span class="carrito_contador oculto" id="carrito_contador">0</span>
`;
document.body.appendChild(btn_carrito);

// ---- Crear el panel lateral del carrito ----
const panel = document.createElement('div');
panel.className = 'panel_carrito';
panel.id = 'panel_carrito';
panel.innerHTML = `
  <div class="panel_carrito__header">
    <span class="panel_carrito__titulo">Mi Carrito</span>
    <button class="btn_cerrar_carrito" id="btn_cerrar_carrito">✕</button>
  </div>
  <div class="panel_carrito__lista" id="lista_carrito">
    <p class="carrito_vacio" id="carrito_vacio">Tu carrito está vacío</p>
  </div>
  <div class="panel_carrito__footer" id="footer_carrito" style="display:none">
    <div class="panel_carrito__total">
      <span>Total:</span>
      <span id="carrito_total">S/ 0</span>
    </div>
    <a class="btn_whatsapp_pedido" id="btn_whatsapp_pedido" href="#" target="_blank">
      💬 Pedir por WhatsApp
    </a>
  </div>
`;
document.body.appendChild(panel);

// ---- Crear el toast de confirmación ----
// Toast = pequeña notificación que aparece y desaparece
const toast = document.createElement('div');
toast.className = 'toast_carrito';
toast.id = 'toast_carrito';
toast.textContent = '✦ Prenda agregada al carrito';
document.body.appendChild(toast);

// ---- Abrir y cerrar el panel carrito ----
btn_carrito.addEventListener('click', () => {
  panel.classList.toggle('abierto');
  // toggle = si tiene la clase la quita, si no la tiene la agrega
});
document.getElementById('btn_cerrar_carrito').addEventListener('click', () => {
  panel.classList.remove('abierto');
});

// ---- Función para actualizar lo que se ve en el carrito ----
function actualizarCarrito() {
  const lista = document.getElementById('lista_carrito');
  const vacio = document.getElementById('carrito_vacio');
  const footer_carrito = document.getElementById('footer_carrito');
  const contador = document.getElementById('carrito_contador');
  const total_el = document.getElementById('carrito_total');
  const btn_wa   = document.getElementById('btn_whatsapp_pedido');

  if (carrito.length === 0) {
    // Carrito vacío: muestra mensaje, oculta footer y contador
    vacio.style.display = 'block';
    footer_carrito.style.display = 'none';
    contador.classList.add('oculto');
    return; // sale de la función
  }

  // Carrito con productos: oculta mensaje, muestra footer y contador
  vacio.style.display = 'none';
  footer_carrito.style.display = 'block';
  contador.classList.remove('oculto');
  contador.textContent = carrito.length; // número de productos

  // Limpiar y redibujar los items del carrito
  // Primero quitamos todo excepto el mensaje de vacío
  const items_anteriores = lista.querySelectorAll('.carrito_item');
  items_anteriores.forEach(item => item.remove());

  // Calculamos el total sumando los precios
  let total = 0;

  // Recorremos cada producto del carrito y creamos su HTML
  carrito.forEach((producto, index) => {
    // Extraer el número del precio (ej: "S/ 85" → 85)
    const precio_num = parseInt(producto.precio.replace(/\D/g, '')) || 0;
    // replace(/\D/g, '') = quita todos los caracteres que no son números
    // parseInt = convierte el texto "85" al número 85
    total += precio_num;

    const item_el = document.createElement('div');
    item_el.className = 'carrito_item';
    item_el.innerHTML = `
      <div class="carrito_item__foto">
        <img src="${producto.img}" alt="${producto.nombre}">
      </div>
      <div class="carrito_item__info">
        <p class="carrito_item__nombre">${producto.nombre}</p>
        <p class="carrito_item__talla">Talla: ${producto.talla}</p>
        <p class="carrito_item__precio">${producto.precio}</p>
      </div>
      <button class="carrito_item__quitar" data-index="${index}">✕</button>
    `;
    lista.appendChild(item_el); // agrega el item al panel
  });

  // Mostrar el total
  total_el.textContent = 'S/ ' + total;

  // Armar el mensaje de WhatsApp con todos los productos
  // encodeURIComponent convierte el texto para que funcione en una URL
  const mensaje = 'Hola, quiero consultar sobre estas prendas:\n' +
    carrito.map((p, i) => `${i + 1}. ${p.nombre} - Talla ${p.talla} - ${p.precio}`).join('\n');
  btn_wa.href = 'https://wa.me/51999888777?text=' + encodeURIComponent(mensaje);

  // Eventos para quitar productos: click en el botón ✕ de cada item
  lista.querySelectorAll('.carrito_item__quitar').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      // dataset.index lee el atributo data-index del HTML
      carrito.splice(idx, 1);
      // splice(idx, 1) = quita 1 elemento en la posición idx
      actualizarCarrito(); // redibuja el carrito
    });
  });
}


/* ============================================================
   MODAL DE PRODUCTO — desde aquí
   Aparece al hacer click en cualquier tarjeta.
   Lee los datos del producto desde los atributos data-* del HTML.
   Permite agregar el producto al carrito visual.
============================================================ */

// Creamos el modal una vez y lo insertamos en el body
const modal = document.createElement('div');
modal.className = 'modal_producto';
modal.id = 'modal_producto';
modal.innerHTML = `
  <div class="modal_producto__fondo"></div>
  <div class="modal_producto__caja">
    <button class="btn_modal_cerrar" id="btn_modal_cerrar">✕</button>

    <!-- Foto del producto (izquierda) -->
    <div class="modal_producto__foto">
      <img id="modal_img" src="" alt="">
    </div>

    <!-- Info del producto (derecha) -->
    <div class="modal_producto__info">
      <span class="modal_producto__etiqueta" id="modal_etiqueta"></span>
      <h2 class="modal_producto__nombre" id="modal_nombre"></h2>
      <p class="modal_producto__precio" id="modal_precio"></p>
      <p class="modal_producto__descripcion" id="modal_desc"></p>

      <p class="modal_producto__tallas_titulo">Selecciona tu talla:</p>
      <div class="modal_producto__tallas">
        <div class="talla">XS</div>
        <div class="talla">S</div>
        <div class="talla seleccionada">M</div>
        <div class="talla">L</div>
        <div class="talla">XL</div>
      </div>

      <div class="modal_producto__btns">
        <button class="btn_agregar_carrito" id="btn_agregar">
          Agregar al carrito
        </button>
      </div>
    </div>

  </div>
`;
document.body.appendChild(modal);

// Función para ABRIR el modal con los datos de una tarjeta
function abrirModal(tarjeta) {
  // Leemos los atributos data-* de la tarjeta clickeada
  // data-img="..." → tarjeta.dataset.img
  document.getElementById('modal_img').src             = tarjeta.dataset.img     || '';
  document.getElementById('modal_nombre').textContent  = tarjeta.dataset.nombre  || '';
  document.getElementById('modal_precio').textContent  = tarjeta.dataset.precio  || '';
  document.getElementById('modal_desc').textContent    = tarjeta.dataset.desc    || 'Prenda vintage en excelente estado.';
  document.getElementById('modal_etiqueta').textContent = tarjeta.dataset.etiqueta || 'Ropa Vintage';

  // Resetear el botón por si quedó en estado "Agregado ✓"
  const btn = document.getElementById('btn_agregar');
  btn.textContent = 'Agregar al carrito';
  btn.classList.remove('agregado');

  modal.classList.add('visible'); // muestra el modal
  document.body.style.overflow = 'hidden'; // evita scroll detrás
}

// Función para CERRAR el modal
function cerrarModal() {
  modal.classList.remove('visible');
  document.body.style.overflow = ''; // restaura el scroll
}

// Cerrar el modal al hacer click en el fondo o en la X
modal.querySelector('.modal_producto__fondo').addEventListener('click', cerrarModal);
document.getElementById('btn_modal_cerrar').addEventListener('click', cerrarModal);

// Selector de tallas: click en una talla la marca como seleccionada
modal.querySelectorAll('.talla').forEach(t => {
  t.addEventListener('click', () => {
    modal.querySelectorAll('.talla').forEach(x => x.classList.remove('seleccionada'));
    t.classList.add('seleccionada');
    // Quita .seleccionada de todas y agrega solo a la clickeada
  });
});

// Botón "Agregar al carrito"
document.getElementById('btn_agregar').addEventListener('click', () => {
  const btn = document.getElementById('btn_agregar');

  // Leer la talla seleccionada
  const talla_el = modal.querySelector('.talla.seleccionada');
  const talla = talla_el ? talla_el.textContent : 'M';

  // Leer los datos actuales del modal
  const producto = {
    nombre:  document.getElementById('modal_nombre').textContent,
    precio:  document.getElementById('modal_precio').textContent,
    img:     document.getElementById('modal_img').src,
    talla:   talla
  };

  // Agregar el producto al array del carrito
  carrito.push(producto);
  // push agrega un elemento al final del array

  // Actualizar la vista del carrito
  actualizarCarrito();

  // Cambiar el botón a estado "Agregado"
  btn.textContent = '✓ Agregado';
  btn.classList.add('agregado'); // se vuelve verde

  // Mostrar el toast de confirmación
  const toast_el = document.getElementById('toast_carrito');
  toast_el.classList.add('visible');
  setTimeout(() => toast_el.classList.remove('visible'), 2500);
  // setTimeout ejecuta algo después de X milisegundos (2.5 segundos)

  // Cerrar el modal y abrir el carrito después de un momento
  setTimeout(() => {
    cerrarModal();
    panel.classList.add('abierto'); // abre el panel carrito
  }, 900);
});

// Conectar cada tarjeta con el modal
// Cuando el usuario hace click en una tarjeta, se abre el modal
document.querySelectorAll('.tarjeta').forEach(tarjeta => {
  tarjeta.addEventListener('click', (e) => {
    // e.target = el elemento exacto donde se hizo click
    // Si el click fue en el botón "Ver prenda", no hacemos nada
    // porque el botón tiene su propio listener abajo
    if (e.target.classList.contains('btn_comprar')) return;
    abrirModal(tarjeta);
  });

  // El botón "Ver prenda" también abre el modal
  const btn = tarjeta.querySelector('.btn_comprar');
  if (btn) btn.addEventListener('click', () => abrirModal(tarjeta));
});

/* MODAL DE PRODUCTO — termina aquí */
/* CARRITO VISUAL — termina aquí */


/* ============================================================
   FORMULARIO DE CONTACTO — desde aquí
   Solo se ejecuta si existe #formulario_contacto en la página.
   Al enviarlo, muestra un mensaje de éxito sin recargar.
============================================================ */
const formulario_contacto = document.getElementById('formulario_contacto');

if (formulario_contacto) {
  formulario_contacto.addEventListener('submit', (e) => {
    e.preventDefault();
    // preventDefault() evita que la página se recargue al enviar.
    // Por defecto los formularios HTML recargan la página.

    const nombre  = document.getElementById('campo_nombre').value.trim();
    const email   = document.getElementById('campo_email').value.trim();
    const mensaje = document.getElementById('campo_mensaje').value.trim();
    // .value = texto escrito en el campo
    // .trim() = quita espacios al inicio y al final

    if (!nombre || !email || !mensaje) {
      alert('Por favor completa todos los campos.');
      return; // sale de la función sin hacer nada más
    }

    // Simula el envío con una animación de 1.2 segundos
    const btn = formulario_contacto.querySelector('.btn_enviar');
    btn.textContent = 'Enviando...';
    btn.disabled = true; // desactiva el botón

    setTimeout(() => {
      // Después de 1.2s: oculta el form y muestra mensaje de éxito
      formulario_contacto.classList.add('oculto');
      document.getElementById('form_exitoso').classList.remove('oculto');
    }, 1200);
  });
}

/* FORMULARIO DE CONTACTO — termina aquí */
