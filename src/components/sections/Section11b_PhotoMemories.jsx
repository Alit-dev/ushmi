import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import img1 from '../../assets/images/1.jpg';
import img2 from '../../assets/images/2.jpg';
import img3 from '../../assets/images/3.jpg';

const photos = [img1, img2, img3];

const Section11b_PhotoMemories = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section
            ref={ref}
            style={{
                minHeight: '100vh',
                width: '100%',
                backgroundColor: 'var(--color-cream)',
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
                    fontFamily: 'var(--font-bengali-serif)',
                    fontSize: '32px',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-12)',
                    textAlign: 'center',
                    letterSpacing: '2px'
                }}
            >
                উসমি
            </motion.h3>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-12)',
                width: '100%',
                maxWidth: 'var(--content-max-width)'
            }}>
                {photos.map((src, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9, rotate: index % 2 === 0 ? -2 : 2, y: 30 }}
                        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: index * 0.4 }}
                        style={{
                            backgroundColor: 'var(--color-white)',
                            padding: 'var(--space-4)',
                            borderRadius: '2px', // polaroid feel
                            boxShadow: 'var(--shadow-3)',
                            border: '1px solid rgba(0,0,0,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <img
                            src={src}
                            alt={`Ushmi ${index + 1}`}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                borderRadius: '1px'
                            }}
                        />
                        {/* Elegant minimal divider instead of text */}
                        <div style={{
                            marginTop: 'var(--space-6)',
                            width: '40px',
                            height: '1px',
                            backgroundColor: 'var(--color-rose)',
                            opacity: 0.4
                        }} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Section11b_PhotoMemories;
