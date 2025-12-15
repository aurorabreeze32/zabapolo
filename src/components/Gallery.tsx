"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import type { GalleryItem } from "@/data/gallery";


const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });


type Props = { items: GalleryItem[] };


export default function Gallery({ items }: Props){
const [open, setOpen] = useState(false);
const [index, setIndex] = useState(0);


const slides = useMemo(() => items.map(i => ({ src: i.full, description: i.alt ?? "" })), [items]);


return (
<>
<div className="grid grid-cols-3 gap-2">
{items.map((it, i) => (
<button key={it.thumb} onClick={() => { setIndex(i); setOpen(true); }} aria-label={it.alt || `Фото ${i+1}`}
className="thumb aspect-square focus:outline-none focus:ring-2 focus:ring-sky-400">
<Image src={it.thumb} alt={it.alt || ""} fill sizes="(max-width:640px) 33vw, 200px" className="object-cover" placeholder="blur" blurDataURL={it.thumb} />
</button>
))}
</div>


{open && (
<Lightbox open={open} index={index} close={() => setOpen(false)} slides={slides}
plugins={[Captions, Thumbnails]} carousel={{ preload: 2 }} controller={{ closeOnBackdropClick: true }} />
)}
</>
);
}