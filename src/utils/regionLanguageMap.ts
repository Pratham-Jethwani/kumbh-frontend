/**
 * Exhaustive regional language mapping for all 28 Indian States & 8 Union Territories
 * mapped to official ISO 3166-2:IN subdivision codes.
 *
 * Each region maps to [English, Primary Regional Language].
 */

export const FALLBACK_LANGUAGES: readonly [string, string] = ['en', 'hi'];

export const REGION_LANGUAGE_MAP: Record<string, readonly [string, string]> = {
  // --- 28 Indian States ---
  AP: ['en', 'te'], // Andhra Pradesh -> Telugu
  AR: ['en', 'hi'], // Arunachal Pradesh -> Hindi
  AS: ['en', 'as'], // Assam -> Assamese
  BR: ['en', 'hi'], // Bihar -> Hindi
  CG: ['en', 'hi'], // Chhattisgarh -> Hindi
  CT: ['en', 'hi'], // Chhattisgarh (ISO alternate)
  GA: ['en', 'kok'], // Goa -> Konkani
  GJ: ['en', 'gu'], // Gujarat -> Gujarati
  HR: ['en', 'hi'], // Haryana -> Hindi
  HP: ['en', 'hi'], // Himachal Pradesh -> Hindi
  JH: ['en', 'hi'], // Jharkhand -> Hindi
  KA: ['en', 'kn'], // Karnataka -> Kannada
  KL: ['en', 'ml'], // Kerala -> Malayalam
  MP: ['en', 'hi'], // Madhya Pradesh -> Hindi
  MH: ['en', 'mr'], // Maharashtra -> Marathi
  MN: ['en', 'mni'], // Manipur -> Manipuri (Meitei)
  ML: ['en', 'hi'], // Meghalaya -> Hindi
  MZ: ['en', 'hi'], // Mizoram -> Hindi
  NL: ['en', 'hi'], // Nagaland -> Hindi
  OD: ['en', 'or'], // Odisha -> Odia
  OR: ['en', 'or'], // Odisha (ISO alternate)
  PB: ['en', 'pa'], // Punjab -> Punjabi
  RJ: ['en', 'hi'], // Rajasthan -> Hindi
  SK: ['en', 'ne'], // Sikkim -> Nepali
  TN: ['en', 'ta'], // Tamil Nadu -> Tamil
  TS: ['en', 'te'], // Telangana -> Telugu
  TG: ['en', 'te'], // Telangana (ISO alternate)
  TR: ['en', 'bn'], // Tripura -> Bengali
  UP: ['en', 'hi'], // Uttar Pradesh -> Hindi
  UK: ['en', 'hi'], // Uttarakhand -> Hindi
  UT: ['en', 'hi'], // Uttarakhand (ISO alternate)
  WB: ['en', 'bn'], // West Bengal -> Bengali

  // --- 8 Union Territories ---
  AN: ['en', 'hi'], // Andaman and Nicobar Islands -> Hindi
  CH: ['en', 'pa'], // Chandigarh -> Punjabi
  DH: ['en', 'gu'], // Dadra & Nagar Haveli and Daman & Diu -> Gujarati
  DD: ['en', 'gu'], // Daman and Diu (legacy ISO)
  DN: ['en', 'gu'], // Dadra and Nagar Haveli (legacy ISO)
  DL: ['en', 'hi'], // National Capital Territory of Delhi -> Hindi
  JK: ['en', 'ur'], // Jammu and Kashmir -> Urdu / Kashmiri
  LA: ['en', 'hi'], // Ladakh -> Hindi
  LD: ['en', 'ml'], // Lakshadweep -> Malayalam
  PY: ['en', 'ta']  // Puducherry -> Tamil
};

export const LANGUAGE_DISPLAY_NAMES: Record<string, string> = {
  en: 'English',
  hi: 'हिन्दी',
  te: 'తెలుగు',
  as: 'অসমীয়া',
  kok: 'कोंकणी',
  gu: 'ગુજરાતી',
  kn: 'ಕನ್ನಡ',
  ml: 'മലയാളം',
  mr: 'मराठी',
  mni: 'মৈতৈলোন্',
  or: 'ଓଡ଼ିଆ',
  pa: 'ਪੰਜਾਬੀ',
  ne: 'नेपाली',
  ta: 'தமிழ்',
  bn: 'বাংলা',
  ur: 'اردو'
};

/**
 * Maps each regional language code to its representative primary Indian state/UT code
 */
export const LANGUAGE_TO_PRIMARY_STATE: Record<string, string> = {
  ml: 'KL',  // Malayalam -> Kerala
  kok: 'GA', // Konkani -> Goa
  or: 'OD',  // Odia -> Odisha
  ne: 'SK',  // Nepali -> Sikkim
  ur: 'JK',  // Urdu -> Jammu & Kashmir
  mni: 'MN', // Manipuri / Meitei -> Manipur
  as: 'AS',  // Assamese -> Assam
  pa: 'PB',  // Punjabi -> Punjab
  ta: 'TN',  // Tamil -> Tamil Nadu
  te: 'AP',  // Telugu -> Andhra Pradesh
  kn: 'KA',  // Kannada -> Karnataka
  bn: 'WB',  // Bengali -> West Bengal
  gu: 'GJ',  // Gujarati -> Gujarat
  mr: 'MH',  // Marathi -> Maharashtra
  hi: 'UP',  // Hindi -> Uttar Pradesh
  en: 'DL'   // English -> Delhi
};

/**
 * Returns allowed languages for a given ISO 3166-2:IN state code.
 */
export function getAllowedLanguagesForState(stateCode?: string | null): readonly [string, string] {
  if (!stateCode) return FALLBACK_LANGUAGES;
  const upper = stateCode.trim().toUpperCase();
  return REGION_LANGUAGE_MAP[upper] ?? FALLBACK_LANGUAGES;
}

/**
 * All unique supported locales across all states
 */
export const ALL_SUPPORTED_LOCALES = Array.from(
  new Set(Object.values(REGION_LANGUAGE_MAP).flat())
);

