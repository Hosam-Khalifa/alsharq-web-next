import { galleryImages } from "@/data/gallery";

export const GALLERY_HERO_IMAGE =
  galleryImages.find((image) => image.src.includes("DSC03048"))?.src ?? galleryImages[0]?.src ?? "";
