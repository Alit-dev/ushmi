import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const wishesData = [
    { id: 1, text: "সবসময় হাসিখুশি থাকিস", top: "10%", left: "5%", rotate: -5, speed: 1.2 },
    { id: 2, text: "সব স্বপ্ন পূরণ হোক", top: "25%", left: "50%", rotate: 8, speed: 0.8 },
    { id: 3, text: "কোনোদিন একটু সময় দিয়ে দেখা করবি", top: "50%", left: "10%", rotate: -3, speed: 1.5 },
    { id: 4, text: "আমাকে একটু মনে রাখিস", top: "65%", left: "60%", rotate: 6, speed: 0.9 },
    { id: 5, text: "আল্লাহ তোকে সুখী রাখুক", top: "85%", left: "20%", rotate: -8, speed: 1.1 }
];

const WishCard = ({ wish, scrollYProgress }) => {
    // Parallax effect
    const y = useTransform(scrollYProgress, [0, 1], [0, -100 * wish.speed]);

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: wish.top,
                left: wish.left,
                y: y,
                rotate: wish.rotate,
                backgroundColor: 'var(--color-primary-bg)',
                padding: 'var(--space-lg) var(--space-md)',
                borderRadius: '12px',
                boxShadow: '0 15px 35px var(--color-shadow)',
                maxWidth: '250px',
                border: '1px solid rgba(232, 180, 184, 0.3)', // subtle accent border
                zIndex: 1,
                cursor: 'pointer'
            }}
            whileHover={{ scale: 1.05, rotate: 0, y: -5, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="glass"
        >
            <div style={{
                position: 'absolute',
                top: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '15px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                transformOrigin: 'center'
            }} /> {/* Sticky Tape Effect */}

            <p className="font-handwriting" style={{
                fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                color: 'var(--color-text-primary)',
                textAlign: 'center',
                lineHeight: 1.4
            }}>
                {wish.text}
            </p>
        </motion.div>
    );
};

const WishesWall = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section
            ref={containerRef}
            style={{
                minHeight: '150vh', // extra height for parallax scrolling room
                width: '100%',
                position: 'relative',
                backgroundColor: 'var(--color-secondary-bg)',
                overflow: 'hidden',
                paddingTop: 'var(--space-xxxl)'
            }}
        >
            <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2rem, 6vw, 3rem)',
                    color: 'var(--color-accent-secondary)',
                    textAlign: 'center',
                    marginBottom: 'var(--space-xl)',
                    position: 'relative',
                    zIndex: 2
                }}
            >
                Wishes For You
            </motion.h3>

            <div style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '600px', margin: '0 auto' }}>
                {wishesData.map((wish) => (
                    <WishCard key={wish.id} wish={wish} scrollYProgress={scrollYProgress} />
                ))}
            </div>
        </section>
    );
};

export default WishesWall;
