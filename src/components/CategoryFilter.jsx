import React from 'react';
import { Sparkles, Crown, Flame, Heart } from 'lucide-react';

export default function CategoryFilter({ categories, activeCategory, onSelectCategory }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles size={16} />;
      case 'Crown': return <Crown size={16} />;
      case 'Flame': return <Flame size={16} />;
      case 'Heart': return <Heart size={16} />;
      default: return <Sparkles size={16} />;
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '12px',
      margin: '36px 0 44px'
    }}>
      {categories.map(cat => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              border: isActive 
                ? '1px solid var(--gold-primary)' 
                : '1px solid rgba(255, 255, 255, 0.08)',
              background: isActive 
                ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.22) 0%, rgba(255, 111, 0, 0.15) 100%)' 
                : 'rgba(255, 255, 255, 0.04)',
              color: isActive ? '#ffd700' : 'var(--text-secondary)',
              boxShadow: isActive ? '0 0 20px rgba(212, 175, 55, 0.25)' : 'none'
            }}
          >
            {getIcon(cat.icon)}
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
