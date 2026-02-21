import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTouchRotation } from '../hooks/useTouchRotation';
import { Music, AlertCircle } from 'lucide-react';

const MusicBox = () => {
    // We'll target 5 full rotations to complete the "audio" playback for demo purposes
    const { elementRef, rotation, progress, isDragging } = useTouchRotation(5);

    // Dummy audio integration (since we don't have the real mp3)
    // In a real scenario, we'd map `progress` to `audio.currentTime = progress * audio.duration`

    const lidRotation = progress * 60; // Lid opens up to 60 degrees

    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-primary-bg)',
            padding: 'var(--space-md)',
            position: 'relative',
            overflow: 'hidden'
        }}>

            {/* Background Decor */}
            <div style={{ position: 'absolute', opacity: 0.05, top: '10%' }}>
                <Music size={200} />
            </div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                    color: 'var(--color-text-primary)',
                    textAlign: 'center',
                    marginBottom: 'var(--space-xxxl)'
                }}
            >
                A special message for you...
            </motion.p>

            {/* Music Box Container */}
            <div style={{ position: 'relative', width: '250px', height: '200px', margin: '0 auto', perspective: '1000px' }}>

                {/* The Box Base */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: '100px',
                    background: 'linear-gradient(135deg, #A0522D, #8B4513)',
                    borderRadius: '8px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 5px 15px rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2
                }}>
                    {/* Decorative Keyhole */}
                    <div style={{ width: '10px', height: '15px', backgroundColor: '#333', borderRadius: '5px 5px 2px 2px' }} />
                </div>

                {/* The Box Lid */}
                <motion.div
                    style={{
                        position: 'absolute',
                        bottom: '100px',
                        width: '100%',
                        height: '80px',
                        background: 'linear-gradient(135deg, #D2691E, #A0522D)',
                        borderRadius: '8px 8px 0 0',
                        boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.3)',
                        transformOrigin: 'bottom center',
                        rotateX: lidRotation,
                        zIndex: 3
                    }}
                />

                {/* Inside Elements (appear when lid opens) */}
                <motion.div style={{
                    position: 'absolute',
                    bottom: '100px',
                    left: '50%',
                    marginLeft: '-15px',
                    opacity: progress > 0.1 ? progress : 0,
                    y: -20 * progress,
                    zIndex: 1
                }}>
                    <span style={{ fontSize: '30px' }}>🩰</span>
                </motion.div>

                {/* Particle emissions when cranking */}
                {isDragging && (
                    <motion.div
                        style={{ position: 'absolute', top: '50px', left: '50%', zIndex: 0 }}
                        animate={{ y: [-10, -50], opacity: [1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        <Music size={16} color="var(--color-accent)" />
                    </motion.div>
                )}

                {/* The Crank Handle (Right side) */}
                <div
                    ref={elementRef}
                    style={{
                        position: 'absolute',
                        right: '-40px',
                        bottom: '40px',
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        cursor: 'grab'
                    }}
                >
                    {/* Touch Area Indicator - optional, visually helpful */}
                    <motion.div
                        animate={isDragging ? { scale: 1.1, backgroundColor: 'rgba(212, 165, 116, 0.2)' } : { scale: 1, backgroundColor: 'transparent' }}
                        style={{ position: 'absolute', width: '150%', height: '150%', borderRadius: '50%' }}
                    />
                    {/* Visual Crank */}
                    <motion.div
                        style={{
                            rotate: rotation,
                            width: '4px',
                            height: '40px',
                            backgroundColor: '#B8860B', // Gold
                            transformOrigin: 'bottom center',
                            borderRadius: '2px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
                        }}
                    >
                        <div style={{ position: 'absolute', top: '-10px', left: '-6px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#DAA520', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }} />
                    </motion.div>
                </div>

            </div>

            <div style={{ marginTop: 'var(--space-xxxl)', textAlign: 'center', height: '60px' }}>
                {progress === 0 && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bengali" style={{ color: 'var(--color-text-secondary)' }}>
                        হাতলটা ঘুরাও 🎵
                    </motion.p>
                )}
                {progress > 0 && progress < 1 && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bengali" style={{ color: 'var(--color-text-secondary)' }}>
                        ঘোরাতে থাকো... ({Math.floor(progress * 100)}%)
                    </motion.p>
                )}
                {progress >= 1 && (
                    <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ fontSize: '2rem' }}>
                        ❤️
                    </motion.p>
                )}
            </div>

            <div style={{
                marginTop: 'var(--space-md)',
                padding: 'var(--space-sm) var(--space-md)',
                backgroundColor: 'var(--color-secondary-bg)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-text-secondary)',
                fontSize: '0.9rem'
            }}>
                <AlertCircle size={16} />
                <span>Try dragging the handle in a circular motion</span>
            </div>
        </section>
    );
};

export default MusicBox;
