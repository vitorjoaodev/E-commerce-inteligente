
import { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchTerm)}`);
      setOpen(false);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-foreground hover:text-primary transition-colors">
        <Search size={20} />
      </button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="search"
              placeholder="Pesquisar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
