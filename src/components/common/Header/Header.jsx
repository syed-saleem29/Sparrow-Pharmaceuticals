import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const close = () => setMenuOpen(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} onClick={close}>
          <img src="/Logo Without BG.png" alt="Sparrow Pharmaceuticals bird logo" className={styles.logoIcon} />
          <span className={styles.logoText}>Sparrow Pharmaceuticals</span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            onClick={close}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            onClick={close}
          >
            Products
          </NavLink>

          <NavLink
            to="/blog"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            onClick={close}
          >
            Blog
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            onClick={close}
          >
            Contact
          </NavLink>

          <Link to="/order" className={styles.ctaBtn} onClick={close}>
            Order Now
          </Link>
        </nav>

        <button
          className={`${styles.menuBtn} ${menuOpen ? styles.menuBtnOpen : ''}`}
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
