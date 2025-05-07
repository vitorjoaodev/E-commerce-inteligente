
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const ExitIntentPopup = () => {
  const [open, setOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            <img src="/logo.png" alt="Logo" className="mx-auto mb-4 h-16" />
            <h2 className="text-2xl font-adventure">15% DE DESCONTO</h2>
          </DialogTitle>
        </DialogHeader>
        <div className="text-center p-4">
          <p className="mb-6">Cadastre-se agora e ganhe 15% de desconto na sua primeira compra!</p>
          <button 
            onClick={() => setOpen(false)}
            className="bg-primary text-background px-6 py-2 rounded hover:bg-accent transition-colors"
          >
            Cadastrar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
