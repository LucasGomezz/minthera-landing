import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";
import { hero, meta } from "@/content/site";

export const alt = meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SPARKLE =
  "M12 0C12.7 6.6 17.4 11.3 24 12 17.4 12.7 12.7 17.4 12 24 11.3 17.4 6.6 12.7 0 12 6.6 11.3 11.3 6.6 12 0Z";

function Sparkle({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d={SPARKLE} fill={color} />
    </svg>
  );
}

/** Imagen para compartir en redes (Open Graph / Twitter). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: brand.fg,
          backgroundColor: brand.bg,
          backgroundImage: `radial-gradient(circle at 88% 12%, ${brand.violet}cc 0%, ${brand.violetDeep}66 28%, transparent 55%), radial-gradient(circle at 8% 110%, ${brand.violetDeep}aa 0%, transparent 45%)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Sparkle size={52} color={brand.primary} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: 6 }}>MINTHERA</span>
            <span style={{ fontSize: 15, letterSpacing: 7, color: brand.muted, marginTop: 4 }}>
              DESARROLLO WEB
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -3,
              maxWidth: 900,
            }}
          >
            <span>{hero.titleLead}&nbsp;</span>
            <span style={{ color: brand.primary }}>{hero.titleHighlight}</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 6,
            color: brand.muted,
          }}
        >
          <span>DISEÑO / TECNOLOGÍA / TU MARCA</span>
          <span style={{ display: "flex", alignItems: "center", gap: 12, color: brand.fg, letterSpacing: 2 }}>
            <Sparkle size={18} color={brand.lime} />
            minthera.dev
          </span>
        </div>
      </div>
    ),
    size,
  );
}
