import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Heart, Sparkles } from 'lucide-react';

const FloatingDecorative = ({ delay, initX, initY, size, Icon, color, isPulse }) => (
    <motion.div
        initial={{ opacity: 0, y: initY + 30, x: initX }}
        animate={{
            opacity: [0, 0.8, 0],
            y: initY - 60,
            rotate: [0, 60, 120],
            scale: isPulse ? [1, 1.2, 1] : 1
        }}
        transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
        }}
        style={{ position: 'absolute', color, zIndex: 0 }}
    >
        <Icon size={size} strokeWidth={isPulse ? 2 : 1.5} fill={isPulse ? color : "none"} />
    </motion.div>
);

const Section03_AgeReveal = () => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView) {
            // Non-linear counting
            const milestones = [1, 5, 10, 15, 16];
            let currentMilestone = 0;
            let start = 0;

            const increment = () => {
                if (start < 16) {
                    start++;
                    setCount(start);

                    let delay = 80; // fast speed
                    if (milestones.includes(start)) {
                        delay = 300; // pause briefly at milestones
                        if (start === 15) delay = 500; // dramatic pause before 16
                    }

                    if (start < 16) {
                        setTimeout(increment, delay);
                    }
                }
            };

            setTimeout(increment, 200); // 200ms initial delay
        }
    }, [isInView]);

    return (
        <section
            ref={ref}
            style={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                backgroundColor: 'var(--color-off-white)',
                backgroundImage: 'radial-gradient(circle, rgba(250,250,250,1) 0%, rgba(240,240,240,0.5) 100%)',
                overflow: 'hidden'
            }}
        >
            {isInView && (
                <>
                    {/* Stars */}
                    <FloatingDecorative Icon={Star} size={16} delay={2.2} initX="-30vw" initY={0} color="var(--color-gold)" />
                    <FloatingDecorative Icon={Star} size={24} delay={2.5} initX="25vw" initY={-20} color="var(--color-gold-light)" />

                    {/* Hearts */}
                    <FloatingDecorative Icon={Heart} size={20} delay={2.3} initX="20vw" initY={60} color="var(--color-rose)" isPulse />
                    <FloatingDecorative Icon={Heart} size={28} delay={2.6} initX="-25vw" initY={80} color="var(--color-rose-light)" isPulse />

                    {/* Sparkles */}
                    <FloatingDecorative Icon={Sparkles} size={24} delay={2.4} initX="10vw" initY={-50} color="var(--color-gold)" />
                    <FloatingDecorative Icon={Sparkles} size={18} delay={2.7} initX="-15vw" initY={-30} color="var(--color-gold)" />
                </>
            )}

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--space-6)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 500,
                    marginBottom: 'var(--space-6)',
                    zIndex: 1
                }}
            >
                Today You Turn
            </motion.div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: 'var(--space-6)' }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5, duration: 1 }}
                    style={{ position: 'absolute', left: '-40px', color: 'var(--color-rose)' }}
                >
                    <Star size={24} fill="var(--color-rose)" strokeWidth={0} />
                </motion.div>

                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={isInView ? {
                        scale: count === 16 ? [1, 1.1, 1] : 1,
                        opacity: 1,
                        filter: count < 16 && count > 0 ? "blur(2px)" : "blur(0px)",
                        textShadow: count === 16 ? "0 0 40px rgba(212, 165, 116, 0.5)" : "0 10px 30px var(--shadow-3)"
                    } : {}}
                    transition={{
                        type: count === 16 ? 'spring' : 'tween',
                        stiffness: 200,
                        damping: 10,
                        duration: 0.2
                    }}
                    style={{
                        fontSize: 'clamp(8rem, 30vw, 14rem)',
                        fontWeight: 700,
                        fontFamily: 'var(--font-display)',
                        color: 'var(--color-text-primary)',
                        lineHeight: 1,
                        zIndex: 1
                    }}
                >
                    {count}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6, duration: 1 }}
                    style={{ position: 'absolute', right: '-40px', color: 'var(--color-rose)' }}
                >
                    <Heart size={24} fill="var(--color-rose)" strokeWidth={0} />
                </motion.div>

                {/* Sparkle lines behind 16 */}
                {count === 16 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: [0, 1, 0], scale: 1.5 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        style={{ position: 'absolute', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(232, 180, 184, 0.2) 0%, transparent 70%)', zIndex: 0 }}
                    />
                )}
            </div>

            <motion.div
                initial={{ opacity: 0, pathLength: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.7, duration: 1 }}
                className="text-handwriting-large"
                style={{
                    color: 'var(--color-rose)',
                    marginBottom: 'var(--space-8)',
                    zIndex: 1
                }}
            >
                Sweet Sixteen
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2.7, duration: 0.4 }}
                style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--color-text-tertiary)',
                    backgroundColor: 'var(--color-white)',
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: 'var(--shadow-1)',
                    zIndex: 1
                }}
            >
                2010 → 2026
            </motion.div>

        </section>
    );
};

export default Section03_AgeReveal;
