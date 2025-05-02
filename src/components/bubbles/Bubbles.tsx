'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type Bubble = {
    id: string;
    label: string;
    colorTo: string;
    colorFrom: string;
    border: string;
    href: string;
    onClick?: () => void;
};

type Props = {
    bubbles: Bubble[];
};

export default function Bubbles({ bubbles }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [positions, setPositions] = useState<{ left: number; top: number }[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;
        const bubbleSize = 180;
        const margin = 10;
        const generated: { left: number; top: number }[] = [];

        for (let i = 0; i < bubbles.length; i++) {
            let attempt = 0;
            let pos: { left: number; top: number };

            do {
                pos = {
                    left: Math.random() * (width - bubbleSize - margin),
                    top: Math.random() * (height - bubbleSize - margin),
                };

                const overlaps = generated.some(
                    (p) =>
                        Math.hypot(p.left - pos.left, p.top - pos.top) < bubbleSize + margin
                );

                if (!overlaps) break;
                attempt++;
            } while (attempt < 100);

            generated.push(pos);
        }

        setPositions(generated);
    }, [bubbles]);

    return (
        <div ref={containerRef} className="relative w-full h-[550px] overflow-hidden">
            {bubbles.map((bubble, index) => (
                <div
                    key={bubble.id}
                    style={{
                        width: 180,
                        height: 180,
                        position: 'absolute',
                        left: positions[index]?.left || 0,
                        top: positions[index]?.top || 0,
                        background: `linear-gradient(to left, ${bubble.colorTo}, ${bubble.colorFrom})`,
                        opacity: 0.9,
                        border: `1px solid ${bubble.border}`
                    }}
                    className={`animate-[float_3s_ease-in-out_infinite] rounded-full shadow-inner text-white text-lg font-medium flex items-center justify-center transition-transform duration-200 cursor-pointer`}
                >
                    <Link
                        href={bubble.href}
                        onClick={bubble.onClick}
                        style={{ border: `1px solid ${bubble.border}` }}
                        className={`w-[90%] h-[90%] m-4 rounded-full aspect-square subtitle flex items-center justify-center text-center`}
                    >
                        {bubble.label}
                    </Link>
                </div>
            ))}
        </div>
    );
}
