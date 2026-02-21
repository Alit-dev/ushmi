import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const timelineData = [
    { year: "2010", text: "প্রথম দেখা, ছোট্ট બેલા" },
    { year: "2015", text: "একসাথে বেড়ে ওঠা" },
    { year: "2018", text: "বন্ধুত্ব আরও গাঢ় হয়" },
    { year: "2020", text: "দূরত্ব বাড়ে, কিন্তু মন নয়" },
    { year: "2022", text: "অনেক স্মৃতি, অনেক গল্প" },
    { year: "2024", text: "সময় যায়, সম্পর্ক থাকে" },
    { year: "2026", text: "তোমার ১৬তম জন্মদিন!" }
];

const TimelineNode = ({ item, index, progress }) => {
    // Each node becomes fully active at a certain scroll percentage
    const threshold = index / (timelineData.length - 1);
    const isActive = useTransform(progress, [threshold - 0.1, threshold], [0, 1]);
    const scale = useTransform(isActive, [0, 1], [0.8, 1]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginBottom: 'var(--space-16)',
            position: 'relative'
        }}>

            {/* Date Node */}
            <motion.div
                style={{
                    width: '50%',
                    display: 'flex',
                    justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                    paddingLeft: index % 2 === 0 ? 0 : 'var(--space-8)',
                    paddingRight: index % 2 === 0 ? 'var(--space-8)' : 0,
                }}
            >
                <motion.div
                    style={{
                        opacity: isActive,
                        scale: scale,
                        fontFamily: 'var(--font-display)',
                        fontSize: '32px',
                        fontWeight: 700,
                        color: 'var(--color-gold)',
                        textShadow: '0 2px 10px rgba(212, 165, 116, 0.2)'
                    }}
                >
                    {item.year}
                </motion.div>
            </motion.div>

            {/* Center Circle */}
            <div style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-white)',
                border: '3px solid var(--color-rose)',
                zIndex: 2,
                boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.5)'
            }}>
                <motion.div
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'var(--color-rose)',
                        borderRadius: '50%',
                        scale: isActive,
                    }}
                />
            </div>

            {/* Text Content */}
            <motion.div
                style={{
                    width: '50%',
                    display: 'flex',
                    justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                    paddingLeft: index % 2 === 0 ? 'var(--space-8)' : 0,
                    paddingRight: index % 2 === 0 ? 0 : 'var(--space-8)',
                }}
            >
                <motion.div
                    style={{
                        opacity: isActive,
                        y: useTransform(isActive, [0, 1], [20, 0]),
                        backgroundColor: 'var(--color-white)',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-1)',
                        fontFamily: 'var(--font-bengali)',
                        color: 'var(--color-text-secondary)',
                        fontSize: '15px',
                        maxWidth: '220px'
                    }}
                >
                    {item.text}
                </motion.div>
            </motion.div>

        </div>
    );
};

const Section09_Timeline = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const springProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section
            ref={containerRef}
            style={{
                width: '100%',
                backgroundColor: 'var(--color-cream)',
                padding: 'var(--space-24) 0',
                position: 'relative'
            }}
        >
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
                <h3 style={{ fontFamily: 'var(--font-bengali-serif)', fontSize: '28px', color: 'var(--color-text-primary)' }}>সময়রেখা</h3>
            </div>

            <div style={{ position: 'relative', width: '100%', maxWidth: 'var(--content-max-width)', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {/* The Central Line */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: '50%',
                    width: '2px',
                    backgroundColor: 'rgba(232, 180, 184, 0.2)',
                    transform: 'translateX(-50%)',
                    zIndex: 1
                }}>
                    {/* Animated Draw Line */}
                    <motion.div
                        style={{
                            width: '100%',
                            backgroundColor: 'var(--color-rose)',
                            scaleY: springProgress,
                            transformOrigin: 'top',
                            height: '100%',
                            boxShadow: '0 0 10px rgba(232, 180, 184, 0.5)'
                        }}
                    />
                </div>

                {/* Timeline Entries */}
                <div style={{ width: '100%', padding: 'var(--space-12) 0', position: 'relative', zIndex: 2 }}>
                    {timelineData.map((item, index) => (
                        <TimelineNode key={index} item={item} index={index} progress={springProgress} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Section09_Timeline;
