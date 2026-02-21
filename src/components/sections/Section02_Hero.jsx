import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import FloatingParticles from '../common/FloatingParticles';

const Section02_Hero = () => {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const yParallax = useTransform(scrollY, [0, 500], [0, 100]);

    // Animation variants
    const containerVars = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.6 }
        },
    };

    const letterVars = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 10 }
        },
    };

    const greetingText = "Happy Birthday";

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
                background: `linear-gradient(180deg, var(--color-white) 0%, #FDFBF9 50%, var(--color-cream) 100%)`
            }}
        >
            <FloatingParticles />

            <motion.div
                style={{
                    opacity,
                    y: yParallax,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 10,
                    padding: '0 var(--space-6)',
                    textAlign: 'center'
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                        fontSize: '12px',
                        color: 'var(--color-text-tertiary)',
                        letterSpacing: '0.2em',
                        marginBottom: 'var(--space-12)',
                        textTransform: 'uppercase',
                        backgroundColor: 'rgba(0,0,0,0.02)',
                        padding: 'var(--space-2) var(--space-4)',
                        borderRadius: 'var(--radius-full)'
                    }}
                >
                    22 February 2026
                </motion.div>

                <motion.div
                    variants={containerVars}
                    initial="hidden"
                    animate="visible"
                    style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 'var(--space-4)' }}
                >
                    {greetingText.split('').map((char, index) => (
                        <motion.span
                            key={index}
                            variants={letterVars}
                            className="text-hero-title"
                            style={{
                                color: 'var(--color-text-primary)',
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
                    transition={{ duration: 0.8, delay: 1.4, ease: [0.175, 0.885, 0.32, 1.275] }}
                    className="text-handwriting-large"
                    style={{
                        color: 'transparent',
                        backgroundImage: 'linear-gradient(135deg, var(--color-rose), var(--color-gold))',
                        WebkitBackgroundClip: 'text',
                        marginBottom: 'var(--space-6)',
                        filter: 'drop-shadow(0 4px 8px rgba(232, 180, 184, 0.3))'
                    }}
                >
                    Ushmi
                </motion.h2>

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 60 }}
                    transition={{ duration: 0.5, delay: 1.8, ease: "easeOut" }}
                    style={{
                        height: '2px',
                        background: 'linear-gradient(90deg, var(--color-rose), var(--color-gold))',
                        marginBottom: 'var(--space-6)'
                    }}
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 2.2 }}
                    className="text-bengali-body"
                    style={{ color: 'var(--color-text-secondary)' }}
                >
                    আজ তোমার বিশেষ দিন <Sparkles size={16} inline="true" color="var(--color-gold)" style={{ verticalAlign: 'middle', marginLeft: '4px' }} />
                </motion.p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 8, 0] }}
                transition={{
                    opacity: { delay: 3, duration: 1 },
                    y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                }}
                style={{
                    position: 'absolute',
                    bottom: '48px',
                    color: 'var(--color-text-light)'
                }}
            >
                <ChevronDown size={24} strokeWidth={1.5} />
            </motion.div>
        </section>
    );
};

export default Section02_Hero;
