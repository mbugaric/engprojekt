export type Language = "hr" | "en";

export const translations: Record<Language, Record<string, string>> = {
  hr: {
    home: "Početna",
    projects: "Projekti",
    references: "Reference",
    about: "O nama",
    contact: "Kontakt",
    language: "Jezik",
  },
  en: {
    home: "Home",
    projects: "Projects",
    references: "References",
    about: "About",
    contact: "Contact",
    language: "Language",
  },
};