import { ImageResponse } from "next/og";
export const alt = "Kevin Dwi Wijaya — full-stack & mobile engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#e8f0fe",
        color: "#202124",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: "#1967d2" }}>
        kevin / portfolio
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", fontSize: 70, fontWeight: 700 }}>
          Thoughtful products.
          <br />
          Built with care.
        </div>
        <div style={{ display: "flex", fontSize: 28 }}>
          Kevin Dwi Wijaya · Full-stack & mobile engineer
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 24 }}>kvndwi.com</div>
    </div>,
    size,
  );
}
