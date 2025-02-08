
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <div className="relative">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-secondary mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
