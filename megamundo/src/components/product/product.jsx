import { useState } from 'react';
import { urlFor } from '../../client.js';
import './product.css';

const ImageSlider = ({ images }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className="slider-container" style={{ position: 'relative' }}>
      <img src={urlFor(images[index]).width(400).url()} alt="Product" />
      {images.length > 1 && (
        <>
          <button className="slider-btn prev" onClick={(e) => { e.stopPropagation(); setIndex(i => i === 0 ? images.length - 1 : i - 1) }}>❮</button>
          <button className="slider-btn next" onClick={(e) => { e.stopPropagation(); setIndex(i => i === images.length - 1 ? 0 : i + 1) }}>❯</button>
        </>
      )}
    </div>
  );
};

export default function Product({ product, variant, onClick }) {
  return (
    <div className="product-card" onClick={() => onClick({ product, variant })}>
        <div className="product-card">
        <div className="product-image">
            {variant?.images?.length > 0 ? <ImageSlider images={variant.images} /> : <div className="placeholder">Sin Imagen</div>}
        </div>
        <div className="product-info">
            <div className="product-brand">{product.brand?.name}</div>
            <div className="product-name">{product.name} - {variant?.color}</div>
            <div className="product-footer">
            <span className="product-price">₡{product.price}</span>
            <button className="product-add">+</button>
            </div>
        </div>
        </div>
    </div>
  );
}