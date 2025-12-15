"use client";

import clsx from "clsx";
import type { ReactNode, ElementType } from "react";

type Props = {
  children: ReactNode;
  tail?: "left" | "right" | false;
  className?: string;
  as?: ElementType;
  size?: "sm" | "md" | "lg"; // <-- добавили, чтобы не падала сборка
};

export default function Bubble({
  children,
  tail = false,
  className,
  as: Tag = "div",
  size,
}: Props) {
  return (
    <Tag
      className={clsx(
        "bubble",
        className,
        tail && `bubble--${tail}`,
        size && `bubble--${size}` // безопасно прокидываем модификатор
      )}
    >
      {children}
    </Tag>
  );
}
