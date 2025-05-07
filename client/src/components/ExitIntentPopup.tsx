
import { useState, useEffect } from 'react';
import { Dialog } from '@/components/ui/dialog';

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
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
        <div className="bg-background p-8 rounded-lg max-w-md w-full text-center">
          <img src="/logo.png" alt="Logo" className="mx-auto mb-4 h-16" />
          <h2 className="text-2xl font-adventure mb-4">15% DE DESCONTO</h2>
          <p className="mb-6">Cadastre-se agora e ganhe 15% de desconto na sua primeira compra!</p>
          <button 
            onClick={() => setOpen(false)}
            className="bg-primary text-background px-6 py-2 rounded hover:bg-accent transition-colors"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ExitIntentPopup;
