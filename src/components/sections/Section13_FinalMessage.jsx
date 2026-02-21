import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Section13_FinalMessage = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    const messageLines = [
        "সবশেষে শুধু এটুকুই বলার...",
        "জীবনটা অনেক সুন্দর।",
        "কখনো হার মানবে না।",
        "আমি হয়তো সবসময় পাশে থাকবো না,",
        "কিন্তু আমার দোয়া সবসময় থাকবে।"
    ];

    return (
        <section
            ref={ref}
            style={{
                minHeight: '80vh',
                width: '100%',
                backgroundColor: 'var(--color-white)',
                padding: 'var(--space-24) var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}
        >
            <div style={{ maxWidth: 'var(--content-max-width)' }}>
                {messageLines.map((line, index) => (
                    <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: index * 0.8 }}
                        style={{
                            fontFamily: 'var(--font-bengali)',
                            fontSize: '20px',
                            color: index === messageLines.length - 1 ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                            fontWeight: index === messageLines.length - 1 ? 600 : 400,
                            marginBottom: 'var(--space-4)',
                            lineHeight: 1.6
                        }}
                    >
                        {line}
                    </motion.p>
                ))}

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1, delay: messageLines.length * 0.8 + 1 }}
                    style={{ marginTop: 'var(--space-12)' }}
                >
                    <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '28px', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                        ইতি,
                    </p>
                    <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '36px', color: 'var(--color-gold)', fontWeight: 600 }}>
                        Alamin
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Section13_FinalMessage;
