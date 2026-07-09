import { useState, useEffect } from 'react'
import { client, urlFor } from '../../client.js'
import './landing.css'
import logo from '../../assets/logo.jpeg'

const categories = [
  {
    name: 'Cascos',
    count: '+120 productos',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C7.03 2 3 6.03 3 11v3c0 1.1.9 2 2 2h1v-4c0-3.87 3.13-7 7-7s7 3.13 7 7v4h1c1.1 0 2-.9 2-2v-3c0-4.97-4.03-9-9-9zM5 18v2h14v-2H5z"/>
      </svg>
    ),
  },
  {
    name: 'Aceites de Motor',
    count: '+80 productos',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.5 8.5l-1.5-1.5V5h-2v2H8V5H6v2L4.5 8.5C3.5 9.5 3 10.8 3 12.2V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.8c0-1.4-.5-2.7-1.5-3.7zM12 18c-1.7 0-3-1.3-3-3s3-6 3-6 3 4.3 3 6-1.3 3-3 3z"/>
      </svg>
    ),
  },
  {
    name: 'Llantas',
    count: '+200 productos',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
      </svg>
    ),
  },
  {
    name: 'Guantes',
    count: '+60 productos',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5 2c-.83 0-1.5.67-1.5 1.5V7h-1V3.5C12 2.67 11.33 2 10.5 2S9 2.67 9 3.5V7H8V4.5C8 3.67 7.33 3 6.5 3S5 3.67 5 4.5v8.45l-2.15-2.15C2.35 10.3 1.5 10.3 1 10.8c-.49.49-.49 1.28 0 1.77L5 16.62V19c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-8.5c0-.83-.67-1.5-1.5-1.5H17V3.5C17 2.67 16.33 2 15.5 2H14.5z"/>
      </svg>
    ),
  },
  {
    name: 'Chaquetas',
    count: '+95 productos',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5 7.5L15 6l-3 3-3-3-1.5 1.5L9 9H5v12h14V9h-4l1.5-1.5zM12 18l-3-3h2v-4h2v4h2l-3 3z"/>
      </svg>
    ),
  },
  {
    name: 'Accesorios',
    count: '+300 productos',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
      </svg>
    ),
  },
]

const whyCards = [
  {
    title: 'Personal Experto',
    desc: 'Nuestro equipo está formado por motociclistas apasionados con años de experiencia práctica. Asesoramiento real en el que puedes confiar.',
    icon: <svg viewBox="0 0 24 24"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z"/></svg>,
  },
  {
    title: 'Envío Rápido',
    desc: 'Los pedidos realizados antes de las 3 PM se envían el mismo día. Consigue tu equipo antes de tu próxima rodada.',
    icon: <svg viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.7 1.3 3 3 3s3-1.3 3-3h6c0 1.7 1.3 3 3 3s3-1.3 3-3h2v-5l-3-4zm-5 8.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm-11 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zM17 12l2.3 3H13V9h3.5l.5 3z"/></svg>,
  },
  {
    title: 'Repuestos Originales',
    desc: 'Solo marcas 100% auténticas. Sin imitaciones, sin compromisos — tu seguridad lo es todo.',
    icon: <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.6 3.8 10.7 9 12 5.2-1.3 9-6.4 9-12V5l-9-4zm-2 16l-4-4 1.4-1.4L10 14.2l6.6-6.6L18 9l-8 8z"/></svg>,
  },
  {
    title: 'Devoluciones Fáciles',
    desc: 'Devoluciones sin complicaciones durante 30 días. Si no te queda bien o no estás satisfecho, lo solucionamos.',
    icon: <svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z"/></svg>,
  },
]

const brands = ['LS2', 'BLD', 'AGV', 'Shoei', 'Arai', 'Dainese', 'Alpinestars', 'Motul', 'Castrol', 'Michelin', 'Bridgestone', 'Oxford']

