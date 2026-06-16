export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'brand', title: 'Brand', type: 'string' },
    { name: 'name', title: 'Product Name', type: 'string' },
    { name: 'price', title: 'Price', type: 'string' },
    { name: 'badge', title: 'Badge (Optional)', type: 'string' },
    { name: 'image', title: 'Product Image', type: 'image', options: { hotspot: true } }
  ],
}