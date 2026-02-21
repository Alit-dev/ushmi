import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, MessageCircle, Shield, Infinity as InfinityIcon, MapPin, RotateCcw } from 'lucide-react';

// --- Subcomponents for specific phases --- //

// Phase 1: Smoke Particles
const SmokeParticles = () => {
    return (
        <div style={{ position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)', width: '100px', height: '300px', pointerEvents: 'none' }}>
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0.6, scale: 0.2, y: 0, x: 0, rotate: 0 }}
                    animate={{
                        opacity: [0, 0.6, 0.3, 0],
                        scale: [0.2, 1, 2, 3],
                        y: -200 - Math.random() * 100,
                        x: Math.sin(i) * 30,
                        rotate: 360
                    }}
                    transition={{
                        duration: 2.5 + Math.random() * 1,
                        ease: "easeOut",
                        delay: Math.random() * 1.5,
                        repeat: 0
                    }}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        width: '15px',
                        height: '15px',
                        backgroundColor: '#CCCCCC',
                        borderRadius: '50%',
                        filter: 'blur(8px)'
                    }}
                />
            ))}
        </div>
    );
};

// Phase 6: Celebration Section
const CelebrationSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView) {
            triggerConfetti();
        }
    }, [isInView]);

    const triggerConfetti = () => {
        const duration = 6000;
        const end = Date.now() + duration;

        const colors = ['#E8B4B8', '#F5D5D8', '#D4929A', '#D4A574', '#E8C9A8', '#B8864A'];

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors,
                gravity: 0.5,
                ticks: 200
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors,
                gravity: 0.5,
                ticks: 200
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    return (
        <section ref={ref} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}
            >
                <motion.h2
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: [0, 1.1, 1] } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ fontFamily: 'var(--font-bengali-serif)', fontSize: '36px', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}
                >
                    Happy Birthday
                </motion.h2>

                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4, duration: 1 }}
                    style={{
                        fontFamily: 'var(--font-handwriting)',
                        fontSize: '52px',
                        background: 'linear-gradient(45deg, var(--color-rose), var(--color-gold))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 20px rgba(232, 180, 184, 0.4)'
                    }}
                >
                    Ushmi
                </motion.h1>

                <motion.div
                    initial={{ y: -50, opacity: 0, rotate: -180 }}
                    animate={isInView ? { y: 0, opacity: 1, rotate: 0 } : {}}
                    transition={{ type: "spring", bounce: 0.4, delay: 0.8 }}
                    style={{
                        width: '90px',
                        height: '90px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--color-rose), var(--color-gold))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 'var(--space-6) auto 0',
                        boxShadow: 'var(--shadow-3)',
                        color: 'white',
                        fontFamily: 'var(--font-bengali-serif)',
                        fontSize: '36px',
                        fontWeight: 'bold'
                    }}
                >
                    16
                </motion.div>
            </motion.div>

            {/* Floating Hearts Array */}
            {isInView && [...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: '100vh', opacity: 0, x: Math.random() * 200 - 100 }}
                    animate={{
                        y: '-20vh',
                        opacity: [0, 0.8, 0],
                        x: Math.random() * 200 - 100
                    }}
                    transition={{
                        duration: 4 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "linear"
                    }}
                    style={{ position: 'absolute', bottom: 0, zIndex: 1 }}
                >
                    <Heart size={16 + Math.random() * 16} color="var(--color-rose)" fill="var(--color-rose)" opacity={0.3 + Math.random() * 0.4} />
                </motion.div>
            ))}
        </section>
    );
};

// Section 4C and 4A components for cleaner scroll mapping
const FadeScrollText = ({ children, delay = 0, font = 'var(--font-bengali)' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.8 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay }}
            style={{ fontFamily: font }}
        >
            {children}
        </motion.div>
    );
};

