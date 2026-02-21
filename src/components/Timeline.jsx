import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const timelineData = [
    { id: 1, text: "প্রথম কথা হওয়া 💬", date: "The Beginning" },
    { id: 2, text: "রাত জেগে কথা বলা 🌙", date: "Late Nights" },
    { id: 3, text: "প্রথম রাগ, প্রথম মান ভাঙানো 🥺", date: "Silly Fights" },
    { id: 4, text: "আজকের দিন - Birthday 🎂", date: "Today" }
];

const TimelineNode = ({ item, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const isEven = index % 2 === 0;

    return (
        <div ref={ref} style={{
            display: 'flex',
            justifyContent: isEven ? 'flex-start' : 'flex-end',
            padding: '0 var(--space-md)',
            width: '100%',
            marginBottom: 'var(--space-xl)',
            position: 'relative'
        }}>
            {/* Center Dot */}
            <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary-bg)',
                    border: '4px solid var(--color-accent)',
                    zIndex: 2,
                    boxShadow: '0 0 10px var(--color-shadow)'
                }}
            />

            <motion.div
                initial={{ opacity: 0, x: isEven ? -50 : 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
                style={{
                    width: '45%',
                    padding: 'var(--space-md)',
                    backgroundColor: 'var(--color-primary-bg)',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px var(--color-shadow)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isEven ? 'flex-end' : 'flex-start',
                    textAlign: isEven ? 'right' : 'left'
                }}
                className="glass"
            >
                <span style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-accent-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: 'var(--space-xs)',
                    fontFamily: 'var(--font-body)'
                }}>
                    {item.date}
                </span>
                <p className="font-bengali" style={{
                    fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 500
                }}>
                    {item.text}
                </p>
            </motion.div>
        </div>
    );
}

const Timeline = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section
            ref={containerRef}
            style={{
                padding: 'var(--space-xxxl) 0',
                backgroundColor: 'var(--color-secondary-bg)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'hidden'
            }}
        >
            <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-bengali"
                style={{
                    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-xxxl)',
                    textAlign: 'center'
                }}
            >
                আমাদের স্মৃতিগুলো...
            </motion.h3>

            <div style={{ position: 'relative', width: '100%', maxWidth: '800px' }}>
                {/* The Animated SVG Line */}
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(232, 180, 184, 0.2)', // Light accent color
                    zIndex: 0
                }} />

                <motion.div style={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'var(--color-accent)',
                    scaleY: pathLength,
                    transformOrigin: 'top',
                    zIndex: 1
                }} />

                {timelineData.map((item, index) => (
                    <TimelineNode key={item.id} item={item} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Timeline;
