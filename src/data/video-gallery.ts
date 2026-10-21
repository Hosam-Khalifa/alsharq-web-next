/**
 * Video Gallery manifest — sourced from `public/videos/Gallery`.
 * Update this file when adding or removing gallery videos.
 */

export interface GalleryVideo {
  id: string;
  slug: string;
  /** Public URL under /videos/Gallery/ */
  src: string;
  /** Display order (1-based). */
  order: number;
  /** Zero-padded label used in bilingual titles, e.g. "01". */
  number: string;
  /** Static poster / thumbnail fallback (no per-video thumbs in assets). */
  poster: string;
}

const ASSET_BASE = "/videos/Gallery";

/** Shared branded poster — no dedicated video thumbnails ship with the assets. */
export const VIDEO_GALLERY_POSTER = "/images/Homehero/home-hero-scene-light.webp";

export const galleryVideos: GalleryVideo[] = [
  {
    id: "video-01",
    slug: "alsharq-01",
    src: `${ASSET_BASE}/Alsharq-01.mp4`,
    order: 1,
    number: "01",
    poster: VIDEO_GALLERY_POSTER,
  },
  {
    id: "video-02",
    slug: "alsharq-02",
    src: `${ASSET_BASE}/Alsharq-02.mp4`,
    order: 2,
    number: "02",
    poster: VIDEO_GALLERY_POSTER,
  },
  {
    id: "video-03",
    slug: "alsharq-03",
    src: `${ASSET_BASE}/Alsharq-03.mp4`,
    order: 3,
    number: "03",
    poster: VIDEO_GALLERY_POSTER,
  },
  {
    id: "video-04",
    slug: "alsharq-04",
    src: `${ASSET_BASE}/Alsharq-04.mp4`,
    order: 4,
    number: "04",
    poster: VIDEO_GALLERY_POSTER,
  },
  {
    id: "video-05",
    slug: "alsharq-05",
    src: `${ASSET_BASE}/Alsharq-05.mp4`,
    order: 5,
    number: "05",
    poster: VIDEO_GALLERY_POSTER,
  },
  {
    id: "video-06",
    slug: "alsharq-06",
    src: `${ASSET_BASE}/Alsharq-06.mp4`,
    order: 6,
    number: "06",
    poster: VIDEO_GALLERY_POSTER,
  },
];

export function getGalleryVideoBySlug(slug: string) {
  return galleryVideos.find((video) => video.slug === slug);
}
