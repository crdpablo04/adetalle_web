import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SobreNosotros from './components/SobreNosotros'
import Locaciones from './components/Locaciones'
import Menu from './components/Menu'
import Cotizador from './components/Cotizador'
import FAQ from './components/FAQ'
import Contacto from './components/Contacto'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SobreNosotros />
        <Locaciones />
        <Menu />
        <Cotizador />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
    </>
  )
}
