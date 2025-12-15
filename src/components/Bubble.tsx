"use client";
import clsx from "clsx";
import type { ReactNode } from "react";


type Props = {
children: ReactNode;
size?: "sm" | "md" | "lg";
tail?: "left" | "right" | false;
className?: string;
as?: keyof JSX.IntrinsicElements;
};


export default function Bubble({ children, size = "md", tail = false, className, as = "div" }: Props){
const Comp = as as any;
return (
<Comp className={clsx("bubble", size, tail && `tail-${tail}`, className)}>
{children}
</Comp>
);
}