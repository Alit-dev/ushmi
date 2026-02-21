import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const messages = [
    { id: 1, sender: 'alamin', text: "কেমন আছেন মেম?", delay: 800, type: 'sent' },
    { id: 2, sender: 'ushmi', text: "আলহামদুলিল্লাহ", delay: 1600, type: 'received' },
    { id: 3, sender: 'ushmi', text: "আপনি?", delay: 2000, type: 'received' },
    { id: 4, sender: 'alamin', text: "আপনাকে বাদে ভালো থাকি মেম?", delay: 3000, type: 'sent', special: true },
    { id: 5, sender: 'ushmi', text: "থাকেন থাকেন", delay: 3600, type: 'received' },
    { id: 6, sender: 'ushmi', text: "জানি তো", delay: 3900, type: 'received' },
    { id: 7, sender: 'alamin', text: "ভুলে যান...", delay: 5100, type: 'sent', sad: true },
];

const TypingIndicator = () => (
    <div style={{ display: 'flex', gap: '4px', padding: '8px 4px' }}>
        {[0, 1, 2].map((i) => (
            <motion.div
                key={i}
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-text-tertiary)', borderRadius: '50%' }}
            />
        ))}
    </div>
);

const Section05_Conversation = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [visibleMsgs, setVisibleMsgs] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (isInView) {
            let timeoutIds = [];

            messages.forEach((msg, index) => {
                // Show typing indicator before message
                const typingDelay = Math.max(0, msg.delay - 600);

                timeoutIds.push(setTimeout(() => {
                    setIsTyping(msg.type); // Which side is typing
                }, typingDelay));

                timeoutIds.push(setTimeout(() => {
                    setIsTyping(false);
                    setVisibleMsgs(prev => [...prev, msg.id]);
                }, msg.delay));
            });

            return () => timeoutIds.forEach(clearTimeout);
        }
    }, [isInView]);

    return (
        <section
            ref={ref}
            style={{
                minHeight: '100vh',
                width: '100%',
                padding: 'var(--space-24) 0',
                backgroundColor: 'var(--color-white)',
                position: 'relative'
            }}
        >
            {/* Background Watermark Pattern (subtle circles) */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05, backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(circle, var(--color-rose) 1px, transparent 1px)', zIndex: 0 }} />

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
                >
                    <h3 style={{ fontFamily: 'var(--font-bengali-serif)', fontSize: '24px', color: 'var(--color-text-primary)' }}>আমাদের কথোপকথন</h3>
                    <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>যেভাবে আমরা কথা বলি...</p>
                </motion.div>

                <div style={{ width: '100%', maxWidth: '380px', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {messages.map((msg) => {
                        const isVisible = visibleMsgs.includes(msg.id);
                        const isSent = msg.type === 'sent';

                        return isVisible ? (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, x: isSent ? 20 : -20, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    alignSelf: isSent ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: isSent ? 'flex-end' : 'flex-start'
                                }}
                            >
                                <div style={{
                                    padding: '12px 16px',
                                    backgroundColor: isSent ? (msg.sad ? '#FAF0F2' : '#F5E6E8') : '#F5F5F5',
                                    borderRadius: isSent ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                    color: isSent && msg.sad ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
                                    fontFamily: 'var(--font-bengali)',
                                    fontSize: '15px',
                                    boxShadow: msg.special ? '0 0 15px rgba(232, 180, 184, 0.4)' : 'none',
                                    border: msg.special ? '1px solid rgba(232, 180, 184, 0.6)' : 'none',
                                    transition: 'box-shadow 0.3s ease'
                                }}>
                                    {msg.text}
                                </div>
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--color-text-tertiary)', marginTop: '4px', letterSpacing: '0.05em' }}>
                                    {isSent ? 'Alamin' : 'Ushmi'}
                                </span>
                            </motion.div>
                        ) : null;
                    })}

                    {/* Typing indicator at the bottom if currently active */}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{
                                alignSelf: isTyping === 'sent' ? 'flex-end' : 'flex-start',
                                backgroundColor: '#F5F5F5',
                                padding: '8px 16px',
                                borderRadius: '18px',
                                maxWidth: '80%'
                            }}
                        >
                            <TypingIndicator />
                        </motion.div>
                    )}

                </div>

                {visibleMsgs.includes(7) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        style={{ marginTop: 'var(--space-8)', textAlign: 'center' }}
                    >
                        <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '24px', color: 'var(--color-rose)' }}>
                            এভাবেই চলে আমাদের...
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Section05_Conversation;
