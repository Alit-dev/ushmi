import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FinalMessage = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    const containerVars = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.5,
                staggerChildren: 0.8
            }
        }
    };

    const lineVars = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut" }
        }
    };

    return (
        <section
            ref={ref}
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--color-primary-bg)',
                padding: 'var(--space-xl)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <motion.div
                variants={containerVars}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    maxWidth: '600px'
                }}
            >
                <motion.p variants={lineVars} className="font-bengali" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
                    মেম...
                </motion.p>

                <motion.p variants={lineVars} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 6vw, 3rem)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-xl)' }}>
                    Happy 16th Birthday
                </motion.p>

                <motion.p variants={lineVars} className="font-bengali" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
                    এই দূরত্ব থাকলেও...
                </motion.p>

                <motion.p variants={lineVars} className="font-bengali" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', color: 'var(--color-accent)', fontWeight: 600, marginBottom: 'var(--space-xxxl)' }}>
                    তুই সবসময় কাছেই আছিস।
                </motion.p>

                {/* Heartbeat Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: [1, 1.2, 1] } : {}}
                    transition={{
                        delay: 4.5, // After text
                        repeat: Infinity,
                        repeatDelay: 1,
                        duration: 0.5
                    }}
                    style={{ marginBottom: 'var(--space-xl)' }}
                >
                    <span style={{ fontSize: '2rem' }}>❤️</span>
                </motion.div>

                {/* Signature */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 5, duration: 1.5 }}
                    style={{
                        alignSelf: 'flex-end',
                        textAlign: 'right',
                        marginRight: '10%'
                    }}
                >
                    <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '2rem', color: 'var(--color-text-primary)' }}>
                        - Alamin
                    </p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', letterSpacing: '1px' }}>
                        22.02.2026
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default FinalMessage;
