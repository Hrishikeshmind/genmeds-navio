
import { useState } from "react";
import { Eye, Upload, ArrowLeft, CloudLightning, BookOpenCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { analyzeImageForMedications } from "@/services/googleVisionService";

// Get API keys from environment variables
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const ReadPrescription = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("openai");

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

  const analyzeWithOpenAI = async (base64Image: string) => {
    try {
      console.log("Making API request to OpenAI Vision...");
      
      // Verify API key before making request
      if (!OPENAI_API_KEY) {
        throw new Error("OpenAI API key is missing. Please check your .env file.");
      }
      
      if (!OPENAI_API_KEY.startsWith('sk-')) {
        throw new Error("OpenAI API key format appears invalid. It should start with 'sk-'");
      }
      
      console.log("Using API key that starts with:", OPENAI_API_KEY.substring(0, 5) + "...");
      
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions', 
        {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are a medical professional analyzing prescriptions. Extract ONLY the medication names from the prescription image. Be extremely precise."
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Please extract ONLY the medication names from this prescription. Return each medication name on a new line. Do not include dosage, frequency, or any other information."
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/${file?.type.split('/')[1]};base64,${base64Image}`
                  }
                }
              ]
            }
          ],
          max_tokens: 500,
          temperature: 0.2
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          },
          timeout: 60000
        }
      );

      console.log("Received response from OpenAI:", response.data);

      if (response.data && response.data.choices && response.data.choices[0].message) {
        const content = response.data.choices[0].message.content;
        const medicationList = content
          .split('\n')
          .filter((line: string) => line.trim() !== '')
          .map((line: string) => line.replace(/^\d+\.\s*/, '').trim());
        
        return medicationList;
      } else {
        throw new Error("Unexpected API response format from OpenAI");
      }
    } catch (error) {
      console.error("Error with OpenAI Vision:", error);
      throw error;
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
    setError(null);

    try {
      const base64Image = await fileToBase64(file);
      let medicationList: string[] = [];
      
      if (selectedTab === "openai") {
        medicationList = await analyzeWithOpenAI(base64Image);
      } else {
        medicationList = await analyzeImageForMedications(base64Image);
      }
      
      setResults(medicationList);
      
      toast({
        title: "Analysis complete",
        description: `Extracted ${medicationList.length} medication names using ${selectedTab === "openai" ? "OpenAI" : "Google Vision"}`,
      });
    } catch (error) {
      console.error("Error analyzing prescription:", error);
      
      let errorMessage = "Failed to analyze prescription.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
        console.log("Error message:", errorMessage);
      } else if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log("Error response data:", error.response.data);
          console.log("Error response status:", error.response.status);
          
          if (error.response.status === 401) {
            errorMessage = "Authentication failed. The API key might be invalid or expired.";
          } else if (error.response.status === 429) {
            errorMessage = "Rate limit exceeded. Please try again in a few minutes.";
          } else if (error.response.status >= 500) {
            errorMessage = "Server error. Please try again later.";
          } else {
            errorMessage = `API Error: ${error.response.status} - ${error.response.statusText}`;
            if (error.response.data?.error?.message) {
              errorMessage += ` - ${error.response.data.error.message}`;
            }
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
              <h1 className="text-3xl font-bold text-secondary">Medication Scanner</h1>
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
              
              <p className="text-gray-500">
                Upload a clear image of your prescription. We'll extract the medication names from it.
              </p>
              
              <Tabs 
                defaultValue="openai" 
                onValueChange={setSelectedTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="openai" className="flex items-center">
                    <BookOpenCheck className="w-4 h-4 mr-2" />
                    OpenAI Vision
                  </TabsTrigger>
                  <TabsTrigger value="google" className="flex items-center">
                    <CloudLightning className="w-4 h-4 mr-2" />
                    Google Vision
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="openai" className="mt-4">
                  <p className="text-sm text-gray-500 mb-4">
                    Uses OpenAI's Vision API for high-quality medication extraction from prescriptions.
                  </p>
                </TabsContent>
                
                <TabsContent value="google" className="mt-4">
                  <p className="text-sm text-gray-500 mb-4">
                    Uses Google Cloud Vision OCR for fast and efficient medication name extraction.
                  </p>
                </TabsContent>
              </Tabs>
              
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
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Scanning...
                  </span>
                ) : (
                  `Scan with ${selectedTab === "openai" ? "OpenAI Vision" : "Google Vision"}`
                )}
              </Button>
            </Card>
            
            <Card className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Medications</h2>
              
              {results.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Eye className="w-12 h-12 text-gray-300 mb-2" />
                  <p className="text-gray-500">
                    Upload and scan a prescription to see medication names here
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
                      medication names.
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
