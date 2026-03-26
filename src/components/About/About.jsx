import { Fragment, useEffect, useRef } from 'react'
import { Award, BriefcaseBusiness, Scissors, Soup, Hotel } from 'lucide-react'
import { useLang } from '../../i18n/LangContext'
import arianePhoto from '../../images/fotoariane.jpeg'
import './About.css'

export default function About() {
  const { t } = useLang()
  const a = t.about
  const sectionRef = useRef(null)

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
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const highlights = a.industries.map((label, i) => ({
    icon: [Soup, Scissors, BriefcaseBusiness, Hotel][i],
    label,
  }))

  return (
    <section id="sobre" className="section section--darker about" ref={sectionRef}>
      <div className="container about__inner">

        {/* Left: Visual */}
        <div className="about__visual reveal-left">
          <div className="about__card-wrapper">
            {/* Main card */}
            <div className="about__card about__card--main">
              <div className="about__avatar">
                <div className="about__avatar-inner">
                  <img
                    src={arianePhoto}
                    alt="Ariane Kyriakidis"
                    className="about__avatar-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="about__avatar-ring" />
              </div>
              <div className="about__card-info">
                <h3>Ariane Kyriakidis</h3>
                <p>{a.role}</p>
                <div className="about__card-tag">{a.certTag}</div>
              </div>
            </div>

            {/* Experience card */}
            <div className="about__card about__card--exp">
              <span className="about__card-exp-icon"><Award size={20} /></span>
              <div>
                <strong>{a.expCard}</strong>
                <p>{a.expSub}</p>
              </div>
            </div>

            {/* Industries */}
            <div className="about__industries">
              {highlights.map((h, i) => (
                <div key={i} className="about__industry">
                  <span><h.icon size={18} /></span>
                  <small>{h.label}</small>
                </div>
              ))}
            </div>

            {/* Decorative glow */}
            <div className="about__glow" />
          </div>
        </div>

        {/* Right: Content */}
        <div className="about__content">
          <div className="badge reveal delay-100">{a.badge}</div>

          <div className="section-title reveal delay-200">
            <h2>
              {a.title1} <span className="text-gradient">{a.title2}</span>
            </h2>
            <div className="divider divider--left" />
          </div>

          <p className="about__text reveal delay-300">
            {a.text1}
          </p>

          <p className="about__text reveal delay-400">
            {a.text2}
          </p>

          <div className="about__stats reveal delay-400">
            {a.stats.map((s, i) => (
              <Fragment key={i}>
                {i > 0 && <div className="about__stat-divider" />}
                <div className="about__stat">
                  <span className="about__stat-value text-gradient">{s.value}</span>
                  <span className="about__stat-label">{s.label}</span>
                </div>
              </Fragment>
            ))}
          </div>

          <div className="about__actions reveal delay-500">
            <a href="#contato" className="btn btn-primary">
              {a.btn1}
            </a>
            <a href="#servicos" className="btn btn-ghost">
              {a.btn2}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
