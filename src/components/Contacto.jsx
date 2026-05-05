import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Instagram, MessageCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

function InputField({ label, id, type = 'text', value, onChange, placeholder, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold tracking-wide text-white/40 uppercase">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="bg-white border border-white/20 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-charcoal/35
          focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand/40 transition-all"
      />
    </div>
  )
}

export default function Contacto() {
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ nombre: '', telefono: '', ocasion: '', mensaje: '' })
  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const lines = [
      `Hola Adetalle! Me gustaría recibir más información:`,
      ``,
      `Nombre: ${form.nombre}`,
      form.telefono ? `Teléfono: ${form.telefono}` : null,
      form.ocasion  ? `Ocasión: ${form.ocasion}`   : null,
      form.mensaje  ? `\nMensaje:\n${form.mensaje}` : null,
    ].filter(Boolean).join('\n')

    window.open(`https://wa.me/524464776113?text=${encodeURIComponent(lines)}`, '_blank')
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ctc-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )
      gsap.fromTo('.ctc-panel',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: '.ctc-panel', start: 'top 80%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contacto" ref={sectionRef} className="bg-charcoal py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14">
          <p className="ctc-header opacity-0 text-xs font-semibold tracking-[0.2em] uppercase text-rose mb-4">
            Contáctanos
          </p>
          <h2 className="ctc-header opacity-0 font-serif text-4xl md:text-5xl text-white leading-tight tracking-tight mb-4">
            Hagamos realidad tu momento.
          </h2>
          <p className="ctc-header opacity-0 text-white/45 text-base max-w-[48ch]">
            Escríbenos y un coordinador te guiará para crear la experiencia perfecta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 items-start">

          {/* Left: Info */}
          <div className="ctc-panel opacity-0 space-y-8">

            {/* WhatsApp */}
            <div>
              <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-3">WhatsApp</p>
              <a
                href="https://wa.me/524464776113"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-[#25D366]/15 border border-[#25D366]/25 hover:bg-[#25D366]/25
                  rounded-xl px-5 py-4 transition-all duration-200 active:scale-[0.97]"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                </svg>
                <div>
                  <p className="text-white font-semibold text-sm">+52 446 477 6113</p>
                  <p className="text-white/40 text-xs">Respuesta en minutos</p>
                </div>
              </a>
            </div>

            {/* Location */}
            <div>
              <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-3">Ubicación</p>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-rose mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-white/80 text-sm font-medium">Guadalajara, Jalisco</p>
                  <p className="text-white/40 text-sm">A 3 cuadras del Hotel RIU</p>
                  <p className="text-white/30 text-xs mt-1">Dirección exacta al confirmar reserva</p>
                </div>
              </div>
            </div>

            {/* Instagram */}
            <div>
              <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-3">Instagram</p>
              <a
                href="https://instagram.com/adetalle.gdl"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
              >
                <Instagram size={18} strokeWidth={1.5} />
                <span className="text-sm">@adetalle.gdl</span>
              </a>
            </div>

            {/* Photo */}
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="/images/ruinas_pedida.jpg"
                alt="Pedida de matrimonio en Adetalle"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="ctc-panel opacity-0">
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    label="Nombre"
                    id="nombre"
                    value={form.nombre}
                    onChange={set('nombre')}
                    placeholder="Tu nombre"
                    required
                  />
                  <InputField
                    label="Teléfono / WhatsApp"
                    id="telefono"
                    type="tel"
                    value={form.telefono}
                    onChange={set('telefono')}
                    placeholder="+52 33 ..."
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="ocasion" className="text-xs font-semibold tracking-wide text-white/40 uppercase">
                    Ocasión
                  </label>
                  <select
                    id="ocasion"
                    value={form.ocasion}
                    onChange={(e) => set('ocasion')(e.target.value)}
                    className="bg-white border border-white/20 rounded-xl px-4 py-3 text-sm text-charcoal
                      focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand/40 transition-all
                      appearance-none cursor-pointer"
                  >
                    <option value="" className="text-charcoal">Selecciona una ocasión</option>
                    {['Pedida de matrimonio', 'Aniversario', 'Cumpleaños', 'Pedida de noviazgo', 'Otro'].map((o) => (
                      <option key={o} value={o} className="text-charcoal">{o}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="mensaje" className="text-xs font-semibold tracking-wide text-white/40 uppercase">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    rows={5}
                    value={form.mensaje}
                    onChange={(e) => set('mensaje')(e.target.value)}
                    placeholder="Cuéntanos sobre tu ocasión, fecha deseada y cualquier detalle especial..."
                    className="bg-white border border-white/20 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-charcoal/35
                      focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand/40 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white font-semibold py-4
                    rounded-xl hover:bg-[#1fba59] active:scale-[0.98] transition-all duration-200 text-sm"
                >
                  <MessageCircle size={18} strokeWidth={2} />
                  Enviar por WhatsApp
                </button>

                <p className="text-white/30 text-xs text-center">
                  Al enviar, se abrirá WhatsApp con tu mensaje listo para mandar.
                </p>
              </form>
          </div>
        </div>
      </div>
    </section>
  )
}
