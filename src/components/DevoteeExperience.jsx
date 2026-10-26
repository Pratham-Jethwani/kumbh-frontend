import React from 'react';
import { Smartphone, Sparkles, Video, PackageCheck, Flame, Heart } from 'lucide-react';

export default function DevoteeExperience({ onBookRitual }) {
  const steps = [
    {
      num: '01',
      title: 'Enter Sankalpa & Devotee Names',
      desc: 'Provide your family names, Gotra, and upload an optional photo to be placed at the sacred ghat altar during invocation.'
    },
    {
      num: '02',
      title: 'Vedic Teerth Purohit Invocation',
      desc: 'On your selected date, verified Brahmins perform the ritual chanting your Gotra at Triveni Sangam with live 1080p stream access.'
    },
    {
      num: '03',
      title: 'Consecrated Prasad at Your Door',
      desc: 'Receive vacuum-sealed Sangam jal, sacred Bhasma, Raksha Sutra thread, and blessed dry prasad in a consecrated wooden kit.'
    }
  ];

  return (
    <section id="experience" style={{
      padding: '90px 0',
      background: 'linear-gradient(180deg, rgba(14, 18, 25, 0.4) 0%, rgba(18, 22, 32, 0.9) 50%, rgba(10, 12, 16, 0.4) 100%)',
      position: 'relative'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
          <div className="badge-saffron" style={{ marginBottom: '14px' }}>
            <span className="flame-anim">🪔</span>
            <span>Remote Sacred Participation</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.9rem)',
            fontWeight: 800,
            marginBottom: '18px'
          }}>
            Connecting Devotees Worldwide to <br />
            <span className="gold-gradient-text font-serif">The Sacred Sangam</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            lineHeight: 1.7
          }}>
            Distance is no longer a barrier to experiencing the profound spiritual grace of Maha Kumbh. Whether in London, San Jose, Melbourne, or Delhi — receive divine blessings in real-time.
          </p>
        </div>

        {/* Feature Spotlight Banner Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'center',
          marginBottom: '70px'
        }}>
          {/* Left: Image Showcase of Devotee at Home with Consecrated Kalash */}
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.7), 0 0 40px rgba(212, 175, 55, 0.15)',
            border: '1px solid rgba(212, 175, 55, 0.25)'
          }}>
            <img 
              src="/images/devotee-home.png" 
              alt="Devotee at home experiencing live Kumbh puja on smartphone with brass Kalash"
              style={{
                width: '100%',
                display: 'block',
                aspectRatio: '16 / 11',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(10, 12, 16, 0.95) 0%, rgba(10, 12, 16, 0.4) 60%, transparent 100%)',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ color: 'var(--gold-bright)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Live Sanctuary
                </div>
                <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600 }}>
                  Personalized Puja Streaming & Consecration
                </div>
              </div>

              <div style={{
                background: 'rgba(230, 57, 70, 0.9)',
                color: '#fff',
                fontSize: '0.78rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
                <span>LIVE SANGAM</span>
              </div>
            </div>
          </div>

          {/* Right: 3 Steps */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  className="glass-panel"
                  style={{
                    padding: '22px 24px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px',
                    transition: 'transform 0.3s ease, border-color 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateX(8px)';
                    e.currentTarget.style.borderColor = 'var(--gold-primary)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: 'var(--gold-bright)',
                    lineHeight: 1,
                    background: 'rgba(212, 175, 55, 0.12)',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(212, 175, 55, 0.3)'
                  }}>
                    {step.num}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '6px'
                    }}>
                      {step.title}
                    </h3>
                    <p style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.55
                    }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '30px' }}>
              <button 
                onClick={onBookRitual}
                className="btn btn-saffron"
                style={{ padding: '14px 28px' }}
              >
                <Flame size={18} />
                <span>Book Your Live Sankalpa Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
