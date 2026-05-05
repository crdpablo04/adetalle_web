import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus, Minus } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    q: '¿Qué incluye la locación privada?',
    a: 'Tienes acceso exclusivo al espacio durante 3 horas. El área es completamente independiente y está ambientada especialmente para su evento, con todos los detalles listos desde su llegada.',
  },
  {
    q: '¿Cómo reservo mi fecha?',
    a: 'Aparta tu fecha con el 50% del costo total. El 50% restante se liquida el mismo día antes de que comience el evento. Los cambios de fecha deben solicitarse con al menos 14 días de anticipación.',
  },
  {
    q: '¿Se devuelve el anticipo si cancelo?',
    a: 'No. Una vez reservado tu lugar, el anticipo no es reembolsable en caso de cancelación. Te recomendamos confirmar tu fecha con seguridad antes de apartar.',
  },
  {
    q: '¿Puedo cambiar la fecha de mi evento?',
    a: 'Sí, con al menos 14 días de anticipación y sujeto a disponibilidad. Los cambios sin anticipación suficiente pueden tener cargos adicionales.',
  },
  {
    q: '¿Qué diferencia hay entre los paquetes Clásico, Premium y VIP?',
    a: 'Los tres incluyen locación privada, cena, bebidas ilimitadas, vino, mesero y letrero luminoso. Las diferencias principales: el Clásico no incluye pétalos; a partir del Premium se añaden pétalos decorando un corazón y un camino, ramo de 24 rosas y fotografía profesional. El VIP incluye todo lo anterior más 48 rosas, video profesional y música en vivo. Los chisperos también aumentan por nivel: 2, 4 y 6 respectivamente.',
  },
  {
    q: '¿Puedo agregar extras al paquete que elija?',
    a: 'Sí. Puedes añadir pétalos (disponibles para Clásico), chisperos adicionales, rosas, fotografía, video, saxofón, mariachi o trovador. Usa nuestro cotizador para ver el precio final con tus selecciones.',
  },
  {
    q: '¿Puedo llevar acompañantes?',
    a: 'Es posible con previo aviso y previa autorización del equipo de staff. Los acompañantes únicamente podrán estar presentes durante el momento de llegada y su estancia no puede exceder los 15 minutos.',
  },
  {
    q: '¿Dónde están ubicados exactamente?',
    a: 'Estamos en Guadalajara, Jalisco, a 3 cuadras del Hotel RIU. Al confirmar tu reserva te compartiremos la dirección exacta y las indicaciones para llegar sin problema.',
  },
  {
    q: '¿Las locaciones son techadas o al aire libre?',
    a: 'El Invernadero y las Ruinas son espacios techados con ambientación interior. El Iglú es semi-abierto, rodeado de jardín y luces. El Picnic se realiza al aire libre en un jardín privado con vegetación y luces colgantes.',
  },
  {
    q: '¿Qué sucede en caso de lluvia?',
    a: 'En caso de que las condiciones climáticas no permitan que tu evento se desarrolle con normalidad, el equipo de staff se contactará contigo para brindarte una solución. Si la lluvia es muy intensa, tu evento se reagendará a la fecha más cercana y conveniente disponible.',
  },
  {
    q: '¿Aceptan tarjetas de crédito?',
    a: 'Sí. Aceptamos tarjetas de crédito a 3, 6, 9 y 12 meses sin intereses, lo que hace más fácil planear tu experiencia.',
  },
]

function FaqItem({ item }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (!bodyRef.current) return
    if (open) {
      gsap.fromTo(bodyRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' }
      )
    } else {
      gsap.to(bodyRef.current,
        { height: 0, opacity: 0, duration: 0.28, ease: 'power2.in' }
      )
    }
  }, [open])

  return (
    <div className="border-b border-charcoal/10 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group"
      >
        <span className={`text-sm font-medium leading-snug transition-colors ${open ? 'text-brand' : 'text-charcoal group-hover:text-brand'}`}>
          {item.q}
        </span>
        <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${
          open ? 'bg-brand text-white' : 'bg-charcoal/8 text-charcoal/50'
        }`}>
          {open
            ? <Minus size={12} strokeWidth={2.5} />
            : <Plus size={12} strokeWidth={2.5} />
          }
        </div>
      </button>
      <div ref={bodyRef} className="overflow-hidden h-0 opacity-0">
        <p className="text-sm text-charcoal/60 leading-relaxed pb-5 max-w-[65ch]">{item.a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )
      gsap.fromTo('.faq-item',
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out',
          scrollTrigger: { trigger: '.faq-list', start: 'top 78%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="faq" ref={sectionRef} className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-16 items-start">

          {/* Left: sticky header */}
          <div className="md:sticky md:top-24">
            <p className="faq-header opacity-0 text-xs font-semibold tracking-[0.2em] uppercase text-rose mb-4">
              Preguntas frecuentes
            </p>
            <h2 className="faq-header opacity-0 font-serif text-4xl text-charcoal leading-tight tracking-tight mb-6">
              Todo lo que necesitas saber.
            </h2>
            <p className="faq-header opacity-0 text-charcoal/50 text-sm leading-relaxed max-w-[38ch]">
              Si tu duda no está aquí, escríbenos por WhatsApp y te respondemos en minutos.
            </p>
            <a
              href="https://wa.me/524464776113"
              target="_blank"
              rel="noopener noreferrer"
              className="faq-header opacity-0 mt-6 inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-semibold
                px-5 py-2.5 rounded-full hover:bg-[#1fba59] active:scale-[0.97] transition-all duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Escribir por WhatsApp
            </a>
          </div>

          {/* Right: accordion */}
          <div className="faq-list bg-white rounded-2xl shadow-[0_2px_24px_-8px_rgba(0,0,0,0.07)] divide-y divide-charcoal/10 overflow-hidden">
            {faqs.map((item, i) => (
              <div key={i} className="faq-item opacity-0 px-6">
                <FaqItem item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
