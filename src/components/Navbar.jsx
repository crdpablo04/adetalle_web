import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Paquetes', href: '#paquetes' },
  { label: 'Menú', href: '#menu' },
  { label: 'Cotizar', href: '#cotizador' },
  { label: 'Preguntas', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (href) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-off-black/95 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group"
        >
          <img
            src="/images/adetalle_logo.jpg"
            alt="Adetalle"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="font-serif text-white text-lg tracking-tight">
            Adetalle
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleLink(l.href)}
              className="text-sm text-white/70 hover:text-white transition-colors duration-200 tracking-wide"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#cotizador"
          onClick={(e) => { e.preventDefault(); handleLink('#cotizador') }}
          className="hidden md:inline-flex items-center gap-2 bg-brand text-white text-sm font-medium px-5 py-2 rounded-full
            hover:bg-brand-light active:scale-[0.97] transition-all duration-200"
        >
          Reservar
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-1"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-off-black/98 backdrop-blur-md ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-6 pb-6 pt-2 gap-4">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleLink(l.href)}
              className="text-left text-white/80 hover:text-white text-base py-1 transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleLink('#cotizador')}
            className="mt-2 bg-brand text-white text-sm font-medium px-5 py-3 rounded-full text-center
              active:scale-[0.97] transition-all"
          >
            Reservar ahora
          </button>
        </nav>
      </div>
    </header>
  )
}
