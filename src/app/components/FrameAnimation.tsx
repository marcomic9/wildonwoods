'use client';

import { useEffect, useRef, useState } from 'react';

interface FrameAnimationProps {
    className?: string;
}

export function FrameAnimation({ className = '' }: FrameAnimationProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Animation state
    const isHovering = useRef(false);
    const currentFrame = useRef(0);
    const animationFrameId = useRef<number | null>(null);
    const lastFrameTime = useRef(0);

    // Configuration
    const START_FRAME = 41;
    const END_FRAME = 173;
    const FRAMES_DIR = '/Frames';
    const FRAME_PREFIX = 'ezgif-frame-';
    const FPS = 45;
    const FRAME_INTERVAL = 1000 / FPS;

    // Load images
    useEffect(() => {
        let isMounted = true;
        const loadImages = async () => {
            try {
                const loadedImages: HTMLImageElement[] = [];
                const totalFrames = END_FRAME - START_FRAME + 1;

                const promises = Array.from({ length: totalFrames }, (_, i) => {
                    return new Promise<HTMLImageElement>((resolve, reject) => {
                        const img = new Image();
                        const frameNum = (START_FRAME + i).toString().padStart(3, '0');
                        const url = `${FRAMES_DIR}/${FRAME_PREFIX}${frameNum}.jpg`;
                        img.src = url;
                        img.onload = () => resolve(img);
                        img.onerror = () => {
                            console.error(`Failed to load image at ${url}`);
                            reject(new Error(`Failed to load frame ${frameNum} at ${url}`));
                        };
                    });
                });

                const results = await Promise.all(promises);

                if (isMounted) {
                    setImages(results);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error('Error loading animation frames:', err);
                if (isMounted) {
                    setError('Failed to load animation');
                    setIsLoading(false);
                }
            }
        };

        loadImages();

        return () => {
            isMounted = false;
        };
    }, []);

    // Draw frame function
    const drawFrame = (frameIndex: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const img = images[frameIndex];

        if (!canvas || !ctx || !img) return;

        // Draw image maintaining aspect ratio (object-cover)
        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.width;
        const ih = img.height;

        const scale = Math.max(cw / iw, ch / ih);
        const x = (cw - iw * scale) / 2;
        const y = (ch - ih * scale) / 2;

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, x, y, iw * scale, ih * scale);
    };

    // Initial draw
    useEffect(() => {
        if (!isLoading && images.length > 0 && canvasRef.current) {
            // Set canvas size to match container
            const updateSize = () => {
                const canvas = canvasRef.current;
                if (canvas) {
                    const parent = canvas.parentElement;
                    if (parent) {
                        canvas.width = parent.clientWidth;
                        canvas.height = parent.clientHeight;
                        // Draw current frame (should be 0 initially)
                        drawFrame(currentFrame.current);
                    }
                }
            };

            updateSize();
            window.addEventListener('resize', updateSize);

            return () => window.removeEventListener('resize', updateSize);
        }
    }, [isLoading, images]);

    // Animation Loop
    const animate = (timestamp: number) => {
        if (!isHovering.current) return;

        if (!lastFrameTime.current) lastFrameTime.current = timestamp;

        const elapsed = timestamp - lastFrameTime.current;

        if (elapsed > FRAME_INTERVAL) {
            // Move to next frame
            if (currentFrame.current < images.length - 1) {
                currentFrame.current++;
                drawFrame(currentFrame.current);
                lastFrameTime.current = timestamp - (elapsed % FRAME_INTERVAL);
                animationFrameId.current = requestAnimationFrame(animate);
            } else {
                // Stop at last frame
                cancelAnimationFrame(animationFrameId.current!);
            }
        } else {
            animationFrameId.current = requestAnimationFrame(animate);
        }
    };

    const handleMouseEnter = () => {
        if (isLoading || images.length === 0) return;
        isHovering.current = true;
        lastFrameTime.current = 0;
        // Reset to start if we were at the end? Or just play from current?
        // Requirement: "play the sequence once from the first frame"
        currentFrame.current = 0;
        drawFrame(0);
        animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleMouseLeave = () => {
        isHovering.current = false;
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
        // Requirement: "reset to the first frame (index 0)"
        currentFrame.current = 0;
        drawFrame(0);
    };

    return (
        <div
            className={`relative overflow-hidden group ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-gray-400">
                    Loading...
                </div>
            )}

            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-red-400">
                    !
                </div>
            )}

            <canvas
                ref={canvasRef}
                className="w-full h-full block object-cover"
                style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s' }}
            />

            {/* Hover Instruction Overlay */}
            {!isLoading && !error && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 opacity-100 group-hover:opacity-0 bg-black/20">
                    <div className="bg-black/40 backdrop-blur-sm border border-[#b8956a]/30 px-6 py-3 rounded-full flex items-center gap-3">
                        <span className="text-[#b8956a] text-sm uppercase tracking-widest font-medium">Hover to Play</span>
                        <svg className="w-4 h-4 text-[#b8956a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
}
