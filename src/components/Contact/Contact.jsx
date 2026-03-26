import { useState, useRef, useEffect } from 'react'
import { Camera, CheckCircle2, Globe, Mail, MessageCircle, Phone, Send, Timer } from 'lucide-react'
import { useLang } from '../../i18n/LangContext'
import './Contact.css'

export default function Contact() {
  const { t } = useLang()
  const c = t.contact
  const sectionRef = useRef(null)

  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

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

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = true
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = true
    if (!form.phone.trim()) e.phone = true
    if (!form.message.trim()) e.message = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setSending(true)
    await new Promise(r => setTimeout(r, 1600))
    setSending(false)
    setSuccess(true)
  }

  const contactCards = [
    {
      Icon: Phone,
      label: c.phone_label,
      value: '+1 (689) 500-6289',
      link: 'tel:+16895006289',
      sub: 'Call / Text / WhatsApp',
    },
    {
      Icon: Mail,
      label: c.email_label,
      value: 'ary.servicesusa@gmail.com',
      link: 'mailto:ary.servicesusa@gmail.com',
      sub: null,
    },
    {
      Icon: Timer,
      label: c.hours_label,
      value: c.hours_val,
      link: null,
      sub: null,
    },
  ]

  const socials = [
    { Icon: Globe, label: 'Facebook', href: 'https://www.facebook.com/beetranslationsandservices/' },
    { Icon: Camera, label: 'Instagram', href: 'https://www.instagram.com/aryaneky' },
    { Icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/16895006289' },
  ]

  return (
    <section id="contato" className="section section--card contact" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="section-title section-title--center reveal">
          <div className="badge" style={{ margin: '0 auto 1rem' }}><MessageCircle size={14} /> {c.badge}</div>
          <h2>
            {c.title1} <span className="text-gradient">{c.title2}</span>
          </h2>
          <div className="divider" />
          <p>{c.subtitle}</p>
        </div>

        <div className="contact__inner">
          {/* Left: Info */}
          <div className="contact__info reveal-left">
            {contactCards.map((card, i) => (
              <div key={i} className="contact__card">
                <div className="contact__card-icon"><card.Icon size={18} /></div>
                <div className="contact__card-content">
                  <span className="contact__card-label">{card.label}</span>
                  {card.link ? (
                    <a href={card.link} className="contact__card-value contact__card-value--link">
                      {card.value}
                    </a>
                  ) : (
                    <span className="contact__card-value">{card.value}</span>
                  )}
                  {card.sub && <span className="contact__card-sub">{card.sub}</span>}
                </div>
              </div>
            ))}

            {/* Socials */}
            <div className="contact__socials">
              <p className="contact__socials-label">{c.follow}</p>
              <div className="contact__socials-row">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-btn"
                    aria-label={s.label}
                  >
                    <span><s.Icon size={14} /></span>
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp quick CTA */}
            <a
              href="https://wa.me/16895006289"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__whatsapp-btn"
            >
              <span className="contact__whatsapp-icon"><MessageCircle size={24} /></span>
              <div>
                <strong>WhatsApp</strong>
                <span>Resposta rápida · &lt;30min</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 'auto' }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Right: Form */}
          <div className="contact__form-wrap reveal-right">
            {success ? (
              <div className="contact__success animate-scale-in">
                <div className="contact__success-icon"><CheckCircle2 size={56} /></div>
                <h3>{c.successMsg}</h3>
                <p>Entraremos em contato em breve no e-mail ou telefone informado.</p>
                <button className="btn btn-outline" onClick={() => { setSuccess(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }) }}>
                  {t.locale === 'en' ? 'New Message' : 'Nova Mensagem'}
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className="contact__form-row">
                  <div className={`contact__field ${errors.name ? 'error' : ''}`}>
                    <label>{c.name} *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder={c.name}
                      autoComplete="name"
                    />
                  </div>
                  <div className={`contact__field ${errors.email ? 'error' : ''}`}>
                    <label>{c.email} *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder={c.email}
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className="contact__form-row">
                  <div className={`contact__field ${errors.phone ? 'error' : ''}`}>
                    <label>{c.phone} *</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+1 (689) 000-0000"
                      autoComplete="tel"
                    />
                  </div>
                  <div className="contact__field">
                    <label>{c.service}</label>
                    <select
                      value={form.service}
                      onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                    >
                      {c.serviceOptions.map((opt, i) => (
                        <option key={i} value={i === 0 ? '' : opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={`contact__field ${errors.message ? 'error' : ''}`}>
                  <label>{c.message} *</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder={c.messagePlaceholder}
                    rows={5}
                  />
                </div>
                <button type="submit" className="btn btn-primary contact__submit" disabled={sending}>
                  {sending ? c.sending : c.send}
                  {!sending && (
                    <Send size={16} />
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
