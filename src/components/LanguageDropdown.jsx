import React from 'react';
import { STATE_LANGUAGE_MAP, FALLBACK_LANGUAGES, LANGUAGE_LABELS } from '../shopify';

export default function LanguageDropdown({ detectedState, currentLanguage, onSelectLanguage }) {
  const baseAllowed = STATE_LANGUAGE_MAP[detectedState] || FALLBACK_LANGUAGES;
  const allowedLanguages = Array.from(new Set([...baseAllowed, currentLanguage].filter(Boolean)));

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <select
        value={currentLanguage}
        onChange={(e) => onSelectLanguage(e.target.value)}
        aria-label="Select language"
        style={{
          padding: '6px 12px',
          borderRadius: '9999px',
          border: '1px solid #d4c5b6',
          backgroundColor: '#ffffff',
          color: '#391604',
          fontSize: '0.8rem',
          fontWeight: 600,
          cursor: 'pointer',
          outline: 'none',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}
      >
        {allowedLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {LANGUAGE_LABELS[lang] ?? lang.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

