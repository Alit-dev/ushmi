import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import FloatingParticles from './common/FloatingParticles';

const HeroSection = () => {
    const { scrollY } = useScroll();
    const yOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const yParallax = useTransform(scrollY, [0, 500], [0, 100]);

    // Animation variants
    const containerVars = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.5,
            },
        },
    };

    const letterVars = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 10 }
        },
    };

    const titleText = "Happy Birthday";

    return (
        <section
            style={{
                position: 'relative',
                height: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: `linear-gradient(180deg, var(--color-primary-bg) 0%, var(--color-secondary-bg) 100%)`
            }}
        >
            <FloatingParticles />

            <motion.div
                style={{
                    opacity: yOpacity,
                    y: yParallax,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 10
                }}
            >
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{
                        fontSize: 'var(--space-md)',
                        color: 'var(--color-text-secondary)',
                        letterSpacing: '2px',
                        marginBottom: 'var(--space-lg)',
                        textTransform: 'uppercase'
                    }}
                >
                    22 February 2026
                </motion.p>

                <motion.div
                    variants={containerVars}
                    initial="hidden"
                    animate="visible"
                    style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 'var(--space-sm)' }}
                >
                    {titleText.split('').map((char, index) => (
                        <motion.span
                            key={index}
                            variants={letterVars}
                            style={{
                                fontSize: 'clamp(3rem, 10vw, 5rem)',
                                fontFamily: 'var(--font-heading)',
                                color: 'var(--color-text-primary)',
                                lineHeight: 1.1,
                                marginLeft: char === ' ' ? '1rem' : '0'
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
                    style={{
                        fontFamily: 'var(--font-handwriting)',
                        fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                        color: 'var(--color-accent)',
                        marginTop: 'var(--space-md)'
                    }}
                >
                    Ushmi 💕
                </motion.h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{
                    opacity: { delay: 3, duration: 1 },
                    y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                }}
                style={{
                    position: 'absolute',
                    bottom: '10vh',
                    color: 'var(--color-text-secondary)'
                }}
            >
                <ChevronDown size={32} strokeWidth={1.5} />
            </motion.div>

        </section>
    );
};

export default HeroSection;
