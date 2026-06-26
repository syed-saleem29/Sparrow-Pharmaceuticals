import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const navLinks = [
  { label: 'Home',       to: '/'          },
  { label: 'Surgicover', to: '/surgicover' },
  { label: 'Blog',       to: '/blog'       },
  { label: 'Contact',    to: '/contact'    },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          Sparrow <span>Pharma</span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <Link to="/order" className={styles.ctaBtn} onClick={() => setMenuOpen(false)}>
            Order Now
          </Link>
        </nav>

        <button
          className={styles.menuBtn}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