// The main export component
const Section15_CelebrationFinale = ({ isActive }) => {
    const [phase, setPhase] = useState(0);
    // 0: Initial/Not active
    // 1: Darkness & Smoke (0-4s)
    // 2: The Wish Moment (4-10s)
    // 3: Transition & Scroll unlocking (10s+)

    useEffect(() => {
        if (isActive) {
            setPhase(1);

            // Move to Phase 2 (Light & Wish) after 3.5s
            const timer1 = setTimeout(() => setPhase(2), 3500);

            // Move to Phase 3 (Scroll Reveal) after 10s total
            const timer2 = setTimeout(() => setPhase(3), 10000);

            return () => { clearTimeout(timer1); clearTimeout(timer2); };
        }
    }, [isActive]);

    // Handle interactive reply button
    const handleReply = () => {
        window.open(`sms:?body=${encodeURIComponent("Thank you for this beautiful surprise! 💕")}`, '_blank');
    };

    const handleReplay = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!isActive) return null;

    return (
        <section style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: phase < 3 ? '100vh' : 'auto',
            minHeight: '100vh',
            bottom: phase < 3 ? 0 : 'auto', // Attach bottom to trap scroll
            zIndex: 50,
            overflowX: 'hidden',
            overflowY: phase < 3 ? 'hidden' : 'auto',
            backgroundColor: phase >= 2 ? '#FFFFFF' : '#0A0A0A',
            transition: 'background-color 3.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
            id="section15-container"
        >
            {/* --- PHASE 1 & 2 OVERLAYS --- */}
            <AnimatePresence>
                {phase < 3 && (
                    <motion.div
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: phase === 1 ? '#0A0A0A' : 'transparent',
                            transition: 'background-color 3.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            zIndex: 100,
                            pointerEvents: phase < 3 ? 'auto' : 'none'
                        }}
                    >
                        {phase === 1 && <SmokeParticles />}

                        <AnimatePresence>
                            {phase === 2 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 1.2 }}
                                    style={{ textAlign: 'center', pointerEvents: 'auto' }}
                                >
                                    <motion.div
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{ marginBottom: '16px' }}
                                    >
                                        <Sparkles size={24} color="#D4A574" style={{ margin: '0 auto' }} />
                                    </motion.div>

                                    <h2 style={{ fontFamily: 'var(--font-bengali-serif)', fontSize: '28px', color: '#1A1A1A', fontWeight: 600, letterSpacing: '2px', marginBottom: '16px' }}>
                                        Make a wish
                                    </h2>

                                    <h3 style={{ fontFamily: 'var(--font-bengali)', fontSize: '18px', color: '#666666', fontWeight: 500 }}>
                                        একটা ইচ্ছা মনে মনে বলো
                                    </h3>

                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        style={{ width: '40px', height: '2px', backgroundColor: 'var(--color-rose)', margin: '24px auto 0' }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Radial Sunrise Glow in Phase 2 */}
                        {phase === 2 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 3 }}
                                style={{
                                    position: 'absolute',
                                    top: '50%', left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '100vw', height: '100vh',
                                    background: 'radial-gradient(circle, rgba(253,248,245,0.8) 0%, rgba(255,255,255,0) 70%)',
                                    zIndex: -1
                                }}
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- PHASE 3+ SCROLLABLE CONTENT --- */}
            {phase >= 3 && (
                <div style={{ backgroundColor: '#FFFFFF', paddingBottom: '100px' }}>

                    {/* Floating ambient particles (Global for Phase 3+) */}
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                        {[...Array(10)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    y: ['0vh', '-10vh', '0vh'],
                                    x: Math.sin(i) * 20,
                                    opacity: [0.1, 0.3, 0.1]
                                }}
                                transition={{ duration: 8 + Math.random() * 5, repeat: Infinity, ease: "linear" }}
                                style={{
                                    position: 'absolute',
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    width: '3px', height: '3px',
                                    backgroundColor: 'var(--color-gold)',
                                    borderRadius: '50%'
                                }}
                            />
                        ))}
                    </div>

                    {/* Phase 4A: Opening Statement */}
                    <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                        <motion.h1
                            initial={{ opacity: 0, strokeDasharray: 100, strokeDashoffset: 100 }}
                            animate={{ opacity: 1, strokeDashoffset: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            style={{ fontFamily: 'var(--font-handwriting)', fontSize: '42px', color: 'var(--color-rose)', marginBottom: 'var(--space-8)' }}
                        >
                            Ushmi...
                        </motion.h1>

                        <div style={{ marginTop: 'var(--space-6)' }}>
                            <FadeScrollText delay={0.8} font="var(--font-body)">
                                <p style={{ fontSize: '20px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>তুমি জানো</p>
                            </FadeScrollText>
                            <FadeScrollText delay={1.4} font="var(--font-bengali-serif)">
                                <p style={{ fontSize: '24px', color: 'var(--color-text-primary)', fontWeight: 600 }}>তুমি আমার কাছে কতটা important?</p>
                            </FadeScrollText>
                        </div>

                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 2.2, duration: 0.5 }}
                            style={{ margin: 'var(--space-10) auto 0' }}
                        >
                            <Heart size={20} color="var(--color-rose)" />
                        </motion.div>
                    </section>

                    {/* Phase 4B: Distance Acknowledgment */}
                    <section style={{ minHeight: '80vh', backgroundColor: '#FDF8F5', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'var(--space-8) var(--space-6)', position: 'relative', zIndex: 1 }}>
                        <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
                            <FadeScrollText delay={0.2} font="var(--font-body)">
                                <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', lineHeight: 2.2, marginBottom: 'var(--space-4)' }}>
                                    ২৫০ কিলোমিটার দূরত্ব...<br />
                                    ঢাকা থেকে চট্টগ্রাম।<br />
                                    কখনো দেখা হয়নি আমাদের।
                                </p>
                            </FadeScrollText>

                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                whileInView={{ opacity: 1, width: '100%' }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.5 }}
                                style={{ display: 'flex', alignItems: 'center', margin: 'var(--space-8) 0', color: 'var(--color-text-tertiary)' }}
                            >
                                <MapPin size={16} />
                                <div style={{ flex: 1, height: '1px', borderTop: '1px border var(--color-text-tertiary)', margin: '0 8px', borderStyle: 'dotted' }} />
                                <MapPin size={16} />
                            </motion.div>

                            <FadeScrollText delay={0.4} font="var(--font-bengali-serif)">
                                <p style={{ fontSize: '20px', color: 'var(--color-text-primary)', lineHeight: 2, fontWeight: 500 }}>
                                    কিন্তু তুমি কি জানো...<br />
                                    দূরত্ব আসলে কিছু না<br />
                                    যখন মন কাছে থাকে?
                                </p>
                            </FadeScrollText>
                        </div>
                    </section>

                    {/* Phase 4C: The Confession */}
                    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: 'var(--space-8) var(--space-6)', position: 'relative', zIndex: 1, background: 'radial-gradient(circle at center, rgba(232, 180, 184, 0.1) 0%, rgba(255,255,255,0) 60%)' }}>
                        <FadeScrollText delay={0.2} font="var(--font-body)">
                            <p style={{ fontSize: '16px', color: 'var(--color-text-tertiary)', letterSpacing: '0.1em', marginBottom: 'var(--space-6)' }}>সত্যি কথা বলতে...</p>
                        </FadeScrollText>

                        <FadeScrollText delay={0.4} font="var(--font-bengali-serif)">
                            <h2 style={{ fontSize: '26px', color: 'var(--color-text-primary)', lineHeight: 1.6, fontWeight: 600, maxWidth: '300px', margin: '0 auto var(--space-12)' }}>
                                তুমি আমার জীবনের<br />সবচেয়ে কাছের মানুষদের একজন
                            </h2>
                        </FadeScrollText>

                        <div style={{ maxWidth: '320px', margin: '0 auto var(--space-12)' }}>
                            {["তোমার সাথে কথা বললে মন ভালো হয়ে যায়", "তোমার 'আলহামদুলিল্লাহ' শুনলে হাসি পায়", "তুমি রাগ করলে খারাপ লাগে", "আবার তুমি মান ভাঙালে সব ঠিক হয়ে যায়"].map((text, i) => (
                                <FadeScrollText key={i} delay={0.6 + (i * 0.4)} font="var(--font-body)">
                                    <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', lineHeight: 2.4 }}>{text}</p>
                                </FadeScrollText>
                            ))}
                        </div>

                        <FadeScrollText delay={2.5} font="var(--font-handwriting)">
                            <p style={{ fontSize: '24px', color: 'var(--color-rose)', fontWeight: 600 }}>এটাই তো ভালোবাসা, তাই না?</p>
                        </FadeScrollText>
                    </section>

                    {/* Phase 5: The Promise Section */}
                    <section style={{ minHeight: '150vh', backgroundColor: '#FFFFFF', padding: 'var(--space-16) var(--space-6)', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                        <div style={{ width: '100%', maxWidth: '400px' }}>
                            <FadeScrollText delay={0.2} font="var(--font-bengali-serif)">
                                <h2 style={{ fontSize: '24px', color: 'var(--color-text-primary)', fontWeight: 600, textAlign: 'center', marginBottom: 'var(--space-10)' }}>
                                    তোমাকে কিছু কথা দিচ্ছি
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '60px' }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                        style={{ height: '2px', backgroundColor: 'var(--color-rose)', margin: '8px auto 0' }}
                                    />
                                </h2>
                            </FadeScrollText>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                                {[
                                    { icon: Heart, title: "সবসময় তোমার পাশে থাকবো", sub: "যখনই দরকার হবে" },
                                    { icon: MessageCircle, title: "তোমার কথা মন দিয়ে শুনবো", sub: "সব সময়" },
                                    { icon: Shield, title: "তোমাকে কখনো কষ্ট দেবো না", sub: "জেনেশুনে তো নয়ই" },
                                    { icon: InfinityIcon, title: "এই বন্ধুত্ব সারাজীবন", sub: "দূরত্ব যতই হোক" },
                                    { icon: MapPin, title: "একদিন অবশ্যই দেখা হবে", sub: "ইনশাআল্লাহ" }
                                ].map((promise, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.6, delay: i * 0.2 }}
                                        style={{
                                            padding: 'var(--space-6)',
                                            backgroundColor: '#FFFFFF',
                                            border: '1px solid rgba(232, 180, 184, 0.2)',
                                            borderRadius: '16px',
                                            boxShadow: 'var(--shadow-2)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 'var(--space-4)'
                                        }}
                                    >
                                        <div style={{ backgroundColor: '#FDF8F5', padding: '12px', borderRadius: '50%' }}>
                                            <promise.icon size={24} color="var(--color-rose)" />
                                        </div>
                                        <div>
                                            <h4 style={{ fontFamily: 'var(--font-bengali-serif)', fontSize: '16px', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '4px' }}>{promise.title}</h4>
                                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>{promise.sub}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                style={{ textAlign: 'center', marginTop: 'var(--space-16)' }}
                            >
                                <Heart size={40} color="var(--color-gold)" style={{ margin: '0 auto var(--space-4)' }} />
                                <h3 style={{ fontFamily: 'var(--font-handwriting)', fontSize: '32px', color: 'var(--color-text-primary)' }}>পাকা কথা</h3>
                            </motion.div>
                        </div>
                    </section>

                    {/* Phase 6: Celebration Burst */}
                    <CelebrationSection />

                    {/* Phase 7: Peaceful Ending */}
                    <section style={{ minHeight: '150vh', backgroundColor: '#FDF8F5', display: 'flex', flexDirection: 'column', paddingTop: '10vh', paddingBottom: 'var(--space-10)', alignItems: 'center', position: 'relative', zIndex: 1 }}>

                        <div style={{ display: 'flex', gap: '8px', marginBottom: '20vh' }}>
                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--color-rose)' }} />
                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--color-rose)' }} />
                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }} style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--color-rose)' }} />
                        </div>

                        <div style={{ textAlign: 'center', maxWidth: '320px', margin: '0 auto', flex: 1 }}>
                            <FadeScrollText delay={0} font="var(--font-body)">
                                <p style={{ fontSize: '14px', color: 'var(--color-text-tertiary)', letterSpacing: '0.15em', marginBottom: 'var(--space-10)' }}>শেষ কথা...</p>
                            </FadeScrollText>

                            <FadeScrollText delay={0.5} font="var(--font-body)">
                                <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', lineHeight: 2.2, marginBottom: 'var(--space-8)' }}>
                                    আজকের এই দিনে<br />
                                    শুধু এটুকুই বলতে চাই—
                                </p>
                            </FadeScrollText>

                            <FadeScrollText delay={1.0} font="var(--font-bengali-serif)">
                                <p style={{ fontSize: '20px', color: 'var(--color-text-primary)', lineHeight: 2.2, fontWeight: 500, marginBottom: 'var(--space-8)' }}>
                                    তুমি অনেক special<br />
                                    তুমি অনেক গুরুত্বপূর্ণ<br />
                                    তুমি আমার কাছে অনেক মানে রাখো
                                </p>
                            </FadeScrollText>

                            <FadeScrollText delay={1.5} font="var(--font-bengali-serif)">
                                <h3 style={{ fontSize: '22px', color: 'var(--color-rose)', fontWeight: 600, marginBottom: 'var(--space-8)' }}>Happy Sweet Sixteen</h3>
                            </FadeScrollText>

                            <FadeScrollText delay={2.0} font="var(--font-body)">
                                <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', lineHeight: 2.2, marginBottom: 'var(--space-8)' }}>
                                    এই বয়সটা উপভোগ করো<br />
                                    হাসিখুশি থাকো<br />
                                    স্বপ্ন দেখো, স্বপ্ন পূরণ করো
                                </p>
                            </FadeScrollText>

                            <FadeScrollText delay={2.5} font="var(--font-handwriting)">
                                <p style={{ fontSize: '24px', color: 'var(--color-text-primary)', marginBottom: '15vh' }}>
                                    আর মাঝে মাঝে...<br />
                                    আমাকে একটু মনে রেখো
                                </p>
                            </FadeScrollText>

                            {/* Signature */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, amount: 0.8 }}
                                transition={{ duration: 1 }}
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', marginBottom: '15vh' }}
                            >
                                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                                    <Heart size={24} color="var(--color-rose)" fill="var(--color-rose)" />
                                </motion.div>
                                <h2 style={{ fontFamily: 'var(--font-handwriting)', fontSize: '28px', color: 'var(--color-text-primary)' }}>— আলামিন</h2>
                                <p style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>২২শে ফেব্রুয়ারি, ২০২৬</p>
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>ঢাকা থেকে, ভালোবাসায়</p>
                            </motion.div>
                        </div>

                        {/* Interactive Buttons */}
                        <div style={{ width: '100%', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center', paddingBottom: 'var(--space-12)' }}>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={handleReply}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    backgroundColor: 'var(--color-rose)', color: 'white',
                                    border: 'none', borderRadius: '24px',
                                    padding: '12px 24px', fontFamily: 'var(--font-body)', fontSize: '16px',
                                    boxShadow: 'var(--shadow-2)', cursor: 'pointer'
                                }}
                            >
                                <MessageCircle size={20} /> Reply করো
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={handleReplay}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    backgroundColor: 'transparent', color: 'var(--color-text-secondary)',
                                    border: '1px solid var(--color-text-tertiary)', borderRadius: '24px',
                                    padding: '10px 20px', fontFamily: 'var(--font-body)', fontSize: '14px',
                                    marginTop: '8px', cursor: 'pointer'
                                }}
                            >
                                <RotateCcw size={16} /> আবার শুরু থেকে দেখতে
                            </motion.button>
                        </div>
                    </section>
                </div>
            )}
        </section>
    );
};

export default Section15_CelebrationFinale;
