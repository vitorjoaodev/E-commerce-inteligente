import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  text: string;
  name: string;
  role: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ text, name, role, image }) => {
  return (
    <div className="bg-[#1A1A1A] p-6 rounded-lg relative">
      <div className="absolute -top-4 left-6 text-primary opacity-50">
        <Quote size={40} />
      </div>
      
      <div className="pt-4">
        <p className="mb-6 italic">{text}</p>
        
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <h4 className="font-adventure text-primary">{name}</h4>
            <p className="text-sm text-gray-400">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
