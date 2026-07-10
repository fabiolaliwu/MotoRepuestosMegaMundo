export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'name', title: 'Product Name', type: 'string' },
    { name: 'price', title: 'Price', type: 'number' },
    { name: 'brand', title: 'Brand', type: 'reference', to: [{ type: 'brand' }] },
    
    {
      name: 'variants',
      title: 'Product Variants',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
        { 
          name: 'color', 
          title: 'Color', 
          type: 'string',
          options: { list: ['Negro', 'Blanco', 'Rojo', 'Azul', 'Gris', 'Mate'] } 
        },
        { 
          name: 'sizes', // Changed from 'size' to 'sizes' (plural)
          title: 'Available Sizes', 
          type: 'array', // This must be 'array' for checkboxes to work
          of: [{ type: 'string' }], 
          options: { 
            list: ['S', 'M', 'L', 'XL', 'XXL'],
            layout: 'checkbox'
          }
        },
        { name: 'image', title: 'Image', type: 'image' }
        ]
      }]
    }
  ],
}