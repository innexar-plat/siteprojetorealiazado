import { useEffect, useRef } from 'react'
import { Award, BadgeCheck, FileCheck2, Globe, MapPin, Zap } from 'lucide-react'
import { useLang } from '../../i18n/LangContext'
import logoImg from '../../images/logo.png'
import arianePhoto from '../../images/fotoariane.jpeg'
import './Hero.css'

const cardIcons = [BadgeCheck, FileCheck2, Zap, Globe]

export default function Hero() {
  const { t } = useLang()
  const h = t.hero
  const heroCards = h.cards.map((c, i) => ({ ...c, Icon: cardIcons[i] }))
  const particlesRef = useRef(null)

  useEffect(() => {
    const container = particlesRef.current
    if (!container) return
    const count = 20
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div')
      dot.className = 'hero__particle'
      dot.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        animation-delay: ${Math.random() * 8}s;
        animation-duration: ${Math.random() * 8 + 6}s;
        opacity: ${Math.random() * 0.5 + 0.1};
      `
      container.appendChild(dot)
    }
    return () => container.replaceChildren()
  }, [])

  return (
    <section id="home" className="hero">
      {/* Ambient background */}
      <div className="hero__bg">
        <div className="hero__bg-glow hero__bg-glow--1" />
        <div className="hero__bg-glow hero__bg-glow--2" />
        <div className="hero__bg-grid" />
      </div>

      {/* Particles */}
      <div className="hero__particles" ref={particlesRef} />

      <div className="container hero__inner">
        {/* Content */}
        <div className="hero__content">
          <div className="badge animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <img src={logoImg} alt="Projeto Realizado" className="hero__badge-logo" />
            {h.badge}
          </div>

          <h1 className="hero__title animate-fade-up" style={{ animationDelay: '0.25s' }}>
            {h.title1}{' '}
            <span className="text-gradient">{h.title2}</span>
            <br />{h.title3} <em className="hero__title-italic">{h.title4}</em>
          </h1>

          <p className="hero__subtitle animate-fade-up" style={{ animationDelay: '0.4s' }}>
            {h.subtitle}
          </p>

          <div className="hero__actions animate-fade-up" style={{ animationDelay: '0.55s' }}>
            <a href="#servicos" className="btn btn-primary">
              <span>{h.btnServices}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contato" className="btn btn-outline">
              {h.btnContact}
            </a>
          </div>

          <div className="hero__trust animate-fade-up" style={{ animationDelay: '0.7s' }}>
            <div className="hero__trust-avatars">
              {['A','B','C','D'].map((l, i) => (
                <span key={i} className="hero__trust-avatar">{l}</span>
              ))}
            </div>
            <p>{h.trust}</p>
          </div>
        </div>

        {/* Floating 3D Card */}
        <div className="hero__visual animate-fade-right" style={{ animationDelay: '0.3s' }}>
          <div className="hero__visual-card animate-float">
            <div className="hero__visual-card-inner">
              <div className="hero__visual-badge">
                <Award size={14} /> {h.certLabel}
              </div>
              <img
                src={arianePhoto}
                alt="Ariane Kyriakidis"
                className="hero__visual-photo"
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
              <h3>Ariane Kyriakidis</h3>
              <p>{h.profileRole}</p>
              <div className="hero__visual-bar">
                <div className="hero__visual-bar-fill" />
              </div>
              <span className="hero__visual-status"><MapPin size={12} /> {h.profileStatus}</span>
            </div>
            {/* Glow ring */}
            <div className="hero__visual-ring" />
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="container hero__cards">
        {heroCards.map((card, i) => (
          <div
            key={i}
            className="hero__card animate-fade-up"
            style={{ animationDelay: `${0.6 + i * 0.1}s` }}
          >
            <div className={`hero__card-icon hero__card-icon--${i}`}>
              <card.Icon size={22} />
            </div>
            <div>
              <div className="hero__card-value">{card.value}</div>
              <div className="hero__card-label">{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span>{h.scroll}</span>
      </div>
    </section>
  )
}
