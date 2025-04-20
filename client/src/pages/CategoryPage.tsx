import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiRequest } from '@/lib/queryClient';
import ProductCard from '../components/ProductCard';
import { Filter, Sliders, ArrowDownUp } from 'lucide-react';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiRequest('GET', `/api/products/category/${categoryName}`, undefined);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [categoryName]);
  
  useEffect(() => {
    // Filter and sort products
    let result = [...products];
    
    // Apply price filter
    if (selectedPrice.length > 0) {
      result = result.filter(product => {
        for (const range of selectedPrice) {
          const [min, max] = range.split('-').map(Number);
          if (product.price >= min && (max === 0 || product.price <= max)) {
            return true;
          }
        }
        return false;
      });
    }
    
    // Apply sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        // 'featured' - use the default order
        break;
    }
    
    setFilteredProducts(result);
  }, [products, selectedPrice, sortBy]);
  
  const togglePriceFilter = (range: string) => {
    setSelectedPrice(prev => 
      prev.includes(range) 
        ? prev.filter(item => item !== range) 
        : [...prev, range]
    );
  };
  
  const getCategoryTitle = () => {
    switch (categoryName) {
      case 'camisetas': return 'Camisetas Piloto';
      case 'relogios': return 'Relógios de Aviador';
      case 'polos': return 'Polos Exclusivas';
      case 'shorts': return 'Shorts Aviator';
      case 'acessorios': return 'Acessórios de Voo';
      default: return 'Todos os Produtos';
    }
  };
  
  const getCategoryImage = () => {
    switch (categoryName) {
      case 'camisetas': 
        return 'https://images.unsplash.com/photo-1555009393-f20bdb245c4d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      case 'relogios': 
        return 'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      case 'polos': 
        return 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&auto=format&fit=crop';
      case 'shorts': 
        return 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      case 'acessorios': 
        return 'https://images.unsplash.com/photo-1547458095-a045e1845d70?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      default: 
        return 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
  };
  
  return (
    <div>
      {/* Category Header */}
      <div className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
        <img 
          src={getCategoryImage()}
          alt={getCategoryTitle()}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 container mx-auto px-4 py-10 z-20">
          <h1 className="font-adventure text-5xl">{getCategoryTitle()}</h1>
          <p className="text-gray-300 mt-2 max-w-2xl">
            Equipamentos de expedição para aviadores aventureiros que desbravam o desconhecido.
          </p>
        </div>
      </div>
      
      {/* Product Listing */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="font-adventure text-2xl">
              {filteredProducts.length} Produtos Encontrados
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] rounded-lg hover:bg-[#222] transition-colors md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </button>
            
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none w-full px-4 py-2 bg-[#1A1A1A] rounded-lg focus:outline-none focus:ring-1 focus:ring-primary pr-10"
              >
                <option value="featured">Destaques</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="newest">Mais Recentes</option>
              </select>
              <ArrowDownUp size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary" />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Mobile Toggle */}
          <div className={`md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-[#1A1A1A] rounded-lg p-6 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-adventure text-xl flex items-center">
                  <Sliders size={18} className="mr-2" />
                  Filtros
                </h3>
                <button 
                  className="text-gray-400 hover:text-primary text-sm transition-colors"
                  onClick={() => setSelectedPrice([])}
                >
                  Limpar
                </button>
              </div>
              
              <div className="adventure-divider mb-6"></div>
              
              <div>
                <h4 className="font-adventure text-lg mb-4">Preço</h4>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-700 text-primary focus:ring-primary focus:ring-offset-background"
                      checked={selectedPrice.includes('0-100')}
                      onChange={() => togglePriceFilter('0-100')}
                    />
                    <span className="ml-2 text-gray-300">Até R$100</span>
                  </label>
                  
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-700 text-primary focus:ring-primary focus:ring-offset-background"
                      checked={selectedPrice.includes('100-200')}
                      onChange={() => togglePriceFilter('100-200')}
                    />
                    <span className="ml-2 text-gray-300">R$100 - R$200</span>
                  </label>
                  
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-700 text-primary focus:ring-primary focus:ring-offset-background"
                      checked={selectedPrice.includes('200-500')}
                      onChange={() => togglePriceFilter('200-500')}
                    />
                    <span className="ml-2 text-gray-300">R$200 - R$500</span>
                  </label>
                  
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-700 text-primary focus:ring-primary focus:ring-offset-background"
                      checked={selectedPrice.includes('500-0')}
                      onChange={() => togglePriceFilter('500-0')}
                    />
                    <span className="ml-2 text-gray-300">Acima de R$500</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="bg-[#1A1A1A] rounded-lg h-[420px] animate-pulse"></div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="font-adventure text-xl mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-400">
                  Tente ajustar seus filtros ou explore outras categorias.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
