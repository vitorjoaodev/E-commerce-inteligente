import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../lib/store';
import { clearCart } from '../features/cart/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Landmark, QrCode, ChevronRight, Lock } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { toast } from '@/hooks/use-toast';

// Simulate order submit
const simulateOrderSubmit = async (orderData: any) => {
  return await apiRequest('POST', '/api/orders', orderData);
};

const CheckoutPage: React.FC = () => {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [processing, setProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cpf: '',
    phone: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.address) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }
    
    if (paymentMethod === 'credit-card' && (!formData.cardNumber || !formData.cardName || !formData.cardExpiry || !formData.cardCvv)) {
      toast({
        title: "Dados de pagamento incompletos",
        description: "Por favor, preencha todos os dados do cartão",
        variant: "destructive"
      });
      return;
    }
    
    setProcessing(true);
    
    try {
      const orderData = {
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          cpf: formData.cpf,
          phone: formData.phone,
        },
        shipping: {
          address: formData.address,
          number: formData.number,
          complement: formData.complement,
          neighborhood: formData.neighborhood,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        payment: {
          method: paymentMethod,
          cardData: paymentMethod === 'credit-card' ? {
            number: formData.cardNumber,
            name: formData.cardName,
            expiry: formData.cardExpiry,
            cvv: formData.cardCvv,
          } : null,
        },
        items,
        total,
      };
      
      const response = await simulateOrderSubmit(orderData);
      
      // Clear cart after successful order
      dispatch(clearCart());
      
      // Redirect to success page
      navigate('/success');
      
      toast({
        title: "Pedido realizado com sucesso!",
        description: "Você receberá um e-mail com os detalhes do seu pedido",
      });
    } catch (error) {
      console.error('Error processing order:', error);
      toast({
        title: "Erro ao processar pedido",
        description: "Ocorreu um erro ao processar seu pedido. Por favor, tente novamente.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };
  
  if (items.length === 0) {
    navigate('/');
    return null;
  }
  
  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="font-adventure text-4xl mb-12 text-center">Finalizar Compra</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="bg-[#1A1A1A] rounded-lg p-6 mb-6">
              <h2 className="font-adventure text-2xl mb-6">Informações Pessoais</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 mb-2">Nome completo *</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email *</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">CPF *</label>
                  <input 
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Telefone *</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Shipping Address */}
            <div className="bg-[#1A1A1A] rounded-lg p-6 mb-6">
              <h2 className="font-adventure text-2xl mb-6">Endereço de Entrega</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">Endereço *</label>
                  <input 
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Número *</label>
                  <input 
                    type="text"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 mb-2">Complemento</label>
                  <input 
                    type="text"
                    name="complement"
                    value={formData.complement}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Bairro *</label>
                  <input 
                    type="text"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">CEP *</label>
                  <input 
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Cidade *</label>
                  <input 
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Estado *</label>
                  <input 
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-[#1A1A1A] rounded-lg p-6 mb-6">
              <h2 className="font-adventure text-2xl mb-6">Método de Pagamento</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button 
                  type="button"
                  className={`p-4 rounded-lg border flex flex-col items-center justify-center gap-2 transition-colors ${
                    paymentMethod === 'credit-card' 
                      ? 'border-primary bg-[#111] text-primary' 
                      : 'border-gray-700 hover:border-gray-500 text-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('credit-card')}
                >
                  <CreditCard size={24} />
                  <span>Cartão de Crédito</span>
                </button>
                
                <button 
                  type="button"
                  className={`p-4 rounded-lg border flex flex-col items-center justify-center gap-2 transition-colors ${
                    paymentMethod === 'bank-transfer' 
                      ? 'border-primary bg-[#111] text-primary' 
                      : 'border-gray-700 hover:border-gray-500 text-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('bank-transfer')}
                >
                  <Landmark size={24} />
                  <span>Transferência Bancária</span>
                </button>
                
                <button 
                  type="button"
                  className={`p-4 rounded-lg border flex flex-col items-center justify-center gap-2 transition-colors ${
                    paymentMethod === 'pix' 
                      ? 'border-primary bg-[#111] text-primary' 
                      : 'border-gray-700 hover:border-gray-500 text-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('pix')}
                >
                  <QrCode size={24} />
                  <span>PIX</span>
                </button>
              </div>
              
              {paymentMethod === 'credit-card' && (
                <div className="bg-[#111] p-5 rounded-lg border border-gray-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Número do Cartão *</label>
                      <input 
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Nome no Cartão *</label>
                      <input 
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Data de Validade *</label>
                      <input 
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                        placeholder="MM/AA"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Código de Segurança *</label>
                      <input 
                        type="text"
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                        className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                        placeholder="CVV"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'bank-transfer' && (
                <div className="bg-[#111] p-5 rounded-lg border border-gray-800">
                  <h3 className="font-adventure text-primary text-lg mb-3">Dados Bancários</h3>
                  <p className="text-gray-300 mb-2">Banco: Aventura Financial S.A.</p>
                  <p className="text-gray-300 mb-2">Agência: 0001</p>
                  <p className="text-gray-300 mb-2">Conta: 123456-7</p>
                  <p className="text-gray-300 mb-2">CNPJ: 12.345.678/0001-90</p>
                  <p className="text-gray-300 mb-4">Razão Social: Piloto Inteligente Ltda</p>
                  <p className="text-yellow-500 text-sm">
                    Após realizar a transferência, envie o comprovante para o email: financeiro@pilotointeligente.com.br
                  </p>
                </div>
              )}
              
              {paymentMethod === 'pix' && (
                <div className="bg-[#111] p-5 rounded-lg border border-gray-800 flex flex-col items-center">
                  <h3 className="font-adventure text-primary text-lg mb-3">QR Code PIX</h3>
                  <div className="w-48 h-48 bg-white p-2 rounded mb-4">
                    <div className="w-full h-full bg-[#111] flex items-center justify-center">
                      <QrCode size={100} className="text-primary" />
                    </div>
                  </div>
                  <p className="text-gray-300 mb-2">Chave PIX: 12345678901</p>
                  <p className="text-gray-300 mb-2">Nome: Piloto Inteligente Ltda</p>
                  <p className="text-yellow-500 text-sm text-center">
                    Escaneie o QR Code ou use a chave PIX para realizar o pagamento
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <Link 
                to="/carrinho" 
                className="text-primary hover:text-foreground transition-colors flex items-center"
              >
                Voltar para o carrinho
              </Link>
              
              <button 
                type="submit"
                className="bg-primary text-background hover:bg-accent py-3 px-8 rounded font-adventure uppercase tracking-wider transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={processing}
              >
                {processing ? (
                  <>Processando...</>
                ) : (
                  <>
                    Finalizar Compra
                    <ChevronRight size={16} className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-[#1A1A1A] rounded-lg p-6 sticky top-20">
            <h2 className="font-adventure text-2xl mb-6">Resumo do Pedido</h2>
            
            <div className="max-h-80 overflow-y-auto mb-6 pr-2">
              {items.map((item, index) => (
                <div key={index} className="flex items-center mb-4 pb-4 border-b border-gray-800 last:border-0">
                  <div className="w-16 h-16 bg-[#111] rounded overflow-hidden mr-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-adventure text-sm">{item.name}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-gray-400 text-xs">
                        Qtd: {item.quantity} {item.size && `• ${item.size}`}
                      </span>
                      <span className="text-primary font-bold">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div>
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
            
            <div className="mt-6 flex items-center justify-center text-gray-400 text-sm">
              <Lock size={14} className="mr-1" />
              Pagamento 100% seguro
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
