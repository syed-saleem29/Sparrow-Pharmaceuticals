import styles from './Home.module.css'
import Button from '../../components/common/Button/Button'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1>Advancing Healthcare<br /><span>With Trusted Science</span></h1>
          <p>
            Sparrow Pharmaceuticals delivers premium surgical and medical products
            designed to protect patients and empower healthcare professionals.
          </p>
          <div className={styles.heroActions}>
            <Link to="/surgicover">
              <Button size="lg">Explore Surgicover</Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">Get in Touch</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={`section section--alt ${styles.features}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Why Choose Sparrow?</h2>
          <div className={styles.grid}>
            {[
              { icon: '🛡️', title: 'Clinically Proven',   desc: 'All products tested to international standards for maximum safety and efficacy.' },
              { icon: '🔬', title: 'Research-Driven',     desc: 'Backed by continuous R&D to bring the latest healthcare innovations to market.' },
              { icon: '🚀', title: 'Fast Delivery',        desc: 'Reliable nationwide distribution ensuring timely access for healthcare providers.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className={styles.card}>
                <span className={styles.cardIcon}>{icon}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Highlight */}
      <section className="section">
        <div className={`container ${styles.productHighlight}`}>
          <div className={styles.productText}>
            <h2>Surgicover — Advanced Surgical Protection</h2>
            <p>
              Our flagship product line engineered for surgical environments.
              Superior barrier protection, comfort, and compliance in every use.
            </p>
            <Link to="/surgicover">
              <Button>View Product</Button>
            </Link>
          </div>
          <div className={styles.productImg}>
            <div className={styles.imgPlaceholder}>[ Product Image ]</div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <h2>Ready to place an order?</h2>
          <p>Contact our sales team or place your order directly online.</p>
          <Link to="/order">
            <Button variant="secondary" size="lg">Order Now</Button>
          </Link>
        </div>
      </section>
    </>
  )
}
