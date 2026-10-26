import React from 'react';
import { Heart, Sparkles, CheckCircle2, Flame, Shield } from 'lucide-react';

export default function MemorialSection({ onBookMemorial, currencyConfig }) {
  const price = Math.round(2100 * currencyConfig.rate);

  return (
    <section id="memorial" style={{
      padding: '90px 0',
      position: 'relative',
      background: 'radial-gradient(ellipse at 50% 50%, rgba(30, 20, 10, 0.4) 0%, rgba(10, 12, 16, 0.95) 80%)'
    }}>
      <div className="container">
        <div style={{
          background: 'linear-gradient(135deg, rgba(25, 30, 42, 0.8) 0%, rgba(18, 22, 32, 0.95) 100%)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 45px rgba(212, 175, 55, 0.15)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center'
        }}>
          {/* Image Showcase */}
          <div style={{ position: 'relative', height: '100%', minHeight: '380px' }}>
            <img 
              src="/images/ghat-memorial.png" 
              alt="Sangam Ghat twilight memorial altar with framed photo, marigold garland and lit brass diyas"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, transparent 60%, rgba(18, 22, 32, 0.9) 100%)',
              pointerEvents: 'none'
            }} />
          </div>

          {/* Details & Action */}
          <div style={{ padding: '40px' }}>
            <div className="badge-divine" style={{ marginBottom: '16px' }}>
              <Heart size={14} color="#ffd700" fill="#ffd700" />
              <span>Ancestral Peace & Liberation (Moksha)</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              lineHeight: 1.25,
              fontWeight: 800,
              marginBottom: '18px'
            }}>
              Twilight Deep Daan & <br />
              <span className="gold-gradient-text font-serif">Pitru Shanti Seva</span>
            </h2>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.98rem',
              lineHeight: 1.65,
              marginBottom: '24px'
            }}>
              Honor the eternal memory of departed parents and ancestors at the holy Triveni confluence. At twilight, your family photo is placed upon the consecrated altar by Brahmin Purohits. 11 Akhand brass diyas and sanctified flower offerings are floated upon the Ganges amidst sacred Vedic hymns.
            </p>

            <ul style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginBottom: '32px'
            }}>
              {[
                'Framed photograph honored with fresh marigold & lily garlands',
                '11 Brass oil lamps released with Pitru Gayatri chanting',
                'HD video and ceremony photography sent within 24 hours',
                'Sacred Ganga soil and Raksha Sutra delivered to your residence'
              ].map((text, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={16} color="#ffd700" style={{ flexShrink: 0 }} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '18px'
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Complete Seva Starting At</span>
                <span className="current-price" style={{ fontSize: '1.6rem' }}>
                  {currencyConfig.symbol}{price.toLocaleString()}
                </span>
              </div>

              <button 
                onClick={onBookMemorial}
                className="btn btn-primary"
                style={{ padding: '12px 28px' }}
              >
                <Flame size={18} />
                <span>Book Memorial Ritual</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
