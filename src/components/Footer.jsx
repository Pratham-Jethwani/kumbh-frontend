import React, { useState } from 'react';
import { Mail, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer style={{
      background: '#07090d',
      borderTop: '1px solid rgba(212, 175, 55, 0.25)',
      paddingTop: '70px',
      paddingBottom: '30px'
    }}>
      <div className="container">
        {/* Top Newsletter / Muhurta Alert Callout */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(255, 111, 0, 0.08) 100%)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: 'var(--radius-lg)',
          padding: '40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          alignItems: 'center',
          gap: '30px',
          marginBottom: '60px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-bright)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
              <span className="flame-anim">🪔</span>
              <span>Auspicious Vedic Calendar Notifications</span>
            </div>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
              Receive Muhurta & Shahi Snan Alerts
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Stay informed of Ekadashi, Amavasya, Purnima, and Maha Kumbh holy bathing timings for your home pujas.
            </p>
          </div>

          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                flexGrow: 1,
                background: 'rgba(10, 12, 16, 0.8)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: 'var(--radius-full)',
                padding: '12px 20px',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', flexShrink: 0 }}>
              <span>{subscribed ? 'Subscribed!' : 'Notify Me'}</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        {/* Footer Links & Info Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Brand Info */}
          <div style={{ maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.4) 0%, rgba(255, 111, 0, 0.3) 100%)',
                border: '1px solid #d4af37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem'
              }}>
                🏺
              </div>
              <span className="gold-gradient-text font-serif" style={{ fontWeight: 800, fontSize: '1.2rem' }}>
                KUMBH
              </span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px' }}>
              Dedicated to bringing the authentic spiritual relics, consecrated Kalash, and sacred Teerth rituals from the divine confluence of Prayagraj to devotees globally.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#4ade80' }}>
              <ShieldCheck size={14} />
              <span>100% Guaranteed Vedic Purity</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px' }}>
              Sacred Offerings
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem' }}>
              <li><a href="#offerings" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Consecrated Brass Kalash</a></li>
              <li><a href="#offerings" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Triveni Sangam Jal</a></li>
              <li><a href="#offerings" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Pure Copper Snan Lota</a></li>
              <li><a href="#offerings" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Vedic Home Puja Samagri</a></li>
            </ul>
          </div>

          {/* Ritual Services */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px' }}>
              Ghat Seva & Rituals
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem' }}>
              <li><a href="#live-pujas" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Live Sangam Rudrabhishek</a></li>
              <li><a href="#memorial" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Twilight Deep Daan Seva</a></li>
              <li><a href="#live-pujas" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Pitru Moksha Tarpan</a></li>
              <li><a href="#experience" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Live Video Stream Guide</a></li>
            </ul>
          </div>

          {/* Sacred Trust & Headless Architecture */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px' }}>
              Headless Storefront
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.6, marginBottom: '12px' }}>
              Built with Next-Gen React + Vite + Shopify Headless Storefront GraphQL API sales channel.
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '0.78rem',
              color: 'var(--text-gold)'
            }}>
              ✨ Headless Shopify Ready
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            &copy; 2026 Kumbh Divine Heritage. Consecrated with devotion.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Sacred Service</span>
            <span>•</span>
            <span>Shipping & Prasad Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
