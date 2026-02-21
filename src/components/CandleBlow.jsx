import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const CandleBlow = () => {
    const [blown, setBlown] = useState(false);

    const handleBlow = () => {
        if (blown) return;
        setBlown(true);

        // Trigger full screen confetti
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#FFFFFF', '#E8B4B8', '#D4A574']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#FFFFFF', '#E8B4B8', '#D4A574']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    };

    return (
        <section
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--color-secondary-bg)',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent'
            }}
            onClick={handleBlow}
        >
            <motion.div
                animate={blown ? {
                    scale: [1, 1.2, 0],
                    opacity: [1, 0],
                    y: -50,
                    filter: "blur(4px)"
                } : {
                    y: [0, -10, 0]
                }}
                transition={blown ? { duration: 1 } : { repeat: Infinity, duration: 2, ease: "easeInOut" }}
                style={{ fontSize: '8rem', marginBottom: 'var(--space-xl)', filter: "drop-shadow(0 0 20px rgba(232, 180, 184, 0.5))" }}
            >
                🎂
            </motion.div>

            {!blown ? (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ fontSize: 'var(--space-lg)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '2px' }}
                >
                    Tap to blow candles
                </motion.p>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    style={{ textAlign: 'center' }}
                >
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', color: 'var(--color-accent)', marginBottom: 'var(--space-md)' }}>
                        Make a wish, Ushmi!
                    </p>
                    <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '2rem', color: 'var(--color-text-secondary)' }}>
                        ✨ I hope it comes true ✨
                    </p>
                </motion.div>
            )}
        </section>
    );
};

export default CandleBlow;
