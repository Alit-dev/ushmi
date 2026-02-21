import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const Section14_CandleBlow = ({ onBlown }) => {
    const [isBlown, setIsBlown] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    // Simulate microphone "blow" detection with a simple touch hold for cross-device compatibility
    const [holdProgress, setHoldProgress] = useState(0);
    const holdTimer = useRef(null);

    const handleTouchStart = () => {
        if (isBlown) return;
        let progress = 0;
        holdTimer.current = setInterval(() => {
            progress += 5;
            setHoldProgress(progress);
            if (progress >= 100) {
                clearInterval(holdTimer.current);
                setIsBlown(true);
                if (onBlown) onBlown();
            }
        }, 50);
    };

    const handleTouchEnd = () => {
        clearInterval(holdTimer.current);
        if (!isBlown) {
            setHoldProgress(0); // reset if they didn't hold long enough
        }
    };

    return (
        <section
            ref={ref}
            style={{
                minHeight: '100vh',
                width: '100%',
                backgroundColor: 'var(--color-primary-bg)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <motion.h3
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                style={{
                    fontFamily: 'var(--font-bengali-serif)',
                    fontSize: '28px',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-12)',
                    textAlign: 'center',
                    zIndex: 1
                }}
            >
                {isBlown ? "শুভ জন্মদিন!" : "এবার একটা ইচ্ছা করো..."}
            </motion.h3>

            <div
                style={{
                    position: 'relative',
                    width: '120px',
                    height: '250px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    zIndex: 10
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleTouchStart}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
            >
                {/* The Flame (Progress bar removed from here) */}

                {/* The Flame */}
                <AnimatePresence>
                    {!isBlown && (
                        <motion.div
                            exit={{ opacity: 0, scale: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            style={{ position: 'absolute', top: '25px', width: '30px', height: '50px', zIndex: 3 }}
                        >
                            {/* Inner Flame */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 0.9, 1.05, 1],
                                    rotate: [-2, 3, -1, 2, -2],
                                    skewX: [-1, 2, -2, 1, -1]
                                }}
                                transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(to top, #fff, #ffeb3b, #ff9800)',
                                    borderRadius: '50% 50% 20% 20% / 60% 60% 40% 40%',
                                    boxShadow: '0 0 20px #ffeb3b, 0 0 40px #ff9800',
                                    transformOrigin: 'bottom center'
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Smoke when blown */}
                <AnimatePresence>
                    {isBlown && (
                        <motion.div
                            initial={{ opacity: 0, y: 0, scale: 0.5 }}
                            animate={{ opacity: [0, 0.8, 0], y: -100, scale: 2, x: [0, -10, 10, -5] }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            style={{ position: 'absolute', top: '10px', width: '10px', height: '10px', backgroundColor: 'rgba(200,200,200,0.5)', borderRadius: '50%', filter: 'blur(4px)', zIndex: 3 }}
                        />
                    )}
                </AnimatePresence>

                {/* The Wick */}
                <div style={{ width: '4px', height: '15px', backgroundColor: '#333', borderRadius: '2px 2px 0 0', zIndex: 2 }} />

                {/* The Candle Body */}
                <div style={{
                    width: '60px',
                    height: '160px',
                    background: 'linear-gradient(90deg, #FDF8F5 0%, var(--color-white) 50%, #F5EAE6 100%)',
                    borderRadius: '4px 4px 10px 10px',
                    boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.05), var(--shadow-2)',
                    position: 'relative',
                    border: '1px solid rgba(232, 180, 184, 0.2)'
                }}>
                    {/* Melted wax drop */}
                    <div style={{ position: 'absolute', top: 0, left: '10px', width: '8px', height: '25px', backgroundColor: 'var(--color-white)', borderRadius: '4px', boxShadow: '1px 1px 2px rgba(0,0,0,0.05)' }} />
                </div>
            </div>

            <div style={{ marginTop: 'var(--space-10)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <AnimatePresence>
                    {!isBlown && holdProgress > 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                width: '120px',
                                height: '4px',
                                backgroundColor: 'rgba(0,0,0,0.05)',
                                borderRadius: '2px',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{ height: '100%', width: `${holdProgress}%`, backgroundColor: 'var(--color-rose)', transition: 'width 0.1s linear' }} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView && !isBlown ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    style={{
                        fontFamily: 'var(--font-bengali)',
                        fontSize: '14px',
                        color: 'var(--color-text-secondary)',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleTouchStart}
                    onMouseUp={handleTouchEnd}
                    onMouseLeave={handleTouchEnd}
                >
                    {isBlown ? "" : "(মোমবাতিতে চেপে ধরে থাকো নেভানোর জন্য)"}
                </motion.p>
            </div>
        </section>
    );
};

export default Section14_CandleBlow;
