
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
    
    // Here you would typically send the email to your backend
    setSubmitted(true);
    toast({
      title: "Obrigado por se inscrever!",
      description: "Seu código de desconto será enviado para seu email.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="relative">
            <img 
              src="https://i.imgur.com/f4npZyo.jpg" 
              alt="Pilot in cockpit" 
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-3xl font-adventure text-white text-center px-4">
                Voe mais ALTO
              </h2>
            </div>
          </div>
        </DialogHeader>
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-lg text-center mb-4">
                Inscreva-se com o seu melhor E-mail e ganhe 15% de desconto
              </p>
              <Input
                type="email"
                placeholder="Seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Quero Voar Mais Alto
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-adventure">Ótimo Voo!</h3>
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
