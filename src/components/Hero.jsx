import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MapPin, ChevronDown } from 'lucide-react'

const occasions = [
  'Pedida de matrimonio',
  'Aniversario',
  'Cumpleaños',
  'Pedida de noviazgo',
]

export default function Hero() {
  const containerRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const pillsRef = useRef(null)
  const ctaRef = useRef(null)
  const imgRef = useRef(null)
  const badgeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
      .fromTo(headlineRef.current,
        { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.9 },
        '-=0.2'
      )
      .fromTo(subRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      )
      .fromTo(pillsRef.current?.children ? [...pillsRef.current.children] : [],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 },
        '-=0.3'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.2'
      )
      .fromTo(imgRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
        0.2
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-off-black"
    >
      {/* Background image */}
      <div ref={imgRef} className="absolute inset-0 opacity-0">
        <img
          src="/images/iglu_novia.jpg"
          alt="Cena romántica en Adetalle"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-off-black via-off-black/80 to-off-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-off-black/70 via-transparent to-transparent" />
      </div>

      {/* Noise texture overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 w-full">
        <div className="max-w-2xl">
          {/* Location badge */}
          <div
            ref={badgeRef}
            className="opacity-0 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 mb-8"
          >
            <MapPin size={13} className="text-rose" strokeWidth={2} />
            <span className="text-white/80 text-xs font-medium tracking-widest uppercase">
              Guadalajara, Jalisco · Zona RIU
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="opacity-0 font-serif text-5xl md:text-7xl text-white leading-[1.05] tracking-tight mb-6 text-balance"
          >
            El momento que<br />
            <em className="not-italic text-rose">recordarán</em><br />
            por siempre.
          </h1>

          {/* Subtext */}
          <p
            ref={subRef}
            className="opacity-0 text-white/65 text-base md:text-lg leading-relaxed max-w-[52ch] mb-8"
          >
            Diseñamos cenas románticas privadas con locaciones exclusivas, chef, mesero
            certificado y detalles que hacen que el corazón diga sí.
          </p>

          {/* Occasion pills */}
          <div ref={pillsRef} className="flex flex-wrap gap-2 mb-10">
            {occasions.map((o) => (
              <span
                key={o}
                className="opacity-0 text-xs font-medium text-white/70 border border-white/20 rounded-full px-3 py-1"
              >
                {o}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="opacity-0 flex flex-wrap gap-4">
            <a
              href="#paquetes"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#paquetes')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 bg-brand text-white font-semibold px-7 py-3.5 rounded-full
                hover:bg-brand-light active:scale-[0.97] transition-all duration-200 text-sm"
            >
              Ver paquetes
            </a>
            <a
              href="#cotizador"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#cotizador')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 text-white font-medium px-7 py-3.5 rounded-full border border-white/30
                hover:bg-white/10 active:scale-[0.97] transition-all duration-200 text-sm"
            >
              Cotizar ahora
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.querySelector('#nosotros')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
        aria-label="Scroll hacia abajo"
      >
        <span className="text-[10px] tracking-widest uppercase font-medium">Descubrir</span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>
    </section>
  )
}
