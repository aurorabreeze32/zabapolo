"use client";

import { useMemo, useState, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import type { GalleryItem } from "@/data/gallery";

// Важно: сам лайтбокс грузим без SSR
const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });

type Props = { items: GalleryItem[] };

export default function Gallery({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Массив для Lightbox (full + caption из alt)
  const slides = useMemo(
    () => items.map((it) => ({ src: it.full, description: it.alt ?? "" })),
    [items]
  );

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  return (
    <>
      {/* сетка превью — можно настроить под макет */}
      <div className="grid grid-cols-3 gap-2">
        {items.map((it, i) => (
          <button
            key={it.thumb}
            onClick={() => openAt(i)}
            aria-label={it.alt || `Фото ${i + 1}`}
            className="relative aspect-square overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <Image
              src={it.thumb}
              alt={it.alt || ""}
              fill
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 200px"
              className="object-cover"
              placeholder="blur"
              blurDataURL={it.thumb}
            />
          </button>
        ))}
      </div>

      {open && (
        <Lightbox
          open={open}
          index={index}
          close={() => setOpen(false)}
          slides={slides}
          plugins={[Captions, Thumbnails]}
          carousel={{ preload: 2, finite: false }}
          animation={{ fade: 250 }}
          controller={{ closeOnBackdropClick: true }}
        />
      )}
    </>
  );
}
