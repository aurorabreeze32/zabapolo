"use client";

import { useState } from "react";

type Slice = { kind: "img" | "faq"; src: string };

const slices: Slice[] = [
  { kind: "img", src: "/poster/Slice-1.png" },
  { kind: "img", src: "/poster/Slice-2.png" },
  { kind: "img", src: "/poster/Slice-3.png" },
  { kind: "img", src: "/poster/Slice-4.png" },
  { kind: "faq", src: "/poster/Slice-6-1.png" }, // тут FAQ поверх Slice-6-1
  { kind: "img", src: "/poster/Slice-5.png" },   // последний слайс
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

export default function Poster() {
  const [open, setOpen] = useState<number>(0);
  const toggle = (i: number) => setOpen((p) => (p === i ? -1 : i));

  return (
    <main>
      {slices.map((s, idx) => {
        if (s.kind === "img") {
          return (
            <section key={idx} className="section">
              <img src={s.src} alt="" className="slice" />
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

      <style jsx global>{`
        .section { position: relative; width: 100%; }
        .slice { width: 100%; height: auto; display: block; }

        /* Положение FAQ внутри Slice-6-1 */
        .faq-overlay {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 8%;                 /* оставил как у тебя */
          width: 90%;
          max-width: 720px;
          pointer-events: none;
        }
        .faq-wrap { pointer-events: auto; }

        /* --- внешний контейнер пункта --- */
        .faq-item { border-radius: 18px; }

        /* ОБВОДКА ПЕРЕНЕСЕНА СЮДА (контейнер открытого пункта) */
        .faq-item.open {
          border: 3px solid #0ea5e9;
          border-radius: 18px;
          box-shadow: 0 2px 0 rgba(14,165,233,.35);
          /* без паддингов/отступов, чтобы не сбить твои значения */
        }

        /* чтобы не было «двойной» рамки у заголовка, когда открыт */
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
          font-size: max(16px,min(4.6vw,18px));
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

        /* тело — как было у тебя (рамку сняли) */
        .faq-body {
          background: #fff;
          border: 0;
          border-radius: 12px;
          margin-top: 0px;
          padding: 14px 18px;
          color: #083b73;
          line-height: 1.35;
        }

        .jsx-edfc7658fa887aac.faq-body { font-size: medium; }
      `}</style>
    </main>
  );
}
