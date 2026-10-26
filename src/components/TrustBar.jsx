import React from 'react';
import { ShieldCheck, Award, Truck, Video } from 'lucide-react';

export default function TrustBar() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Lab-Tested Sangam Jal',
      desc: '100% pure holy water collected directly at Triveni Sangam with verified purity certificate.'
    },
    {
      icon: Award,
      title: 'Vedic Brahmin Purohits',
      desc: 'Every ritual & consecration performed strictly according to ancient Vedic Shastras.'
    },
    {
      icon: Video,
      title: 'Real-Time HD Broadcast',
      desc: 'Watch your personalized Sankalpa live on the sacred riverbank with your photo on the altar.'
    },
    {
      icon: Truck,
      title: 'Worldwide Express Prasad',
      desc: 'Airtight, sacred tamper-proof packaging delivered with utmost reverence globally.'
    }
  ];

  return (
    <section style={{
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(15, 19, 27, 0.6)',
      padding: '36px 0'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px'
        }}>
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '12px'
              }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={22} color="#ffd700" />
                </div>
                <div>
                  <h4 style={{
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '4px'
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    fontSize: '0.84rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5
                  }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
