export type GalleryItem = { full: string; thumb: string; alt?: string };
const COUNT = 54; // update if different
export const gallery: GalleryItem[] = Array.from({ length: COUNT }, (_, i) => {
const n = String(i + 1).padStart(3, "0");
return {
full: `/gallery/full/zaba-${n}.webp`,
thumb: `/gallery/thumb/zaba-${n}-thumb.webp`,
alt: "",
};
});
export default gallery;