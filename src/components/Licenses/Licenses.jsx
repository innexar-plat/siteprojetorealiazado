import { useEffect, useRef, useState } from 'react'
import { ClipboardList, Hand, Hammer, House, Palette, Scissors, Search, ShieldCheck, Stethoscope, Wrench, Zap } from 'lucide-react'
import { useLang } from '../../i18n/LangContext'
import './Licenses.css'

const LICENSE_DATA = [
  { Icon: Hand, area: 'beauty', color: '#EC4899' },
  { Icon: Scissors, area: 'beauty', color: '#8B5CF6' },
  { Icon: Wrench, area: 'construction', color: '#3B82F6' },
  { Icon: Zap, area: 'construction', color: '#F59E0B' },
  { Icon: Hammer, area: 'construction', color: '#EF4444' },
  { Icon: Stethoscope, area: 'health', color: '#10B981' },
  { Icon: Hand, area: 'healthBeauty', color: '#06B6D4' },
  { Icon: Palette, area: 'artsBeauty', color: '#F97316' },
  { Icon: ShieldCheck, area: 'finance', color: '#6366F1' },
  { Icon: House, area: 'realty', color: '#14B8A6' },
]

export default function Licenses() {
  const { t } = useLang()
  const l = t.licenses
  const sectionRef = useRef(null)

  const licenses = LICENSE_DATA.map((d, i) => ({
    ...d,
    title: l.items[i].title,
    time: l.items[i].time,
  }))

  const [activeArea, setActiveArea] = useState('all')
  const areas = ['all', ...new Set(LICENSE_DATA.map(d => d.area))]
  const filtered = activeArea === 'all'
    ? licenses
    : licenses.filter(lic => lic.area === activeArea)

  const areaLabel = (key) => {
    if (key === 'all') return l.filterAll
    return l.areaLabels?.[key] ?? key
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
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
    <section id="licencas" className="section section--card licenses" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="section-title section-title--center reveal">
          <div className="badge" style={{ margin: '0 auto 1rem' }}><ClipboardList size={14} /> {l.badge}</div>
          <h2>
            {l.title1} <span className="text-gradient">{l.title2}</span>
          </h2>
          <div className="divider" />
          <p>{l.subtitle}</p>
        </div>

        {/* Filter tabs */}
        <div className="licenses__filters reveal">
          {areas.map(area => (
            <button
              key={area}
              className={`licenses__filter ${activeArea === area ? 'licenses__filter--active' : ''}`}
              onClick={() => setActiveArea(area)}
            >
              {areaLabel(area)}
            </button>
          ))}
        </div>

        {/* License grid */}
        <div className="licenses__grid">
          {filtered.map((lic, i) => (
            <div
              key={lic.title}
              className="license-card"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="license-card__icon" style={{ '--lic-color': lic.color }}>
                <lic.Icon size={24} />
              </div>
              <div className="license-card__content">
                <h3>{lic.title}</h3>
                <div className="license-card__meta">
                  <span className="license-card__area">{areaLabel(lic.area)}</span>
                  <span className="license-card__time">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M6 3.5v2.8l1.8 1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    {lic.time}
                  </span>
                </div>
              </div>
              <a href="#contato" className="license-card__cta">
                {l.start}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <div className="license-card__bar" style={{ '--bar-color': lic.color }} />
            </div>
          ))}
        </div>

        {/* Other professions banner */}
        <div className="licenses__other reveal">
          <span className="licenses__other-icon"><Search size={28} /></span>
          <div>
            <strong>{l.otherTitle}</strong>
            <p>{l.otherDesc}</p>
          </div>
           <a href="#contato" className="btn btn-outline">{l.otherBtn}</a>
        </div>

        {/* Process steps */}
        <div className="licenses__steps">
          <div className="section-title section-title--center reveal">
            <h2 className="licenses__steps-title">
              {l.howTitle1} <span className="text-gradient">{l.howTitle2}</span>
            </h2>
          </div>

          <div className="licenses__steps-grid">
            {l.steps.map((step, i) => (
              <div
                key={i}
                className="step-card reveal"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="step-card__num">{step.num}</div>
                <div className="step-card__connector" />
                <h3 className="step-card__title">{step.title}</h3>
                <p className="step-card__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
