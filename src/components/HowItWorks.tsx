
import { Search, MapPin, Upload, Clock } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Prescription",
      description: "Simply upload your prescription or search for medicines"
    },
    {
      icon: Search,
      title: "Compare Prices",
      description: "Compare prices across different stores and find the best deals"
    },
    {
      icon: MapPin,
      title: "Find Nearby Stores",
      description: "Locate the nearest Jana Aushadhi Kendra with real-time availability"
    },
    {
      icon: Clock,
      title: "Save Time & Money",
      description: "Get your medicines at the most affordable prices, hassle-free"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get your medicines in four simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
