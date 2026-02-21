import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Star, Sun } from 'lucide-react';

const hopesData = [
    {
        icon: Sun,
        title: "উজ্জ্বল ভবিষ্যৎ",
        desc: "তোমার আগামী দিনগুলো যেন সূর্যের মতো উজ্জ্বল হয়।"
    },
    {
        icon: Star,
        title: "সাফল্য",
        desc: "জীবনের প্রতিটা পদক্ষেপে তুমি সফল হও।"
    },
    {
        icon: Sparkles,
        title: "সুখ",
        desc: "হাসি আর আনন্দে ভরে থাকুক তোমার চারপাশ।"
    }
];

const HopeCard = ({ item, index, isInView }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + (index * 0.2) }}
            style={{
                backgroundColor: 'var(--color-white)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-2)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-4)',
                border: '1px solid rgba(212, 165, 116, 0.1)'
            }}
        >
            <div style={{
                backgroundColor: 'var(--color-cream)',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold)'
            }}>
                <item.icon size={24} />
            </div>
            <div>
                <h4 style={{ fontFamily: 'var(--font-bengali-serif)', fontSize: '20px', color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)' }}>{item.title}</h4>
                <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{item.desc}</p>
            </div>
        </motion.div>
    );
};

const Section12_FutureHopes = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section
            ref={ref}
            style={{
                minHeight: '100vh',
                width: '100%',
                backgroundColor: 'var(--color-off-white)',
                padding: 'var(--space-24) var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <motion.h3
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                style={{
                    fontFamily: 'var(--font-bengali-serif)',
                    fontSize: '28px',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-12)',
                    textAlign: 'center'
                }}
            >
                আগামীর প্রার্থনা
            </motion.h3>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                width: '100%',
                maxWidth: 'var(--content-max-width)'
            }}>
                {hopesData.map((item, index) => (
                    <HopeCard key={index} item={item} index={index} isInView={isInView} />
                ))}
            </div>
        </section>
    );
};

export default Section12_FutureHopes;
