import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MessageCircle, ChevronDown, Plus, Minus } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PRECIOS_BASE = {
  iglu:        { clasico: 5500, premium: 8500, vip: 14500 },
  invernadero: { clasico: 6500, premium: 9500, vip: 15500 },
  ruinas:      { clasico: 6500, premium: 9500, vip: 15500 },
  picnic:      { clasico: 5500, premium: 8500, vip: 14500 },
}

const ROSAS_PRECIOS = { 24: 520, 30: 700, 40: 850, 50: 1100, 100: 1450, 150: 1850, 200: 2300 }

const EXTRAS = [
  { id: 'petalos',    label: 'Pétalos adicionales',      precio: 1000, type: 'other' },
  { id: 'saxofon',   label: 'Saxofón (2 horas)',          precio: 3500, type: 'music' },
  { id: 'mariachi',  label: 'Mariachi (10 canciones)',    precio: 3800, type: 'music' },
  { id: 'trovador',  label: 'Trovador (2 horas)',         precio: 3500, type: 'music' },
  { id: 'fotografia',label: 'Fotografía profesional',     precio: 1000, type: 'media' },
  { id: 'video',     label: 'Video profesional',          precio: 1000, type: 'media' },
]

const LOCS = [
  { id: 'iglu',        label: 'Iglú' },
  { id: 'invernadero', label: 'Invernadero' },
  { id: 'ruinas',      label: 'Ruinas' },
  { id: 'picnic',      label: 'Picnic' },
]

const PKGS = [
  { id: 'clasico', label: 'Clásico' },
  { id: 'premium', label: 'Premium' },
  { id: 'vip',     label: 'VIP' },
]

const OCASIONES = [
  'Pedida de matrimonio',
  'Aniversario',
  'Cumpleaños',
  'Pedida de noviazgo',
  'Otro',
]

const getMaxChisperos = (pkg) => pkg === 'vip' ? 0 : pkg === 'premium' ? 2 : 4

const isExtraDisabled = (id, pkg) => {
  if (id === 'petalos'    && (pkg === 'premium' || pkg === 'vip')) return true
  if (id === 'fotografia' && (pkg === 'premium' || pkg === 'vip')) return true
  if (id === 'video'      && pkg === 'vip')                        return true
  return false
}

const disabledLabel = (id, pkg) => {
  if (id === 'petalos'    && (pkg === 'premium' || pkg === 'vip')) return 'Incluido en el paquete'
  if (id === 'fotografia' && (pkg === 'premium' || pkg === 'vip')) return 'Incluido en el paquete'
  if (id === 'video'      && pkg === 'vip')                        return 'Incluido en el paquete'
  return null
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold tracking-wide text-charcoal/50 uppercase">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-charcoal/10 rounded-xl px-4 py-3 text-sm
            text-charcoal font-medium focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/40
            transition-all cursor-pointer pr-9"
        >
          {options.map((o) => (
            <option key={o.id || o} value={o.id || o}>{o.label || o}</option>
          ))}
        </select>
        <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 pointer-events-none" />
      </div>
    </div>
  )
}

function Counter({ value, onChange, min = 0, max = 20 }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-8 h-8 rounded-lg bg-charcoal/8 hover:bg-charcoal/14 flex items-center justify-center
          active:scale-[0.93] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <Minus size={14} strokeWidth={2.5} className="text-charcoal/60" />
      </button>
      <span className="w-6 text-center font-semibold text-charcoal text-sm tabular-nums">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-8 h-8 rounded-lg bg-charcoal/8 hover:bg-charcoal/14 flex items-center justify-center
          active:scale-[0.93] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <Plus size={14} strokeWidth={2.5} className="text-charcoal/60" />
      </button>
    </div>
  )
}

