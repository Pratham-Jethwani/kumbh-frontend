import React from 'react';
import { Star, Eye, ShoppingBag, ShieldCheck, Flame } from 'lucide-react';

export default function ProductCard({ 
  product, 
  currency, 
  currencyConfig, 
  onQuickView, 
  onAddToCart 
}) {
  const currentPrice = Math.round(product.priceINR * currencyConfig.rate);
  const originalPrice = Math.round(product.originalPriceINR * currencyConfig.rate);

  return (
    <div className="product-card">
      {/* Product Image Area */}
      <div className="product-image-wrap">
        <img 
          src={product.image} 
          alt={product.title} 
          loading="lazy"
        />

        {/* Badge */}
        <div className="product-card-badge">
          <span className="badge-divine">
            <span className="flame-anim">🪔</span>
            <span>{product.tag}</span>
          </span>
        </div>

        {/* Quick View Hover Button */}
        <div className="product-quick-btn">
          <button 
            onClick={() => onQuickView(product)}
            className="btn btn-secondary"
            style={{
              padding: '8px 16px',
              fontSize: '0.82rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(10, 12, 16, 0.9)',
              borderColor: 'var(--gold-primary)',
              color: '#ffd700'
            }}
          >
            <Eye size={15} />
            <span>Quick View & Details</span>
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="product-details">
        {/* Rating */}
        <div className="product-rating">
          <Star size={15} fill="#ffd700" color="#ffd700" />
          <span style={{ fontWeight: 700, color: '#fff' }}>{product.rating}</span>
          <span style={{ color: 'var(--text-muted)' }}>({product.reviewsCount.toLocaleString()} reviews)</span>
        </div>

        {/* Title */}
        <h3 className="product-title" onClick={() => onQuickView(product)} style={{ cursor: 'pointer' }}>
          {product.title}
        </h3>

        {/* Short Description */}
        <p className="product-desc">
          {product.shortDesc}
        </p>

        {/* Price Row */}
        <div className="product-price-row">
          <span className="current-price">
            {currencyConfig.symbol}{currentPrice.toLocaleString()}
          </span>
          <span className="original-price">
            {currencyConfig.symbol}{originalPrice.toLocaleString()}
          </span>
          <span style={{
            fontSize: '0.78rem',
            color: '#4ade80',
            fontWeight: 600,
            background: 'rgba(74, 222, 128, 0.1)',
            padding: '2px 8px',
            borderRadius: '4px'
          }}>
            Save {Math.round(((product.originalPriceINR - product.priceINR) / product.originalPriceINR) * 100)}%
          </span>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => onQuickView(product)}
            className="btn btn-secondary"
            style={{ flex: '1', padding: '10px', fontSize: '0.86rem' }}
          >
            {product.requiresSankalpa ? 'Book Ritual' : 'Customize'}
          </button>
          
          <button 
            onClick={() => onAddToCart(product, product.variants[0])}
            className="btn btn-primary"
            style={{ flex: '1.2', padding: '10px', fontSize: '0.86rem' }}
          >
            <ShoppingBag size={16} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
