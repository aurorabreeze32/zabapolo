"use client";

import { useEffect, useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { gallery } from "@/data/gallery";

export type Slice = { kind: "img" | "faq"; src: string };

const slices: Slice[] = [
  { kind: "img", src: "/poster/Slice-1.png" },   // 1) 8 фото-хотспотов (квадраты)
  { kind: "img", src: "/poster/Slice-2.png" },   // 2) 3 фото
  { kind: "img", src: "/poster/Slice-3.png" },   // 3) 3 фото
  { kind: "img", src: "/poster/Slice-4.png" },   // 4) IG / WhatsApp (горизонтальные)
  { kind: "faq", src: "/poster/Slice-6-1.png" }, // 5) FAQ
  { kind: "img", src: "/poster/Slice-5.png" },   // 6) 5 фото + 2 контакта (горизонтальные)
];

const faqData = [
  { q: "С какого возраста можно?", a: "С 4 лет. У нас три группы: 4–5, 5–6 и 7–8 лет. Подбираем комфортный уровень." },
  { q: "Безопасно ли это?", a: "Мелкий бассейн, малые группы 3–5 детей, мягкий инвентарь, тренер рядом." },
  { q: "Нужно ли уметь плавать?", a: "Нет. Через игру с мячом учимся держаться на воде и правильно дышать." },
  { q: "Что взять с собой?", a: "Купальник/плавки, шапочку, очки, сланцы, полотенце. По желанию — беруши/зажим." },
  { q: "Как записаться на пробное?", a: "Проводим по выходным. Напишите нам — подберём время и группу." },
  { q: "Можно ли прийти вдвоём?", a: "Да, с друзьями/братьями/сёстрами — часто так комфортнее начинать." },
  { q: "Стоимость занятий", a: "Уточним при записи (абонемент/разово). Оплата переводом или наличными." },
  { q: "Как проходят оплата и пропуски?", a: "Переносы по заранее согласованным правилам, всё прозрачно и просто." },
];

/* ========= Хотспоты ========= */
type HS = {
  id: string;
  left: number; top: number; width: number;
  height?: number;
  aspect?: "square" | "rect";
  action?: string; // gallery:<index> | link:<url>
};

const HS_CONFIG_INIT: Record<string, HS[]> = {
  "/poster/Slice-1.png": [
    { id: "g-01", left: 29.09025156350883,  top: 27.44065634034929,  width: 18, aspect: "square", action: "gallery:0" },
    { id: "g-02", left: 52.583736082523096, top: 27.01066751765411,  width: 18, aspect: "square", action: "gallery:1" },
    { id: "g-03", left: 42.81209964722873,  top: 45.75398839522629,  width: 18, aspect: "square", action: "gallery:2" },
    { id: "g-04", left: 61.72153922947079,  top: 45.663482073411295, width: 18, aspect: "square", action: "gallery:3" },
    { id: "g-05", left: 22.033899179284084, top: 45.78994644868399,  width: 18, aspect: "square", action: "gallery:4" },
    { id: "g-06", left: 36.65407428111186,  top: 60.74722777402676,  width: 18, aspect: "square", action: "gallery:5" },
    { id: "g-07", left: 20.575511611360092, top: 62.06756463294061,  width: 18, aspect: "square", action: "gallery:6" },
    { id: "g-08", left: 4.786361747283664,  top: 63.95263158868394,  width: 18, aspect: "square", action: "gallery:7" },
  ],

  "/poster/Slice-2.png": [
    { id: "g-09", left: 28.72164948453608,  top: 38.21694606690434,  width: 16, aspect: "square", action: "gallery:8"  },
    { id: "g-10", left: 44.68041237113402,  top: 38.09557763786695,  width: 16, aspect: "square", action: "gallery:9"  },
    { id: "g-11", left: 61.4639175257732,   top: 39.309261928240915, width: 16, aspect: "square", action: "gallery:10" },
  ],

  "/poster/Slice-3.png": [
    { id: "g-12", left: 42.00267151369533,  top: 37.56344681339225,  width: 16, aspect: "square", action: "gallery:11" },
    { id: "g-13", left: 59.205218122550605, top: 38.53173417192139,  width: 16, aspect: "square", action: "gallery:12" },
    { id: "g-14", left: 21.703779381424972, top: 37.97300583024379,  width: 16, aspect: "square", action: "gallery:13" },
  ],

  "/poster/Slice-4.png": [
    { id: "link-ig", left: 47.1958762886598,   top: 19.925279760331307, width: 32, height: 5, aspect: "rect", action: "link:https://www.instagram.com/staszhitkovsky" },
    { id: "link-wa", left: 44.927835051546396, top: 25.27288747907304,  width: 32, height: 5, aspect: "rect", action: "link:https://wa.me/48518367836" },
  ],

  "/poster/Slice-5.png": [
    { id: "g-15", left: 32.79745339114472,  top: 2.7301943327838387, width: 12, aspect: "square", action: "gallery:14" },
    { id: "g-16", left: 52.780727617899984, top: 1.718953413026254,  width: 12, aspect: "square", action: "gallery:15" },
    { id: "g-17", left: 80.16888909380987,  top: 62.57324041499089,  width: 12, aspect: "square", action: "gallery:16" },
    { id: "g-18", left: 81.96907216494846,  top: 53.1940990032113,   width: 12, aspect: "square", action: "gallery:17" },
    { id: "g-19", left: 77.16686880095303,  top: 45.23681215611568,  width: 12, aspect: "square", action: "gallery:18" },

    { id: "link-tg",   left: 32,                 top: 78,                width: 36, height: 5, aspect: "rect", action: "link:https://t.me/pilkawodna" },
    { id: "link-mail", left: 33.855670103092784, top: 82.89232328350646, width: 36, height: 5, aspect: "rect", action: "link:https://wa.me/48518367836" },
  ],
};



/* ============================ */

export default function Poster() {
  const [open, setOpen] = useState<number>(0);
  const toggle = (i: number) => setOpen((p) => (p === i ? -1 : i));

  // Lightbox
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

  // Редактор хотспотов
  const [hs, setHs] = useState<Record<string, HS[]>>(HS_CONFIG_INIT);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    if (sp.get("edit") === "1") setEdit(true);

    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "e") setEdit((v) => !v);
      if (k === "c" && (edit || sp.get("edit") === "1")) {
        const json = JSON.stringify(hs, null, 2);
        navigator.clipboard?.writeText(json);
        console.log("HOTSPOTS JSON:\n", json);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [edit, hs]);

  const onHotspotClick = (action?: string) => {
    if (!action) return;
    if (action.startsWith("gallery:")) {
      const idx = Number(action.split(":")[1] || 0);
      setLbIndex(isNaN(idx) ? 0 : idx);
      setLbOpen(true);
    } else if (action.startsWith("link:")) {
      window.open(action.slice(5), "_blank");
    }
  };

  // src -> (height/width) AR
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const onImageLoad = (src: string, img: HTMLImageElement) => {
    if (!img.naturalWidth || !img.naturalHeight) return;
    const ar = img.naturalHeight / img.naturalWidth;
    setRatios((r) => (r[src] ? r : { ...r, [src]: ar }));
  };

  function Hotspots({ src }: { src: string }) {
    const items = hs[src];
    const ar = ratios[src]; // height/width
    if (!items || !items.length) return null;

    return (
      <div className="hs-layer" aria-hidden={edit ? "false" : "true"}>
        {items.map((h, i) => {
          const heightPercent =
            h.aspect === "square"
              ? (ar ? h.width / ar : h.width)
              : (h.height ?? 10);

          return (
            <button
              key={h.id}
              className={`hs ${edit ? "hs-edit" : ""}`}
              style={{
                left: `${h.left}%`,
                top: `${h.top}%`,
                width: `${h.width}%`,
                height: `${heightPercent}%`,
              }}
              onClick={(e) => {
                e.preventDefault();
                if (!edit) onHotspotClick(h.action);
              }}
              onPointerDown={(e) => {
                if (!edit) return;
                const layer = e.currentTarget.parentElement as HTMLElement;
                const startX = e.clientX, startY = e.clientY;
                const startLeft = h.left, startTop = h.top;
                const rect = layer.getBoundingClientRect();
                (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                const move = (ev: PointerEvent) => {
                  const dx = ((ev.clientX - startX) / rect.width) * 100;
                  const dy = ((ev.clientY - startY) / rect.height) * 100;
                  setHs(prev => {
                    const copy = { ...prev };
                    const arr = copy[src].slice();
                    arr[i] = {
                      ...arr[i],
                      left: Math.max(0, Math.min(100 - h.width, startLeft + dx)),
                      top:  Math.max(0, Math.min(100 - (h.height ?? heightPercent), startTop + dy)),
                    };
                    copy[src] = arr;
                    return copy;
                  });
                };
                const up = () => {
                  window.removeEventListener("pointermove", move as any);
                  window.removeEventListener("pointerup", up);
                  const cur = hs[src]?.[i];
                  if (cur) console.log(`${h.id}: left=${cur.left.toFixed(2)}% top=${cur.top.toFixed(2)}%`);
                };
                window.addEventListener("pointermove", move as any);
                window.addEventListener("pointerup", up, { once: true });
              }}
              title={edit ? `${h.id} • drag` : ""}
            />
          );
        })}
        {edit && <div className="hs-hint">EDIT • Drag • E toggle • C copy JSON</div>}
      </div>
    );
  }

  return (
    <main>
      {slices.map((s, idx) => {
        if (s.kind === "img") {
          const imgRef = useRef<HTMLImageElement | null>(null);
          return (
            <section key={idx} className="section relative">
              <img
                ref={imgRef}
                src={s.src}
                alt=""
                className="slice"
                onLoad={(e) => onImageLoad(s.src, e.currentTarget)}
              />
              <Hotspots src={s.src} />
            </section>
          );
        }

        // FAQ поверх Slice-6-1
        return (
          <section key={idx} className="section relative">
            <img src={s.src} alt="" className="slice" />
            <div className="faq-overlay">
              <div className="faq-wrap">
                {faqData.map((item, i) => {
                  const isOpen = open === i;
                  return (
                    <div className={`faq-item ${isOpen ? "open" : ""}`} key={i}>
                      <button
                        type="button"
                        className="faq-summary"
                        onClick={() => toggle(i)}
                      >
                        <span className="faq-title">{item.q}</span>
                        <span className={`faq-sign ${isOpen ? "minus" : "plus"}`} aria-hidden="true" />
                      </button>

                      <div className="faq-body" style={{ display: isOpen ? "block" : "none" }}>
                        {item.a}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* Лайтбокс */}
      <Lightbox
        open={lbOpen}
        index={lbIndex}
        close={() => setLbOpen(false)}
        // приводим любой формат галереи к строковому src
        slides={(gallery as any[]).map((g) => ({
          src: typeof g === "string" ? g : g.full,
        }))}
        styles={{
          container: {
            backgroundColor: "rgba(8, 20, 40, 0.22)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            transition: "backdrop-filter .2s ease, background-color .2s ease",
          },
        }}
      />


      {/* Стили (FAQ оставил как у тебя) */}
      <style jsx global>{`
        .section { position: relative; width: 100%; }
        .slice { width: 100%; height: auto; display: block; }

        /* FAQ позиционирование */
        .faq-overlay {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 5%;
          width: 95%;
          max-width: 720px;
          pointer-events: none;
          z-index: 4;
        }
        .faq-wrap { pointer-events: auto; }

        .faq-item { border-radius: 18px; }
        .faq-item.open {
          border: 3px solid #0ea5e9;
          border-radius: 18px;
          box-shadow: 0 2px 0 rgba(14,165,233,.35);
        }
        .faq-item.open .faq-summary {
          border: 0;
          box-shadow: none;
          background: #fff;
          border-radius: 14px;
          padding: 14px 18px;
        }
        .faq-summary {
          width: 100%;
          background: #fff;
          border: 3px solid #0ea5e9;
          border-radius: 18px;
          padding: 16px 18px 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          box-shadow: 0 2px 0 rgba(14,165,233,.35);
          cursor: pointer;
        }
        .faq-title {
          text-transform: uppercase;
          letter-spacing: .2px;
          color: #083b73;
          font-size: max(16px,min(4.6vw,16px));
          font-weight: 800;
        }
        .faq-sign {
          flex: 0 0 auto;
          width: 36px; height: 36px;
          border-radius: 999px;
          border: 3px solid #0ea5e9;
          background: #fff;
          position: relative;
        }
        .faq-sign::before,
        .faq-sign::after {
          content: "";
          position: absolute;
          background: #0ea5e9;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 2px;
        }
        .faq-sign.plus::before { width: 16px; height: 3px; }
        .faq-sign.plus::after  { width: 3px;  height: 16px; }
        .faq-sign.minus::before{ width: 16px; height: 3px; }
        .faq-sign.minus::after { display: none; }
        .faq-body {
          background: #fff;
          border: 0;
          border-radius: 12px;
          margin-top: 0px;
          padding: 14px 18px;
          color: #083b73;
          font-size: clamp(16px, 4.8vw, 19px); /* увеличили только тело */
          line-height: 1.45;
        }
        .jsx-edfc7658fa887aac.faq-body { font-size: medium; }

        /* Hotspots */
        .hs-layer{ position:absolute; inset:0; pointer-events:none; z-index:5; }
        .hs{ position:absolute; pointer-events:auto; background:transparent; border:0; padding:0; cursor:pointer; }
        .hs-edit{ outline: 1px dashed rgba(14,165,233,.8); background: rgba(14,165,233,.08); border-radius: 8px; }
        .hs-hint{ position:absolute; right:8px; top:8px; background:rgba(0,0,0,.55); color:#fff; font-size:12px; padding:4px 8px; border-radius:8px; }
      `}</style>
    </main>
  );
}
