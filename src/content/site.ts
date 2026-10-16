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

/**
 * Una vista de un trabajo dentro del popup. Rutas dentro de /public; si falta
 * una imagen se muestra un marcador.
 * - "compare": antes y después con deslizador (secciones que ya existían).
 * - "single": una sola captura (secciones nuevas o que no hace falta comparar).
 * - "video": un video corto (.mp4 o .webm), sin sonido y en loop. `poster` es
 *   la imagen que se ve mientras carga.
 * `device: "phone"` muestra la captura o el video dentro de un celular.
 */
type Extras = { badge?: string; device?: "phone" };

export type ProjectView =
  | { kind: "compare"; label: string; before?: string; after?: string }
  | ({ kind: "single"; label: string; image?: string } & Extras)
  | ({ kind: "video"; label: string; src?: string; poster?: string } & Extras);

export type Project = {
  /** Identificador único; las imágenes van en /public/trabajos/<id>/ */
  id: string;
  name: string;
  category: string;
  /** Dominio que se muestra en la barra del navegador */
  domain: string;
  /** Link al sitio publicado (opcional) */
  url?: string;
  /** Una línea sobre qué se hizo */
  summary: string;
  /** Color de fondo de la previsualización */
  accent: string;
  /** Ruta dentro de /public. Si falta, se muestra el nombre. */
  logo?: string;
  /** Vistas del popup, en orden. */
  views: ProjectView[];
};

export const work = {
  eyebrow: "TRABAJOS",
  title: "Webs que ya están online",
  lead: "Abrí cualquiera: en los rediseños deslizás para comparar el antes y el después, y las webs nuevas las recorrés como si estuvieras ahí.",
  projects: [
    {
      id: "ms-group",
      name: "MS Group",
      category: "Sitio institucional",
      domain: "ms-group-theta.vercel.app",
      url: "https://ms-group-theta.vercel.app/",
      summary: "Rediseño completo de un sitio de los 2000 hecho en Flash: bilingüe, responsive y con una página por división.",
      accent: "#eef1f5",
      logo: "/trabajos/ms-group/logo.png",
      views: [
        {
          kind: "compare",
          label: "Inicio",
          before: "/trabajos/ms-group/inicio-antes.jpg",
          after: "/trabajos/ms-group/inicio-despues.jpg",
        },
        {
          kind: "video",
          label: "Recorrido",
          src: "/trabajos/ms-group/recorrido.webm",
          poster: "/trabajos/ms-group/inicio-despues.jpg",
        },
        {
          kind: "compare",
          label: "MS Shipping",
          before: "/trabajos/ms-group/shipping-antes.jpg",
          after: "/trabajos/ms-group/shipping-despues.jpg",
        },
        {
          kind: "compare",
          label: "MS Forwarding",
          before: "/trabajos/ms-group/forwarding-antes.jpg",
          after: "/trabajos/ms-group/forwarding-despues.jpg",
        },
        {
          kind: "compare",
          label: "MS Trading",
          before: "/trabajos/ms-group/trading-antes.jpg",
          after: "/trabajos/ms-group/trading-despues.jpg",
        },
        {
          kind: "video",
          label: "Celular",
          src: "/trabajos/ms-group/celular.webm",
          poster: "/trabajos/ms-group/celular.jpg",
          device: "phone",
          badge: "NUEVO",
        },
      ],
    },
    {
      id: "coral-reef",
      name: "Coral Reef",
      category: "Landing page",
      domain: "coralreefyoga.vercel.app",
      url: "https://coralreefyoga.vercel.app/",
      summary: "Landing bilingüe para clases de yoga en Malta, con reserva de clases privadas y grupales.",
      accent: "#e9dfd6",
      logo: "/trabajos/coral-reef/logo.png",
      views: [
        {
          kind: "video",
          label: "Recorrido",
          src: "/trabajos/coral-reef/recorrido.webm",
          poster: "/trabajos/coral-reef/inicio.jpg",
          badge: "NUEVA",
        },
        { kind: "single", label: "Sobre mí", image: "/trabajos/coral-reef/sobre-mi.jpg" },
        { kind: "single", label: "Clases", image: "/trabajos/coral-reef/clases.jpg" },
        {
          kind: "video",
          label: "Celular",
          src: "/trabajos/coral-reef/celular.webm",
          poster: "/trabajos/coral-reef/celular.jpg",
          device: "phone",
        },
      ],
    },
    {
      id: "asistente-fauba",
      name: "Asistente FAUBA",
      category: "Chatbot con IA",
      domain: "pdf-chatbot-front-five.vercel.app",
      summary: "Asistente virtual para una cátedra de la Facultad de Agronomía (UBA): responde consultas usando solo el material que suben los docentes.",
      accent: "#eef3ea",
      logo: "/trabajos/asistente-fauba/logo.png",
      views: [
        { kind: "single", label: "Chat", image: "/trabajos/asistente-fauba/chat.jpg" },
        { kind: "single", label: "Panel docente", image: "/trabajos/asistente-fauba/material.jpg" },
        { kind: "single", label: "Ingreso", image: "/trabajos/asistente-fauba/ingreso.jpg" },
        { kind: "single", label: "Celular", image: "/trabajos/asistente-fauba/celular.jpg", device: "phone" },
      ],
    },
  ] satisfies Project[] as Project[],
};
