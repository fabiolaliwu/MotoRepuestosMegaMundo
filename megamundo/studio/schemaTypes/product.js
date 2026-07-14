import category from './category'

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'name', title: 'Product Name', type: 'string' },
    { 
      name: 'category', 
      title: 'Category', 
      type: 'reference', 
      to: [{ type: 'category' }] 
    },
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
            name: 'samePriceForAll',
            title: 'All sizes have the same price?',
            type: 'boolean',
            initialValue: true
          },
          {
            name: 'price',
            title: 'Price',
            type: 'number',
            hidden: ({ parent }) => !parent?.samePriceForAll
          },
          {
            name: 'sizePricing',
            title: 'Size & Pricing',
            type: 'array',
            hidden: ({ parent }) => parent?.samePriceForAll,
            of: [{
              type: 'object',
              fields: [
                { name: 'size', type: 'string', options: { list: ['S', 'M', 'L', 'XL', 'XXL'] } },
                { name: 'price', type: 'number' }
              ]
            }]
          },
          { 
            name: 'color', 
            title: 'Color', 
            type: 'string',
            options: { list: ['Negro', 'Negro Matte', 'Blanco', 'Rojo', 'Azul', 'Gris', 'Mate'] } 
          },
          { 
            name: 'sizes', 
            title: 'Available Sizes', 
            type: 'array',
            of: [{ type: 'string' }], 
            options: { list: ['S', 'M', 'L', 'XL', 'XXL'], layout: 'checkbox' } 
          },
          { name: 'mass', title: 'Weight (kg) / Volume (ml)', type: 'number' },
          { name: 'images', title: 'Gallery Images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }
        ]
      }]
    }
  ],
}