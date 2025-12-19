"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { GalleryItem } from "@/data/gallery";

import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });

type Props = {
  items: GalleryItem[];
  open: boolean;
  index?: number;
  onClose: () => void;
};

export default function Gallery({ items, open, index = 0, onClose }: Props) {
  const slides = useMemo(
    () =>
      items.map((i) =>
        typeof i === "string"
          ? { src: i }
          : { src: i.full, description: i.alt ?? "" }
      ),
    [items]
  );

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={slides}
      plugins={[Thumbnails, Captions]}
    />
  );
}
