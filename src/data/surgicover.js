export const variants = [
  {
    id: 'vanilla',
    name: 'Vanilla',
    folder: 'Vanilla',
    imageCount: 5,
    accentColor: '#B8860B',
    bgColor: '#FFFBF0',
    description:
      'A smooth, creamy flavour profile developed specifically to maximise patient compliance, especially in those experiencing post-operative taste alterations or appetite suppression.',
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    folder: 'chocolate',
    imageCount: 5,
    accentColor: '#5C3317',
    bgColor: '#FDF5F0',
    description:
      'Rich and indulgent, the Chocolate variant delivers the same clinical-grade nutrition with a palatable taste profile designed to maximise adherence throughout recovery.',
  },
  {
    id: 'dryfruits',
    name: 'Dry Fruits',
    folder: 'dry fuits',
    imageCount: 4,
    accentColor: '#8B6914',
    bgColor: '#F9F5EC',
    description:
      'A naturally inspired premium flavour with the warmth of mixed dry fruits — ideal for patients who prefer a lighter, less sweet taste during peri-operative recovery.',
  },
]

export const keyFeatures = [
  {
    title: 'Dual-Action Amino Acid Spike',
    desc: 'L-Arginine (200 mg/serve) serves as a nitric oxide precursor to enhance wound perfusion and collagen synthesis. L-Leucine (100 mg/serve) activates the mTOR pathway to directly stimulate muscle protein synthesis.',
  },
  {
    title: 'Hybrid Protein Matrix (PDCAAS 1.0)',
    desc: 'A blend of Soya Protein Isolate, Defatted Soya Flour, and Skimmed Milk Powder delivers a PDCAAS of 1.0 — clinically equivalent to whey, with superior GI tolerance for post-operative patients.',
  },
  {
    title: 'Zero Added Sucrose',
    desc: 'Completely free from added sucrose. Sweetened with sucralose to prevent peri-operative glycaemic fluctuations — directly correlated with surgical site infections and delayed wound closure.',
  },
  {
    title: 'Micro-Nutrient Synergy',
    desc: '9 essential vitamins and 5 critical minerals, including Vitamin C (32 mg/serve) for collagen triple-helix formation and Iron (2.40 mg/serve) for oxygen transport and tissue repair.',
  },
]

export const nutritionRows = [
  { nutrient: 'Energy',                 unit: 'Kcal', per20g: '75.64',  per100g: '378.20' },
  { nutrient: 'Carbohydrates',           unit: 'g',    per20g: '15.94',  per100g: '79.70' },
  { nutrient: 'Added Sugars (Sucrose)',  unit: 'g',    per20g: '0.00',   per100g: '0.00',  highlight: true },
  { nutrient: 'Protein (30% by wt.)',   unit: 'g',    per20g: '6.00',   per100g: '30.00', highlight: true },
  { nutrient: 'Fat',                     unit: 'g',    per20g: '0.19',   per100g: '0.95' },
  { nutrient: 'L-Arginine',              unit: 'mg',   per20g: '200.00', per100g: '1000.00', highlight: true },
  { nutrient: 'L-Leucine',               unit: 'mg',   per20g: '100.00', per100g: '500.00',  highlight: true },
  { nutrient: 'Vitamin C (Ascorbic Acid)', unit: 'mg', per20g: '32.00',  per100g: '160.00' },
  { nutrient: 'Iron',                    unit: 'mg',   per20g: '2.40',   per100g: '12.00' },
  { nutrient: 'Vitamin D',               unit: 'IU',   per20g: '60.00',  per100g: '300.00' },
  { nutrient: 'Folic Acid (B9)',          unit: 'mcg',  per20g: '152.00', per100g: '760.00' },
  { nutrient: 'Niacinamide (B3)',         unit: 'mg',   per20g: '8.00',   per100g: '40.00' },
  { nutrient: 'Pantothenic Acid (B5)',    unit: 'mg',   per20g: '0.67',   per100g: '3.35' },
  { nutrient: 'Vitamin B1 (Thiamine)',    unit: 'mg',   per20g: '0.60',   per100g: '3.00' },
  { nutrient: 'Vitamin B2 (Riboflavin)', unit: 'mg',   per20g: '0.73',   per100g: '3.65' },
  { nutrient: 'Vitamin B6 (Pyridoxine)', unit: 'mg',   per20g: '0.32',   per100g: '1.60' },
  { nutrient: 'Vitamin B12',             unit: 'mcg',  per20g: '0.32',   per100g: '1.60' },
  { nutrient: 'Calcium',                 unit: 'mg',   per20g: '0.323',  per100g: '1.615' },
  { nutrient: 'Phosphorus',              unit: 'mg',   per20g: '0.253',  per100g: '1.265' },
  { nutrient: 'Manganese',               unit: 'mg',   per20g: '0.50',   per100g: '2.50' },
  { nutrient: 'Copper',                  unit: 'mg',   per20g: '0.32',   per100g: '1.60' },
]

export const instructions = [
  'Measure 150 ml of lukewarm water or milk into a clean container.',
  'Add exactly one heaped scoop (20 g) of Surgicover powder.',
  'Stir or shake briskly until the powder has completely dissolved.',
  'Consume immediately after preparation.',
]

export const ingredients =
  'Soya Protein Isolate, Defatted Soya Flour, Skimmed Milk Powder, Added Amino Acids (L-Arginine, L-Leucine), Vitamins (Ascorbic Acid, Niacinamide, Riboflavin, Thiamine Mononitrate, Pyridoxine Hydrochloride, Folic Acid, Calcium D-Pantothenate, Cholecalciferol, Cyanocobalamin), Minerals (Ferrous Ascorbate, Manganese Sulfate, Copper Sulfate, Tribasic Calcium Phosphate), Sweetener (Sucralose), Permitted Flavours (Dry Fruits / Chocolate / Vanilla).'
