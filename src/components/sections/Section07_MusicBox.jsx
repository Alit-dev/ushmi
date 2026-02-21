import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTouchRotation } from '../../hooks/useTouchRotation';
import { Heart, Music, Play, RotateCcw, RotateCw } from 'lucide-react';
import birthdaySong from '../../assets/audio/Midnight Birthday Call (1).mp3';

const Section07_MusicBox = () => {
    const { elementRef, rotation, progress, isDragging } = useTouchRotation(5); // 5 rotations to 100%
    const [isPlaying, setIsPlaying] = useState(false);
    const heartControls = useAnimation();
    const audioRef = useRef(null);

    // Lid opening angle (0 to 110 degrees)
    const lidRotation = progress * 110;
    const isOpen = progress > 0.05;

    useEffect(() => {
        if (isDragging) {
            setIsPlaying(true);
            heartControls.start({
                scale: [1, 1.1, 1],
                boxShadow: ["0 0 0px var(--color-rose)", "0 0 20px var(--color-rose)", "0 0 0px var(--color-rose)"],
                transition: { duration: 0.8, repeat: Infinity }
            });
            if (audioRef.current) {
                audioRef.current.play().catch(e => console.log('Audio playback prevented:', e));
            }
        } else {
            setIsPlaying(false);
            heartControls.stop();
            heartControls.start({ scale: 1, boxShadow: "0 0 0px var(--color-rose)" });
            if (audioRef.current) {
                audioRef.current.pause();
            }
        }
    }, [isDragging, heartControls]);

    return (
        <section
            style={{
                minHeight: '120vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--color-cream)',
                padding: 'var(--space-12) var(--space-6)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    fontFamily: 'var(--font-bengali-serif)',
                    fontSize: '24px',
                    color: 'var(--color-text-primary)',
                    textAlign: 'center',
                    marginBottom: 'var(--space-20)',
                    fontWeight: 600
                }}
            >
                একটি বিশেষ বার্তা...
            </motion.p>

            {/* Music Box 3D Container */}
            <div style={{ position: 'relative', width: '280px', height: '240px', margin: '0 auto', perspective: '1200px' }}>

                {/* --- The Interior (Visible when lid opens) --- */}
                <div style={{
                    position: 'absolute',
                    bottom: '40px', // Base height
                    width: '100%',
                    height: '180px',
                    background: 'linear-gradient(180deg, #1A1A1A, #2A1F1D)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    zIndex: 1,
                    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)'
                }}>
                    {isOpen && (
                        <motion.div
                            animate={heartControls}
                            style={{
                                width: '60px',
                                height: '60px',
                                backgroundColor: '#222',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid var(--color-rose)',
                                marginTop: '20px'
                            }}
                        >
                            <Heart size={28} fill="var(--color-rose)" color="var(--color-rose)" />
                        </motion.div>
                    )}

                    {/* Floating Notes Interior */}
                    {isPlaying && (
                        <motion.div
                            animate={{ y: [-10, -80], opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                            style={{ position: 'absolute', bottom: '60px', left: '60%' }}
                        >
                            <Music size={16} color="var(--color-gold)" />
                        </motion.div>
                    )}
                </div>

                {/* --- The Base Exterior --- */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: '120px',
                    background: 'linear-gradient(135deg, #5D2E1B 0%, #3D1E11 100%)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.3), inset 0 2px 10px rgba(255,255,255,0.1), inset 0 -10px 30px rgba(0,0,0,0.5)',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingTop: '20px'
                }}>
                    {/* Decorative Plate */}
                    <div style={{
                        width: '120px',
                        height: '60px',
                        border: '1.5px solid rgba(212, 165, 116, 0.3)',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}>
                        <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-gold)', borderRadius: '50%', position: 'absolute', top: '4px', left: '4px', opacity: 0.6 }} />
                        <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-gold)', borderRadius: '50%', position: 'absolute', top: '4px', right: '4px', opacity: 0.6 }} />
                        <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-gold)', borderRadius: '50%', position: 'absolute', bottom: '4px', left: '4px', opacity: 0.6 }} />
                        <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-gold)', borderRadius: '50%', position: 'absolute', bottom: '4px', right: '4px', opacity: 0.6 }} />
                    </div>
                </div>

                {/* --- The Lid --- */}
                <motion.div
                    style={{
                        position: 'absolute',
                        bottom: '100px',
                        width: '100%',
                        height: '120px',
                        background: 'linear-gradient(135deg, #7A422F, #5D2E1B)',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'inset 0 4px 15px rgba(255,255,255,0.2)',
                        transformOrigin: 'bottom center',
                        rotateX: lidRotation,
                        zIndex: 3,
                        borderBottom: '4px solid rgba(0,0,0,0.3)'
                    }}
                >
                    {/* Lid Inner texture */}
                    <div style={{ position: 'absolute', width: '92%', height: '92%', top: '4%', left: '4%', border: '1px solid rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)' }} />
                </motion.div>

                {/* --- The Crank Handle (Centered on Front) --- */}
                <div
                    ref={elementRef}
                    style={{
                        position: 'absolute',
                        left: '50%',
                        bottom: '30px',
                        transform: 'translateX(-50%)',
                        width: '120px',
                        height: '120px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        cursor: 'grab',
                        touchAction: 'none',
                        overflow: 'visible'
                    }}
                >
                    {/* Touch visualizer */}
                    <motion.div
                        animate={isDragging ? { scale: 1.5, backgroundColor: 'rgba(212, 165, 116, 0.25)' } : { scale: 1, backgroundColor: 'transparent' }}
                        style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%' }}
                    />

                    {/* The physically rotating crank arm */}
                    <motion.div
                        style={{
                            rotate: rotation + 60, // User wants 60 starting phase
                            width: '8px',
                            height: '55px',
                            backgroundColor: '#8B4513',
                            transformOrigin: 'bottom center',
                            borderRadius: '4px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        {/* The knob you hold */}
                        <div style={{
                            position: 'absolute',
                            top: '-18px',
                            left: '-14px',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-gold)',
                            boxShadow: '0 6px 12px rgba(0,0,0,0.6), inset 0 2px 5px rgba(255,255,255,0.4)',
                            border: '2px solid #B8864A',
                            background: 'radial-gradient(circle at 35% 35%, #FFD700, #DAA520, #B8864B)',
                            zIndex: 11
                        }} />
                    </motion.div>

                    {/* Visual Hint */}
                    {!isDragging && progress < 1 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                            style={{
                                position: 'absolute',
                                top: '-40px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '4px',
                                color: 'var(--color-rose)',
                                pointerEvents: 'none'
                            }}
                        >
                            <RotateCw size={24} />
                            <span style={{
                                fontFamily: 'var(--font-bengali)',
                                fontSize: '13px',
                                fontWeight: 700,
                                whiteSpace: 'nowrap',
                                backgroundColor: 'var(--color-white)',
                                padding: '4px 10px',
                                borderRadius: 'var(--radius-full)',
                                boxShadow: 'var(--shadow-1)',
                                color: 'var(--color-text-primary)'
                            }}>
                                হাতলটি ঘুরিয়ে উপহার খুলুন
                            </span>
                        </motion.div>
                    )}
                </div>

            </div>

            {/* Status & Instructions */}
            <div style={{ marginTop: 'var(--space-12)', width: '100%', maxWidth: '300px' }}>
                {/* Progress Bar */}
                <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 'var(--radius-full)', marginBottom: 'var(--space-6)', overflow: 'hidden' }}>
                    <motion.div
                        style={{ height: '100%', backgroundColor: 'var(--color-rose)', scaleX: progress, transformOrigin: 'left' }}
                    />
                </div>

                <div style={{ textAlign: 'center', height: '40px' }}>
                    {!isOpen ? (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontFamily: 'var(--font-bengali)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <RotateCcw size={16} /> উপহারটি খুলুন...
                        </motion.p>
                    ) : progress < 1 ? (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontFamily: 'var(--font-bengali)', color: 'var(--color-text-primary)', fontWeight: 600 }}>
                            {Math.floor(progress * 100)}% পূর্ণ হয়েছে
                        </motion.p>
                    ) : (
                        <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ fontFamily: 'var(--font-bengali-serif)', color: 'var(--color-rose)', fontWeight: 700, fontSize: '20px' }}>
                            শুভ জন্মদিন উসমি! 🎂
                        </motion.p>
                    )}
                </div>
            </div>

            {/* Audio Element */}
            <audio
                ref={audioRef}
                src={birthdaySong}
                preload="auto"
                loop
            />

        </section>

    );
};

export default Section07_MusicBox;
