import React from 'react';
import { motion } from 'framer-motion';

const FloatingParticles = () => {
    // Particle Type 1 - Soft Circles
    const type1 = Array.from({ length: 15 }).map((_, i) => ({
        id: `t1-${i}`,
        size: Math.random() * 5 + 3,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 20,
        delay: Math.random() * 5,
        color: 'rgba(232, 180, 184, 0.3)'
    }));

    // Particle Type 2 - Tiny Dots
    const type2 = Array.from({ length: 25 }).map((_, i) => ({
        id: `t2-${i}`,
        size: Math.random() * 2 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 30,
        delay: Math.random() * 5,
        color: 'rgba(212, 165, 116, 0.2)'
    }));

    // Particle Type 3 - Sparkle Points
    const type3 = Array.from({ length: 12 }).map((_, i) => ({
        id: `t3-${i}`,
        size: Math.random() * 1 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 2 + 2,
        delay: Math.random() * 5,
        color: 'rgba(255, 255, 255, 0.8)'
    }));

    const particles = [...type1, ...type2];

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 0
            }}
        >
            {/* Floaters */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{
                        opacity: 0,
                        x: `${p.x}vw`,
                        y: `${p.y + 20}vh`,
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        y: `${p.y - 40}vh`,
                        x: `${p.x + (Math.random() * 20 - 10)}vw`,
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        borderRadius: '50%',
                        filter: 'blur(1px)'
                    }}
                />
            ))}

            {/* Twinklers */}
            {type3.map((p) => (
                <motion.div
                    key={p.id}
                    animate={{
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'absolute',
                        left: `${p.x}vw`,
                        top: `${p.y}vh`,
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        borderRadius: '50%',
                        boxShadow: '0 0 4px rgba(255,255,255,0.8)'
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingParticles;
