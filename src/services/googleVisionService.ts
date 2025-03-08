
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

// Mock function to avoid Google Cloud Vision API dependency
export const analyzeImageForMedications = async (imageBase64: string): Promise<string[]> => {
  console.log("Using mock medication detection - Google Cloud credentials not provided");
  // Return mock data to allow the application to function without API keys
  return ["Amoxicillin", "Ibuprofen", "Metformin"];
};
