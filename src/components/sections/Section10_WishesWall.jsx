import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const wishesData = [
    { id: 1, text: "শুভ জন্মদিন উসমি!", author: "Alamin" },
    { id: 2, text: "সবসময় হাসিখুশি থেকো", author: "Alamin" },
    { id: 3, text: "তোমার সব স্বপ্ন পূরণ হোক", author: "Alamin" },
    { id: 4, text: "অনেক অনেক ভালোবাসা", author: "Alamin" },
    { id: 5, text: "জীবন হোক আনন্দময়", author: "Alamin" },
    { id: 6, text: "সব বাধা পেরিয়ে যাও", author: "Alamin" },
    { id: 7, text: "Special day for a special person", author: "Alamin" },
];

const WishCard = ({ wish, index, scrollYProgress }) => {
    // Parallax calculations
    const yOffset = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
    const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 10]);

    // Alternate placement
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            style={{
                y: yOffset,
                rotateX: index % 3 === 0 ? rotateX : 0,
                rotateY: index % 2 !== 0 ? rotateY : 0,
                perspective: '1000px',
                alignSelf: isLeft ? 'flex-start' : 'flex-end',
                marginLeft: isLeft ? `${(index * 5) % 20}%` : '0',
                marginRight: !isLeft ? `${(index * 5) % 20}%` : '0',
                marginTop: index === 0 ? '0' : '-40px',
                zIndex: wishesData.length - index
            }}
        >
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-6)',
                width: '260px',
                boxShadow: 'var(--shadow-3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <p style={{
                    fontFamily: index === 6 ? 'var(--font-handwriting)' : 'var(--font-bengali-serif)',
                    fontSize: index === 6 ? '24px' : '18px',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-4)',
                    lineHeight: 1.4
                }}>
                    "{wish.text}"
                </p>
                <span style={{
                    fontFamily: 'var(--font-handwriting)',
                    fontSize: '14px',
                    color: 'var(--color-text-tertiary)',
                    borderTop: '1px solid rgba(0,0,0,0.05)',
                    paddingTop: 'var(--space-2)',
                    width: '80%'
                }}>
                    ~ {wish.author}
                </span>
            </div>
        </motion.div>
    );
};

const Section10_WishesWall = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    return (
        <section
            ref={ref}
            style={{
                minHeight: '150vh',
                width: '100%',
                backgroundColor: 'var(--color-rose-light)',
                backgroundImage: 'linear-gradient(135deg, var(--color-rose-light) 0%, #FDF8F5 100%)',
                padding: 'var(--space-24) var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'hidden',
                position: 'relative'
            }}
        >
            <motion.h3
                style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '32px',
                    color: 'var(--color-white)',
                    textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    marginBottom: 'var(--space-16)',
                    textAlign: 'center',
                    zIndex: 10
                }}
            >
                Wishes
            </motion.h3>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: 'var(--content-max-width)',
                position: 'relative',
                gap: 'var(--space-4)'
            }}>
                {wishesData.map((wish, index) => (
                    <WishCard key={wish.id} wish={wish} index={index} scrollYProgress={scrollYProgress} />
                ))}
            </div>

            {/* Background elements to add depth */}
            <div style={{ position: 'absolute', top: '10%', left: '-10%', fontSize: '120px', opacity: 0.05, filter: 'blur(2px)' }}>🌸</div>
            <div style={{ position: 'absolute', bottom: '20%', right: '-5%', fontSize: '100px', opacity: 0.05, filter: 'blur(1px)' }}>✨</div>

        </section>
    );
};

export default Section10_WishesWall;
