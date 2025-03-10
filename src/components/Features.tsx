
import { MapPin, Search, Scale, Store } from "lucide-react";
import FeatureCard from "./FeatureCard";

const Features = () => {
  const features = [
    {
      icon: MapPin,
      title: "Store Locator",
      description: "Find the nearest Jana Aushadhi Kendras with real-time availability and directions."
    },
    {
      icon: Scale,
      title: "Price Comparison",
      description: "Compare medicine prices across different stores to find the most affordable options."
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Search for medicines by name, composition, or scan your prescription for quick results."
    },
    {
      icon: Store,
      title: "Sell Medicines",
      description: "Pharmacies and medical stores can list their inventory and reach more customers."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Everything you need in one place
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Making healthcare accessible and affordable with innovative features designed for your convenience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
