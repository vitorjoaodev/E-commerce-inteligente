import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { Star, Truck, ShieldCheck, RefreshCcw, Heart, Share2 } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { toast } from '@/hooks/use-toast';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiRequest('GET', `/api/products/${id}`, undefined);
        const data = await response.json();
        setProduct(data);
        setMainImage(data.image);
        
        // Set defaults if available
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      toast({
        title: "Selecione um tamanho",
        description: "Por favor, selecione um tamanho antes de adicionar ao carrinho",
        variant: "destructive"
      });
      return;
    }
    
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      size: selectedSize,
      color: selectedColor,
    }));
    
    toast({
      title: "Adicionado ao carrinho",
      description: `${product.name} foi adicionado ao seu carrinho`,
    });
  };
  
  if (loading) {
    return (
      <div className="container mx-auto py-20 px-4">
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <div className="compass-loader mb-6"></div>
          <p className="font-adventure text-lg uppercase">Carregando produto...</p>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto py-20 px-4">
        <div className="text-center">
          <h2 className="font-adventure text-3xl mb-4">Produto não encontrado</h2>
          <p className="mb-8">O produto que você está procurando não está disponível.</p>
          <Link 
            to="/" 
            className="bg-primary text-background hover:bg-[#8B4513] py-3 px-8 rounded font-adventure uppercase tracking-wider transition-colors"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-20 px-4">
      <div className="mb-6">
        <Link to="/" className="text-primary hover:text-foreground transition-colors">
          Início
        </Link>{' '}
        /{' '}
        <Link to={`/categoria/${product.category}`} className="text-primary hover:text-foreground transition-colors">
          {product.category}
        </Link>{' '}
        / <span className="text-foreground">{product.name}</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Images */}
        <div>
          <div className="bg-[#1A1A1A] rounded-lg overflow-hidden h-[500px] mb-4">
            <img 
              src={mainImage} 
              alt={product.name} 
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            <div 
              className={`h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${
                mainImage === product.image ? 'border-primary' : 'border-transparent'
              }`}
              onClick={() => setMainImage(product.image)}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images && product.images.map((img: string, idx: number) => (
              <div 
                key={idx}
                className={`h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${
                  mainImage === img ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => setMainImage(img)}
              >
                <img 
                  src={img} 
                  alt={`${product.name} - View ${idx + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="font-adventure text-4xl mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star 
                  key={idx}
                  size={18}
                  className={idx < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-primary'}
                  fill={idx < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                />
              ))}
            </div>
            <span className="text-gray-400">{product.reviewCount} avaliações</span>
          </div>
          
          <div className="mb-6">
            <span className="text-primary text-3xl font-bold">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            <div className="text-gray-400 mt-1">
              ou {product.installments}x de R${(product.price / product.installments).toFixed(2).replace('.', ',')} sem juros
            </div>
          </div>
          
          <div className="adventure-divider mb-6"></div>
          
          <p className="text-gray-300 mb-6">
            {product.description}
          </p>
          
          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="font-adventure text-lg mb-2">Tamanho</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold uppercase ${
                      selectedSize === size 
                        ? 'bg-primary text-background' 
                        : 'bg-transparent border border-gray-600 text-gray-300 hover:border-primary'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="font-adventure text-lg mb-2">Cor</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedColor === color ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Color ${color}`}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-adventure text-lg mb-2">Quantidade</h3>
            <div className="flex items-center">
              <button 
                className="w-10 h-10 bg-[#1A1A1A] rounded-l-lg flex items-center justify-center text-primary"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <div className="w-16 h-10 bg-[#1A1A1A] flex items-center justify-center text-foreground">
                {quantity}
              </div>
              <button 
                className="w-10 h-10 bg-[#1A1A1A] rounded-r-lg flex items-center justify-center text-primary"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              className="flex-1 bg-primary text-background hover:bg-accent py-4 px-6 rounded font-adventure uppercase tracking-wider transition-colors flex items-center justify-center"
              onClick={handleAddToCart}
            >
              Adicionar ao Carrinho
            </button>
            
            <button className="w-12 h-12 bg-[#1A1A1A] rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-colors">
              <Heart size={20} />
            </button>
            
            <button className="w-12 h-12 bg-[#1A1A1A] rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-colors">
              <Share2 size={20} />
            </button>
          </div>
          
          {/* Benefits */}
          <div className="bg-[#1A1A1A] rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Truck size={20} className="text-primary mr-2" />
                <span className="text-gray-300 text-sm">Frete grátis para todo o Brasil</span>
              </div>
              
              <div className="flex items-center">
                <ShieldCheck size={20} className="text-primary mr-2" />
                <span className="text-gray-300 text-sm">Garantia de 1 ano</span>
              </div>
              
              <div className="flex items-center">
                <RefreshCcw size={20} className="text-primary mr-2" />
                <span className="text-gray-300 text-sm">30 dias para troca ou devolução</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
