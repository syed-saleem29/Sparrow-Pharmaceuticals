import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.logo}>Sparrow <em>Pharmaceuticals</em></span>
          <p>Evidence-based peri-operative nutrition for better surgical outcomes.</p>
        </div>

        <div className={styles.links}>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/products/surgicover">Surgicover</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/order">Order</Link>
        </div>

        <div className={styles.links}>
          <h4>Legal</h4>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
        </div>

        <div className={styles.links}>
          <h4>Contact</h4>
          <a href="tel:+918074833565">+91 80748 33565</a>
          <a href="tel:+916300792061">+91 63007 92061</a>
          <a href="mailto:info@sparrowpharmaceuticals.in">info@sparrowpharmaceuticals.in</a>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Sparrow Pharmaceuticals. All rights reserved.</span>
      </div>
    </footer>
  )
}
