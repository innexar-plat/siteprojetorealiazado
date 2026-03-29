import { useState, useRef } from 'react'
import { useLang } from '../../i18n/LangContext'
import './LanguageSwitcher.css'

export default function LanguageSwitcher() {
  const { locale, changeLocale, availableLocales } = useLang()
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const current = availableLocales.find(l => l.code === locale)

  const handleSelectLanguage = (code) => {
    changeLocale(code)
    setOpen(false)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setOpen(false)
    }
  }

  return (
    <div className={`lang-switcher ${open ? 'open' : ''}`} ref={containerRef}>
      <button
        className="lang-switcher__trigger"
        onClick={() => setOpen(o => !o)}
        aria-label="Change language"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="lang-switcher__flag">{current?.flag}</span>
        <span className="lang-switcher__code">{current?.code.toUpperCase()}</span>
        <svg
          className="lang-switcher__arrow"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <>
          <div 
            className="lang-switcher__dropdown" 
            role="listbox"
            aria-label="Available languages"
          >
            {availableLocales.map(lang => (
              <button
                key={lang.code}
                className={`lang-switcher__option ${lang.code === locale ? 'active' : ''}`}
                onClick={() => handleSelectLanguage(lang.code)}
                role="option"
                aria-selected={lang.code === locale}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
                {lang.code === locale && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ marginLeft: 'auto' }}>
                    <path d="M2.5 6l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
          <div 
            className="lang-switcher__backdrop" 
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  )
}
