const menu_cajon  = document.getElementById('menu_cajon');
const capa_oscura = document.getElementById('capa_oscura');
const btn_abrir   = document.getElementById('btn_abrir');
const btn_cerrar  = document.getElementById('btn_cerrar');

function abrirMenu() {
  menu_cajon.classList.add('abierto');
  capa_oscura.classList.add('visible');
}
function cerrarMenu() {
  menu_cajon.classList.remove('abierto');
  capa_oscura.classList.remove('visible');
}

btn_abrir.addEventListener('click', abrirMenu);
btn_cerrar.addEventListener('click', cerrarMenu);
capa_oscura.addEventListener('click', cerrarMenu);

document.querySelectorAll('.menu_cajon__lista a').forEach(link => {
  link.addEventListener('click', cerrarMenu);
});

const pagina_actual = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.menu_cajon__lista a').forEach(link => {
  if (link.getAttribute('href') === pagina_actual) link.classList.add('activo');
});


const diapositivas = document.querySelectorAll('.diapositiva');

if (diapositivas.length > 0) {
  const contenedor_puntos = document.querySelector('.puntos');
  const total = diapositivas.length;
  let actual  = 0;

  diapositivas.forEach((_, i) => {
    const punto = document.createElement('div');
    punto.classList.add('punto');
    if (i === 0) punto.classList.add('activo');
    punto.addEventListener('click', () => irA(i));
    contenedor_puntos.appendChild(punto);
  });

  function actualizarSlider() {
    diapositivas.forEach((diap, i) => {
      diap.className = 'diapositiva';
      if      (i === actual)                       diap.classList.add('activa');
      else if (i === (actual - 1 + total) % total) diap.classList.add('anterior');
      else if (i === (actual + 1) % total)         diap.classList.add('siguiente');
      else                                          diap.classList.add('oculta');
    });
    document.querySelectorAll('.punto').forEach((p, i) =>
      p.classList.toggle('activo', i === actual)
    );
  }

  function irA(indice) { actual = indice; actualizarSlider(); }

  document.querySelector('.btn_siguiente').addEventListener('click', () => irA((actual + 1) % total));
  document.querySelector('.btn_anterior').addEventListener('click', () => irA((actual - 1 + total) % total));

  let autoplay = setInterval(() => irA((actual + 1) % total), 4000);
  const cc = document.querySelector('.carrusel_contenedor');
  cc.addEventListener('mouseenter', () => clearInterval(autoplay));
  cc.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => irA((actual + 1) % total), 4000);
  });

  actualizarSlider();
}
