export const BASE_W = 390;
export const BASE_H = 5600; // rough, adjust later


export type ImgLayer = {
type: "img";
src: string;
x: number; y: number; w: number; h?: number; r?: number; z?: number; alt?: string;
onClickIndex?: number;
};


export type BubbleLayer = {
type: "bubble";
text: string; x: number; y: number; w: number; z?: number; tail?: "left" | "right"; invert?: boolean;
};


export type DecoLayer = { type: "deco"; src: string; x: number; y: number; w: number; h?: number; r?: number; z?: number };


export type Layer = ImgLayer | BubbleLayer | DecoLayer;


export const layers: Layer[] = [
// HERO — logo
{ type: "img", src: "/images/ui/logo.svg", x: 22, y: 20, w: 68, z: 10, alt: "ZABA" },


// HERO — big bubble (PASTE APPROVED TEXT EXACTLY)
{
type: "bubble",
text: "МЫ — СЕКЦИЯ ПО ВОДНОМУ ПОЛО В ВАРШАВЕ. ЗДЕСЬ ВЫ НАЙДЁТЕ ИНФОРМАЦИЮ О ТРЕНИРОВКАХ.",
x: 24, y: 112, w: 320, tail: "left", z: 5,
},


// HERO — three mini photos (start indices 0..2)
{ type: "img", src: "/gallery/thumb/zaba-001-thumb.webp", x: 42, y: 224, w: 82, r: -8, z: 6, onClickIndex: 0 },
{ type: "img", src: "/gallery/thumb/zaba-002-thumb.webp", x: 132, y: 208, w: 86, r: 7, z: 6, onClickIndex: 1 },
{ type: "img", src: "/gallery/thumb/zaba-003-thumb.webp", x: 224, y: 234, w: 78, r: -5, z: 6, onClickIndex: 2 },


// HERO — smile emoji
{ type: "deco", src: "/icons/emoji-smile.svg", x: 300, y: 332, w: 26, z: 7 },
];