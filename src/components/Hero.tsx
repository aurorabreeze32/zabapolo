"use client";
import Bubble from "@/components/Bubble";


export default function Hero(){
return (
<section className="section pt-8 pb-6">
{/* Logo placeholder (swap to Image if есть svg) */}
<div className="mb-4">
<div className="w-14 h-14 rounded-full bg-white shadow" />
</div>


<h1 className="text-[24px] leading-tight font-bold mb-2 text-invert">
Детское водное поло в Варшаве — с 4 лет
</h1>
<p className="text-[16px] leading-[1.55] text-invert/90 mb-4">
Играем в мини-водное поло в малых группах 3–5 детей. Безопасный мелкий бассейн, много движения и командной радости.
</p>


<div className="flex gap-2">
<a className="btn btn-primary" href="#signup">Записаться на пробное</a>
<a className="btn btn-outline" href="https://wa.me/48XXXXXXXXX" target="_blank">WhatsApp</a>
</div>


{/* Example speech bubbles under hero */}
<div className="mt-6 space-y-3">
<Bubble size="md" tail="left">Суббота и воскресенье — пробные занятия</Bubble>
<Bubble size="sm" tail="right">Малые группы 3–5 детей</Bubble>
</div>
</section>
);
}