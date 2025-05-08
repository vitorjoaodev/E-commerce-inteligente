import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '@/lib/queryClient';
import HeroSection from '../components/HeroSection';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import TestimonialCard from '../components/TestimonialCard';
import { Plane, MessageSquare } from 'lucide-react';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiRequest('GET', '/api/products/featured', undefined);
        const data = await response.json();
        setFeaturedProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  const categories = [
    {
      id: 1,
      title: 'Camisetas Piloto',
      slug: 'camisetas',
      image: '/Design sem nome (84).png',
    },
    {
      id: 2,
      title: 'Relógios de Aviador',
      slug: 'relogios',
      image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      title: 'Acessórios de Voo',
      slug: 'acessorios',
      image: 'https://images.unsplash.com/photo-1547458095-a045e1845d70?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];
  
  const testimonials = [
    {
      id: 1,
      text: 'A qualidade das camisetas é excepcional, e o design exclusivo sempre chama atenção. O têxtil realmente lembra os uniformes dos primeiros pilotos de avião!',
      name: 'Pedro Santos',
      role: 'Piloto Comercial',
      image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=800&auto=format&fit=crop',
    },
    {
      id: 2,
      text: 'Meu relógio da Piloto Inteligente me acompanha em todas as minhas aventuras. Resistente, preciso e com um design que conta histórias por si só.',
      name: 'Mariana Costa',
      role: 'Aventureira',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop',
    },
    {
      id: 3,
      text: 'Não é apenas moda, é uma coleção que te transporta para um espírito de descoberta. As polos são minhas favoritas para qualquer ocasião.',
      name: 'Rafael Mendes',
      role: 'Fotógrafo de Viagens',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=800&auto=format&fit=crop',
    },
  ];
  
  return (
    <main>
      <HeroSection />
      
      {/* Featured Categories */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-adventure text-4xl mb-4">Coordenadas de Destino</h2>
            <div className="adventure-divider max-w-xs mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map(category => (
              <CategoryCard 
                key={category.id}
                image={category.image}
                title={category.title}
                slug={category.slug}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-adventure text-4xl mb-4">Expedição em Destaque</h2>
            <div className="adventure-divider max-w-xs mx-auto"></div>
            <p className="mt-4 max-w-3xl mx-auto">
              Descubra nossa coleção selecionada de tesouros para aviadores aventureiros.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="bg-[#1A1A1A] rounded-lg h-[420px] animate-pulse"></div>
              ))
            ) : (
              featuredProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              to="/categoria/todos" 
              className="inline-block bg-[#8B4513] hover:bg-primary text-foreground hover:text-background py-3 px-8 rounded font-adventure uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Explorar Toda a Coleção
            </Link>
          </div>
        </div>
      </section>
      
      {/* Adventure Banner */}
      <section className="relative py-24 overflow-hidden leather-texture">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-adventure text-4xl mb-6">A Aventura Está No Ar</h2>
            <p className="text-lg mb-8">
              Descubra a nova coleção inspirada nos pioneiros da aviação que desbravaram territórios 
              inexplorados com a mesma coragem dos grandes aventureiros.
            </p>
            <a 
              href="#" 
              className="inline-block bg-primary text-background hover:bg-foreground hover:text-background py-3 px-8 rounded font-adventure uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <Plane size={16} className="inline mr-2" />
              Assista O Filme Da Campanha
            </a>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-adventure text-4xl mb-4">Relatos de Expedição</h2>
            <div className="adventure-divider max-w-xs mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <TestimonialCard 
                key={testimonial.id}
                text={testimonial.text}
                name={testimonial.name}
                role={testimonial.role}
                image={testimonial.image}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-12 bg-[#8B4513]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="font-adventure text-3xl text-foreground mb-2">Junte-se à Expedição</h3>
              <p className="text-foreground/80">
                Receba novas rotas, ofertas exclusivas e histórias de aventura.
              </p>
            </div>
            
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  className="px-4 py-3 rounded bg-[#222] border border-primary/50 text-foreground focus:outline-none focus:border-primary w-full sm:w-80"
                />
                <button 
                  type="submit" 
                  className="bg-primary text-[#8B4513] hover:bg-foreground py-3 px-6 rounded font-adventure uppercase tracking-wider transition-colors"
                >
                  <MessageSquare size={16} className="inline mr-2" />
                  Embarcar
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
