import { useState, useEffect, useMemo } from 'react'
import { client, urlFor } from '../../client.js'
import '../landing/landing.css'
import './catalogo.css'
import logo from '../../assets/logo.jpeg'
import Product from '../../components/product/product.jsx';

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function Catalogo() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const query = '*[_type == "product"] | order(name asc) { ..., brand-> }'

    client.fetch(query)
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const brandGroups = useMemo(() => {
    const groups = {}
    products.forEach((p) => {
      const brandName = p.brand?.name || 'Otras Marcas'
      if (!groups[brandName]) groups[brandName] = []
      groups[brandName].push(p)
    })
    return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]))
  }, [products])

  const totalVariantCount = products.reduce(
    (sum, p) => sum + (p.variants?.length ? p.variants.length : 1),
    0
  )

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/">
            <img src={logo} alt="Motorepuestos Mega Mundo" />
          </a>
        </div>
        <ul className="navbar-links">
          <li><a href="/">Inicio</a></li>
          <li><a href="/catalogo">Catálogo</a></li>
          <li><a href="/#">Marcas</a></li>
          <li><a href="/#" className="navbar-cta">Comprar Ahora</a></li>
        </ul>
      </nav>

      {/* BOOK COVER */}
      <section className="catalog-cover">
        <p className="hero-eyebrow">Edición 2026</p>
        <h1 className="catalog-cover-title">
          CATÁLOGO<br />
          DE <span>PRODUCTOS</span>
        </h1>
        <p className="catalog-cover-sub">
          Hojea nuestra colección completa de cascos, aceites, llantas, ropa y accesorios — directo desde nuestro inventario, marca por marca.
        </p>
        {!loading && (
          <div className="catalog-cover-meta">
            <span>{totalVariantCount} productos</span>
            <span className="dot">•</span>
            <span>{brandGroups.length} marcas</span>
          </div>
        )}
      </section>

      {/* TABLE OF CONTENTS */}
      {!loading && brandGroups.length > 0 && (
        <section className="catalog-index">
          <p className="section-label">Índice</p>
          <ul className="index-list">
            {brandGroups.map(([brandName, items], i) => (
              <li key={brandName}>
                <a href={`#brand-${slugify(brandName)}`}>
                  <span className="index-name">{brandName}</span>
                  <span className="index-dots" />
                  <span className="index-page">{String(i + 1).padStart(2, '0')}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* BOOK BODY */}
      <div className="catalog-book">
        {loading && <p className="catalog-loading">Cargando catálogo...</p>}

        {!loading && brandGroups.length === 0 && (
          <p className="catalog-loading">No hay productos disponibles todavía.</p>
        )}

        {brandGroups.map(([brandName, items], i) => {
          const brandCount = items.reduce(
            (s, p) => s + (p.variants?.length ? p.variants.length : 1),
            0
          )

          return (
            <section
              key={brandName}
              id={`brand-${slugify(brandName)}`}
              className="spread"
            >
              {/* LEFT PAGE: chapter intro */}
              <div className="page page-left">
                <span className="page-index-num">{String(i + 1).padStart(2, '0')}</span>
                <p className="page-eyebrow">Capítulo {i + 1}</p>
                <h2 className="page-brand-title">{brandName}</h2>
                <p className="page-brand-count">
                  {brandCount} {brandCount === 1 ? 'producto' : 'productos'} en esta colección
                </p>
                <div className="page-folio">— Pág. {String(i * 2 + 1).padStart(2, '0')} —</div>
              </div>

              {/* RIGHT PAGE: products grid, same card format as landing */}
              <div className="page page-right">
                <div className="catalog-grid">
                    {items.map((p) =>
                        (p.variants?.length > 0 ? p.variants : [null]).map((v, index) => (
                        <Product 
                            key={`${p._id}-${index}`} 
                            product={p} 
                            variant={v} 
                        />
                        ))
                    )}
                </div>
                <div className="page-folio">— Pág. {String(i * 2 + 2).padStart(2, '0')} —</div>
              </div>
            </section>
          )
        })}
      </div>

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
            <a href="#">Términos y Condiciones</a>
            <a href="#">Política de Privacidad</a>
            <a href="#">Política de Cookies</a>
          </div>
        </div>
      </footer>
    </>
  )
}