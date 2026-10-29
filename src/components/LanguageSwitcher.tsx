'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/navigation';
import { 
  getAllowedLanguagesForState, 
  LANGUAGE_DISPLAY_NAMES 
} from '../utils/regionLanguageMap';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [region, setRegion] = useState<string>('');

  useEffect(() => {
    // Synchronously hydrate detected Indian state from middleware cookie
    setRegion(getCookie('detected-region') ?? '');
  }, []);

  // Strict subset of allowed languages for the detected Indian state/UT
  const allowedLanguages = getAllowedLanguagesForState(region);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <select
      value={locale}
      onChange={handleChange}
      disabled={isPending}
      aria-label="Select regional language"
    >
      {allowedLanguages.map((lang) => (
        <option key={lang} value={lang}>
          {LANGUAGE_DISPLAY_NAMES[lang] ?? lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
