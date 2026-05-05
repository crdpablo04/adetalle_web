import { Heart } from 'lucide-react'

const navLinks = [
  { label: 'Sobre nosotros', href: '#nosotros' },
  { label: 'Paquetes', href: '#paquetes' },
  { label: 'Menú', href: '#menu' },
  { label: 'Cotizar', href: '#cotizador' },
  { label: 'Preguntas', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Footer() {
  const handleNav = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-off-black border-t border-white/6">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-start">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/images/adetalle_logo.jpg"
                alt="Adetalle"
                className="h-9 w-9 rounded-full object-cover"
              />
              <span className="font-serif text-white text-xl tracking-tight">Adetalle</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-[40ch]">
              Creando experiencias románticas inolvidables en Guadalajara, Jalisco.
            </p>
            <a
              href="https://instagram.com/adetalle.gdl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/30 hover:text-white/70 text-xs mt-4 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              @adetalle.gdl
            </a>
          </div>

          {/* Nav links */}
          <nav className="grid grid-cols-2 gap-x-12 gap-y-3">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="text-left text-white/40 hover:text-white/80 text-sm transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/6 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} Adetalle. Guadalajara, Jalisco.
          </p>
          <p className="text-white/20 text-xs flex items-center gap-1.5">
            Hecho con <Heart size={11} className="text-rose fill-rose" /> para quienes aman amar.
          </p>
        </div>
      </div>
    </footer>
  )
}
