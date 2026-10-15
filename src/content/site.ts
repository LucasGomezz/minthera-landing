/**
 * Todos los textos de la landing. Editá acá y se actualiza el sitio.
 * Los íconos se referencian por clave (ver `components/ui/Icon.tsx`).
 */

export type IconKey =
  | "layout"
  | "palette"
  | "smartphone"
  | "plug"
  | "pen"
  | "shield"
  | "rocket";

export type Stage = {
  /** Ancla para la URL (#id) */
  id: string;
  icon: IconKey;
  title: string;
  /** Línea corta debajo del título */
  line: string;
  detail: string;
  points: string[];
};

export const meta = {
  title: "MINTHERA · Desarrollo web a medida",
  description:
    "Estudio de desarrollo web. Diseñamos y desarrollamos sitios a medida, modernos, funcionales y fáciles de gestionar: desde una landing hasta plataformas completas.",
  keywords: [
    "desarrollo web",
    "diseño web",
    "sitios a medida",
    "landing page",
    "Next.js",
    "Argentina",
    "Minthera",
  ],
};

export const brandLine = "DISEÑO / TECNOLOGÍA / TU MARCA";

export const header = {
  tagline: "IDEAS QUE SE CONVIERTEN EN EXPERIENCIAS DIGITALES",
};

export const hero = {
  eyebrow: brandLine,
  titleLead: "Tu proyecto en la web,",
  titleHighlight: "como lo imaginás.",
  lead: "Desarrollamos sitios web a medida, modernos, funcionales y fáciles de gestionar. Desde una landing hasta plataformas completas, pensados para que tu marca crezca.",
  cta: { label: "HABLEMOS", href: "#contacto" },
  scrollHint: "Scrolleá y mirá cómo se construye",
};

export const stages: Stage[] = [
  {
    id: "a-medida",
    icon: "layout",
    title: "Sitios web a medida",
    line: "Nada de plantillas: cada sitio arranca desde tu idea.",
    detail:
      "Entendemos tu negocio, tus objetivos y a quién le hablás para definir la estructura justa: qué secciones necesitás, cómo se recorren y qué tiene que pasar en cada una.",
    points: ["Landing pages", "Sitios institucionales", "Plataformas completas"],
  },
  {
    id: "diseno",
    icon: "palette",
    title: "Diseño",
    line: "Una identidad visual que se nota y se recuerda.",
    detail:
      "Tipografía, color y ritmo al servicio de tu marca. Diseñamos interfaces claras y con personalidad, que guían a tus visitantes hacia lo importante.",
    points: ["UI a medida", "Sistema visual propio", "Microinteracciones"],
  },
  {
    id: "responsive",
    icon: "smartphone",
    title: "Diseño responsive",
    line: "Se ve perfecto en el celu, la tablet y la compu.",
    detail:
      "La mayoría de tus visitas llega desde el celular. Cada pantalla se piensa para reacomodarse sin perder claridad ni velocidad.",
    points: ["Mobile first", "Pensado para el tacto", "Cualquier tamaño de pantalla"],
  },
  {
    id: "integraciones",
    icon: "plug",
    title: "Integraciones",
    line: "Tu web conectada con las herramientas que ya usás.",
    detail:
      "WhatsApp, formularios, turnos online, pagos, redes y analítica, todo funcionando junto para que no se te escape ninguna consulta.",
    points: ["WhatsApp", "Formularios", "Turnos y reservas", "Pagos online"],
  },
  {
    id: "contenidos",
    icon: "pen",
    title: "Gestión de contenidos",
    line: "Editá textos, fotos y productos vos mismo.",
    detail:
      "Te dejamos un panel simple para actualizar tu sitio cuando quieras, sin depender de nadie y sin tocar una línea de código.",
    points: ["Panel autoadministrable", "Blog y novedades", "Catálogo de productos"],
  },
  {
    id: "seguridad",
    icon: "shield",
    title: "Seguridad y rendimiento",
    line: "Rápida, segura y lista para aparecer en Google.",
    detail:
      "Certificado SSL, buenas prácticas de seguridad y una carga optimizada para que tu sitio vuele y posicione mejor.",
    points: ["SSL incluido", "Carga ultrarrápida", "SEO técnico"],
  },
  {
    id: "lanzamiento",
    icon: "rocket",
    title: "Soporte y lanzamiento",
    line: "Te acompañamos en la publicación, y después también.",
    detail:
      "Nos ocupamos del dominio, el hosting y la puesta online. Y cuando ya está andando, seguimos cerca para ajustes, mejoras y lo que necesites.",
    points: ["Dominio y hosting", "Puesta online", "Soporte continuo"],
  },
];

export const idealFor = {
  eyebrow: "¿PARA QUIÉN?",
  title: "Ideal para",
  lead: "Si tenés una idea, un negocio o un proyecto que necesita presencia online, estamos para ayudarte.",
  items: [
    "Emprendimientos y pymes",
    "Profesionales independientes",
    "Tiendas online",
    "Proyectos educativos o institucionales",
    "Cualquier idea que necesite una web",
  ],
};

export const closing = {
  eyebrow: "¿ARRANCAMOS?",
  script: "Hagamos tu idea realidad",
  text: "Contanos qué tenés en mente y te respondemos con una propuesta a medida.",
  cta: { label: "ESCRIBINOS", href: "mailto:hola@minthera.dev" },
  contacts: [
    { label: "minthera.dev", href: "https://minthera.dev", kind: "web" },
    { label: "@minthera.dev", href: "https://instagram.com/minthera.dev", kind: "instagram" },
    { label: "hola@minthera.dev", href: "mailto:hola@minthera.dev", kind: "email" },
  ],
} as const;

export const footer = {
  line: brandLine,
  legal: "© MINTHERA · minthera.dev",
};
