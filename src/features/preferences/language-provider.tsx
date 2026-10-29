"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { getPreferences, getServerPreferences, subscribePreferences, updatePreferences, type Language } from "./client-store";

const LanguageContext = createContext<Language>("th");

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { language } = useSyncExternalStore(subscribePreferences, getPreferences, getServerPreferences);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }
export function setLanguage(language: Language) { updatePreferences({ language }); }
