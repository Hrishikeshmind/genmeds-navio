export interface Brand {
  brand: string;
  manufacturer: string;
  price: number;
}

export interface Generic {
  name: string;
  manufacturer: string;
  price: number;
}

export interface Medicine {
  name: string;
  category: string;
  dosage_form: string;
  strength: string;
  brands: Brand[];
  generic: Generic;
  alternatives: string[];
  prescription_required: boolean;
}

export const medicines: Medicine[] = [
  {
    name: "Paracetamol",
    category: "Pain Reliever",
    dosage_form: "Tablet",
    strength: "500mg",
    brands: [
      { brand: "Calpol", manufacturer: "GSK", price: 25 },
      { brand: "Dolo", manufacturer: "Micro Labs", price: 28 },
      { brand: "Pacimol", manufacturer: "Ipca Labs", price: 22 }
    ],
    generic: { name: "Paracetamol", manufacturer: "Generic Pharma", price: 10 },
    alternatives: ["Acetaminophen"],
    prescription_required: false
  },
  {
    name: "Ibuprofen",
    category: "Anti-inflammatory",
    dosage_form: "Tablet",
    strength: "400mg",
    brands: [
      { brand: "Brufen", manufacturer: "Abbott", price: 30 },
      { brand: "Ibugesic", manufacturer: "Cipla", price: 27 }
    ],
    generic: { name: "Ibuprofen", manufacturer: "Generic Pharma", price: 12 },
    alternatives: ["Naproxen"],
    prescription_required: false
  },
  {
    name: "Amoxicillin",
    category: "Antibiotic",
    dosage_form: "Capsule",
    strength: "500mg",
    brands: [
      { brand: "Amoxil", manufacturer: "GSK", price: 85 },
      { brand: "Mox", manufacturer: "Ranbaxy", price: 78 }
    ],
    generic: { name: "Amoxicillin", manufacturer: "Generic Pharma", price: 35 },
    alternatives: ["Penicillin", "Ampicillin"],
    prescription_required: true
  },
  {
    name: "Metformin",
    category: "Diabetes",
    dosage_form: "Tablet",
    strength: "500mg",
    brands: [
      { brand: "Glycomet", manufacturer: "USV", price: 40 },
      { brand: "Metlong", manufacturer: "Sun Pharma", price: 42 }
    ],
    generic: { name: "Metformin", manufacturer: "Generic Pharma", price: 18 },
    alternatives: ["Vildagliptin"],
    prescription_required: true
  },
  {
    name: "Losartan",
    category: "Blood Pressure",
    dosage_form: "Tablet",
    strength: "50mg",
    brands: [
      { brand: "Cozaar", manufacturer: "Merck", price: 75 },
      { brand: "Losacar", manufacturer: "Torrent Pharma", price: 65 }
    ],
    generic: { name: "Losartan", manufacturer: "Generic Pharma", price: 30 },
    alternatives: ["Valsartan"],
    prescription_required: true
  },
  {
    name: "Atorvastatin",
    category: "Cholesterol Control",
    dosage_form: "Tablet",
    strength: "10mg",
    brands: [
      { brand: "Lipitor", manufacturer: "Pfizer", price: 90 },
      { brand: "Atorlip", manufacturer: "Cipla", price: 85 }
    ],
    generic: { name: "Atorvastatin", manufacturer: "Generic Pharma", price: 40 },
    alternatives: ["Rosuvastatin"],
    prescription_required: true
  },
  {
    name: "Oseltamivir",
    category: "Antiviral",
    dosage_form: "Capsule",
    strength: "75mg",
    brands: [
      { brand: "Tamiflu", manufacturer: "Roche", price: 450 },
      { brand: "Fluvir", manufacturer: "Hetero Drugs", price: 400 }
    ],
    generic: { name: "Oseltamivir", manufacturer: "Generic Pharma", price: 250 },
    alternatives: ["Zanamivir"],
    prescription_required: true
  },
  {
    name: "Vitamin D3",
    category: "Vitamin Supplement",
    dosage_form: "Softgel",
    strength: "60000 IU",
    brands: [
      { brand: "D-Rise", manufacturer: "Macleods", price: 150 },
      { brand: "Calcirol", manufacturer: "Cadila", price: 140 }
    ],
    generic: { name: "Cholecalciferol", manufacturer: "Generic Pharma", price: 90 },
    alternatives: ["Calcitriol"],
    prescription_required: false
  }
];
