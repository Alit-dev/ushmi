import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Heart } from 'lucide-react';

const Section04_DistanceStory = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section
            ref={ref}
            style={{
                minHeight: '120vh',
                width: '100%',
                padding: 'var(--space-24) var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(180deg, var(--color-white) 0%, var(--color-cream) 100%)',
                position: 'relative'
            }}
        >
            <motion.h3
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                style={{
                    fontFamily: 'var(--font-bengali-serif)',
                    fontSize: '28px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-16)',
                    textAlign: 'center'
                }}
            >
                আমাদের গল্প
            </motion.h3>

            <div style={{ width: '100%', maxWidth: 'var(--content-max-width)', height: '200px', position: 'relative', marginBottom: 'var(--space-12)' }}>

                {/* Animated Connection Line Container */}
                <div style={{ position: 'absolute', top: '50%', left: '80px', right: '80px', height: '2px', transform: 'translateY(-50%)', overflow: 'hidden' }}>
                    {/* Base dotted line */}
                    <div style={{ width: '100%', height: '100%', borderBottom: '2px dotted rgba(232, 180, 184, 0.4)' }} />

                    {/* Animated gradient overlay */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={isInView ? { x: '100%' } : {}}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '50%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, var(--color-rose), transparent)'
                        }}
                    />
                </div>

                {/* Center Heart and Label */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ delay: 0.7, duration: 1.5, repeat: Infinity }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'var(--color-cream)',
                        padding: '0 var(--space-2)'
                    }}
                >
                    <Heart size={20} fill="var(--color-rose)" color="var(--color-rose)" style={{ marginBottom: '4px' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-tertiary)', fontWeight: 300 }}>~২৫০ কিমি</span>
                </motion.div>

                {/* Left City (Dhaka) */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{
                        position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        background: 'var(--color-rose-light)', padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-2)',
                        border: '1px solid rgba(255,255,255,0.5)'
                    }}
                >
                    <MapPin size={24} color="var(--color-text-primary)" style={{ marginBottom: 'var(--space-2)' }} />
                    <span style={{ fontFamily: 'var(--font-bengali)', fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)' }}>ঢাকা</span>
                    <span style={{ fontFamily: 'var(--font-handwriting)', fontSize: '16px', color: 'var(--color-text-secondary)' }}>আলামিন</span>
                </motion.div>

                {/* Right City (Chittagong) */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1 }}
                    style={{
                        position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        background: 'var(--color-rose-light)', padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-2)',
                        border: '1px solid rgba(255,255,255,0.5)'
                    }}
                >
                    <MapPin size={24} color="var(--color-text-primary)" style={{ marginBottom: 'var(--space-2)' }} />
                    <span style={{ fontFamily: 'var(--font-bengali)', fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)' }}>চট্টগ্রাম</span>
                    <span style={{ fontFamily: 'var(--font-handwriting)', fontSize: '16px', color: 'var(--color-text-secondary)' }}>উসমি</span>
                </motion.div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 'var(--space-12)' }}>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.8 }}
                    style={{ fontFamily: 'var(--font-bengali)', fontSize: '18px', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}
                >
                    দেখা হয়নি কখনো...
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 2.2 }}
                    style={{ fontFamily: 'var(--font-bengali-serif)', fontSize: '22px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}
                >
                    তবুও এত কাছের মানুষ
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 2.6 }}
                    style={{ fontFamily: 'var(--font-handwriting)', fontSize: '24px', fontWeight: 500, color: 'var(--color-rose)' }}
                >
                    কিভাবে যে হলো
                </motion.p>
            </div>

            {/* Statistics Cards */}
            <div style={{ display: 'flex', gap: 'var(--space-3)', width: '100%', maxWidth: 'var(--content-max-width)', justifyContent: 'center' }}>
                {[
                    { top: 'দূরত্ব', bot: '২৫০+ কিমি' },
                    { top: 'দেখা', bot: 'এখনো হয়নি' },
                    { top: 'কাছের', bot: 'সবসময়' }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 3 + (i * 0.2) }}
                        style={{
                            flex: 1,
                            backgroundColor: 'var(--color-white)',
                            padding: 'var(--space-3)',
                            borderRadius: 'var(--radius-md)',
                            boxShadow: 'var(--shadow-1)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            border: '1px solid rgba(0,0,0,0.02)'
                        }}
                    >
                        <span style={{ fontFamily: 'var(--font-bengali)', fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>{stat.top}</span>
                        <span style={{ fontFamily: 'var(--font-bengali)', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{stat.bot}</span>
                    </motion.div>
                ))}
            </div>

        </section>
    );
};

export default Section04_DistanceStory;
