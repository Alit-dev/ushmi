import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import imgImagination from '../../assets/images/6111791453974498436.jpg';

const Section12b_Imagination = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section
            ref={ref}
            style={{
                minHeight: '100vh',
                width: '100%',
                backgroundColor: 'var(--color-off-white)',
                padding: 'var(--space-24) var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <motion.h3
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '40px',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-12)',
                    textAlign: 'center',
                    letterSpacing: '2px',
                    fontWeight: 600
                }}
            >
                Imagination
            </motion.h3>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                style={{
                    backgroundColor: 'var(--color-white)',
                    padding: 'var(--space-4)',
                    boxShadow: 'var(--shadow-3)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '440px'
                }}
            >
                <div style={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '100%', // 1:1 Aspect Ratio
                    overflow: 'hidden',
                    borderRadius: '2px' // polaroid feel
                }}>
                    <img
                        src={imgImagination}
                        alt="Imagination"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </div>
                <div style={{
                    marginTop: 'var(--space-6)',
                    width: '40px',
                    height: '1px',
                    backgroundColor: 'var(--color-rose)',
                    opacity: 0.4,
                    marginBottom: 'var(--space-4)'
                }} />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                        fontFamily: 'var(--font-bengali)',
                        fontSize: '18px',
                        color: 'var(--color-text-secondary)',
                        textAlign: 'center',
                        lineHeight: '1.6',
                        padding: '0 var(--space-4)',
                        marginBottom: 'var(--space-4)'
                    }}
                >
                    কখনো সামনে দেখা হয়নি… <br />
                    তাই কল্পনাতেই তোমাকে সাজিয়ে রাখি।
                </motion.p>
            </motion.div>
        </section>
    );
};

export default Section12b_Imagination;
