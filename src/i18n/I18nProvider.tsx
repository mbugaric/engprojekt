import React, { useState } from "react";
import { I18nContext } from "./I18nContext";
import { translations, Language } from "./I18nConfig";

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("hr");

  const t = (key: string) => translations[language][key] || key;

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};