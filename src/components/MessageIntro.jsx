import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';

const MessageIntro = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.4 });

    return (
        <section
            ref={ref}
            style={{
                minHeight: '100vh',
                width: '100%',
                padding: 'var(--space-xxxl) var(--space-md)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--color-primary-bg)'
            }}
        >
            <motion.h3
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="font-bengali"
                style={{
                    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-xl)'
                }}
            >
                আমাদের কথা...
            </motion.h3>

            <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                    width: '60px',
                    height: '2px',
                    backgroundColor: 'var(--color-accent-secondary)',
                    margin: '0 auto var(--space-xxl)',
                    transformOrigin: 'center'
                }}
            />

            <div style={{ width: '100%', maxWidth: '400px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xxl)', position: 'relative' }}>
                {/* Connection Line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1.5, delay: 1 }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50px',
                        right: '50px',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)',
                        transformOrigin: 'left',
                        zIndex: 0
                    }}
                />

                {/* Dhaka Node */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, background: 'var(--color-primary-bg)', padding: '0 10px' }}
                >
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-secondary-bg)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-sm)',
                        boxShadow: '0 4px 12px var(--color-shadow)'
                    }}>
                        <MapPin size={20} color="var(--color-accent-secondary)" />
                    </div>
                    <span className="font-bengali" style={{ color: 'var(--color-text-secondary)' }}>ঢাকা</span>
                </motion.div>

                {/* Chittagong Node */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 2.3 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, background: 'var(--color-primary-bg)', padding: '0 10px' }}
                >
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-secondary-bg)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-sm)',
                        boxShadow: '0 4px 12px var(--color-shadow)'
                    }}>
                        <MapPin size={20} color="var(--color-accent)" />
                    </div>
                    <span className="font-bengali" style={{ color: 'var(--color-text-secondary)' }}>চট্টগ্রাম</span>
                </motion.div>
            </div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 3 }}
                className="font-bengali"
                style={{
                    fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                    color: 'var(--color-text-primary)',
                    textAlign: 'center',
                    lineHeight: 1.6,
                    maxWidth: '600px'
                }}
            >
                দেখা হয়নি কখনো, তবুও...
            </motion.p>
        </section>
    );
};

export default MessageIntro;
