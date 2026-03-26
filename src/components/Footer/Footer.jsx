import { Camera, Globe, BriefcaseBusiness, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useLang } from '../../i18n/LangContext'
import logoImg from '../../images/logo.png'
import './Footer.css'

export default function Footer() {
  const { t } = useLang()
  const f = t.footer

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#sobre', label: t.nav.about },
    { href: '#servicos', label: t.nav.services },
    { href: '#licencas', label: t.nav.licenses },
    { href: '#agendar', label: t.nav.schedule },
    { href: '#contato', label: t.nav.contact },
  ]

  const services = [
    { href: '#servicos', label: t.services.items[0].title },
    { href: '#servicos', label: t.services.items[1].title },
    { href: '#servicos', label: t.services.items[2].title },
    { href: '#licencas', label: t.services.items[3].title },
  ]

  const socials = [
    { Icon: Globe, label: 'Facebook', href: 'https://www.facebook.com/beetranslationsandservices/' },
    { Icon: Camera, label: 'Instagram', href: 'https://www.instagram.com/aryaneky' },
    { Icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/16895006289' },
    { Icon: BriefcaseBusiness, label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ]

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__glow" />
        <div className="container footer__inner">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <img className="footer__logo-icon" src={logoImg} alt="Projeto Realizado logo" />
              <div>
                <span className="footer__logo-main">Projeto Realizado</span>
                <span className="footer__logo-sub">Bee Translations & Services</span>
              </div>
            </div>
            <p className="footer__tagline">{f.tagline}</p>
            <div className="footer__socials">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social"
                  aria-label={s.label}
                >
                  <s.Icon size={17} />
                </a>
              ))}
            </div>
            <a href="#contato" className="footer__cta btn btn-primary">
              {t.nav.cta}
            </a>
          </div>

          {/* Links */}
          <div className="footer__col">
            <h4>{f.links}</h4>
            <ul>
              {navLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4>{f.services}</h4>
            <ul>
              {services.map((s, i) => (
                <li key={i}>
                  <a href={s.href}>{s.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4>{t.nav.contact}</h4>
            <ul className="footer__contact-list">
              <li>
                <span><Phone size={14} /></span>
                <a href="tel:+16895006289">+1 (689) 500-6289</a>
              </li>
              <li>
                <span><Mail size={14} /></span>
                <a href="mailto:ary.servicesusa@gmail.com">ary.servicesusa@gmail.com</a>
              </li>
              <li>
                <span><MapPin size={14} /></span>
                <span>Florida, USA</span>
              </li>
            </ul>
            <a
              href="https://wa.me/16895006289"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__whatsapp"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>{f.rights}</p>
          <p className="footer__made">{f.made}</p>
          <div className="footer__legal">
            <a href="#">{f.privacy}</a>
            <a href="#">{f.terms}</a>
          </div>
        </div>
        <div className="container">
          <p className="footer__dev-credit">desenvolvido por Innexar LLC</p>
        </div>
      </div>
    </footer>
  )
}
