import { useState } from 'react'
import { BriefcaseBusiness, Calendar, CheckCircle2, FileCheck2, GraduationCap, MessageCircle, ShieldCheck, Trophy } from 'lucide-react'
import { useLang } from '../../i18n/LangContext'
import './Schedule.css'

const serviceOptions = [
  { id: 'licenca', label: { pt: 'Licença Profissional', en: 'Professional License', es: 'Licencia Profesional' }, duration: 45, Icon: Trophy, price: null },
  { id: 'traducao', label: { pt: 'Tradução Certificada', en: 'Certified Translation', es: 'Traducción Certificada' }, duration: 30, Icon: FileCheck2, price: null },
  { id: 'consultoria', label: { pt: 'Consultoria Empresarial', en: 'Business Consulting', es: 'Consultoría Empresarial' }, duration: 60, Icon: BriefcaseBusiness, price: null },
  { id: 'orientacao', label: { pt: 'Orientação Profissional', en: 'Career Guidance', es: 'Orientación Profesional' }, duration: 30, Icon: GraduationCap, price: null },
  { id: 'documentacao', label: { pt: 'Suporte em Documentação', en: 'Documentation Support', es: 'Soporte en Documentación' }, duration: 45, Icon: ShieldCheck, price: null },
]

function getDatesNextDays(n = 14) {
  const dates = []
  const today = new Date()
  for (let i = 1; i <= n; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    if (d.getDay() !== 0) dates.push(d) // exclude Sunday
  }
  return dates
}

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
]

// Simulated booked slots (in a real app this would come from a backend)
const bookedSlots = { '2': ['10:00', '14:00'], '4': ['09:30', '11:00'] }

function formatDate(date, locale) {
  return date.toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'es' ? 'es-ES' : 'pt-BR', {
    weekday: 'short', day: '2-digit', month: 'short',
  })
}

