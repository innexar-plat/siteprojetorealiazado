import { createContext, useContext, useState } from 'react'
import { translations, defaultLocale } from './translations'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [locale, setLocale] = useState(defaultLocale)
  const t = translations[locale]
  const changeLocale = (code) => {
    if (translations[code]) setLocale(code)
  }
  return (
    <LangContext.Provider value={{ locale, t, changeLocale, availableLocales: Object.values(translations).map(l => ({ code: l.code, flag: l.flag, label: l.label })) }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
