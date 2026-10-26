import React, { useState } from 'react';
import { X, Star, ShieldCheck, ShoppingBag, Check, Calendar, User, Sparkles, Upload } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProductQuickViewModal({ 
  product, 
  onClose, 
  currencyConfig, 
  onAddToCart 
}) {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [activeImage, setActiveImage] = useState(product.image);
  const [sankalpaName, setSankalpaName] = useState('');
  const [sankalpaGotra, setSankalpaGotra] = useState('Kashyap');
  const [sankalpaDate, setSankalpaDate] = useState('2026-11-15');
  const [uploadedPhotoPreview, setUploadedPhotoPreview] = useState(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const price = Math.round((selectedVariant?.priceINR || product.priceINR) * currencyConfig.rate);
  const origPrice = Math.round(product.originalPriceINR * currencyConfig.rate);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedPhotoPreview(url);
    }
  };

  const handleAdd = () => {
    const customDetails = product.requiresSankalpa ? {
      name: sankalpaName || 'Devotee Family',
      gotra: sankalpaGotra,
      date: sankalpaDate,
      hasPhoto: !!uploadedPhotoPreview
    } : null;

    onAddToCart(product, selectedVariant, customDetails);
    setAddedSuccess(true);

    // Fire celebratory confetti for auspicious booking
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ffd700', '#ff6f00', '#ffffff', '#d4af37']
      });
    } catch (e) {}

    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="btn-icon"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            background: 'rgba(0,0,0,0.6)'
          }}
        >
          <X size={18} />
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          padding: '30px'
        }}>
          {/* Images Gallery */}
          <div>
            <div style={{
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              aspectRatio: '4 / 4.4',
              background: '#0d1017',
              marginBottom: '14px',
              border: '1px solid rgba(212, 175, 55, 0.25)'
            }}>
              <img 
                src={activeImage} 
                alt={product.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => setActiveImage(product.image)}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: activeImage === product.image ? '2px solid #ffd700' : '1px solid rgba(255,255,255,0.1)',
                  padding: 0,
                  cursor: 'pointer'
                }}
              >
                <img src={product.image} alt="Thumb 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>

              {product.secondaryImage && (
                <button 
                  onClick={() => setActiveImage(product.secondaryImage)}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: activeImage === product.secondaryImage ? '2px solid #ffd700' : '1px solid rgba(255,255,255,0.1)',
                    padding: 0,
                    cursor: 'pointer'
                  }}
                >
                  <img src={product.secondaryImage} alt="Thumb 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              )}
            </div>
          </div>

          {/* Details & Customization */}
          <div>
            <div className="badge-divine" style={{ marginBottom: '12px' }}>
              <span className="flame-anim">🪔</span>
              <span>{product.tag}</span>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '10px', lineHeight: 1.3 }}>
              {product.title}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Star size={16} fill="#ffd700" color="#ffd700" />
              <span style={{ fontWeight: 700, color: 'var(--gold-warm)' }}>{product.rating}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({product.reviewsCount.toLocaleString()} verified devotee ratings)</span>
            </div>

            {/* Price Row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '18px' }}>
              <span className="current-price" style={{ fontSize: '1.8rem' }}>
                {currencyConfig.symbol}{price.toLocaleString()}
              </span>
              <span className="original-price" style={{ fontSize: '1.1rem' }}>
                {currencyConfig.symbol}{origPrice.toLocaleString()}
              </span>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              {product.description}
            </p>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 1 && (
              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', fontWeight: 700 }}>
                  Select Consecration Edition / Seva Option:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {product.variants.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedVariant(v)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        border: selectedVariant.name === v.name ? '1px solid var(--gold-primary)' : '1px solid rgba(255,255,255,0.08)',
                        background: selectedVariant.name === v.name ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.03)',
                        color: selectedVariant.name === v.name ? '#ffd700' : 'var(--text-primary)',
                        cursor: 'pointer',
                        fontSize: '0.88rem',
                        fontWeight: 600
                      }}
                    >
                      <span>{v.name}</span>
                      <span>{currencyConfig.symbol}{Math.round(v.priceINR * currencyConfig.rate).toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Sankalpa Form for Ritual Products */}
            {product.requiresSankalpa && (
              <div style={{
                background: 'rgba(212, 175, 55, 0.08)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                marginBottom: '22px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-warm)', fontSize: '0.86rem', fontWeight: 700, marginBottom: '12px' }}>
                  <Sparkles size={16} />
                  <span>Personalized Vedic Sankalpa Details</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Devotee Name / Ancestor Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Ramesh Chandra Sharma" 
                      value={sankalpaName}
                      onChange={e => setSankalpaName(e.target.value)}
                      style={{
                        width: '100%',
                        background: 'rgba(10, 12, 16, 0.8)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        padding: '8px 10px',
                        color: '#fff',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Family Gotra</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Kashyap / Vashistha" 
                      value={sankalpaGotra}
                      onChange={e => setSankalpaGotra(e.target.value)}
                      style={{
                        width: '100%',
                        background: 'rgba(10, 12, 16, 0.8)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        padding: '8px 10px',
                        color: '#fff',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>
                </div>

                {/* Photo Upload Simulation */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
                  <label style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}>
                    <Upload size={14} />
                    <span>Attach Photo for Ghat Altar</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  </label>

                  {uploadedPhotoPreview && (
                    <span style={{ fontSize: '0.78rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Check size={14} /> Photo Attached
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Key Features List */}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
              {product.features?.map((f, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  <Check size={14} color="#ffd700" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* Submit Action */}
            <button 
              onClick={handleAdd}
              className={`btn ${addedSuccess ? 'btn-secondary' : 'btn-primary'}`}
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1rem',
                borderColor: addedSuccess ? '#4ade80' : undefined,
                color: addedSuccess ? '#4ade80' : undefined
              }}
            >
              {addedSuccess ? (
                <>
                  <Check size={18} />
                  <span>Added to Sacred Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>{product.requiresSankalpa ? 'Confirm Sankalpa & Book' : 'Add to Sacred Cart'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
