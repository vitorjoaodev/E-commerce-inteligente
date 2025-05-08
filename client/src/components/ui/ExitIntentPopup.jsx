// ExitIntentPopup.jsx
import { useState, useEffect } from 'react';

const ExitIntentPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');

  // Função para detectar quando o mouse sai da janela (intenção de saída)
  useEffect(() => {
    const handleMouseLeave = (e) => {
      // Se o mouse sair pelo topo da página e o popup não estiver visível
      if (e.clientY <= 0 && !showPopup) {
        setShowPopup(true);
      }
    };

    // Adicionar event listener
    document.addEventListener('mouseleave', handleMouseLeave);

    // Limpar event listener
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [showPopup]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para salvar o email
    console.log('Email cadastrado:', email);
    setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 animate-accordion-down">
      <div className="relative w-full max-w-lg p-6 mx-4 bg-card rounded-lg shadow-xl border border-primary">
        {/* Botão de fechar */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          aria-label="Fechar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Imagem */}
          <div className="w-full md:w-1/2 overflow-hidden rounded-md">
            <img 
              src="https://www.airway.com.br/wp-content/uploads/2020/02/ConcordeMach2-857x640.jpg" 
              alt="Concorde Mach 2" 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Conteúdo do formulário */}
          <div className="w-full md:w-1/2 flex flex-col">
            <h2 className="text-2xl mb-2 text-primary tracking-wider uppercase font-bold">Voe mais alto conosco!</h2>
            <p className="mb-4 text-foreground">Não perca esta oportunidade exclusiva</p>
            <p className="mb-6 text-accent text-xl font-bold">Ganhe 15% de desconto na sua primeira compra</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Seu melhor email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-input text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  className="adventure-btn bg-primary hover:bg-accent text-primary-foreground"
                >
                  INSCREVA-SE E ECONOMIZE
                </button>
                <button
                  type="button"
                  onClick={closePopup}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Não, vou embora mesmo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;