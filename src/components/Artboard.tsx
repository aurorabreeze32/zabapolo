"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import { gallery } from "@/data/gallery";
import Bubble from "@/components/Bubble";
import { BASE_W, BASE_H, layers as initialLayers, type Layer } from "@/data/scene";

import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });

export default function Artboard() {
  // масштаб под ширину экрана
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => setScale(Math.min(window.innerWidth, 414) / BASE_W);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // лайтбокс
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const slides = useMemo(
    () => gallery.map((g) => ({ src: g.full, description: g.alt ?? "" })),
    []
  );

  // состояние редактора/оверлея
  const [edit, setEdit] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [layers, setLayers] = useState<Layer[]>(
    () => JSON.parse(JSON.stringify(initialLayers)) // клон, чтобы можно было двигать
  );
  const [active, setActive] = useState<number | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);

  // клавиатурные нуджи в режиме редактирования
  useEffect(() => {
    if (!edit) return;
    const onKey = (e: KeyboardEvent) => {
      if (active == null) return;
      const step = e.shiftKey ? 10 : 1;
      const next = [...layers];
      const L = next[active] as any;

      if (e.key === "ArrowLeft") L.x -= step;
      if (e.key === "ArrowRight") L.x += step;
      if (e.key === "ArrowUp") L.y -= step;
      if (e.key === "ArrowDown") L.y += step;

      if (e.key === "[") L.w = Math.max(10, (L.w ?? 10) - step);
      if (e.key === "]") L.w = Math.max(10, (L.w ?? 10) + step);

      if (e.key === "r") L.r = (L.r ?? 0) - 1;
      if (e.key === "R") L.r = (L.r ?? 0) + 1;

      if (e.key === ",") L.z = Math.max(0, (L.z ?? 1) - 1);
      if (e.key === ".") L.z = (L.z ?? 1) + 1;

      if (e.key === "s" || e.key === "S") {
        const json = JSON.stringify(next, null, 2);
        console.log("layers JSON:\n", json);
        try {
          navigator.clipboard.writeText(json);
        } catch {}
      }
      setLayers(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [edit, active, layers]);

  // drag & drop
  const dragRef = useRef<{
    i: number;
    ox: number;
    oy: number;
    lx: number;
    ly: number;
  } | null>(null);

  const onDown = (i: number, e: React.PointerEvent<HTMLDivElement>) => {
    if (!edit || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const lx = (layers[i] as any).x;
    const ly = (layers[i] as any).y;
    dragRef.current = {
      i,
      ox: e.clientX - rect.left,
      oy: e.clientY - rect.top,
      lx,
      ly,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setActive(i);
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!edit || !dragRef.current || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const { i, ox, oy, lx, ly } = dragRef.current;

    const next = [...layers];
    const L = next[i] as any;
    L.x = Math.round(lx + (cx - ox) / scale);
    L.y = Math.round(ly + (cy - oy) / scale);
    setLayers(next);
  };

  const onUp = () => {
    dragRef.current = null;
  };

  return (
    <div className="mx-auto" style={{ width: "100vw" }}>
      {/* Кнопки управления */}
      <div className="fixed right-3 top-3 z-[9999] flex gap-2">
        <button
          onClick={() => setEdit((v) => !v)}
          className="bg-black/70 text-white text-xs px-3 py-1 rounded"
        >
          {edit ? "Edit:ON" : "Edit:OFF"}
        </button>
        <button
          onClick={() => setShowOverlay((v) => !v)}
          className="bg-black/70 text-white text-xs px-3 py-1 rounded"
        >
          {showOverlay ? "Overlay:ON" : "Overlay:OFF"}
        </button>
        <button
          onClick={() =>
            localStorage.setItem("zaba.layers", JSON.stringify(layers))
          }
          className="bg-black/70 text-white text-xs px-3 py-1 rounded"
        >
          Save
        </button>
        <button
          onClick={() => {
            const raw = localStorage.getItem("zaba.layers");
            if (raw) setLayers(JSON.parse(raw));
          }}
          className="bg-black/70 text-white text-xs px-3 py-1 rounded"
        >
          Load
        </button>
      </div>

      {/* Артборд */}
      <div
        ref={boardRef}
        className="relative mx-auto"
        style={{
          width: BASE_W,
          height: BASE_H,
          transform: `scale(${scale})`,
          transformOrigin: "top center",
        }}
        onPointerMove={onMove}
        onPointerUp={onUp}
      >
        {/* Оверлей макета (положи PNG 390px шириной в /public/overlay/mock-390.png) */}
        {showOverlay && (
          <Image
            src="/overlay/mock-390.png"
            alt="overlay"
            fill
            className="opacity-50 pointer-events-none select-none -z-10 object-top object-cover"
          />
        )}

        {/* Рендер слоёв */}
        {layers.map((l, i) => {
          const style: React.CSSProperties = {
            position: "absolute",
            left: (l as any).x,
            top: (l as any).y,
            width: (l as any).w,
            transform: (l as any).r ? `rotate(${(l as any).r}deg)` : undefined,
            zIndex: (l as any).z ?? 1,
            outline: edit && active === i ? "1px dashed #22d3ee" : undefined,
          };

          if (l.type === "bubble") {
            const B = l as any;
            return (
              <div key={i} style={style} onPointerDown={(e) => onDown(i, e)}>
                <Bubble size="lg" tail={B.tail} className={B.invert ? "invert" : ""}>
                  {B.text}
                </Bubble>
              </div>
            );
          }

          if (l.type === "img") {
            const L = l as any;
            const img = (
              <Image
                src={L.src}
                alt={L.alt || ""}
                width={L.w}
                height={L.h ?? L.w}
                className="rounded-xl shadow"
              />
            );
            return (
              <div key={i} style={style} onPointerDown={(e) => onDown(i, e)}>
                {typeof L.onClickIndex === "number" ? (
                  <button
                    onClick={() => {
                      setIndex(L.onClickIndex!);
                      setOpen(true);
                    }}
                  >
                    {img}
                  </button>
                ) : (
                  img
                )}
              </div>
            );
          }

          // deco
          const D = l as any;
          return (
            <div key={i} style={style} onPointerDown={(e) => onDown(i, e)}>
              <Image
                src={D.src}
                alt=""
                width={D.w}
                height={D.h ?? D.w}
              />
            </div>
          );
        })}
      </div>

      {open && (
        <Lightbox
          open={open}
          index={index}
          close={() => setOpen(false)}
          slides={slides}
          plugins={[Captions, Thumbnails]}
          carousel={{ preload: 2 }}
        />
      )}
    </div>
  );
}
