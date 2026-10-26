import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { REVIEWS } from '../data/products';

export default function ReviewsSection() {
  return (
    <section style={{
      padding: '80px 0',
      borderTop: '1px solid var(--border-subtle)',
      background: 'rgba(12, 16, 24, 0.7)'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 50px' }}>
          <div className="badge-divine" style={{ marginBottom: '12px' }}>
            <span className="flame-anim">🪔</span>
            <span>Voices of Devotion</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, marginBottom: '14px' }}>
            Blessed Words from <br />
            <span className="gold-gradient-text font-serif">Global Devotees</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem' }}>
            Over 50,000 devotees across 140+ countries have invited the divine vibrations of Kumbh into their households.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {REVIEWS.map(rev => (
            <div 
              key={rev.id} 
              className="glass-panel"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, border-color 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--gold-primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
            >
              <div>
                {/* Rating stars & verified badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#ffd700" color="#ffd700" />
                    ))}
                  </div>

                  {rev.verified && (
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.74rem',
                      color: '#4ade80',
                      background: 'rgba(74, 222, 128, 0.1)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: 600
                    }}>
                      <ShieldCheck size={12} />
                      <span>Verified Devotee</span>
                    </span>
                  )}
                </div>

                <p style={{
                  fontSize: '0.94rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  fontStyle: 'italic',
                  marginBottom: '20px'
                }}>
                  "{rev.comment}"
                </p>
              </div>

              <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>
                    {rev.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {rev.location}
                  </div>
                </div>

                <div style={{ fontSize: '0.74rem', color: 'var(--gold-warm)', fontWeight: 600 }}>
                  {rev.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
