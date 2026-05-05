import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Heart, ShieldCheck, Sparkles, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: Sparkles, value: '4', label: 'Locaciones únicas' },
  { icon: Heart, value: '+1,000', label: 'Momentos creados' },
  { icon: ShieldCheck, value: '100%', label: 'Privacidad garantizada' },
  { icon: MapPin, value: 'Zona RIU', label: 'Inmejorable ubicación' },
]

export default function SobreNosotros() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sobre-text',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )
      gsap.fromTo('.sobre-img',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1, duration: 0.9, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
      gsap.fromTo('.stat-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: '.stats-row', start: 'top 80%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="nosotros" ref={sectionRef} className="bg-cream py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Split layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center mb-24">

          {/* Left: Content */}
          <div>
            <p className="sobre-text opacity-0 text-xs font-semibold tracking-[0.2em] uppercase text-rose mb-4">
              Sobre nosotros
            </p>
            <h2 className="sobre-text opacity-0 font-serif text-4xl md:text-5xl text-charcoal leading-tight tracking-tight mb-6 text-balance">
              Nacimos de una idea simple: cada gran amor merece un gran momento.
            </h2>
            <p className="sobre-text opacity-0 text-charcoal/60 text-base leading-relaxed max-w-[55ch] mb-5">
              Somos un equipo apasionado en Guadalajara dedicado a crear experiencias románticas
              que van más allá de una cena. Cada detalle —desde los pétalos en el camino hasta
              el letrero luminoso con su mensaje especial— está pensado para que ese instante
              quede grabado en la memoria de tu pareja para siempre.
            </p>
            <p className="sobre-text opacity-0 text-charcoal/60 text-base leading-relaxed max-w-[55ch]">
              Contamos con cuatro locaciones únicas: el íntimo Iglú, el romántico Invernadero,
              las dramáticas Ruinas y el encantador Picnic al aire libre. Cada espacio es
              completamente privado y se adapta a su historia.
            </p>
          </div>

          {/* Right: Image collage */}
          <div className="relative h-[480px] md:h-[560px]">
            <div className="sobre-img opacity-0 absolute top-0 right-0 w-[72%] h-[68%] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/flores_sonrisa.jpg"
                alt="Pareja feliz con rosas"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="sobre-img opacity-0 absolute bottom-0 left-0 w-[58%] h-[52%] rounded-2xl overflow-hidden shadow-xl border-4 border-cream">
              <img
                src="/images/mano_pedida.jpg"
                alt="Anillo de compromiso"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sobre-img opacity-0 absolute bottom-[28%] right-[2%] w-[30%] h-[32%] rounded-2xl overflow-hidden shadow-lg border-4 border-cream">
              <img
                src="/images/beso_frente.jpg"
                alt="Pareja romántica"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="stats-row grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="stat-card opacity-0 flex flex-col gap-3 bg-white rounded-2xl p-6 shadow-[0_2px_24px_-8px_rgba(0,0,0,0.08)]">
              <div className="w-10 h-10 rounded-xl bg-rose/10 flex items-center justify-center">
                <Icon size={18} className="text-rose" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-serif text-2xl text-charcoal tracking-tight">{value}</p>
                <p className="text-sm text-charcoal/50 mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
