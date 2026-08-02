import fs from "node:fs";
import path from "node:path";

const dir = "public/images/Gallery";
const files = fs.readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f)).sort();

function dims(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = buf[i + 1];
    if (marker === 0xd8) {
      i += 2;
      continue;
    }
    if (marker === 0xd9) break;
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  return null;
}

const items = files.map((f, idx) => {
  const b = fs.readFileSync(path.join(dir, f));
  const d = dims(b);
  const ratio = d ? d.w / d.h : 1.5;
  let span = "normal";
  if (ratio > 1.55) span = "wide";
  else if (ratio < 0.85) span = "tall";
  return {
    id: `g${String(idx + 1).padStart(3, "0")}`,
    src: `/images/Gallery/${f}`,
    width: d?.w ?? 1600,
    height: d?.h ?? 1067,
    span,
  };
});

const content = `export type GallerySpan = "normal" | "wide" | "tall";

export interface GalleryImage {
  id: string;
  src: string;
  width: number;
  height: number;
  span: GallerySpan;
}

export const galleryImages: GalleryImage[] = ${JSON.stringify(items, null, 2)};
`;

fs.writeFileSync("src/data/gallery.ts", content);
console.log(`Wrote ${items.length} images to src/data/gallery.ts`);
