import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Utensils } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const menu3t = {
  entradas: [
    { name: 'Camarón al coco', desc: 'Con aderezo de mango' },
    { name: 'Sopa tortilla', desc: null },
    { name: 'Crema de brócoli', desc: null },
    { name: 'Ensalada Adetalle', desc: 'Lechugas, espinaca, queso de cabra, arándanos, pasas, nueces, vinagreta de limón y miel' },
    { name: 'Ensalada caprese', desc: null },
  ],
  fuertes: [
    { name: 'Sushi', desc: 'Philadelphia, California o Empanizado' },
    { name: 'Pizza', desc: 'Hawaiana, Pepperoni o 4 quesos' },
    { name: 'Pasta Alfredo', desc: null },
    { name: 'Lasaña', desc: null },
  ],
  postres: [
    { name: 'Flan napolitano', desc: null },
    { name: 'Brownie de chocolate', desc: 'Con nieve de vainilla' },
    { name: 'Pastel de chocolate', desc: null },
  ],
}

const menuPicnic = {
  fuertes: menu3t.fuertes,
  postres: menu3t.postres,
}

function CourseBlock({ title, items, accent }) {
  return (
    <div className="mb-8">
      <h4 className={`text-xs font-semibold tracking-[0.18em] uppercase mb-4 ${accent}`}>{title}</h4>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.name} className="flex flex-col gap-0.5">
            <p className="text-charcoal font-medium text-sm">{item.name}</p>
            {item.desc && <p className="text-charcoal/45 text-xs leading-relaxed">{item.desc}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Menu() {
  const [active, setActive] = useState('3t')
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.menu-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )
      gsap.fromTo('.menu-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: '.menu-card', start: 'top 80%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="menu" ref={sectionRef} className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="menu-header opacity-0 text-xs font-semibold tracking-[0.2em] uppercase text-rose mb-4">
              Menú
            </p>
            <h2 className="menu-header opacity-0 font-serif text-4xl md:text-5xl text-charcoal leading-tight tracking-tight">
              Elige tu cena perfecta.
            </h2>
          </div>
          <div className="menu-header opacity-0 flex gap-2">
            <button
              onClick={() => setActive('3t')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === '3t'
                  ? 'bg-charcoal text-white'
                  : 'bg-white text-charcoal/60 hover:text-charcoal border border-charcoal/10'
              }`}
            >
              3 Tiempos
            </button>
            <button
              onClick={() => setActive('picnic')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === 'picnic'
                  ? 'bg-charcoal text-white'
                  : 'bg-white text-charcoal/60 hover:text-charcoal border border-charcoal/10'
              }`}
            >
              Picnic
            </button>
          </div>
        </div>

        {active === '3t' ? (
          <div className="menu-card opacity-0 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-[0_2px_24px_-8px_rgba(0,0,0,0.07)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-rose/10 flex items-center justify-center">
                  <Utensils size={16} className="text-rose" strokeWidth={1.5} />
                </div>
                <p className="font-semibold text-charcoal text-sm">Primer tiempo</p>
              </div>
              <CourseBlock title="Entradas" items={menu3t.entradas} accent="text-rose" />
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-[0_2px_24px_-8px_rgba(0,0,0,0.07)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-brand/10 flex items-center justify-center">
                  <Utensils size={16} className="text-brand" strokeWidth={1.5} />
                </div>
                <p className="font-semibold text-charcoal text-sm">Segundo tiempo</p>
              </div>
              <CourseBlock title="Plato fuerte" items={menu3t.fuertes} accent="text-brand" />
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-[0_2px_24px_-8px_rgba(0,0,0,0.07)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-charcoal/8 flex items-center justify-center">
                  <Utensils size={16} className="text-charcoal/60" strokeWidth={1.5} />
                </div>
                <p className="font-semibold text-charcoal text-sm">Tercer tiempo</p>
              </div>
              <CourseBlock title="Postres" items={menu3t.postres} accent="text-charcoal/50" />
            </div>
          </div>
        ) : (
          <div className="menu-card opacity-0 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            <div className="bg-white rounded-2xl p-8 shadow-[0_2px_24px_-8px_rgba(0,0,0,0.07)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-brand/10 flex items-center justify-center">
                  <Utensils size={16} className="text-brand" strokeWidth={1.5} />
                </div>
                <p className="font-semibold text-charcoal text-sm">Primer tiempo</p>
              </div>
              <CourseBlock title="Plato fuerte" items={menuPicnic.fuertes} accent="text-brand" />
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-[0_2px_24px_-8px_rgba(0,0,0,0.07)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-charcoal/8 flex items-center justify-center">
                  <Utensils size={16} className="text-charcoal/60" strokeWidth={1.5} />
                </div>
                <p className="font-semibold text-charcoal text-sm">Segundo tiempo</p>
              </div>
              <CourseBlock title="Postres" items={menuPicnic.postres} accent="text-charcoal/50" />
            </div>
          </div>
        )}

        <p className="mt-8 text-charcoal/50 text-xs">
          Favor de especificar al momento de contratar si existen restricciones alimentarias.
        </p>
      </div>
    </section>
  )
}
