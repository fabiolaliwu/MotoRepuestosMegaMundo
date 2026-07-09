export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    // 1. The name and image (Shared by all products)
    { name: 'name', title: 'Product Name', type: 'string' },
    { name: 'price', title: 'Price', type: 'number' },
    { name: 'image', title: 'Product Image', type: 'image', options: { hotspot: true } },
    { name: 'badge', title: 'Badge (Optional)', type: 'string' },
    
    // 2. The Reference to our new Brand schema
    { 
      name: 'brand', 
      title: 'Brand', 
      type: 'reference', 
      to: [{ type: 'brand' }] 
    },

    // 3. The Product Type Dropdown
    {
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          { title: 'Casco (Helmet)', value: 'casco' },
          { title: 'Guante (Glove)', value: 'guante' },
          { title: 'Aceite (Oil)', value: 'aceite' },
        ],
        layout: 'radio' // Shows as radio buttons for easy clicking
      }
    },

    // --- CONDITIONAL FIELDS FOR CASCOS ---
    {
      name: 'helmetSize',
      title: 'Helmet Sizes Available',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['S', 'M', 'L', 'XL'] },
      // This magically hides the field if the productType is NOT 'casco'
      hidden: ({ document }) => document?.productType !== 'casco'
    },
    {
      name: 'helmetCertification',
      title: 'Certification (e.g., DOT, ECE)',
      type: 'string',
      hidden: ({ document }) => document?.productType !== 'casco'
    },

    // --- CONDITIONAL FIELDS FOR ACEITES ---
    {
      name: 'oilViscosity',
      title: 'Viscosity (e.g., 10W-40)',
      type: 'string',
      hidden: ({ document }) => document?.productType !== 'aceite'
    },
    {
      name: 'oilVolume',
      title: 'Volume (e.g., 1 Litro)',
      type: 'string',
      hidden: ({ document }) => document?.productType !== 'aceite'
    },
    
    // --- CONDITIONAL FIELDS FOR GUANTES ---
    {
      name: 'gloveMaterial',
      title: 'Material (e.g., Cuero, Textil)',
      type: 'string',
      hidden: ({ document }) => document?.productType !== 'guante'
    }
  ],
}