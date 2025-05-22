import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import Navbar from './Compnents/Navbar';
import Footer from './Compnents/Footer';
import MainContent from './Compnents/MainContent';
import HowItWorks from './Compnents/HowItWorks';

const App = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.08,
      multiplier: 1,
    });
    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  return (
    <div ref={scrollRef} data-scroll-container style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #eaffea 0%, #f6fff6 100%)' }}>
      <Navbar />
      <MainContent />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default App;