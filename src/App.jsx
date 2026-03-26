import { useEffect, useState } from 'react'
import { Moon, Sparkles, Sun, X } from 'lucide-react'
import { LangProvider } from './i18n/LangContext'
import { useLang } from './i18n/LangContext'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Services from './components/Services/Services'
import Licenses from './components/Licenses/Licenses'
import Schedule from './components/Schedule/Schedule'
import Payment from './components/Payment/Payment'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

function ThemeAssist() {
  const { locale } = useLang()
  const [theme, setTheme] = useState(() => localStorage.getItem('site-theme') || 'dark')
  const [showPopup, setShowPopup] = useState(() => localStorage.getItem('theme-popup-seen') !== '1')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('site-theme', theme)
  }, [theme])

  const copy = {
    pt: {
      title: 'Modelo Exclusivo Para Voce',
      desc: 'Este site e um modelo criado exclusivamente para o seu negocio. Para alternar entre tema escuro e claro, clique no botao com o icone de sol/lua.',
      ok: 'Entendi',
      btn: 'Tema',
    },
    en: {
      title: 'Exclusive Custom Demo',
      desc: 'This website is an exclusive model created for your business. Click the sun/moon button to switch between dark and light theme.',
      ok: 'Got it',
      btn: 'Theme',
    },
    es: {
      title: 'Modelo Exclusivo',
      desc: 'Este sitio es un modelo creado exclusivamente para su negocio. Haga clic en el boton de sol/luna para cambiar entre tema oscuro y claro.',
      ok: 'Entendido',
      btn: 'Tema',
    },
  }[locale] || {
    title: 'Modelo Exclusivo Para Voce',
    desc: 'Este site e um modelo criado exclusivamente para o seu negocio. Para alternar entre tema escuro e claro, clique no botao com o icone de sol/lua.',
    ok: 'Entendi',
    btn: 'Tema',
  }

  const closePopup = () => {
    setShowPopup(false)
    localStorage.setItem('theme-popup-seen', '1')
  }

  return (
    <>
      <button
        className="theme-toggle"
        onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
        aria-label="Toggle theme"
        title={copy.btn}
      >
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        <span>{copy.btn}</span>
      </button>

      {showPopup && (
        <div className="theme-popup" role="dialog" aria-modal="true" aria-label={copy.title}>
          <div className="theme-popup__card">
            <button className="theme-popup__close" onClick={closePopup} aria-label="Close">
              <X size={16} />
            </button>
            <div className="theme-popup__head">
              <Sparkles size={18} />
              <h3>{copy.title}</h3>
            </div>
            <p>{copy.desc}</p>
            <button className="btn btn-primary" onClick={closePopup}>{copy.ok}</button>
          </div>
        </div>
      )}
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Licenses />
        <Schedule />
        <Payment />
        <Contact />
      </main>
      <Footer />
      <ThemeAssist />
    </LangProvider>
  )
}
