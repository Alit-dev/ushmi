import React from 'react';
import { motion } from 'framer-motion';

const Section11_AbstractConnection = () => {
    // We create a flowing, watercolor-like abstract connection since we don't have photos

    return (
        <section style={{
            height: '80vh',
            width: '100%',
            backgroundColor: 'var(--color-white)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>

            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    width: '60vw',
                    height: '60vw',
                    borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
                    background: 'radial-gradient(circle, var(--color-rose-light) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                    zIndex: 0
                }}
            />

            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.4, 0.7, 0.4],
                    rotate: [0, -90, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    width: '70vw',
                    height: '70vw',
                    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                    background: 'radial-gradient(circle, rgba(212, 165, 116, 0.15) 0%, transparent 70%)', // Gold light
                    filter: 'blur(40px)',
                    zIndex: 0,
                    mixBlendMode: 'multiply'
                }}
            />

            <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1 }}
                style={{
                    fontFamily: 'var(--font-handwriting)',
                    fontSize: 'clamp(2rem, 8vw, 4rem)',
                    color: 'var(--color-text-primary)',
                    zIndex: 1,
                    textAlign: 'center',
                    lineHeight: 1.2,
                    textShadow: '0 4px 20px rgba(255,255,255,0.8)'
                }}
            >
                অদৃশ্য এক মায়া...<br />
                <span style={{ fontSize: '0.6em', color: 'var(--color-text-secondary)' }}>যেটা কখনো মুছে যাবে না</span>
            </motion.h3>

        </section>
    );
};

export default Section11_AbstractConnection;
