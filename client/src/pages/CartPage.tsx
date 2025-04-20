import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../lib/store';
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';
import { X, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const [couponCode, setCouponCode] = useState('');
  
  const handleRemoveItem = (index: number) => {
    dispatch(removeFromCart({ index }));
  };
  
  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ index, quantity: newQuantity }));
    }
  };
  
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto py-20 px-4">
        <div className="flex flex-col items-center justify-center py-16">
          <ShoppingBag size={60} className="text-gray-400 mb-4" />
          <h2 className="font-adventure text-3xl mb-4">Seu carrinho está vazio</h2>
          <p className="text-gray-400 mb-8 text-center max-w-md">
            Parece que você ainda não adicionou nenhum produto à sua expedição.
          </p>
          <Link 
            to="/" 
            className="bg-primary text-background hover:bg-[#8B4513] py-3 px-8 rounded font-adventure uppercase tracking-wider transition-colors"
          >
            Continuar explorando
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="font-adventure text-4xl mb-12 text-center">Seu Kit de Exploração</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="bg-[#1A1A1A] rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-adventure text-2xl">Itens do Carrinho</h2>
              <button 
                className="text-gray-400 hover:text-primary flex items-center transition-colors"
                onClick={handleClearCart}
              >
                <Trash2 size={16} className="mr-1" />
                Limpar carrinho
              </button>
            </div>
            
            {items.map((item, index) => (
              <div key={index} className="border-b border-gray-800 py-6 last:border-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-24 h-24 bg-[#111] rounded-lg overflow-hidden mb-4 sm:mb-0 sm:mr-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-adventure text-lg">{item.name}</h3>
                      <button 
                        className="text-gray-400 hover:text-primary transition-colors"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <X size={18} />
                      </button>
                    </div>
                    
                    {item.size && <p className="text-gray-400 text-sm mb-1">Tamanho: {item.size}</p>}
                    {item.color && (
                      <div className="flex items-center mb-4">
                        <span className="text-gray-400 text-sm mr-2">Cor:</span>
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <button 
                          className="w-8 h-8 bg-[#111] rounded flex items-center justify-center text-primary"
                          onClick={() => handleUpdateQuantity(index, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="mx-3">{item.quantity}</span>
                        <button 
                          className="w-8 h-8 bg-[#111] rounded flex items-center justify-center text-primary"
                          onClick={() => handleUpdateQuantity(index, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-primary font-bold">
                          R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                        </div>
                        <div className="text-gray-400 text-xs">
                          R$ {item.price.toFixed(2).replace('.', ',')} cada
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-[#1A1A1A] rounded-lg p-6 sticky top-20">
            <h2 className="font-adventure text-2xl mb-6">Resumo do Pedido</h2>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Subtotal</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Frete</span>
                <span className="text-green-500">Grátis</span>
              </div>
              
              <div className="adventure-divider my-4"></div>
              
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              
              <div className="text-gray-400 text-sm text-right mt-1">
                ou em até 10x de R$ {(total / 10).toFixed(2).replace('.', ',')}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="text-gray-300 block mb-2">Cupom de desconto</label>
              <div className="flex">
                <input 
                  type="text" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-[#111] border border-gray-700 rounded-l-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                  placeholder="Digite seu cupom"
                />
                <button className="bg-[#333] hover:bg-[#444] text-gray-300 px-4 rounded-r-lg transition-colors">
                  Aplicar
                </button>
              </div>
            </div>
            
            <Link 
              to="/checkout" 
              className="w-full bg-primary text-background hover:bg-accent py-4 px-6 rounded font-adventure uppercase tracking-wider transition-colors flex items-center justify-center"
            >
              Finalizar Compra
              <ArrowRight size={16} className="ml-2" />
            </Link>
            
            <div className="mt-6">
              <Link 
                to="/" 
                className="block text-center text-primary hover:text-foreground transition-colors"
              >
                Continuar explorando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
