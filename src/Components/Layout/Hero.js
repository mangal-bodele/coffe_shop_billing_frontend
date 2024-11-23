import React from 'react';
import coffeeHero from '../assets/hero.png'; // Adjust path if necessary

const Hero = () => {
  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${coffeeHero})`,
      }}
    >
    </div>
  );
};

// Default export
export default Hero;
