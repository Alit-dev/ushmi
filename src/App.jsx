import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Preloader from './components/sections/Section01_Preloader'
import Section02_Hero from './components/sections/Section02_Hero'
import Section03_AgeReveal from './components/sections/Section03_AgeReveal'
import Section04_DistanceStory from './components/sections/Section04_DistanceStory'
import Section05_Conversation from './components/sections/Section05_Conversation'
import Section06_Transition from './components/sections/Section06_Transition'
import Section07_MusicBox from './components/sections/Section07_MusicBox'
import Section08_PostVoice from './components/sections/Section08_PostVoice'
import Section09_Timeline from './components/sections/Section09_Timeline'
import Section10_WishesWall from './components/sections/Section10_WishesWall'
import Section11_AbstractConnection from './components/sections/Section11_AbstractConnection'
import Section11b_PhotoMemories from './components/sections/Section11b_PhotoMemories'
import Section12_FutureHopes from './components/sections/Section12_FutureHopes'
import Section13_FinalMessage from './components/sections/Section13_FinalMessage'
import Section14_CandleBlow from './components/sections/Section14_CandleBlow'
import Section15_CelebrationFinale from './components/sections/Section15_CelebrationFinale'
import CountdownTimer from './components/sections/CountdownTimer'
import config from './config/config.json'

function App() {
  const [loading, setLoading] = useState(true);
  const [candleBlown, setCandleBlown] = useState(false);

  // Calculate if we need to lock the site initially
  const [isLocked, setIsLocked] = useState(() => {
    // If lock is false in config, unlock immediately
    if (config.lock === false) return false;

    // Otherwise check target date with BD timezone offset (GMT+6)
    const target = new Date(`${config.targetDate} +06:00`).getTime();
    return new Date().getTime() < target;
  });

  return (
    <main style={{ backgroundColor: 'var(--color-white)', minHeight: '100vh', width: '100%' }}>
      <AnimatePresence>
        {isLocked && (
          <motion.div
            key="timer"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5 }}
            style={{ position: 'relative', zIndex: 100 }}
          >
            <CountdownTimer onUnlock={() => setIsLocked(false)} />
          </motion.div>
        )}

        {loading && !isLocked && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && !isLocked && (
        <>
          <Section02_Hero />
          <Section03_AgeReveal />
          <Section04_DistanceStory />
          <Section05_Conversation />
          <Section06_Transition />
          <Section07_MusicBox />
          <Section08_PostVoice />
          <Section09_Timeline />
          <Section10_WishesWall />
          <Section11_AbstractConnection />
          <Section11b_PhotoMemories />
          <Section12_FutureHopes />
          <Section13_FinalMessage />
          <Section14_CandleBlow onBlown={() => setCandleBlown(true)} />
          <Section15_CelebrationFinale isActive={candleBlown} />
        </>
      )}
    </main>
  )
}

export default App
