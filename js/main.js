const $ = s => document.querySelector(s);
const dormir = ms => new Promise(r => setTimeout(r, ms));

/* Pone un gif/foto en un contenedor; si falla, muestra el emoji */
function poner(caja, src, emoji, alt = "") {
  caja.textContent = emoji || "💗";
  if (!src) return;
  const img = new Image();
  img.alt = alt;
  img.onload = () => { caja.textContent = ""; caja.appendChild(img); };
  img.src = src;
}

/* ---------- Navegación por secciones ---------- */
const secciones = [...document.querySelectorAll(".seccion")].map(s => s.id);
function ir() {
  const [ruta, param] = location.hash.slice(1).split("/");
  const id = secciones.includes(ruta) ? ruta : "inicio";
  // Leyendo una carta, el menú marca "Cartas"
  const activo = id === "carta" ? "cartas" : id;
  document.querySelectorAll(".seccion").forEach(s => s.classList.toggle("oculto", s.id !== id));
  document.querySelectorAll(".menu a").forEach(a => a.classList.toggle("activo", a.dataset.sec === activo));
  $("#menu").classList.remove("abierto");
  $("#burger").setAttribute("aria-expanded", "false");
  window.scrollTo(0, 0);
  if (id === "carta") {
    const i = Number(param);
    if (Number.isInteger(i) && CONFIG.cartas[i]) abrirCarta(i); else location.hash = "#cartas";
  }
}
window.addEventListener("hashchange", ir);
$("#burger").addEventListener("click", () => {
  const abierto = $("#menu").classList.toggle("abierto");
  $("#burger").setAttribute("aria-expanded", abierto);
});

/* ---------- Corazones al tocar ---------- */
function corazon(x, y, t = "💗") {
  const e = document.createElement("span");
  e.className = "vuela"; e.textContent = t;
  e.style.left = x + "px"; e.style.top = y + "px"; e.style.fontSize = (16 + Math.random() * 20) + "px";
  document.body.appendChild(e); setTimeout(() => e.remove(), 1600);
}
document.addEventListener("pointerdown", e => {
  corazon(e.clientX - 8, e.clientY - 8);
  if (Math.random() < .5) setTimeout(() => corazon(e.clientX + 12, e.clientY - 20, "💕"), 120);
});

/* ---------- Inicio ---------- */
$("#heroTitulo").textContent = CONFIG.inicio.titulo;
$("#heroSub").textContent = CONFIG.inicio.sub;
poner($("#heroGif"), CONFIG.inicio.gif, CONFIG.inicio.emoji);
CONFIG.opciones.forEach(o => {
  const a = document.createElement("a");
  a.className = "opcion"; a.href = "#" + o.id;
  a.innerHTML = `<span></span><b class="mano"></b>`;
  a.querySelector("span").textContent = o.emoji;
  a.querySelector("b").textContent = o.titulo;
  $("#opcionesHome").appendChild(a);
});

/* ---------- Lista de cartas ---------- */
CONFIG.cartas.forEach((c, i) => {
  const a = document.createElement("a");
  a.className = "item-carta"; a.href = "#carta/" + i;
  a.innerHTML = `<span class="sobrecito" aria-hidden="true">💌</span><span><b class="mano"></b><small></small></span>`;
  a.querySelector("b").textContent = c.nombre;
  a.querySelector("small").textContent = c.fecha || "";
  $("#listaCartas").appendChild(a);
});

/* ---------- Una carta (lee el .txt y la escribe poco a poco) ---------- */
$("#firma").textContent = "Atentamente, " + CONFIG.tuNombre;

let token = 0, parrafos = [], saltar = false;

function mostrarTodo(mio) {
  if (mio !== token) return;
  $("#texto").replaceChildren(...parrafos.map(t => {
    const p = document.createElement("p"); p.className = "mano"; p.textContent = t; return p;
  }));
  $("#firma").classList.remove("oculto");
  $("#saltar").classList.add("oculto");
}

function aviso(txt) {
  const p = document.createElement("p"); p.className = "mano"; p.textContent = txt;
  $("#texto").replaceChildren(p);
  $("#saltar").classList.add("oculto");
}

async function abrirCarta(i) {
  const mio = ++token;               // cancela cualquier carta que se esté escribiendo
  const c = CONFIG.cartas[i];
  saltar = false; parrafos = [];
  $("#dedicatoria").textContent = c.dedicatoria || CONFIG.dedicatoria;
  $("#cartaTitulo").textContent = c.nombre;
  $("#texto").replaceChildren();
  $("#firma").classList.add("oculto");
  $("#saltar").classList.remove("oculto");

  try {
    const r = await fetch(c.archivo, { cache: "no-cache" });
    if (!r.ok) throw new Error(r.status);
    const txt = (await r.text()).replace(/^\uFEFF/, "").trim();
    parrafos = txt.split(/\r?\n\s*\r?\n/).map(p => p.replace(/\s*\r?\n\s*/g, " ").trim()).filter(Boolean);
  } catch {
    if (mio === token) aviso("No pude leer " + c.archivo + ". Si abriste index.html con doble clic, corre un servidor local (mira el README).");
    return;
  }
  if (mio !== token) return;
  if (!parrafos.length) return aviso(c.archivo + " está vacío. Escribe tu carta ahí. 💗");

  await dormir(400);
  for (const t of parrafos) {
    if (saltar || mio !== token) break;
    const p = document.createElement("p"); p.className = "mano cursor"; $("#texto").appendChild(p);
    for (let k = 0; k < t.length && !saltar && mio === token; k++) { p.textContent += t[k]; await dormir(28); }
    p.classList.remove("cursor");
  }
  mostrarTodo(mio);
}
$("#saltar").addEventListener("click", () => { saltar = true; if (parrafos.length) mostrarTodo(token); });

/* ---------- Pie y detallitos escondidos ---------- */
function lluvia(n = 25) {
  for (let i = 0; i < n; i++) setTimeout(() => corazon(Math.random() * innerWidth, innerHeight - 20, Math.random() < .5 ? "💗" : "🍈"), i * 80);
}

const desde = new Date(CONFIG.pie.desde + "T00:00:00");
$("#pieDesde").textContent = CONFIG.pie.texto;
function dias() {
  const n = Math.max(0, Math.floor((Date.now() - desde) / 86400000));
  $("#pieDias").textContent = `(${n.toLocaleString("es")} días y contando)`;
}
dias(); setInterval(dias, 60000);

// Tocar 5 veces el gif del inicio: solo llueven corazones
let toques = 0;
$("#heroGif").addEventListener("click", () => {
  if (++toques === 5) { toques = 0; lluvia(); }
});

// Título de la pestaña cuando te vas
const tituloOriginal = document.title;
document.addEventListener("visibilitychange", () => {
  document.title = document.hidden ? CONFIG.pie.tituloAusente : tituloOriginal;
});

/* ---------- Música ---------- */
const audio = new Audio(CONFIG.musica); audio.loop = true;
$("#musica").addEventListener("click", async e => {
  e.stopPropagation();
  if (audio.paused) {
    try { await audio.play(); $("#musica").textContent = "⏸"; }
    catch {
      const a = $("#aviso"); a.textContent = "Añade tu canción como “" + CONFIG.musica + "”.";
      a.classList.remove("oculto"); setTimeout(() => a.classList.add("oculto"), 3500);
    }
  } else { audio.pause(); $("#musica").textContent = "🎵"; }
});

ir();
