import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Section08_PostVoice = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    const textLines = [
        "কথাগুলো অনেক পুরোনো...",
        "তবুও মনে পড়ে",
        "তাই না?"
    ];

    return (
        <section
            ref={ref}
            style={{
                minHeight: '80vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--color-white)',
                padding: 'var(--space-12) var(--space-6)',
                position: 'relative'
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
                transition={{ duration: 1 }}
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    fontFamily: 'var(--font-display)',
                    fontSize: '120px',
                    color: 'var(--color-gold)',
                    lineHeight: 1,
                    zIndex: 0
                }}
            >
                "
            </motion.div>

            <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', textAlign: 'center' }}>
                {textLines.map((line, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: index * 1.5 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <motion.p
                            initial={{ x: '-100%' }}
                            animate={isInView ? { x: 0 } : {}}
                            transition={{ duration: 1, delay: 0.2 + (index * 1.5), ease: "easeOut" }}
                            style={{
                                fontFamily: index === 2 ? 'var(--font-handwriting)' : 'var(--font-bengali-serif)',
                                fontSize: index === 2 ? '32px' : '24px',
                                color: index === 2 ? 'var(--color-rose)' : 'var(--color-text-primary)',
                                fontWeight: index === 2 ? 600 : 500,
                            }}
                        >
                            {line}
                        </motion.p>
                    </motion.div>
                ))}
            </div>

        </section>
    );
};

export default Section08_PostVoice;