const termsContent = (
  <div>
    <h3>1. Aceptación de los Términos</h3>
    <p>Al acceder o utilizar el sitio web de Motorepuestos Mega Mundo, aceptas estar sujeto a estos Términos y Condiciones. Si no estás de acuerdo, por favor no utilices nuestros servicios.</p>
    <h3>2. Productos y Precios</h3>
    <p>Todas las descripciones de productos y precios están sujetos a cambios sin previo aviso. Nos reservamos el derecho de limitar cantidades y rechazar pedidos a nuestra discreción. Los precios mostrados incluyen los impuestos aplicables, a menos que se indique lo contrario.</p>
    <h3>3. Pedidos y Pagos</h3>
    <p>Los pedidos se confirman una vez que se recibe el pago. Aceptamos las principales tarjetas de crédito/débito y transferencias bancarias. Todas las transacciones se procesan de forma segura. Motorepuestos Mega Mundo no será responsable por errores en el procesamiento de pagos causados por terceros.</p>
    <h3>4. Envíos y Entregas</h3>
    <p>Los tiempos de entrega estimados se proporcionan solo como guía y no están garantizados. No nos hacemos responsables de los retrasos causados por las empresas de mensajería, aduanas o eventos fuera de nuestro control. El riesgo de pérdida se transfiere al comprador en el momento de la entrega.</p>
    <h3>5. Devoluciones y Reembolsos</h3>
    <p>Los artículos pueden devolverse dentro de los 30 días posteriores a la recepción en su estado original, sin usar y con todo el embalaje intacto. Los reembolsos se emitirán dentro de 7 a 10 días hábiles posteriores a la recepción e inspección del artículo devuelto. Los costos de envío de las devoluciones son responsabilidad del comprador a menos que el artículo esté defectuoso.</p>
    <h3>6. Garantías</h3>
    <p>Los productos están cubiertos por la garantía del fabricante. Motorepuestos Mega Mundo no ofrece garantías adicionales más allá de las que ofrece el fabricante. Los reclamos de garantía deben presentarse con un comprobante de compra.</p>
    <h3>7. Propiedad Intelectual</h3>
    <p>Todo el contenido de este sitio web, incluidos logotipos, textos, imágenes y gráficos, es propiedad de Motorepuestos Mega Mundo o sus licenciantes y está protegido por las leyes de propiedad intelectual aplicables. El uso no autorizado está prohibido.</p>
    <h3>8. Limitación de Responsabilidad</h3>
    <p>Motorepuestos Mega Mundo no será responsable de ningún daño indirecto, incidental o consecuente que surja del uso de nuestros productos o servicios. Nuestra responsabilidad total no excederá la cantidad pagada por el producto en cuestión.</p>
    <h3>9. Ley Aplicable</h3>
    <p>Estos Términos se rigen por las leyes locales aplicables. Cualquier disputa se resolverá en la jurisdicción donde opera Motorepuestos Mega Mundo.</p>
    <h3>10. Contacto</h3>
    <p>Si tienes preguntas sobre estos Términos y Condiciones, por favor contáctanos en legal@megamundo.com.</p>
  </div>
)

