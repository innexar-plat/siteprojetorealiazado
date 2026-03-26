import { useEffect, useRef } from 'react'
import { BadgeCheck, BriefcaseBusiness, FileCheck2, FolderCheck, Gauge, GraduationCap, Wrench } from 'lucide-react'
import { useLang } from '../../i18n/LangContext'
import './Services.css'

const SERVICE_COLORS = ['#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B']
const SERVICE_ICONS = [FileCheck2, BadgeCheck, BriefcaseBusiness, GraduationCap, FolderCheck, Gauge]

function ServiceCard({ service, index, hint, learnMore }) {
  const flippedRef = useRef(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), index * 100)
          }
        })
      },
      { threshold: 0.1 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={cardRef}
      className="service-card reveal"
      tabIndex={0}
      onClick={() => {
        flippedRef.current = !flippedRef.current
        cardRef.current?.classList.toggle('service-card--manual-flipped', flippedRef.current)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          flippedRef.current = !flippedRef.current
          cardRef.current?.classList.toggle('service-card--manual-flipped', flippedRef.current)
        }
      }}
    >
      <div className="service-card__inner">
        {/* Front */}
        <div className="service-card__face service-card__face--front">
          {service.badge && (
            <div className="service-card__badge" style={{ '--badge-color': service.color }}>
              {service.badge}
            </div>
          )}
          <div className="service-card__icon" style={{ '--icon-color': service.color }}>
            <service.Icon size={24} />
          </div>
          <h3 className="service-card__title">{service.title}</h3>
          <p className="service-card__desc">{service.desc}</p>
          <div className="service-card__hint">
            <span>{hint}</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="service-card__glow" style={{ '--glow-color': service.color }} />
        </div>

        {/* Back */}
        <div className="service-card__face service-card__face--back">
          <div className="service-card__icon service-card__icon--back" style={{ '--icon-color': service.color }}>
            <service.Icon size={24} />
          </div>
          <h3 className="service-card__title">{service.title}</h3>
          <ul className="service-card__features">
            {service.features.map((f, i) => (
              <li key={i}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7l3 3 6-6" stroke={service.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <a href="#contato" className="btn btn-primary service-card__cta" style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}cc)` }}>
            {learnMore}
          </a>
          <div className="service-card__glow" style={{ '--glow-color': service.color }} />
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const { t } = useLang()
  const s = t.services
  const services = s.items.map((item, i) => ({ ...item, color: SERVICE_COLORS[i], Icon: SERVICE_ICONS[i] }))
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal:not(.service-card)').forEach(el => {
              el.classList.add('visible')
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="servicos" className="section section--dark services" ref={sectionRef}>
      {/* Background decoration */}
      <div className="services__bg">
        <div className="services__bg-orb services__bg-orb--1" />
        <div className="services__bg-orb services__bg-orb--2" />
      </div>

      <div className="container">
        <div className="section-title section-title--center reveal">
          <div className="badge" style={{ margin: '0 auto 1rem' }}><Wrench size={14} /> {s.badge}</div>
          <h2>
            {s.title1} <span className="text-gradient">{s.title2}</span>
          </h2>
          <div className="divider" />
          <p>{s.subtitle}</p>
        </div>

        <div className="services__grid">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} hint={s.hoverHint} learnMore={s.learnMore} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="services__cta reveal">
            <p>{s.ctaText}</p>
            <a href="#contato" className="btn btn-primary">
              {s.ctaBtn}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
