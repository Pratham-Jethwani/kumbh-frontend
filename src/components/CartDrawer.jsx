import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight, Sparkles, Tag, Check } from 'lucide-react';
import { createShopifyCheckout } from '../shopify';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  currencyConfig,
  onClearCart
}) {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutCompleteNotice, setCheckoutCompleteNotice] = useState(null);

  // Subtotal in INR
  const subtotalINR = items.reduce((sum, item) => {
    const itemPrice = item.variant?.priceINR || item.product.priceINR;
    return sum + itemPrice * item.quantity;
  }, 0);

  const discountAmountINR = Math.round(subtotalINR * (discountPercent / 100));
  const finalTotalINR = Math.max(0, subtotalINR - discountAmountINR);

  // Currency conversions
  const subtotalConverted = Math.round(subtotalINR * currencyConfig.rate);
  const finalTotalConverted = Math.round(finalTotalINR * currencyConfig.rate);

  // Free Prasad Gift Threshold (₹5,000 INR)
  const prasadThresholdINR = 5000;
  const prasadProgress = Math.min(100, Math.round((subtotalINR / prasadThresholdINR) * 100));
  const prasadDiffINR = Math.max(0, prasadThresholdINR - subtotalINR);

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'KUMBH10' || code === 'DIVINE10') {
      setDiscountPercent(10);
      setCouponMsg('10% Auspicious Blessing discount applied!');
    } else if (code === 'SANGAM20') {
      setDiscountPercent(20);
      setCouponMsg('20% Maha Kumbh discount applied!');
    } else {
      setCouponMsg('Invalid promo code. Try "KUMBH10"');
    }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const result = await createShopifyCheckout(items);
      if (result.success) {
        if (!result.isMock && result.checkoutUrl) {
          window.location.href = result.checkoutUrl;
        } else {
          setCheckoutCompleteNotice({
            orderId: 'KMB-' + Math.floor(100000 + Math.random() * 900000),
            total: `${currencyConfig.symbol}${finalTotalConverted.toLocaleString()}`
          });
          onClearCart();
        }
      }
    } catch (err) {
      console.error('Checkout error', err);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        {/* Drawer Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(15, 19, 28, 0.95)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="flame-anim">🪔</span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
              Your Sacred Cart ({items.reduce((c, i) => c + i.quantity, 0)})
            </h3>
          </div>

          <button onClick={onClose} className="btn-icon" style={{ width: '36px', height: '36px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Free Prasad Progress Bar */}
        <div style={{
          background: 'rgba(212, 175, 55, 0.08)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          padding: '14px 24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
            <span style={{ color: 'var(--gold-warm)', fontWeight: 600 }}>
              {prasadProgress >= 100 
                ? '✨ Consecrated Kashi Bhasma & Rudraksha Prasad Unlocked!' 
                : `Add ${currencyConfig.symbol}${Math.round(prasadDiffINR * currencyConfig.rate)} more for Free Sacred Prasad Box`}
            </span>
            <span style={{ fontWeight: 700, color: '#fff' }}>{prasadProgress}%</span>
          </div>

          <div style={{
            height: '6px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${prasadProgress}%`,
              background: 'linear-gradient(90deg, #ff9100, #ffd700)',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Items List */}
        <div style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {checkoutCompleteNotice ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(74, 222, 128, 0.15)',
                border: '2px solid #4ade80',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                🙏
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#ffd700' }}>Har Har Gange!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Your sacred order & Sankalpa has been auspiciously recorded with ID <strong>{checkoutCompleteNotice.orderId}</strong>.
              </p>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '0.82rem',
                color: 'var(--text-muted)'
              }}>
                Order Total: {checkoutCompleteNotice.total} • Live broadcast link and Purohit details will be sent via SMS/Email.
              </div>
              <button onClick={() => setCheckoutCompleteNotice(null)} className="btn btn-secondary" style={{ marginTop: '10px' }}>
                Continue Shopping
              </button>
            </div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '14px' }}>🏺</div>
              <p style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 600 }}>Your Sacred Cart is Empty</p>
              <p style={{ fontSize: '0.85rem' }}>Explore our consecrated vessels and live Ghat Pujas to begin.</p>
            </div>
          ) : (
            items.map((item, idx) => {
              const itemPrice = Math.round((item.variant?.priceINR || item.product.priceINR) * currencyConfig.rate);
              return (
                <div key={idx} style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <img 
                    src={item.product.image} 
                    alt={item.product.title}
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '8px',
                      objectFit: 'cover'
                    }}
                  />

                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
                      {item.product.title}
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--gold-warm)', marginBottom: '6px' }}>
                      {item.variant?.name}
                    </div>

                    {item.customDetails && (
                      <div style={{
                        fontSize: '0.74rem',
                        background: 'rgba(212, 175, 55, 0.1)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px',
                        display: 'inline-block'
                      }}>
                        Sankalpa: {item.customDetails.name} (Gotra: {item.customDetails.gotra})
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                      <span style={{ fontWeight: 700, color: 'var(--gold-bright)', fontSize: '0.95rem' }}>
                        {currencyConfig.symbol}{(itemPrice * item.quantity).toLocaleString()}
                      </span>

                      {/* Quantity Stepper */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(0, 0, 0, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '6px',
                        padding: '2px 6px'
                      }}>
                        <button 
                          onClick={() => onUpdateQty(idx, item.quantity - 1)}
                          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '2px' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, minWidth: '18px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => onUpdateQty(idx, item.quantity + 1)}
                          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '2px' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button 
                        onClick={() => onRemoveItem(idx)}
                        style={{ background: 'none', border: 'none', color: '#e63946', cursor: 'pointer', padding: '4px' }}
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {items.length > 0 && !checkoutCompleteNotice && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'rgba(12, 15, 22, 0.98)'
          }}>
            {/* Promo Code Input */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <div style={{ position: 'relative', flexGrow: 1 }}>
                <Tag size={14} color="var(--gold-warm)" style={{ position: 'absolute', top: '12px', left: '10px' }} />
                <input 
                  type="text" 
                  placeholder="Promo Code (try KUMBH10)" 
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '8px 10px 8px 32px',
                    color: '#fff',
                    fontSize: '0.82rem'
                  }}
                />
              </div>
              <button onClick={applyCoupon} className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
                Apply
              </button>
            </div>

            {couponMsg && (
              <div style={{ fontSize: '0.78rem', color: discountPercent > 0 ? '#4ade80' : '#e63946', marginBottom: '10px' }}>
                {couponMsg}
              </div>
            )}

            {/* Subtotal & Totals */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
              <span>Subtotal</span>
              <span>{currencyConfig.symbol}{subtotalConverted.toLocaleString()}</span>
            </div>

            {discountPercent > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#4ade80', marginBottom: '6px' }}>
                <span>Auspicious Discount ({discountPercent}%)</span>
                <span>-{currencyConfig.symbol}{Math.round(discountAmountINR * currencyConfig.rate).toLocaleString()}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '18px' }}>
              <span>Total Offering</span>
              <span className="current-price" style={{ fontSize: '1.35rem' }}>
                {currencyConfig.symbol}{finalTotalConverted.toLocaleString()}
              </span>
            </div>

            {/* Checkout Action Button */}
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1rem',
                opacity: isCheckingOut ? 0.7 : 1
              }}
            >
              {isCheckingOut ? (
                <span>Generating Sacred Checkout...</span>
              ) : (
                <>
                  <span>Proceed to Sacred Checkout</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '0.74rem',
              color: 'var(--text-muted)',
              marginTop: '12px'
            }}>
              <ShieldCheck size={14} color="#ffd700" />
              <span>Headless Shopify Checkout • 256-bit Encrypted Security</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
