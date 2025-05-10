'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useRef, useEffect, Suspense } from 'react'
import * as THREE from 'three'

export default function TalkingHead({ audioUrl }: { audioUrl: string }) {
    return (
        <div className="w-full h-[500px]">
            <Canvas camera={{ position: [0, 0.3, 0.9], fov: 18 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[0, 2, 2]} intensity={1} />
                <Suspense fallback={null}>
                    <HeadModel audioUrl={audioUrl} />
                </Suspense>
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    )
}

function HeadModel({ audioUrl }: { audioUrl: string }) {
    const { scene } = useGLTF('/models/head.glb') as { scene: THREE.Group };
    const mesh = useRef<THREE.Mesh>(null)

    useEffect(() => {
        const audio = new Audio(audioUrl);
        const ctx = new AudioContext();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        const data = new Uint8Array(analyser.frequencyBinCount);

        let src: MediaElementAudioSourceNode;
        let started = false;

        const handleClick = () => {
            if (started) return;
            started = true;

            ctx.resume().then(() => {
                src = ctx.createMediaElementSource(audio);
                src.connect(analyser);
                analyser.connect(ctx.destination);

                audio.play();

                const tick = () => {
                    requestAnimationFrame(tick);
                    analyser.getByteFrequencyData(data);
                    const vol = Math.min(data.reduce((a, b) => a + b, 0) / data.length / 100, 1);
                    if (mesh.current?.morphTargetInfluences)
                        mesh.current.morphTargetInfluences[0] = vol;
                };

                tick();
            });
        };

        window.addEventListener("click", handleClick, { once: true });

        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, [audioUrl]);

    return (
        <primitive
            object={scene}
            dispose={null}
            ref={(ref: THREE.Object3D | null) => {
                ref?.traverse((child) => {
                    if (
                        child instanceof THREE.Mesh &&
                        child.morphTargetInfluences?.length
                    ) {
                        console.log("✅ Found morphable mesh:", child.name, child.morphTargetDictionary);
                        mesh.current = child;
                    }
                });
            }}

        />
    )
}
