import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import bgAudio from '../../assets/audio/Late Night Happy Birthday, Ushmi (1).mp3';

const CountdownTimer = ({ onUnlock }) => {
    // Target Date: February 22, 2026 00:00:00
    const targetDate = new Date("February 22, 2026 00:00:00").getTime();

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                onUnlock(); // Unlock the website!
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate, onUnlock]);

    const toggleAudio = () => {
        if (audioRef.current) {
            if (isAudioPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
            }
            setIsAudioPlaying(!isAudioPlaying);
        }
    };

    return (
        <section style={{
            minHeight: '100vh',
            width: '100%',
            backgroundColor: '#FDF8F5',
            background: 'radial-gradient(circle at top right, rgba(232, 180, 184, 0.15) 0%, rgba(253, 248, 245, 1) 60%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            color: 'var(--color-text-primary)'
        }}>
            {/* Ambient Floating Particles */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none' }}>
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            opacity: [0.2, 0.6, 0.2],
                            y: ['0vh', '-20vh'],
                            x: Math.sin(i) * 30
                        }}
                        transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
                        style={{
                            position: 'absolute',
                            bottom: `${-10 - Math.random() * 20}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 4 + 2}px`,
                            height: `${Math.random() * 4 + 2}px`,
                            backgroundColor: 'var(--color-rose)',
                            borderRadius: '50%',
                            filter: 'blur(2px)'
                        }}
                    />
                ))}
            </div>

            {/* Audio Toggle Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleAudio}
                style={{
                    position: 'absolute',
                    top: '32px',
                    right: '32px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(232, 180, 184, 0.3)',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-rose)',
                    boxShadow: 'var(--shadow-sm)',
                    cursor: 'pointer',
                    zIndex: 10
                }}
            >
                {isAudioPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
            </motion.button>

            {/* Content Container */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ textAlign: 'center', zIndex: 1, padding: '0 20px', width: '100%', maxWidth: '600px' }}
            >
                <div style={{
                    display: 'inline-block',
                    padding: '8px 24px',
                    backgroundColor: 'rgba(232, 180, 184, 0.1)',
                    borderRadius: '30px',
                    border: '1px solid rgba(232, 180, 184, 0.3)',
                    marginBottom: '24px'
                }}>
                    <h2 style={{
                        fontFamily: 'var(--font-bengali-serif)',
                        fontSize: '18px',
                        color: 'var(--color-rose)',
                        letterSpacing: '3px',
                        fontWeight: 600,
                        textTransform: 'uppercase'
                    }}>
                        অপেক্ষা...
                    </h2>
                </div>

                <h1 style={{
                    fontFamily: 'var(--font-handwriting)',
                    fontSize: '48px',
                    color: 'var(--color-text-primary)',
                    marginBottom: '64px',
                    lineHeight: 1.2
                }}>
                    A special moment <br /> is about to begin
                </h1>

                {/* Countdown Grid */}
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    {[
                        { label: 'Days', value: timeLeft.days },
                        { label: 'Hours', value: timeLeft.hours },
                        { label: 'Minutes', value: timeLeft.minutes },
                        { label: 'Seconds', value: timeLeft.seconds }
                    ].map((unit, idx) => (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{
                                width: '75px',
                                height: '85px',
                                background: 'white',
                                border: '1px solid rgba(232, 180, 184, 0.2)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '36px',
                                fontFamily: 'var(--font-display)',
                                fontWeight: 300,
                                color: 'var(--color-rose)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                                marginBottom: '16px'
                            }}>
                                {unit.value.toString().padStart(2, '0')}
                            </div>
                            <span style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '11px',
                                color: 'var(--color-text-tertiary)',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                fontWeight: 600
                            }}>
                                {unit.label}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Audio Element */}
            <audio
                ref={audioRef}
                src={bgAudio}
                preload="auto"
                loop
            />
        </section>
    );
};

export default CountdownTimer;
