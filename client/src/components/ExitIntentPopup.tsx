
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ExitIntentPopup = () => {
  const [open, setOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenExitPopup');
    if (hasSeenPopup) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setOpen(true);
        setHasShown(true);
        localStorage.setItem('hasSeenExitPopup', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setSubmitted(true);
    toast({
      title: "Obrigado por se inscrever!",
      description: "Seu código de desconto será enviado para seu email.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <DialogHeader>
          <div className="relative">
            <img 
              src="https://preview.redd.it/w1w69mvgscs91.png?width=640&crop=smart&auto=webp&s=b03a93548e872604dbc978ae91bf160b45c64a1f" 
              alt="Vintage Airplane" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
              <h2 className="text-4xl font-adventure text-primary text-center px-4 mb-2">
                Voe mais alto conosco!
              </h2>
              <p className="text-white text-xl font-semibold">
                Não perca esta oportunidade exclusiva
              </p>
            </div>
          </div>
        </DialogHeader>
        <div className="p-6 bg-background">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xl text-center mb-4 font-semibold text-primary">
                Ganhe 15% de desconto na sua primeira compra
              </p>
              <Input
                type="email"
                placeholder="Seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border-primary/50 focus:border-primary"
                required
              />
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-background font-adventure text-lg"
              >
                Quero Voar Mais Alto
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-adventure text-primary">Ótimo Voo!</h3>
              <p>Obrigado por se inscrever! Preparamos tudo para sua decolagem.</p>
              <p className="text-sm text-muted-foreground">
                Fique de olho em seu email para receber seu código de desconto.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
