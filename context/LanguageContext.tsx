import React, { createContext, useState, useContext, ReactNode } from 'react'
import { I18n } from 'i18n-js'
import { en, ru, uz } from '@/languages'

interface LanguageContextType {
  locale: string
  changeLanguage: (lang: 'en' | 'ru' | 'uz') => void
}

export const i18n = new I18n({ en, ru, uz })

// Fallback til
i18n.enableFallback = true

// Language kontekstini yaratish
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Provider yaratish
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState(i18n.locale || 'en')

  const changeLanguage = (lang: string) => {
    i18n.locale = lang
    setLocale(lang)
  }

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook - contextdan foydalanish uchun
export const useLanguage = () => {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}
