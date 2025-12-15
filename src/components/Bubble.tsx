"use client";

import clsx from "clsx";
import type { ReactNode, ElementType } from "react";

type Props = {
  children: ReactNode;
  tail?: "left" | "right" | false;
  className?: string;
  as?: ElementType; // <-- вместо keyof JSX.IntrinsicElements
};

export default function Bubble({
  children,
  tail = false,
  className,
  as: Tag = "div",
}: Props) {
  return (
    <Tag className={clsx("bubble", className, tail && `bubble--${tail}`)}>
      {children}
    </Tag>
  );
}
