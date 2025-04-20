import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { CartItem, addToCart } from '../features/cart/cartSlice';
import { Star, Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    images?: string[];
    rating: number;
    installments: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [currentImage, setCurrentImage] = useState(product.image);
  
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    };
    
    dispatch(addToCart(item));
    toast({
      title: "Adicionado ao carrinho",
      description: `${product.name} foi adicionado ao seu carrinho`,
    });
  };
  
  const handleImageChange = (e: React.MouseEvent, image: string) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage(image);
  };
  
  return (
    <motion.div 
      className="product-card bg-[#1A1A1A] rounded-lg overflow-hidden h-[420px] relative group transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20"
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link to={`/produto/${product.id}`} className="block h-full">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={currentImage} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {product.images && product.images.length > 0 && (
            <div className="absolute bottom-2 left-2 flex space-x-1 z-10">
              {[product.image, ...product.images].slice(0, 3).map((img, idx) => (
                <div 
                  key={idx}
                  className={`w-6 h-6 rounded-full border-2 overflow-hidden cursor-pointer ${
                    currentImage === img ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={(e) => handleImageChange(e, img)}
                >
                  <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity"></div>
          
          <button 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary text-black py-2 px-6 rounded font-adventure uppercase tracking-wider text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-accent hover:text-foreground"
            onClick={handleQuickAdd}
          >
            Comprar Agora
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="font-adventure text-lg text-foreground mb-1">{product.name}</h3>
          
          <div className="flex items-center text-primary mb-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star 
                key={idx} 
                size={16} 
                className={idx < Math.floor(product.rating) ? 'fill-primary' : 'stroke-primary'} 
                fill={idx < Math.floor(product.rating) ? 'currentColor' : 'none'} 
              />
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <span className="text-primary text-xl font-bold">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              <div className="text-gray-400 text-xs">
                ou {product.installments}x de R${(product.price / product.installments).toFixed(2).replace('.', ',')}
              </div>
            </div>
            
            <div className="bg-[#8B4513] rounded-full p-1.5 text-primary hover:bg-primary hover:text-[#8B4513] transition-colors cursor-pointer">
              <Heart size={20} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
