import React, { useState } from 'react';
import { ShoppingBag, Volume2, VolumeX, Sparkles, Settings2, Globe, Heart, Menu, X } from 'lucide-react';
import { toggleSacredAmbience } from '../utils/audio';

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  currency, 
  onCurrencyChange, 
  currencies,
  onOpenShopifyConfig,
  isShopifyConnected
}) {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAudioToggle = () => {
    const nextState = toggleSacredAmbience(setIsAudioActive);
    setIsAudioActive(nextState);
  };

  return (
    <>
      {/* Auspicious Announcement Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #1c1405 0%, #3a2205 50%, #1c1405 100%)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
        padding: '7px 16px',
        textAlign: 'center',
        fontSize: '0.82rem',
        color: '#f5d77f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}>
        <span className="flame-anim">🪔</span>
        <span><strong>Nashik Kumbh Mela Official Offerings:</strong> Authentic Godavari Jal • Verified Pandits • WhatsApp Darshan & Doorstep Delivery</span>
        <span className="flame-anim">🪔</span>
      </div>

      {/* Main Glass Navbar */}
      <nav className="glass-nav" style={{
        position: 'sticky',
        top: 0,
        zIndex: 500,
        padding: '14px 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          {/* Brand Logo */}
          <a href="#" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(255, 111, 0, 0.2) 100%)',
              border: '1.5px solid #d4af37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              boxShadow: '0 0 16px rgba(212, 175, 55, 0.3)'
            }}>
              🏺
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 900,
                fontSize: '1.25rem',
                letterSpacing: '0.08em',
                lineHeight: 1
              }} className="gold-gradient-text">
                NASHIKNIRVANA
              </div>
              <div style={{
                fontSize: '0.68rem',
                letterSpacing: '0.2em',
                color: 'var(--text-muted)',
                fontWeight: 600,
                textTransform: 'uppercase',
                marginTop: '3px'
              }}>
                Kumbh Sacred Heritage
              </div>
            </div>
          </a>

          {/* Nav Links (Desktop) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px'
          }} className="desktop-links">
            <a href="#offerings" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500, transition: 'color 0.2s' }}
               onMouseEnter={e => e.target.style.color = '#ffd700'}
               onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
              Sacred Vessels
            </a>
            <a href="#live-pujas" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500, transition: 'color 0.2s' }}
               onMouseEnter={e => e.target.style.color = '#ffd700'}
               onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
              Ghat Pujas
            </a>
            <a href="#experience" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500, transition: 'color 0.2s' }}
               onMouseEnter={e => e.target.style.color = '#ffd700'}
               onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
              Devotee Experience
            </a>
            <a href="#memorial" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500, transition: 'color 0.2s' }}
               onMouseEnter={e => e.target.style.color = '#ffd700'}
               onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
              Pitru Memorial
            </a>
          </div>

          {/* Right Action Icons & Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            {/* Sacred Ambience Audio Player */}
            <button 
              onClick={handleAudioToggle}
              className="btn-icon"
              title={isAudioActive ? "Mute Sacred Ambience" : "Play Sacred Temple Ambience"}
              style={{
                width: 'auto',
                padding: '0 12px',
                borderRadius: 'var(--radius-full)',
                gap: '8px',
                fontSize: '0.8rem',
                borderColor: isAudioActive ? 'var(--gold-primary)' : 'var(--border-subtle)',
                background: isAudioActive ? 'rgba(212, 175, 55, 0.18)' : 'rgba(255, 255, 255, 0.04)'
              }}
            >
              {isAudioActive ? <Volume2 size={16} color="#ffd700" /> : <VolumeX size={16} />}
              <span style={{ display: 'none', sm: 'inline', color: isAudioActive ? '#ffd700' : 'var(--text-muted)' }}>
                {isAudioActive ? "Temple Sound: ON" : "Temple Sound"}
              </span>
              {isAudioActive && (
                <div className="sound-wave">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
            </button>

            {/* Currency Selector */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '2px 8px'
            }}>
              <Globe size={14} color="var(--gold-warm)" style={{ marginRight: '4px' }} />
              <select 
                value={currency} 
                onChange={(e) => onCurrencyChange(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {Object.keys(currencies).map(c => (
                  <option key={c} value={c} style={{ background: '#11151f', color: '#fff' }}>
                    {currencies[c].label}
                  </option>
                ))}
              </select>
            </div>

            {/* Shopify Headless Status / Config Button */}
            <button 
              onClick={onOpenShopifyConfig}
              className="btn-icon"
              title={isShopifyConnected ? "Shopify Backend Connected" : "Configure Shopify Backend"}
              style={{
                borderColor: isShopifyConnected ? '#4ade80' : 'var(--border-subtle)',
                color: isShopifyConnected ? '#4ade80' : 'var(--text-muted)'
              }}
            >
              <Settings2 size={18} />
            </button>

            {/* Cart Button */}
            <button 
              onClick={onOpenCart}
              className="btn btn-primary"
              style={{
                padding: '10px 18px',
                fontSize: '0.88rem',
                position: 'relative'
              }}
            >
              <ShoppingBag size={18} />
              <span>Sacred Cart</span>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: '#e63946',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 10px rgba(230, 57, 70, 0.8)'
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