export default function Cotizador() {
  const sectionRef = useRef(null)

  const [loc, setLoc]       = useState('iglu')
  const [pkg, setPkg]       = useState('premium')
  const [ocasion, setOcasion] = useState('Pedida de matrimonio')
  const [extras, setExtras] = useState({})
  const [chisperos, setChisperos] = useState(0)
  const [rosas, setRosas]   = useState('none')

  // Enforce restrictions when package changes
  useEffect(() => {
    setExtras(prev => {
      const next = { ...prev }
      EXTRAS.forEach(e => {
        if (isExtraDisabled(e.id, pkg)) delete next[e.id]
      })
      return next
    })
    setChisperos(c => Math.min(c, getMaxChisperos(pkg)))
  }, [pkg])

  const toggleExtra = (extra) => {
    if (isExtraDisabled(extra.id, pkg)) return

    if (extra.type === 'music') {
      setExtras(prev => {
        const next = { ...prev }
        const musicIds = ['saxofon', 'mariachi', 'trovador']
        if (!prev[extra.id]) {
          musicIds.forEach(m => delete next[m])
          next[extra.id] = true
        } else {
          delete next[extra.id]
        }
        return next
      })
    } else {
      setExtras(prev => ({ ...prev, [extra.id]: !prev[extra.id] }))
    }
  }

  const basePrice     = PRECIOS_BASE[loc][pkg]
  const extrasTotal   = EXTRAS.reduce((acc, e) => acc + (extras[e.id] ? e.precio : 0), 0)
  const chisperosTotal = chisperos * 200
  const rosasTotal    = rosas !== 'none' ? ROSAS_PRECIOS[rosas] : 0
  const total         = basePrice + extrasTotal + chisperosTotal + rosasTotal

  const pkgLabel = PKGS.find((p) => p.id === pkg)?.label
  const locLabel = LOCS.find((l) => l.id === loc)?.label
  const maxChisp = getMaxChisperos(pkg)

  const buildWhatsApp = () => {
    const extrasLines = [
      ...EXTRAS.filter((e) => extras[e.id]).map((e) => `  - ${e.label}: $${e.precio.toLocaleString('es-MX')}`),
      chisperos > 0 ? `  - Chisperos adicionales (${chisperos}): $${chisperosTotal.toLocaleString('es-MX')}` : null,
      rosas !== 'none' ? `  - Rosas (${rosas}): $${rosasTotal.toLocaleString('es-MX')}` : null,
    ].filter(Boolean)

    const msg = [
      `Hola Adetalle! Me interesa reservar una experiencia:`,
      ``,
      `Ocasión: ${ocasion}`,
      `Locación: ${locLabel}`,
      `Paquete: ${pkgLabel}`,
      extrasLines.length > 0 ? `\nExtras:\n${extrasLines.join('\n')}` : null,
      `\nTotal estimado: $${total.toLocaleString('es-MX')} MXN`,
      `\n¿Tienen disponibilidad? ¿Podrían darme más información?`,
    ].filter((l) => l !== null).join('\n')

    window.open(`https://wa.me/524464776113?text=${encodeURIComponent(msg)}`, '_blank')
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cot-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )
      gsap.fromTo('.cot-panel',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: '.cot-panel', start: 'top 80%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="cotizador" ref={sectionRef} className="bg-off-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14">
          <p className="cot-header opacity-0 text-xs font-semibold tracking-[0.2em] uppercase text-rose mb-4">
            Cotizador rápido
          </p>
          <h2 className="cot-header opacity-0 font-serif text-4xl md:text-5xl text-white leading-tight tracking-tight mb-4">
            Arma tu experiencia ideal.
          </h2>
          <p className="cot-header opacity-0 text-white/50 text-base max-w-[48ch]">
            Selecciona tu locación, paquete y extras para obtener un estimado al instante.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

          {/* Left: Form */}
          <div className="cot-panel opacity-0 bg-white rounded-2xl p-8 space-y-7">

            <SelectField
              label="Ocasión"
              value={ocasion}
              onChange={setOcasion}
              options={OCASIONES}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <SelectField label="Locación" value={loc} onChange={setLoc} options={LOCS} />
              <SelectField label="Paquete"  value={pkg} onChange={setPkg}  options={PKGS} />
            </div>

            {/* Extras */}
            <div>
              <p className="text-xs font-semibold tracking-wide text-charcoal/50 uppercase mb-4">Extras opcionales</p>
              <div className="space-y-3">
                {EXTRAS.map((e) => {
                  const disabled = isExtraDisabled(e.id, pkg)
                  const hint     = disabledLabel(e.id, pkg)
                  return (
                    <label
                      key={e.id}
                      className={`flex items-center justify-between gap-4 ${disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer group'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          onClick={() => !disabled && toggleExtra(e)}
                          className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all ${
                            extras[e.id]
                              ? 'bg-brand border-brand'
                              : disabled
                              ? 'border-charcoal/20'
                              : 'border-charcoal/20 group-hover:border-brand/50'
                          }`}
                        >
                          {extras[e.id] && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <div>
                          <span className="text-sm text-charcoal/80">{e.label}</span>
                          {hint && <span className="block text-xs text-brand/60">{hint}</span>}
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-charcoal/40 whitespace-nowrap">
                        +${e.precio.toLocaleString('es-MX')}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Chisperos counter */}
            <div className="pt-2 border-t border-charcoal/8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-charcoal/80">Chisperos adicionales</p>
                  <p className="text-xs text-charcoal/40">
                    $200 c/u · Máx. {maxChisp} adicionales
                    {maxChisp === 0 && ' (VIP ya incluye 6)'}
                  </p>
                </div>
                <Counter value={chisperos} onChange={setChisperos} max={maxChisp} />
              </div>
            </div>

            {/* Rosas selector */}
            <div className="pt-2 border-t border-charcoal/8">
              <SelectField
                label="Rosas adicionales"
                value={rosas}
                onChange={setRosas}
                options={[
                  { id: 'none', label: 'Sin rosas adicionales' },
                  { id: '24',   label: '24 rosas — $520' },
                  { id: '30',   label: '30 rosas — $700' },
                  { id: '40',   label: '40 rosas — $850' },
                  { id: '50',   label: '50 rosas — $1,100' },
                  { id: '100',  label: '100 rosas — $1,450' },
                  { id: '150',  label: '150 rosas — $1,850' },
                  { id: '200',  label: '200 rosas — $2,300' },
                ]}
              />
              <p className="mt-2 text-xs text-charcoal/45 leading-relaxed">
                En caso de que tu paquete ya incluya un ramo y desees uno más grande,
                el precio se ajustará según el tabulador.
              </p>
              <p className="mt-1 text-xs text-charcoal/45">
                Pregunta por otras opciones de flores.
              </p>
            </div>
          </div>

          {/* Right: Price summary */}
          <div className="cot-panel opacity-0 sticky top-20 space-y-4">

            <div className="bg-white/6 border border-white/10 rounded-2xl p-7 space-y-5">
              <p className="text-white/50 text-xs font-semibold tracking-[0.15em] uppercase">Resumen</p>

              <div>
                <p className="text-white/60 text-xs mb-1">{locLabel} · Paquete {pkgLabel}</p>
                <p className="font-serif text-5xl text-white">
                  ${total.toLocaleString('es-MX')}
                </p>
                <p className="text-white/30 text-xs mt-1">MXN estimado</p>
              </div>

              <div className="space-y-2 border-t border-white/10 pt-5">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Paquete base</span>
                  <span className="text-white font-medium">${basePrice.toLocaleString('es-MX')}</span>
                </div>
                {extrasTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Extras</span>
                    <span className="text-white font-medium">+${extrasTotal.toLocaleString('es-MX')}</span>
                  </div>
                )}
                {chisperosTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Chisperos ({chisperos})</span>
                    <span className="text-white font-medium">+${chisperosTotal.toLocaleString('es-MX')}</span>
                  </div>
                )}
                {rosasTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Rosas ({rosas})</span>
                    <span className="text-white font-medium">+${rosasTotal.toLocaleString('es-MX')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm border-t border-white/10 pt-3 mt-1">
                  <span className="text-white/70 font-semibold">Anticipo (50%)</span>
                  <span className="text-rose font-bold">${(total / 2).toLocaleString('es-MX')}</span>
                </div>
              </div>

              <button
                onClick={buildWhatsApp}
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white font-semibold
                  py-4 rounded-xl hover:bg-[#1fba59] active:scale-[0.97] transition-all duration-200 text-sm"
              >
                <MessageCircle size={18} strokeWidth={2} />
                Solicitar por WhatsApp
              </button>

              <p className="text-white/30 text-xs text-center leading-relaxed">
                El precio es un estimado. Un coordinador confirmará los detalles finales.
              </p>
            </div>

            <div className="bg-white/4 border border-white/8 rounded-xl px-5 py-4">
              <p className="text-white/50 text-xs leading-relaxed">
                Tarjetas a <span className="text-white/80 font-medium">3, 6, 9 y 12 meses sin intereses.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
