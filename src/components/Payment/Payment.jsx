import { useState } from 'react'
import { BadgeDollarSign, Crown, MessageCircle, ShieldCheck, Sparkles, Star, Wrench, Zap } from 'lucide-react'
import { useLang } from '../../i18n/LangContext'
import './Payment.css'

const planColors = ['#6366F1', '#F59E0B', '#8B5CF6']
const planIcons = [Zap, Sparkles, Crown]

export default function Payment() {
  const { t } = useLang()
  const p = t.payment
  const [billing, setBilling] = useState('monthly')
  const [hoveredPlan, setHoveredPlan] = useState(null)

  return (
    <section id="planos" className="section section--dark payment">
      {/* Background */}
      <div className="payment__bg">
        <div className="payment__bg-orb" />
      </div>

      <div className="container">
        {/* Header */}
        <div className="section-title section-title--center reveal">
          <div className="badge" style={{ margin: '0 auto 1rem' }}><BadgeDollarSign size={14} /> {p.badge}</div>
          <h2>
            {p.title1} <span className="text-gradient">{p.title2}</span>
          </h2>
          <div className="divider" />
          <p>{p.subtitle}</p>
        </div>

        {/* Billing toggle */}
        <div className="payment__toggle reveal">
          <button
            className={`payment__toggle-btn ${billing === 'monthly' ? 'active' : ''}`}
            onClick={() => setBilling('monthly')}
          >
            {p.monthly}
          </button>
          <button
            className={`payment__toggle-btn ${billing === 'once' ? 'active' : ''}`}
            onClick={() => setBilling('once')}
          >
            {p.oneTime}
            <span className="payment__save-badge">{p.save} 30%</span>
          </button>
        </div>

        {/* Plans grid */}
        <div className="payment__grid">
          {p.plans.map((plan, i) => {
            const isHighlight = plan.highlight
            const color = planColors[i]
            const Icon = planIcons[i]
            const price = billing === 'once'
              ? `$${Math.round(parseInt(plan.price.replace('$', '')) * 8)}`
              : plan.price

            return (
              <div
                key={i}
                className={`plan-card ${isHighlight ? 'plan-card--highlight' : ''} ${hoveredPlan === i ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredPlan(i)}
                onMouseLeave={() => setHoveredPlan(null)}
                style={{ '--plan-color': color }}
              >
                {isHighlight && (
                  <div className="plan-card__popular-badge">
                    <Star size={12} /> {p.popular}
                  </div>
                )}

                {/* Header */}
                <div className="plan-card__header">
                  <div className="plan-card__icon"><Icon size={22} /></div>
                  <div>
                    <h3 className="plan-card__name">{plan.name}</h3>
                    <p className="plan-card__desc">{plan.desc}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="plan-card__price-block">
                  <div className="plan-card__old-price">{plan.priceFull}</div>
                  <div className="plan-card__price">
                    <span className="plan-card__price-amount">{price}</span>
                    <span className="plan-card__price-period">{billing === 'once' ? '' : plan.period}</span>
                  </div>
                  {billing === 'once' && (
                    <div className="plan-card__once-label">
                      {p.oneTime} · {p.save} 30%
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="plan-card__features">
                  {plan.features.map((feat, j) => (
                    <li key={j}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7" fill={`${color}22`} stroke={color} strokeWidth="1.2"/>
                        <path d="M5 8l2.5 2.5 4-4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contato"
                  className={`plan-card__cta ${isHighlight ? 'plan-card__cta--primary' : 'plan-card__cta--outline'}`}
                  style={isHighlight ? { background: `linear-gradient(135deg, ${color}, ${color}bb)` } : { borderColor: color, color }}
                >
                  {plan.cta}
                </a>

                {/* Animated border glow */}
                {isHighlight && <div className="plan-card__glow-border" style={{ '--plan-color': color }} />}
              </div>
            )
          })}
        </div>

        {/* Payment methods */}
        <div className="payment__methods reveal">
          <div className="payment__secure">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L3 5v4c0 3.3 2.6 6.4 6 7 3.4-.6 6-3.7 6-7V5L9 2z" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.5 9l2 2 3-3" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {p.secure}
          </div>
          <div className="payment__methods-list">
            {['PIX', 'Visa', 'MC', 'PayPal', 'Transfer'].map((m, i) => (
              <div key={i} className="payment__method-badge">{m}</div>
            ))}
          </div>
          <div className="payment__guarantee">
            <span><ShieldCheck size={16} /></span> {p.guarantee}
          </div>
        </div>

        {/* Placeholder notice */}
        <div className="payment__placeholder-notice reveal">
          <div className="payment__placeholder-icon"><Wrench size={20} /></div>
          <div>
            <strong>Sistema de Pagamento em Implantação</strong>
            <p>
              Para contratar agora, entre em contato diretamente conosco via WhatsApp ou e-mail.
              Integração com gateway de pagamento em breve.
            </p>
          </div>
          <a
            href="https://wa.me/16895006289"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
