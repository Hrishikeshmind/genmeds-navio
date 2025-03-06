
import { ImageAnnotatorClient } from '@google-cloud/vision';

// Parse Google Cloud credentials from environment variable
const getGoogleCredentials = () => {
  try {
    const credentialsString = import.meta.env.VITE_GOOGLE_CLOUD_CREDENTIALS;
    return JSON.parse(credentialsString);
  } catch (error) {
    console.error("Error parsing Google Cloud credentials:", error);
    return null;
  }
};

// Extract medication names from text using basic heuristics
export const extractMedicationNames = (text: string): string[] => {
  // Split text by newlines or periods to get individual phrases
  const phrases = text.split(/[\n.]+/).map(p => p.trim()).filter(Boolean);
  
  // Filter phrases that are likely to be medication names
  // This is a simple approach; a more robust solution would use NLP or a medical database
  const possibleMedications = phrases.filter(phrase => {
    // Exclude common non-medication phrases
    const nonMedicationPhrases = [
      'prescription', 'tablets', 'capsules', 'mg', 'ml', 'doctor', 'patient', 
      'name', 'date', 'signature', 'address', 'phone', 'hospital', 'clinic',
      'take', 'daily', 'twice', 'three', 'times', 'once', 'rx', 'doctor'
    ];
    
    // Check if the phrase is not too short and doesn't contain common non-medication words
    return phrase.length > 3 && 
           !nonMedicationPhrases.some(word => 
              phrase.toLowerCase() === word.toLowerCase());
  });

  // Clean up the medication names
  return possibleMedications.map(med => {
    // Remove common prefixes like "Rx:" or dosage information
    return med.replace(/^rx:?\s*/i, '')
              .replace(/\d+\s*(mg|ml|mcg|g)\b/i, '')
              .replace(/\(\d+\)/g, '')
              .trim();
  });
};

// Main function to analyze an image and extract medication names
export const analyzeImageForMedications = async (imageBase64: string): Promise<string[]> => {
  try {
    const credentials = getGoogleCredentials();
    
    if (!credentials) {
      throw new Error("Google Cloud credentials not found or invalid");
    }

    // Create a client
    const client = new ImageAnnotatorClient({
      credentials: credentials
    });

    // Perform text detection on the image
    const [result] = await client.textDetection(Buffer.from(imageBase64, 'base64'));
    const detections = result.textAnnotations;
    
    if (!detections || detections.length === 0) {
      return [];
    }

    // Extract full text from the first annotation (which contains all detected text)
    const fullText = detections[0].description || '';
    
    // Extract potential medication names from the detected text
    return extractMedicationNames(fullText);
  } catch (error) {
    console.error("Error analyzing image with Google Vision:", error);
    throw error;
  }
};