export default function Landing() {
  const [showTerms, setShowTerms] = useState(false)
  const [products, setProducts] = useState([]) 

  useEffect(() => {
    client.fetch('*[_type == "product"]')
      .then((data) => {
        setProducts(data)
      })
      .catch(console.error)
  }, [])

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Motorepuestos Mega Mundo" />
        </div>
        <ul className="navbar-links">
          <li><a href="#">Cascos</a></li>
          <li><a href="#">Llantas</a></li>
          <li><a href="#">Aceites</a></li>
          <li><a href="#">Ropa</a></li>
          <li><a href="#">Accesorios</a></li>
          <li><a href="#" className="navbar-cta">Comprar Ahora</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Todo para tu moto</p>
          <h1>
            EQUÍPATE.<br />
            RUEDA <span>DURO.</span>
          </h1>
          <p className="hero-subtitle">
            Cascos de motocicleta premium, aceites, llantas y equipo de protección — todo lo que necesitas para rodar seguro y rápido.
          </p>
          <div className="hero-buttons">
            <a href="#" className="btn-primary">Ver Todos los Productos</a>
            <a href="#" className="btn-secondary">Ver Catálogo</a>
          </div>
        </div>

        <div className="hero-image-area">
          <svg viewBox="0 0 200 200" style={{ width: '60%', maxWidth: 320, fill: 'rgba(255,255,255,0.12)' }}>
            <circle cx="100" cy="100" r="90" stroke="rgba(255,255,255,0.2)" strokeWidth="3" fill="none"/>
            <circle cx="100" cy="100" r="60" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none"/>
            <circle cx="100" cy="100" r="30" fill="rgba(255,255,255,0.1)"/>
            <path d="M100 10 L100 190 M10 100 L190 100 M29 29 L171 171 M171 29 L29 171" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
          </svg>
          <div className="hero-badge">
            <span className="hero-badge-num">+15</span>
            <span className="hero-badge-text">Años de<br/>Servicio</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-num">+5,000</div>
          <div className="stat-label">Productos</div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <div className="stat-num">+50</div>
          <div className="stat-label">Mejores Marcas</div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <div className="stat-num">+30K</div>
          <div className="stat-label">Motociclistas Felices</div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <div className="stat-num">+15</div>
          <div className="stat-label">Años Vendiendo</div>
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="section categories-section">
        <p className="section-label">Explorar por Categoría</p>
        <h2 className="section-title">ENCUENTRA LO QUE <span>NECESITAS</span></h2>
        <p className="section-subtitle">Desde cascos integrales hasta aceites sintéticos — tenemos todo lo que tu máquina exige.</p>
        <div className="categories-grid">
          {categories.map((cat) => (
            <a key={cat.name} href="#" className="category-card">
              <div className="category-icon">{cat.icon}</div>
              <div className="category-name">{cat.name}</div>
              <div className="category-count">{cat.count}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="section-label">Selección Cuidadosa</p>
        <h2 className="section-title">PRODUCTOS <span>DESTACADOS</span></h2>
        <p className="section-subtitle">El equipo mejor valorado de las marcas de motocicletas más confiables del mundo.</p>
        <div className="products-grid">
          {products.map((p) => (
            <div key={p._id} className="product-card">
              <div className="product-image">
                {p.badge && <span className="product-badge">{p.badge}</span>}
                
                {p.image ? (
                  <img 
                    src={urlFor(p.image).width(400).url()} 
                    alt={p.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                )}
              </div>
              <div className="product-info">
                <div className="product-brand">{p.brand}</div>
                <div className="product-name">{p.name}</div>
                <div className="product-footer">
                  {p.price && <span className="product-price">${p.price}</span>}
                  <button className="product-add" aria-label="Añadir al carrito">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section why-section">
        <p className="section-label">Por Qué Nos Eligen los Motociclistas</p>
        <h2 className="section-title">CREADO PARA <span>MOTOCICLISTAS</span></h2>
        <p className="section-subtitle">Hemos estado sirviendo a la comunidad de motociclistas por más de 15 años. Esto es lo que nos hace diferentes.</p>
        <div className="why-grid">
          {whyCards.map((w) => (
            <div key={w.title} className="why-card">
              <div className="why-icon">{w.icon}</div>
              <div className="why-title">{w.title}</div>
              <p className="why-desc">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BRANDS */}
      <section className="brands-section">
        <p className="brands-title">Marcas de Confianza que Manejamos</p>
        <div className="brands-row">
          {brands.map((b) => (
            <div key={b} className="brand-pill">{b}</div>
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="promo-banner">
        <div className="promo-text">
          <h2>HASTA 40% DE DESCUENTO<br/>ESTE FIN DE SEMANA</h2>
          <p>Venta flash en cascos, aceites y ropa seleccionada. No te lo pierdas.</p>
        </div>
        <a href="#" className="btn-white">Aprovechar Oferta</a>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={logo} alt="Motorepuestos Mega Mundo" />
            <p className="footer-tagline">
              Tu tienda integral de repuestos, equipo y accesorios premium para motocicletas. Sirviendo a motociclistas apasionados desde 2009.
            </p>
            <div className="footer-social">
              <a href="#" className="social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="#" className="social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/></svg>
              </a>
              <a href="#" className="social-btn" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1s-.8 1-.9 1.2c-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.2-.5 0-.2-.1-.4-.2-.6-.1-.2-.7-1.6-1-2.2-.3-.6-.6-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2 3.2 5 4.4.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.6.2-1.2.1-1.3zm-5.5 7.6h-.1c-1.7 0-3.4-.5-4.9-1.3l-.4-.2-3.5.9.9-3.4-.2-.4A9.95 9.95 0 012 12C2 6.5 6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Tienda</h4>
            <ul>
              <li><a href="#">Cascos</a></li>
              <li><a href="#">Aceites de Motor</a></li>
              <li><a href="#">Llantas</a></li>
              <li><a href="#">Guantes</a></li>
              <li><a href="#">Chaquetas</a></li>
              <li><a href="#">Accesorios</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Compañía</h4>
            <ul>
              <li><a href="#">Sobre Nosotros</a></li>
              <li><a href="#">Nuestra Historia</a></li>
              <li><a href="#">Empleos</a></li>
              <li><a href="#">Prensa</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Soporte</h4>
            <ul>
              <li><a href="#">Información de Envío</a></li>
              <li><a href="#">Devoluciones</a></li>
              <li><a href="#">Rastrear Pedido</a></li>
              <li><a href="#">Preguntas Frecuentes</a></li>
              <li><a href="#">Garantía</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-bottom-left">
            © 2025 <span>Motorepuestos Mega Mundo</span>. Todos los derechos reservados. Todo para tu moto.
          </p>
          <div className="footer-bottom-right">
            <a href="#" onClick={(e) => { e.preventDefault(); setShowTerms(true) }}>Términos y Condiciones</a>
            <a href="#">Política de Privacidad</a>
            <a href="#">Política de Cookies</a>
          </div>
        </div>
      </footer>

      {/* TERMS MODAL */}
      {showTerms && (
        <div className="modal-overlay" onClick={() => setShowTerms(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Términos y Condiciones</h2>
              <button className="modal-close" onClick={() => setShowTerms(false)}>×</button>
            </div>
            <div className="modal-body">
              {termsContent}
            </div>
          </div>
        </div>
      )}
    </>
  )
}