export default function Schedule() {
  const { t, locale } = useLang()
  const s = t.schedule

  const [step, setStep] = useState(1) // 1: service, 2: date/time, 3: details, 4: success
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const dates = getDatesNextDays(14)

  const getAvailableSlots = (date) => {
    if (!date) return timeSlots
    const dayIndex = date.getDay().toString()
    const booked = bookedSlots[dayIndex] || []
    return timeSlots.filter(t => !booked.includes(t))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = true
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = true
    if (!form.phone.trim()) e.phone = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    setStep(4)
  }

  const reset = () => {
    setStep(1)
    setSelectedService(null)
    setSelectedDate(null)
    setSelectedTime(null)
    setForm({ name: '', email: '', phone: '', notes: '' })
    setErrors({})
  }

  return (
    <section id="agendar" className="section section--darker schedule">
      <div className="container">
        {/* Header */}
        <div className="section-title section-title--center reveal">
          <div className="badge" style={{ margin: '0 auto 1rem' }}><Calendar size={14} /> {s.badge}</div>
          <h2>
            {s.title1} <span className="text-gradient">{s.title2}</span>
          </h2>
          <div className="divider" />
          <p>{s.subtitle}</p>
        </div>

        <div className="schedule__wrapper">
          {/* Progress Steps */}
          {step < 4 && (
            <div className="schedule__progress">
              {[1, 2, 3].map(n => (
                <div key={n} className={`schedule__step ${step >= n ? 'active' : ''} ${step > n ? 'done' : ''}`}>
                  <div className="schedule__step-num">
                    {step > n ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : n}
                  </div>
                  <span>
                    {n === 1 ? (locale === 'en' ? 'Service' : locale === 'es' ? 'Servicio' : 'Serviço') :
                     n === 2 ? (locale === 'en' ? 'Date & Time' : locale === 'es' ? 'Fecha & Hora' : 'Data & Hora') :
                     (locale === 'en' ? 'Your Info' : locale === 'es' ? 'Tus Datos' : 'Seus Dados')}
                  </span>
                  {n < 3 && <div className="schedule__step-line" />}
                </div>
              ))}
            </div>
          )}

          <div className="schedule__content">
            {/* Step 1: Service */}
            {step === 1 && (
              <div className="schedule__panel animate-scale-in">
                <h3 className="schedule__panel-title">{s.selectService}</h3>
                <div className="schedule__services">
                  {serviceOptions.map(svc => (
                    <button
                      key={svc.id}
                      className={`schedule__service-card ${selectedService?.id === svc.id ? 'selected' : ''}`}
                      onClick={() => setSelectedService(svc)}
                    >
                      <span className="schedule__service-icon"><svc.Icon size={18} /></span>
                      <div>
                        <strong>{svc.label[locale] || svc.label.pt}</strong>
                        <p>{svc.duration} min · {s.free}</p>
                      </div>
                      <div className="schedule__service-check">
                        {selectedService?.id === svc.id && (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8l4 4 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  className="btn btn-primary schedule__next"
                  disabled={!selectedService}
                  onClick={() => setStep(2)}
                >
                  {locale === 'en' ? 'Continue' : locale === 'es' ? 'Continuar' : 'Continuar'}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <div className="schedule__panel animate-scale-in">
                <div className="schedule__date-time">
                  <div className="schedule__dates">
                    <h3 className="schedule__panel-title">{s.selectDate}</h3>
                    <div className="schedule__dates-grid">
                      {dates.map((d, i) => (
                        <button
                          key={i}
                          className={`schedule__date-btn ${selectedDate === i ? 'selected' : ''}`}
                          onClick={() => { setSelectedDate(i); setSelectedTime(null) }}
                        >
                          {formatDate(d, locale)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="schedule__times">
                    <h3 className="schedule__panel-title">{s.avail}</h3>
                    {selectedDate === null ? (
                      <p className="schedule__no-date">
                        {locale === 'en' ? 'Select a date first' : locale === 'es' ? 'Selecciona una fecha primero' : 'Selecione uma data primeiro'}
                      </p>
                    ) : (
                      <div className="schedule__times-grid">
                        {getAvailableSlots(dates[selectedDate]).map(slot => (
                          <button
                            key={slot}
                            className={`schedule__time-btn ${selectedTime === slot ? 'selected' : ''}`}
                            onClick={() => setSelectedTime(slot)}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="schedule__nav">
                  <button className="btn btn-ghost" onClick={() => setStep(1)}>
                    ← {locale === 'en' ? 'Back' : locale === 'es' ? 'Atrás' : 'Voltar'}
                  </button>
                  <button
                    className="btn btn-primary"
                    disabled={selectedDate === null || !selectedTime}
                    onClick={() => setStep(3)}
                  >
                    {locale === 'en' ? 'Continue' : locale === 'es' ? 'Continuar' : 'Continuar'} →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Personal Info */}
            {step === 3 && (
              <div className="schedule__panel animate-scale-in">
                <div className="schedule__with-summary">
                  {/* Summary sidebar */}
                  <div className="schedule__summary">
                    <h4>{s.summaryTitle}</h4>
                    <div className="schedule__summary-item">
                      <span>{selectedService?.Icon ? <selectedService.Icon size={16} /> : null}</span>
                      <div>
                        <strong>{selectedService?.label[locale] || selectedService?.label.pt}</strong>
                        <p>{selectedService?.duration} min</p>
                      </div>
                    </div>
                    {selectedDate !== null && (
                      <div className="schedule__summary-item">
                        <span><Calendar size={16} /></span>
                        <div>
                          <strong>{formatDate(dates[selectedDate], locale)}</strong>
                          <p>{selectedTime}</p>
                        </div>
                      </div>
                    )}
                    <div className="schedule__summary-free">
                      <span><CheckCircle2 size={16} /></span> {s.free}
                    </div>
                  </div>

                  {/* Form */}
                  <form className="schedule__form" onSubmit={handleSubmit} noValidate>
                    <div className={`schedule__field ${errors.name ? 'error' : ''}`}>
                      <label>{s.yourName} *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder={s.yourName}
                        autoComplete="name"
                      />
                    </div>
                    <div className={`schedule__field ${errors.email ? 'error' : ''}`}>
                      <label>{s.yourEmail} *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder={s.yourEmail}
                        autoComplete="email"
                      />
                    </div>
                    <div className={`schedule__field ${errors.phone ? 'error' : ''}`}>
                      <label>{s.yourPhone} *</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="+1 (689) 000-0000"
                        autoComplete="tel"
                      />
                    </div>
                    <div className="schedule__field">
                      <label>{s.notes}</label>
                      <textarea
                        value={form.notes}
                        onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                        placeholder={locale === 'en' ? 'Any specific questions or details...' : locale === 'es' ? 'Preguntas o detalles específicos...' : 'Dúvidas ou detalhes específicos...'}
                        rows={3}
                      />
                    </div>

                    <div className="schedule__nav">
                      <button type="button" className="btn btn-ghost" onClick={() => setStep(2)}>
                        ← {locale === 'en' ? 'Back' : locale === 'es' ? 'Atrás' : 'Voltar'}
                      </button>
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? s.processing : s.btnSchedule}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <div className="schedule__success animate-scale-in">
                <div className="schedule__success-icon"><CheckCircle2 size={54} /></div>
                <h3>{s.successTitle}</h3>
                <p>{s.successDesc}</p>
                <div className="schedule__success-details">
                  <div className="schedule__summary-item">
                    <span>{selectedService?.Icon ? <selectedService.Icon size={16} /> : null}</span>
                    <div>
                      <strong>{selectedService?.label[locale] || selectedService?.label.pt}</strong>
                      <p>{selectedDate !== null && formatDate(dates[selectedDate], locale)} · {selectedTime}</p>
                    </div>
                  </div>
                </div>
                <div className="schedule__success-actions">
                  <a
                    href={`https://wa.me/16895006289?text=${encodeURIComponent(`Olá! Acabei de agendar uma consulta de ${selectedService?.label.pt} para ${selectedDate !== null ? formatDate(dates[selectedDate], 'pt') : ''} às ${selectedTime}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                  <button className="btn btn-outline" onClick={reset}>
                    {s.scheduleAnother}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
