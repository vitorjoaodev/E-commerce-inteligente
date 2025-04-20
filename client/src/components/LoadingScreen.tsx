import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-background z-50">
      <motion.div 
        className="w-64 mb-8"
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 400 100">
          <text x="10" y="70" className="font-adventure text-4xl fill-foreground">Piloto Inteligente</text>
          <circle cx="300" cy="40" r="20" className="fill-primary" />
          <path d="M300,30 L300,50" stroke="black" strokeWidth="2" />
          <path d="M290,40 L310,40" stroke="black" strokeWidth="2" />
        </svg>
      </motion.div>
      
      <div className="compass-loader mb-6"></div>
      
      <p className="font-adventure text-lg uppercase tracking-wider">
        Preparando para decolagem...
      </p>
    </div>
  );
};

export default LoadingScreen;
