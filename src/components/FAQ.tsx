
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Jana Aushadhi Kendra?",
      answer: "Jana Aushadhi Kendras are special pharmacies that provide quality generic medicines at substantially lower prices compared to branded medicines."
    },
    {
      question: "How do I find the nearest store?",
      answer: "Use our store locator feature to find the nearest Jana Aushadhi Kendra. Simply enter your location or allow location access to see stores near you."
    },
    {
      question: "Are generic medicines safe?",
      answer: "Yes, generic medicines are as safe and effective as branded medicines. They contain the same active ingredients and are approved by regulatory authorities."
    },
    {
      question: "How much can I save on medicines?",
      answer: "Generic medicines typically cost 50-90% less than branded medicines. Use our price comparison feature to see the exact savings for your prescription."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about our services and generic medicines
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-secondary">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
