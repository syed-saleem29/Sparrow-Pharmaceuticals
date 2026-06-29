import { Link } from 'react-router-dom'
import styles from './Products.module.css'

const products = [
  {
    id: 'surgicover',
    name: 'Surgicover',
    tagline: 'Advanced Peri-Operative Clinical Nutrition',
    image: '/Vanilla/1.png',
    desc: 'A specialised peri-operative enteral supplement formulated to optimise surgical recovery, preserve lean muscle mass, and accelerate wound healing — across all phases of surgery.',
    variants: ['Vanilla', 'Chocolate', 'Diabetic Cover'],
    href: '/products/surgicover',
  },
]

export default function Products() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1>Our Products</h1>
          <p>Clinically formulated nutritional solutions for the surgical patient.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {products.map((p) => (
              <Link key={p.id} to={p.href} className={styles.card}>
                <div className={styles.cardImgWrap}>
                  <img src={p.image} alt={p.name} className={styles.cardImg} />
                  <div className={styles.cardReflection}>
                    <img src={p.image} alt="" aria-hidden="true" className={styles.cardReflectionImg} />
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <h2 className={styles.cardName}>{p.name}</h2>
                  <p className={styles.cardTagline}>{p.tagline}</p>
                  <p className={styles.cardDesc}>{p.desc}</p>
                  <div className={styles.variants}>
                    {p.variants.map((v) => (
                      <span key={v} className={styles.variantTag}>{v}</span>
                    ))}
                  </div>
                  <span className={styles.viewBtn}>View Product →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
