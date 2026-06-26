import styles from './Surgicover.module.css'
import Button from '../../components/common/Button/Button'
import { Link } from 'react-router-dom'

export default function Surgicover() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.tag}>Product</span>
          <h1>Surgicover</h1>
          <p>Advanced surgical protection for operating theatres, clinics, and healthcare facilities.</p>
          <Link to="/order">
            <Button size="lg">Order Surgicover</Button>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className={styles.sectionTitle}>Product Overview</h2>
          <div className={styles.overview}>
            <div className={styles.imgPlaceholder}>[ Product Image ]</div>
            <div>
              <p>
                Surgicover is Sparrow Pharmaceuticals' flagship surgical cover product.
                Engineered with medical-grade materials, it provides superior barrier
                protection against contamination, fluids, and micro-organisms in critical care environments.
              </p>
              <ul className={styles.specList}>
                <li>✅ Sterile, single-use design</li>
                <li>✅ Fluid-resistant barrier technology</li>
                <li>✅ Latex-free and hypoallergenic</li>
                <li>✅ Compliant with international medical standards</li>
                <li>✅ Available in multiple sizes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={`section section--alt`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Key Features</h2>
          <div className={styles.grid}>
            {[
              { title: 'Sterile Packaging',    desc: 'Individually sealed to maintain sterility until point of use.' },
              { title: 'High Durability',      desc: 'Tear-resistant material ensures reliable performance throughout procedures.' },
              { title: 'Ergonomic Fit',         desc: 'Designed for ease of use without compromising dexterity.' },
              { title: 'Eco-Conscious',         desc: 'Manufactured using environmentally responsible processes.' },
            ].map(({ title, desc }) => (
              <div key={title} className={styles.card}>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Interested in Surgicover?</h2>
          <p style={{ color: 'var(--color-light-text)', margin: '1rem auto 2rem', maxWidth: 500 }}>
            Contact our sales team for bulk pricing, samples, or distribution enquiries.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/order"><Button size="lg">Place Order</Button></Link>
            <Link to="/contact"><Button size="lg" variant="outline">Contact Sales</Button></Link>
          </div>
        </div>
      </section>
    </>
  )
}
