import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";


const nunito = Nunito({ subsets: ["latin", "cyrillic"], weight: ["400", "600", "700"] });


export const metadata: Metadata = {
title: "Детское водное поло в Варшаве — Zabapolo",
description:
"Мини-водное поло для детей 4–8 лет в Варшаве. Малые группы 3–5 человек, безопасный мелкий бассейн, игра без контакта. Пробные занятия по выходным.",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="ru">
<body className={`${nunito.className} bg-bg text-ink`}>{children}</body>
</html>
);
}