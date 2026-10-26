import React from 'react';
import { Sparkles, ShieldCheck, Award, Flame, ArrowRight, HeartHandshake } from 'lucide-react';

export default function Hero({ onExploreClick, onQuickViewHero }) {
  return (
    <section style={{
      position: 'relative',
      padding: '70px 0 90px',
      overflow: 'hidden'
    }}>
      {/* Background Sacred Glow Orbs */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '20%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '5%',
        right: '15%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 111, 0, 0.1) 0%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: '50px'
        }}>
          {/* Left Column: Heading, Value Prop & CTAs */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: 'var(--radius-full)',
              marginBottom: '20px'
            }}>
              <span className="flame-anim">🪔</span>
              <span style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--gold-warm)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}>
                Official Kumbh Kshetra Consecrated Relics
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              lineHeight: 1.15,
              fontWeight: 800,
              marginBottom: '24px',
              letterSpacing: '-0.01em'
            }}>
              The Divine Energy of <br />
              <span className="gold-gradient-text font-serif">Nashik Kumbh Mela</span>, <br />
              <span style={{ fontWeight: 400, fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>
                Directly Into Your Home.
              </span>
            </h1>

            <p style={{
              fontSize: '1.08rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '36px',
              maxWidth: '540px'
            }}>
              Directly from the sacred banks of the Godavari River. Experience sacred brass vessels of authentic Godavari Jal, personalized live Abhishek poojas by verified pandits, and recorded WhatsApp darshan delivered with utmost devotion.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '42px'
            }}>
              <button 
                onClick={onExploreClick}
                className="btn btn-primary"
                style={{ padding: '14px 30px', fontSize: '1.02rem' }}
              >
                <span>Explore Consecrated Vessels</span>
                <ArrowRight size={18} />
              </button>

              <a 
                href="#live-pujas"
                className="btn btn-secondary"
                style={{ padding: '14px 26px', fontSize: '1.02rem' }}
              >
                <Flame size={18} color="#ff9100" />
                <span>Book Live Ghat Puja</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '24px'
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--gold-bright)' }}>
                  50,000+
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Devotees Blessed
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--gold-bright)' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Vedic Consecration
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--gold-bright)' }}>
                  140+
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Countries Delivered
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div style={{ position: 'relative' }}>
            <div className="float-anim" style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              padding: '12px',
              background: 'linear-gradient(145deg, rgba(212, 175, 55, 0.25) 0%, rgba(255, 111, 0, 0.15) 50%, rgba(22, 27, 38, 0.8) 100%)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 50px rgba(212, 175, 55, 0.2)'
            }}>
              <div style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                aspectRatio: '4 / 4.8',
                background: '#0e1117'
              }}>
                <img 
                  src="/images/sacred-kumbh.png" 
                  alt="Divya Sangam Consecrated Brass Kumbh Kalash with marigold garland"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                {/* Subtle Inner Glow Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10, 12, 16, 0.85) 0%, transparent 45%)',
                  pointerEvents: 'none'
                }} />

                {/* Floating Top Authentic Seal */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(12, 15, 22, 0.85)',
                  border: '1px solid var(--gold-primary)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 'var(--radius-full)',
                  padding: '6px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--gold-bright)'
                }}>
                  <ShieldCheck size={16} color="#ffd700" />
                  <span>Authentic Godavari Jal Seal</span>
                </div>

                {/* Bottom Info Ribbon */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  background: 'rgba(17, 21, 30, 0.9)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--gold-warm)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                      Featured Sacred Offering
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                      Sacred Godavari Jal & Kumbh Vessel
                    </div>
                  </div>

                  <button 
                    onClick={onQuickViewHero}
                    className="btn btn-primary"
                    style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>

            {/* Small Floating Devotee Badge */}
            <div style={{
              position: 'absolute',
              bottom: '-25px',
              left: '-20px',
              background: 'rgba(16, 20, 29, 0.95)',
              border: '1px solid rgba(255, 111, 0, 0.35)',
              backdropFilter: 'blur(14px)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff9100 0%, #d84315 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '1.1rem'
              }}>
                🪔
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                  Brahma Muhurta Consecrated
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  By Verified Triveni Sangam Brahmins
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
