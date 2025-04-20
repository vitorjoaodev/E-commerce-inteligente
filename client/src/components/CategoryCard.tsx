import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface CategoryCardProps {
  image: string;
  title: string;
  slug: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title, slug }) => {
  return (
    <Link to={`/categoria/${slug}`} className="relative rounded-lg overflow-hidden group h-80 cursor-pointer block">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity z-10"></div>
      
      <img 
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      <div className="absolute bottom-0 left-0 w-full p-6 z-20">
        <h3 className="font-adventure text-2xl mb-2">{title}</h3>
        <div className="flex items-center">
          <span className="mr-2 text-primary">Explorar</span>
          <ChevronRight 
            size={20} 
            className="text-primary transform group-hover:translate-x-2 transition-transform"
          />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
