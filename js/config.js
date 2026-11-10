/* =====================================================================
   ✏️ CONFIGURACIÓN
   El texto de las cartas NO va aquí: va en archivos .txt dentro de cartas/.
   Separa los párrafos con una línea en blanco.
   ===================================================================== */
const CONFIG = {
  tuNombre: "Tu Cuchurrumi",
  musica: "assets/cancion.mp3",

  inicio: {
    titulo: "Meine Mauschen",
    sub: "Un huequito de internet solo para ti",
    gif: "assets/cat.gif",   // si no existe, se muestra el emoji
    emoji: "🍈"
  },

  // Dedicatoria por defecto de las cartas (cada carta puede tener la suya)
  dedicatoria: "Para el amor de mi vida 💗",

  // Lista de cartas. "nombre" es lo que aparece en la lista, "fecha" es opcional.
  // "archivo" es el .txt con el texto (párrafos separados por una línea en blanco).
  cartas: [
    { nombre: "Primera Cartita", fecha: "10 de Noviembre", archivo: "cartas/cumple2026.txt" },
    { nombre: "Otra carta (ejemplo)", fecha: "Pronto", archivo: "cartas/ejemplo.txt" }
  ],

  // Pie de página y detallitos escondidos
  pie: {
    desde: "2023-10-24",
    texto: "Amándonos desde el 24 de octubre de 2023, y lo que falte",
    // Título de la pestaña cuando te vas de la página
    tituloAusente: "Vuelve, te extraño 🥺"
  },

  // Opciones del home
  opciones: [
    { id: "cartas",    emoji: "💌", titulo: "Cartas" },
    { id: "recuerdos", emoji: "📸", titulo: "Recuerdos" },
    { id: "sorpresas", emoji: "🎁", titulo: "Sorpresas" }
  ]
};
