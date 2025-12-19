// src/data/gallery.ts
export const gallery = Array.from({ length: 19 }, (_, i) => {
  return `/gallery/${String(i + 1).padStart(2, "0")}.png`;
});

export const slides = gallery.map((src) => ({ src }));
