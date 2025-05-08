
import { MessageSquare } from 'lucide-react';

const AboutPage = () => {
  return (
    <main className="min-h-screen">
      <section 
        className="relative min-h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: `url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgN8sTx7J-2q6T1t8ThlhHjt4KSkoRsOop8LRlYMjpCo0Xuv11Jp8xvU9C9OYelHBQ_gmfTtauFGFu-DvLU8_Jy9NawUMSIKku_d08_USu18SZ24aSnGjK0m1FllHNX6-3P__vdSmrKdREfgDOQieGfTBJ_7hhozxIMIMcA5l0WLBhoHV0V0AGPyR801NrU/w1200-h630-p-k-no-nu/Numero%209%20na%20frente%20do%20Apartamento.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-adventure text-5xl md:text-7xl text-center text-foreground mb-6">
            Nossa História
          </h1>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-invert">
            <h2 className="font-adventure text-4xl mb-8 text-center text-primary">Sobre Nós</h2>
            <p className="text-lg mb-6">
              Somos mais do que uma loja de roupas — somos um convite para vestir a história com estilo.
              Na Piloto Inteligente, cada peça carrega a essência do tempo, inspirada em eras, culturas e movimentos que marcaram o mundo. 
              Nosso conceito aeonânico une o clássico ao contemporâneo, com roupas que contam histórias e despertam identidade.
            </p>
            <p className="text-lg mb-6">
              Valorizamos o estilo atemporal, a originalidade e a conexão com narrativas que moldaram a humanidade — da Grécia Antiga aos dias atuais. 
              Seja para expressar atitude, elegância ou ancestralidade, aqui você encontra peças que vestem corpo e alma.
            </p>
            <p className="text-lg mb-6">
              Nosso compromisso é com quem entende que moda é memória viva — e cada escolha no guarda-roupa pode ser um manifesto.
            </p>
            <p className="text-lg font-adventure text-primary">
              Vista-se de tecnologia, engenharia e estilo. Você é o Piloto!
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <img 
                src="https://tokdehistoria.com.br/wp-content/uploads/2021/11/dos-12-boe.jpg?w=800" 
                alt="Boeing histórica" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="font-adventure text-3xl text-primary mb-4">Junte-se à Expedição</h3>
              <p className="text-gray-400 mb-6">
                Receba novas rotas, ofertas exclusivas e histórias de aventura.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  className="px-4 py-3 rounded bg-[#222] border border-primary/50 text-foreground focus:outline-none focus:border-primary w-full"
                />
                <button 
                  type="submit" 
                  className="bg-primary text-[#1A1A1A] hover:bg-foreground hover:text-background py-3 px-6 rounded font-adventure uppercase tracking-wider transition-colors"
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

export default AboutPage;
