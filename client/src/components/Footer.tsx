import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-adventure text-2xl text-primary mb-4">Piloto Inteligente</h3>
            <p className="text-gray-400 mb-6">
              Moda inspirada na aviação e no espírito de aventura, para os que exploram sem limites.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary hover:text-foreground transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary hover:text-foreground transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary hover:text-foreground transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-primary hover:text-foreground transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-adventure text-xl mb-4 text-primary">Categorias</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/categoria/camisetas" className="text-gray-400 hover:text-primary transition-colors">
                  Camisetas
                </Link>
              </li>
              <li>
                <Link to="/categoria/relogios" className="text-gray-400 hover:text-primary transition-colors">
                  Relógios
                </Link>
              </li>
              
              
              <li>
                <Link to="/categoria/acessorios" className="text-gray-400 hover:text-primary transition-colors">
                  Acessórios
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-adventure text-xl mb-4 text-primary">Informações</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Termos e Condições
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-adventure text-xl mb-4 text-primary">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-primary mr-2 mt-0.5" />
                <span className="text-gray-400">
                  Hangar 7, Aeroporto Internacional<br />
                  São Paulo, SP - Brasil
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-primary mr-2" />
                <span className="text-gray-400">+55 11 99999-9999</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-primary mr-2" />
                <span className="text-gray-400">contato@pilotointeligente.com.br</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Piloto Inteligente. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-xs text-primary">VISA</div>
              <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-xs text-primary">MC</div>
              <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-xs text-primary">AMEX</div>
              <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-xs text-primary">PIX</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
