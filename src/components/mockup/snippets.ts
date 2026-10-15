/**
 * Código "que se está escribiendo" en cada etapa. Es decorativo: falso pero
 * creíble. Índice = etapa (0 = hero, 1..7 = servicios).
 */
export const snippets: { file: string; code: string }[] = [
  {
    file: "page.tsx",
    code: `// minthera.dev · proyecto nuevo
export default function Home() {
  return <main />
}`,
  },
  {
    file: "layout.tsx",
    code: `<Header>
  <Logo /> <Nav items={3} />
</Header>
<Hero title="…" cta />
<Grid cols={3}>
  <Card /> <Card /> <Card />
</Grid>`,
  },
  {
    file: "Hero.tsx",
    code: `<section className="bg-violet">
  <h1 className="display">
    Tu idea, <em>hecha web.</em>
  </h1>
  <Button variant="lavanda" />
  <Petal blur={24} />
</section>`,
  },
  {
    file: "Grid.tsx",
    code: `<Grid
  cols={{ base: 1, lg: 3 }}
  gap="clamp(1rem, 3vw, 2rem)"
>
  {cards.map(renderCard)}
</Grid>`,
  },
  {
    file: "integraciones.tsx",
    code: `<WhatsApp phone="+54 9 11 …" />
<ContactForm onSubmit={sendLead} />
<Booking calendar="turnos" />`,
  },
  {
    file: "cms.ts",
    code: `const hero = await cms.get("hero")
// editable desde el panel
export default function Hero() {
  return <h1>{hero.title}</h1>
}`,
  },
  {
    file: "next.config.ts",
    code: `export default {
  https: true,
  images: "optimized",
  cache: "edge",
}
// lighthouse → 100`,
  },
  {
    file: "deploy.sh",
    code: `$ git push origin main
✓ build listo en 18s
✓ deploy → minthera.dev
// tu sitio está online`,
  },
];
