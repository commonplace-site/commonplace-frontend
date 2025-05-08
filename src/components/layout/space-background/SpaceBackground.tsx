'use client'

import { useEffect, useRef, useState } from "react";
import { Pause, Play, StopCircle } from "lucide-react";

export function SpaceBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(null);
    const [running, setRunning] = useState(true);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!visible) return;

        const canvas = canvasRef.current!;
        if (!canvas) return;

        const ctx = canvas.getContext("2d")!;
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        const stars = Array.from({ length: 150 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.2,
            dx: (Math.random() - 0.5) * 0.15,
            dy: (Math.random() - 0.5) * 0.15,
        }));

        function animate() {
            console.log(1);
            const { width, height } = canvas;
            const gradient = ctx.createLinearGradient(0, 0, 0, height);

            gradient.addColorStop(0, "#1A1533");
            gradient.addColorStop(1, "#441A6C");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            for (const star of stars) {
                if (running) {
                    star.x += star.dx;
                    star.y += star.dy;

                    if (star.x < 0) star.x = width;
                    if (star.x > width) star.x = 0;
                    if (star.y < 0) star.y = height;
                    if (star.y > height) star.y = 0;
                }

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
                ctx.fillStyle = 'white';
                ctx.fill();
            }

            animationRef.current = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [running, visible]);

    if (!visible) {
        return (
            <>
                <div className="absolute top-32 right-4 z-10 flex gap-2">
                    <button
                        onClick={() => { setVisible(true); setRunning(true); }}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
                    >
                        Restart
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="absolute top-32 right-4 z-10 flex gap-2">
                <button
                    onClick={() => setRunning(!running)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
                >
                    {running ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button
                    onClick={() => setVisible(false)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
                >
                    <StopCircle size={18} />
                </button>
            </div>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 -z-10 w-full h-full"
            />
        </>
    );
}