
import { Link } from 'react-router-dom';
import FlightPathSvg from './FlightPathSvg';

const HeroSection: React.FC = () => {
  return (
    <section 
      className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden"
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/1988923065/photo/the-cockpit-of-1950s-constellation-aircraft-is-now-part-of-the-cocktail-lounge-the-connie.jpg?s=612x612&w=0&k=20&c=Z8YcbZPmyHHoxXy_ORA_cyLlUJt6dD2YHt-n5Dij2Y0=')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 z-10"></div>
      
      <div className="container mx-auto relative z-20 text-center">
        <h1 className="font-adventure text-5xl md:text-7xl mb-6 leading-tight">
          Navegue nas <span className="text-primary">Alturas</span> com <br className="hidden md:block" />
          Estilo de <span className="text-primary">Aventureiro</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
          Moda inspirada na aviação para os exploradores modernos que não conhecem fronteiras.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/categoria/camisetas" 
            className="bg-[#8B4513] hover:bg-primary text-foreground hover:text-background py-3 px-8 rounded font-adventure uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Explorar Coleção
          </Link>
          
          <Link 
            to="/about" 
            className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-background py-3 px-8 rounded font-adventure uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Nossa História
          </Link>
        </div>
      </div>
      
      <FlightPathSvg />
    </section>
  );
};

export default HeroSection;
