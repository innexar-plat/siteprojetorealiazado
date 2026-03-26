import { useState, useEffect } from 'react'
import { useLang } from '../../i18n/LangContext'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import logoImg from '../../images/logo.png'
import './Navbar.css'

export default function Navbar() {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#sobre', label: t.nav.about },
    { href: '#servicos', label: t.nav.services },
    { href: '#licencas', label: t.nav.licenses },
    { href: '#agendar', label: t.nav.schedule },
    { href: '#contato', label: t.nav.contact },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = ['home', 'sobre', 'servicos', 'licencas', 'agendar', 'planos', 'contato']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveLink(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    setActiveLink(href)
  }

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">
          {/* Logo */}
          <a href="#home" className="navbar__logo" onClick={() => handleNavClick('#home')}>
            <img className="navbar__logo-icon" src={logoImg} alt="Projeto Realizado logo" />
            <div className="navbar__logo-text">
              <span className="navbar__logo-main">Projeto Realizado</span>
              <span className="navbar__logo-sub">Bee Translations & Services</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="navbar__nav">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`navbar__link ${activeLink === href ? 'navbar__link--active' : ''}`}
                onClick={() => handleNavClick(href)}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="navbar__actions">
            <LanguageSwitcher />
            <a href="#contato" className="btn btn-primary navbar__cta" onClick={() => handleNavClick('#contato')}>
              {t.nav.cta}
            </a>
          </div>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        <div className="navbar__mobile-lang">
          <LanguageSwitcher />
        </div>
        <nav className="navbar__mobile-nav">
          {navLinks.map(({ href, label }, i) => (
            <a
              key={href}
              href={href}
              className={`navbar__mobile-link ${activeLink === href ? 'active' : ''}`}
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => handleNavClick(href)}
            >
              {label}
            </a>
          ))}
          <a href="#contato" className="btn btn-primary" onClick={() => handleNavClick('#contato')}>
            {t.nav.cta}
          </a>
        </nav>
      </div>
    </>
  )
}
