import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Minus, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const locations = [
  {
    id: 'iglu',
    name: 'Iglú',
    image: '/images/iglu_novia.jpg',
    description: 'Una cúpula privada semi-abierta bajo las estrellas, rodeada de luces y naturaleza. Perfecta para quienes buscan una experiencia única e íntima.',
    precios: { clasico: 5500, premium: 8500, vip: 14500 },
  },
  {
    id: 'invernadero',
    name: 'Invernadero',
    image: '/images/invernadero_marryme.jpg',
    description: 'Intimidad y romance rodeados de candelabros y naturaleza, en un espacio techado con una atmósfera mágica e irrepetible.',
    precios: { clasico: 6500, premium: 9500, vip: 15500 },
  },
  {
    id: 'ruinas',
    name: 'Ruinas',
    image: '/images/ruinas_novia.jpg',
    description: 'Un espacio techado de carácter dramático donde los letreros iluminados y los chisperos crean un momento que no olvidarán jamás.',
    precios: { clasico: 6500, premium: 9500, vip: 15500 },
  },
  {
    id: 'picnic',
    name: 'Picnic',
    image: '/images/picnic_premium.jpg',
    description: 'Al aire libre, entre luces colgantes y vegetación exuberante. Una velada cálida y especial bajo el cielo abierto de Guadalajara.',
    precios: { clasico: 5500, premium: 8500, vip: 14500 },
  },
]

const packages = [
  { id: 'clasico', label: 'Clásico' },
  { id: 'premium', label: 'Premium' },
  { id: 'vip', label: 'VIP' },
]

const getFeatures = (locationId) => [
  { label: 'Locación privada (3 horas)', clasico: true, premium: true, vip: true },
  { label: locationId === 'picnic' ? 'Cena 2 tiempos' : 'Cena 3 tiempos', clasico: true, premium: true, vip: true },
  { label: 'Bebidas ilimitadas', clasico: true, premium: true, vip: true },
  { label: 'Vino seleccionado (cortesía)', clasico: true, premium: true, vip: true },
  { label: 'Mesero certificado', clasico: true, premium: true, vip: true },
  { label: 'Letrero luminoso a elegir', clasico: true, premium: true, vip: true },
  { label: 'Chisperos', clasico: '2', premium: '4', vip: '6' },
  { label: 'Música ambiental', clasico: true, premium: true, vip: true },
  { label: 'Pétalos (corazón y camino)', clasico: false, premium: true, vip: true },
  { label: 'Ramo de rosas', clasico: false, premium: '24 rosas', vip: '48 rosas' },
  { label: 'Fotografía profesional', clasico: false, premium: true, vip: true },
  { label: 'Video profesional', clasico: false, premium: false, vip: true },
  { label: 'Música en vivo', clasico: false, premium: false, vip: true },
]

function FeatureValue({ value }) {
  if (value === false) return <Minus size={16} className="text-white/20 mx-auto" strokeWidth={2} />
  if (value === true) return <Check size={16} className="text-brand-light mx-auto" strokeWidth={2.5} />
  return <span className="text-xs font-semibold text-white text-center block">{value}</span>
}

export default function Locaciones() {
  const [activeLocation, setActiveLocation] = useState('iglu')
  const [activePkg, setActivePkg] = useState('premium')
  const sectionRef = useRef(null)
  const imgRef = useRef(null)

  const loc = locations.find((l) => l.id === activeLocation)
  const precio = loc.precios[activePkg]
  const features = getFeatures(activeLocation)

  const handleLocation = (id) => {
    gsap.to(imgRef.current, {
      opacity: 0, scale: 1.04, duration: 0.25, onComplete: () => {
        setActiveLocation(id)
        gsap.to(imgRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' })
      }
    })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.loc-header',
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="paquetes" ref={sectionRef} className="bg-off-black py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14">
          <p className="loc-header opacity-0 text-xs font-semibold tracking-[0.2em] uppercase text-rose mb-4">
            Locaciones y paquetes
          </p>
          <h2 className="loc-header opacity-0 font-serif text-4xl md:text-5xl text-white leading-tight tracking-tight mb-4 text-balance">
            Cuatro escenarios.<br />Un solo objetivo.
          </h2>
          <p className="loc-header opacity-0 text-white/50 text-base max-w-[50ch]">
            Elige la locación que mejor cuente su historia y el paquete que se ajuste a tu visión.
          </p>
        </div>

        {/* Location tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {locations.map((l) => (
            <button
              key={l.id}
              onClick={() => handleLocation(l.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
                activeLocation === l.id
                  ? 'bg-brand text-white'
                  : 'bg-white/8 text-white/60 hover:bg-white/15 hover:text-white border border-white/10'
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left: Location image + description */}
          <div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-6 shadow-2xl">
              <img
                ref={imgRef}
                src={loc.image}
                alt={`Locación ${loc.name}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-off-black/60 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-white font-serif text-2xl">{loc.name}</p>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed">{loc.description}</p>

            {/* Payment note */}
            <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-white/60 text-xs leading-relaxed">
                Acepta tarjetas a <span className="text-white font-medium">3, 6, 9 y 12 meses sin intereses.</span>
                {' '}Aparta con el 50% del total. El resto se liquida el mismo día antes del evento.
              </p>
            </div>
          </div>

          {/* Right: Package selector + features */}
          <div>
            {/* Package tabs */}
            <div className="flex gap-2 mb-6">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setActivePkg(pkg.id)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${
                    activePkg === pkg.id
                      ? 'bg-white text-charcoal shadow'
                      : 'bg-white/8 text-white/50 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  {pkg.label}
                </button>
              ))}
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Precio total</p>
              <p className="font-serif text-5xl text-white">
                ${precio.toLocaleString('es-MX')}
                <span className="text-white/30 text-xl font-sans font-normal ml-1">MXN</span>
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-0 divide-y divide-white/8">
              {features.map((f) => {
                const val = f[activePkg]
                return (
                  <div key={f.label} className="flex items-center gap-4 py-2.5">
                    <div className="w-6 flex-shrink-0 flex justify-center">
                      <FeatureValue value={val} />
                    </div>
                    <span className={`text-sm ${val === false ? 'text-white/25' : 'text-white/75'}`}>
                      {f.label}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* CTA */}
            <a
              href="#cotizador"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#cotizador')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="mt-8 w-full flex items-center justify-center gap-2 bg-brand text-white font-semibold py-4 rounded-xl
                hover:bg-brand-light active:scale-[0.98] transition-all duration-200 text-sm"
            >
              Cotizar este paquete
              <ChevronRight size={16} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
