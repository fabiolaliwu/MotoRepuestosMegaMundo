export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'name', title: 'Product Name', type: 'string' },
    { name: 'price', title: 'Price', type: 'number' },
    { name: 'category', type: 'reference', to: [{ type: 'category' }] },
    { name: 'brand', title: 'Brand', type: 'reference', to: [{ type: 'brand' }] },
    { name: 'description', title: 'Description', type: 'string' }, 
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
          options: { list: ['Negro', 'Negro Matte','Blanco', 'Rojo', 'Azul', 'Gris', 'Mate'] } 
        },
        { 
          name: 'sizes', 
          title: 'Available Sizes', 
          type: 'array',
          of: [{ type: 'string' }], 
          options: { 
            list: ['S', 'M', 'L', 'XL', 'XXL'],
            layout: 'checkbox' 
          } 
        },
        { 
          name: 'weight', 
          title: 'Weight (kg)', 
          type: 'number' 
        },
        { 
          name: 'images', // Plural
          title: 'Gallery Images', 
          type: 'array', 
          of: [{ type: 'image', options: { hotspot: true } }] 
        }
        ]
      }]
    }
  ],
}