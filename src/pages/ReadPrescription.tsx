import { useState } from "react";
import { Eye, Upload, ArrowLeft, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import axios from "axios";

const defaultApiKey = import.meta.env.VITE_OPENAI_API_KEY || "";

const ReadPrescription = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>(defaultApiKey);
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(!defaultApiKey);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
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
      
      setResults([]);
      setError(null);
    }
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
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

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key",
        variant: "destructive",
      });
      setShowApiKeyInput(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const base64Image = await fileToBase64(file);
      
      console.log("Making API request to OpenAI Vision...");
      
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions', 
        {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are a medical professional analyzing prescriptions. Extract information with high precision and clarity."
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Please carefully extract and list all medications with their exact:\n1. Name and strength\n2. Dosage form (tablet, capsule, syrup, etc.)\n3. Frequency and timing of administration\n4. Duration of treatment if specified\n5. Any special instructions\n\nBe extremely precise and format the information clearly. If any part is unclear, indicate that explicitly."
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/${file.type.split('/')[1]};base64,${base64Image}`
                  }
                }
              ]
            }
          ],
          max_tokens: 1000,
          temperature: 0.3
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          timeout: 60000
        }
      );

      console.log("Received response:", response.data);

      if (response.data && response.data.choices && response.data.choices[0].message) {
        const content = response.data.choices[0].message.content;
        const medicationList = content
          .split('\n')
          .filter((line: string) => line.trim() !== '')
          .map((line: string) => line.replace(/^\d+\.\s*/, '').trim());
        
        setResults(medicationList);
        
        toast({
          title: "Analysis complete",
          description: "Your prescription has been analyzed successfully",
        });
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (error) {
      console.error("Error analyzing prescription:", error);
      
      let errorMessage = "Failed to analyze prescription.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log("Error response data:", error.response.data);
          console.log("Error response status:", error.response.status);
          
          if (error.response.status === 401) {
            errorMessage = "Authentication failed. Please check your API key.";
            setShowApiKeyInput(true);
          } else if (error.response.status === 429) {
            errorMessage = "Rate limit exceeded. Please try again in a few minutes or use a different API key.";
            setShowApiKeyInput(true);
          } else if (error.response.status >= 500) {
            errorMessage = "OpenAI server error. Please try again later.";
          }
        } else if (error.request) {
          errorMessage = "No response received from server. Check your internet connection.";
        }
      }
      
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = error => reject(error);
    });
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
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold">Upload Prescription</h2>
              
              {showApiKeyInput && (
                <div className="space-y-2">
                  <label htmlFor="apiKey" className="text-sm font-medium">
                    OpenAI API Key
                  </label>
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-gray-400" />
                    <Input
                      id="apiKey"
                      type="password"
                      value={apiKey}
                      onChange={handleApiKeyChange}
                      placeholder="Enter your OpenAI API key"
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Your API key is used only for this request and is not stored on our servers.
                  </p>
                </div>
              )}

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

              {!showApiKeyInput && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowApiKeyInput(true)}
                  className="w-full mt-2"
                >
                  <Key className="h-4 w-4 mr-2" />
                  Change API Key
                </Button>
              )}
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
