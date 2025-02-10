
import { Info, MapPin, Users } from "lucide-react";

const About = () => {
  const aboutCards = [
    {
      icon: Info,
      title: "Our Mission",
      description: "Making healthcare accessible and affordable for everyone through transparent pricing and easy access to generic medicines."
    },
    {
      icon: MapPin,
      title: "Wide Network",
      description: "Connected with over 8,000+ Jana Aushadhi Kendras across India to ensure medicine availability near you."
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Helping millions of Indians save up to 80% on their medical expenses through generic medicines."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            About Genmeds
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your trusted partner in finding affordable generic medicines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-4 text-center">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
