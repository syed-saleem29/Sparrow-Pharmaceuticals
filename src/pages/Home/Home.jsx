import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const stats = [
  { value: '30%',  label: 'Protein by Weight' },
  { value: '0 g',  label: 'Added Sucrose' },
  { value: '14',   label: 'Micronutrients' },
  { value: '3',    label: 'Flavours Available' },
]

const phases = [
  {
    phase: 'Pre-Operative',
    timing: '7 – 5 Days Before Surgery',
    desc: 'Build protein reserves and optimise micronutrient levels to strengthen the body ahead of surgical stress.',
    color: 'var(--color-primary)',
  },
  {
    phase: 'Pre-Operative Window',
    timing: '24 Hours – 2 Hours Pre-Anaesthesia',
    desc: 'Metabolic preparation to stimulate insulin secretion, preserve glycogen stores, and reduce post-operative insulin resistance.',
    color: 'var(--color-tertiary)',
  },
  {
    phase: 'Post-Operative',
    timing: 'Day 1 – Day 14 and Beyond',
    desc: 'Targeted amino acids and micronutrients to drive tissue repair, limit muscle loss, and support early mobilisation.',
    color: 'var(--color-secondary)',
  },
]

const whyChoose = [
  {
    icon: '🔬',
    title: 'Clinically Formulated',
    desc: 'Built on the science of ERAS protocols — evidence-based peri-operative nutrition to minimise catabolic depletion.',
  },
  {
    icon: '🧬',
    title: 'PDCAAS 1.0 Protein',
    desc: 'A hybrid soya-milk protein matrix with a perfect amino acid score — equivalent to whey with superior post-operative GI tolerance.',
  },
  {
    icon: '🚫',
    title: 'Zero Added Sucrose',
    desc: 'Acute post-operative hyperglycaemia is directly linked to surgical site infections. Surgicover eliminates added sucrose entirely.',
  },
  {
    icon: '🏥',
    title: 'B2B Healthcare Focus',
    desc: 'Designed for hospitals, surgical centres, and clinical dietitians. Bulk supply, institutional pricing, and clinical support available.',
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <span className={styles.heroTag}>Peri-Operative Clinical Nutrition</span>
            <h1>
              Accelerate Surgical Recovery.<br />
              <span>Clinically Proven.</span>
            </h1>
            <p>
              Sparrow Pharmaceuticals delivers evidence-based nutritional therapy engineered
              to optimise the surgical patient's metabolic state — before, during, and after surgery.
            </p>
            <div className={styles.heroActions}>
              <Link to="/products/surgicover">
                <button className={styles.heroBtnPrimary}>Explore Surgicover</button>
              </Link>
              <Link to="/contact">
                <button className={styles.heroBtnOutline}>Contact Us</button>
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <img src="/Logo Without BG.png" alt="Sparrow Pharmaceuticals" className={styles.heroLogo} />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <div className={`container ${styles.statsGrid}`}>
          {stats.map(({ value, label }) => (
            <div key={label} className={styles.statItem}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Product Spotlight */}
      <section className="section">
        <div className={`container ${styles.spotlight}`}>
          <div className={styles.spotlightImages}>
            <div className={styles.spotlightMain}>
              <img src="/Vanilla/1.png" alt="Surgicover Vanilla" />
            </div>
            <div className={styles.spotlightSide}>
              <img src="/chocolate/1.png" alt="Surgicover Chocolate" />
              <img src="/dry%20fuits/1.png" alt="Surgicover Dry Fruits" />
            </div>
          </div>
          <div className={styles.spotlightText}>
            <span className={styles.spotTag}>Our Product</span>
            <h2>Meet Surgicover</h2>
            <p>
              Surgicover is a specialised peri-operative enteral supplement designed to address
              the profound neuroendocrine and metabolic response triggered by surgical intervention.
            </p>
            <p>
              Formulated with a dual-action amino acid spike, a hybrid protein matrix with PDCAAS 1.0,
              and zero added sucrose — Surgicover serves as the essential metabolic bridge throughout
              the entire surgical timeline.
            </p>
            <p className={styles.flavourLine}>
              Available in <strong>Vanilla</strong>, <strong>Chocolate</strong>, and <strong>Dry Fruits</strong>.
            </p>
            <Link to="/products/surgicover">
              <button className={styles.heroBtnPrimary}>View Full Product Details</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className={`section section--alt`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Why Choose Sparrow?</h2>
          <p className={styles.sectionSub}>
            Purpose-built for the surgical setting — not a generic supplement repurposed for clinical use.
          </p>
          <div className={styles.whyGrid}>
            {whyChoose.map(({ icon, title, desc }) => (
              <div key={title} className={styles.whyCard}>
                <span className={styles.whyIcon}>{icon}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Peri-Operative Phases */}
      <section className="section">
        <div className="container">
          <h2 className={styles.sectionTitle}>Peri-Operative Support Timeline</h2>
          <p className={styles.sectionSub}>
            Surgicover is clinically integrated across all three phases of the surgical pathway.
          </p>
          <div className={styles.phasesGrid}>
            {phases.map(({ phase, timing, desc, color }) => (
              <div key={phase} className={styles.phaseCard} style={{ borderTopColor: color }}>
                <span className={styles.phaseBadge} style={{ background: color }}>{phase}</span>
                <p className={styles.phaseTiming}>{timing}</p>
                <p className={styles.phaseDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <h2>Ready to optimise your patients' surgical outcomes?</h2>
          <p>
            Contact our clinical team for institutional supply, bulk pricing, or to request samples.
          </p>
          <div className={styles.ctaActions}>
            <Link to="/order">
              <button className={styles.ctaPrimary}>Place an Order</button>
            </Link>
            <Link to="/contact">
              <button className={styles.ctaSecondary}>Talk to Our Team</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
