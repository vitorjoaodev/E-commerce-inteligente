import React from 'react';
import { motion } from 'framer-motion';

const FlightPathSvg: React.FC = () => {
  return (
    <svg className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl" viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg">
      <path 
        className="flight-path" 
        d="M50,50 C200,20 400,80 600,40 C800,0 950,50 950,50" 
        stroke="#DAA520" 
        strokeWidth="2" 
        fill="none" 
        strokeDasharray="5,5" 
      />
      <circle cx="50" cy="50" r="6" fill="#DAA520" />
      <path d="M950,50 l-10,-5 l0,10 z" fill="#DAA520" />
      
      <motion.g 
        className="plane" 
        initial={{ x: 0, y: 0 }}
        animate={{ 
          x: [0, 900],
          y: [0, -30, 0, -20, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <path 
          d="M50,50 l-14,-4 l0,8 z" 
          fill="#F5F5F5" 
          transform="rotate(0)"
        />
      </motion.g>
    </svg>
  );
};

export default FlightPathSvg;
