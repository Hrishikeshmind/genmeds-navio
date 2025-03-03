
import { useState } from "react";
import { Eye, Upload, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const ReadPrescription = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create preview for image files
      if (selectedFile.type.includes("image")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target) {
            setPreview(event.target.result as string);
          }
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPEG, PNG)",
          variant: "destructive",
        });
      }
      
      // Reset results when new file is selected
      setResults([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a prescription image to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulating API call to analyze the prescription
      // In a real app, you would send the file to a backend service
      setTimeout(() => {
        // Mock results
        setResults([
          "Paracetamol 500mg - 1 tablet three times daily",
          "Amoxicillin 250mg - 1 capsule twice daily",
          "Cetirizine 10mg - 1 tablet at night"
        ]);
        
        toast({
          title: "Analysis complete",
          description: "Your prescription has been analyzed successfully",
        });
        
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error analyzing prescription:", error);
      toast({
        title: "Error",
        description: "Failed to analyze prescription. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="hover:bg-secondary/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <Eye className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold text-secondary">Prescription Reader</h1>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold">Upload Prescription</h2>
              <p className="text-gray-500">
                Upload a clear image of your prescription. We'll analyze it and identify the medications.
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  id="prescription"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="prescription"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    Supports: JPEG, PNG
                  </span>
                </label>
              </div>
              
              {preview && (
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={preview} 
                    alt="Prescription preview" 
                    className="w-full h-auto max-h-60 object-contain" 
                  />
                </div>
              )}
              
              <Button 
                onClick={handleSubmit} 
                className="w-full" 
                disabled={!file || isLoading}
              >
                {isLoading ? "Analyzing..." : "Analyze Prescription"}
              </Button>
            </Card>
            
            <Card className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              
              {results.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Eye className="w-12 h-12 text-gray-300 mb-2" />
                  <p className="text-gray-500">
                    Upload and analyze a prescription to see the results here
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    We've identified the following medications in your prescription:
                  </p>
                  <ul className="space-y-3">
                    {results.map((med, index) => (
                      <li key={index} className="p-3 bg-primary/5 rounded-lg flex items-start">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 mr-2"></div>
                        <span>{med}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      Disclaimer: This is an automated analysis and may not be 100% accurate. 
                      Always consult a healthcare professional or pharmacist to verify the 
                      medications and dosages.
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadPrescription;
