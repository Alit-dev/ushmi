import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Heart, Sparkles } from 'lucide-react';

const FloatingIcon = ({ Icon, delay, initX, initY, color }) => (
    <motion.div
        initial={{ opacity: 0, y: initY + 50, x: initX }}
        animate={{
            opacity: [0, 0.6, 0.6, 0],
            y: initY - 100,
            rotate: [0, 90, 180]
        }}
        transition={{
            duration: 4,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
        }}
        style={{ position: 'absolute', color: color, zIndex: 0 }}
    >
        <Icon size={24} strokeWidth={1.5} />
    </motion.div>
);

const AgeCounter = () => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const duration = 2500;
            const end = 16;
            const steps = 60;
            const stepTime = Math.abs(Math.floor(duration / steps));

            const timer = setInterval(() => {
                start += (end / steps);
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, stepTime);
            return () => clearInterval(timer);
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
                backgroundColor: 'var(--color-secondary-bg)',
                overflow: 'hidden'
            }}
        >
            {isInView && (
                <>
                    <FloatingIcon Icon={Star} delay={0} initX="-30vw" initY={0} color="var(--color-accent-secondary)" />
                    <FloatingIcon Icon={Heart} delay={2} initX="20vw" initY={50} color="var(--color-accent)" />
                    <FloatingIcon Icon={Sparkles} delay={1} initX="35vw" initY={-30} color="var(--color-accent-secondary)" />
                    <FloatingIcon Icon={Heart} delay={3} initX="-20vw" initY={100} color="var(--color-accent)" />
                </>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--space-md)',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    zIndex: 1
                }}
            >
                Today You Turn
            </motion.div>

            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: 'spring', stiffness: 50, damping: 20, delay: 0.3 }}
                style={{
                    fontSize: 'clamp(8rem, 25vw, 12rem)',
                    fontWeight: 600,
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                    textShadow: '0 10px 30px var(--color-shadow)',
                    zIndex: 1
                }}
            >
                {count}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 2.8, duration: 1 }}
                style={{
                    fontFamily: 'var(--font-handwriting)',
                    fontSize: 'clamp(2rem, 6vw, 3rem)',
                    color: 'var(--color-accent-secondary)',
                    marginTop: '-1rem',
                    zIndex: 1
                }}
            >
                Sweet Sixteen ✨
            </motion.div>

        </section>
    );
};

export default AgeCounter;
