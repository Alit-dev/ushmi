import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [stage, setStage] = useState(0); // 0: dot, 1: line, 2: heart outline, 3: loading, 4: shrink

    useEffect(() => {
        const sequence = async () => {
            // Stage 0 -> 1: Dot to Line
            await new Promise(r => setTimeout(r, 500));
            setStage(1);

            // Stage 1 -> 2: Line to Heart
            await new Promise(r => setTimeout(r, 600));
            setStage(2);

            // Stage 2 -> 3: Show text and progress
            await new Promise(r => setTimeout(r, 600));
            setStage(3);

            // Simulate loading time 
            await new Promise(r => setTimeout(r, 1000));
            setStage(4);

            // Shrink and finish
            await new Promise(r => setTimeout(r, 800));
            onComplete();
        };

        sequence();
    }, [onComplete]);

    // SVG paths for morphing
    const dotPath = "M 50 50 C 50 50, 50 50, 50 50 C 50 50, 50 50, 50 50 C 50 50, 50 50, 50 50 Z";
    const linePath = "M 20 50 C 40 50, 60 50, 80 50 C 80 50, 80 50, 80 50 C 80 50, 80 50, 80 50 Z";
    const heartPath = "M 50 30 C 50 30, 30 15, 15 30 C 0 45, 50 85, 50 85 C 50 85, 100 45, 85 30 C 70 15, 50 30, 50 30 Z";

    return (
        <motion.div
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOutExpo" }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'var(--color-white)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999
            }}
        >
            <div style={{ position: 'relative', width: '100px', height: '100px', marginBottom: 'var(--space-12)' }}>
                <motion.svg
                    viewBox="0 0 100 100"
                    style={{ width: '100%', height: '100%' }}
                >
                    <motion.path
                        d={stage === 0 ? dotPath : stage === 1 ? linePath : heartPath}
                        animate={{
                            d: stage === 0 ? dotPath : stage === 1 ? linePath : heartPath,
                            fill: stage >= 2 ? 'var(--color-rose)' : 'transparent',
                            stroke: 'var(--color-rose)',
                            strokeWidth: stage === 0 ? 8 : 2,
                        }}
                        transition={{
                            duration: 0.6,
                            ease: "easeInOut"
                        }}
                        initial={false}
                    />
                </motion.svg>

                {stage === 4 && (
                    <motion.div
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 0, y: -50, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "backIn" }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: '100%',
                            height: '100%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'var(--color-rose)',
                            clipPath: 'path("M 50 30 C 50 30, 30 15, 15 30 C 0 45, 50 85, 50 85 C 50 85, 100 45, 85 30 C 70 15, 50 30, 50 30 Z")'
                        }}
                    />
                )}
            </div>

            <AnimatePresence>
                {stage >= 3 && stage < 4 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        <motion.p
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="text-bengali-body"
                            style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}
                        >
                            একটু অপেক্ষা করো...
                        </motion.p>

                        <div style={{ width: '150px', height: '2px', backgroundColor: 'var(--color-off-white)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1, ease: "linear" }}
                                style={{ height: '100%', backgroundColor: 'var(--color-gold)' }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Preloader;
