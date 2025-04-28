// src/i18n/I18nContext.ts
import { createContext } from "react";
import type { Language } from "./I18nConfig";

interface I18nContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextProps | undefined>(undefined);
