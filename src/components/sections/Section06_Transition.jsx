import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Music, ChevronDown } from 'lucide-react';

const Section06_Transition = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    const text = "তোমার জন্য একটা বিশেষ কিছু আছে...";

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
                background: 'linear-gradient(180deg, var(--color-white) 0%, rgba(253, 248, 245, 0.5) 100%)', // white to very soft cream
                overflow: 'hidden'
            }}
        >
            <motion.div
                animate={{
                    boxShadow: [
                        "0 0 40px rgba(232, 180, 184, 0)",
                        "0 0 80px rgba(232, 180, 184, 0.15)",
                        "0 0 40px rgba(232, 180, 184, 0)"
                    ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    zIndex: 0
                }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, padding: '0 var(--space-6)', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: 'var(--space-8)' }}
                >
                    <motion.div
                        animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            backgroundColor: 'var(--color-white)',
                            padding: 'var(--space-4)',
                            borderRadius: 'var(--radius-full)',
                            boxShadow: 'var(--shadow-2)'
                        }}
                    >
                        <Music size={40} color="var(--color-gold)" strokeWidth={1.5} />
                    </motion.div>
                </motion.div>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {text.split(' ').map((word, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.8 + (index * 0.15) }}
                            style={{
                                fontFamily: 'var(--font-bengali-serif)',
                                fontSize: '22px',
                                fontWeight: 500,
                                color: 'var(--color-text-secondary)',
                                marginRight: '8px',
                                marginBottom: '8px'
                            }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 2.5 }}
                style={{
                    position: 'absolute',
                    bottom: '10vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--space-2)'
                }}
            >
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    নিচে স্ক্রল করো
                </span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown size={20} color="var(--color-text-light)" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Section06_Transition;
