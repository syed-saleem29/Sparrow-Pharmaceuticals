import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Zap, Dna, ShieldCheck, Microscope } from 'lucide-react'
import { variants, keyFeatures, nutritionRows, instructions, ingredients } from '../../data/surgicover'
import styles from './Surgicover.module.css'

export default function Surgicover() {
  const [activeVariant, setActiveVariant] = useState(variants[0])
  const [activeImage, setActiveImage] = useState(1)

  const handleVariantChange = (v) => {
    setActiveVariant(v)
    setActiveImage(1)
  }

  const imgSrc = (n) => `/${encodeURIComponent(activeVariant.folder)}/${n}.webp`

  return (
    <>
      <Helmet>
        <title>Surgicover — Peri-Operative Clinical Nutrition Supplement | Sparrow Pharmaceuticals India</title>
        <meta name="description" content="Surgicover: India's peri-operative clinical nutrition supplement. L-Arginine 200mg (wound healing), L-Leucine 100mg (muscle preservation), 6g PDCAAS 1.0 soya protein, zero added sucrose, 14 vitamins and minerals per 20g serving. ERAS-aligned. 3 variants: Vanilla, Chocolate, Diabetic Cover (Dry Fruits). For hospitals, surgeons, and clinical dieticians." />
        <meta name="keywords" content="Surgicover, peri-operative nutrition supplement, surgical recovery supplement, post-operative protein supplement India, L-Arginine wound healing, L-Leucine muscle preservation, PDCAAS 1.0 protein, zero sucrose protein supplement, diabetic surgical supplement, ERAS nutrition supplement, soya protein surgery, clinical nutrition supplement India, Sparrow Pharmaceuticals, post surgery protein India, pre-operative supplement, surgical prehabilitation, muscle wasting prevention surgery, wound healing supplement India, collagen synthesis supplement, nitric oxide supplement surgery" />
        <link rel="canonical" href="https://sparrowpharmaceuticals.in/products/surgicover" />
        <meta property="og:title" content="Surgicover — Peri-Operative Nutrition Supplement | Sparrow Pharmaceuticals" />
        <meta property="og:description" content="India's surgical recovery supplement with L-Arginine, L-Leucine, zero sucrose and PDCAAS 1.0 protein. Available for hospitals and surgical centres." />
        <meta property="og:url" content="https://sparrowpharmaceuticals.in/products/surgicover" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sparrowpharmaceuticals.in/" },
            { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://sparrowpharmaceuticals.in/products" },
            { "@type": "ListItem", "position": 3, "name": "Surgicover", "item": "https://sparrowpharmaceuticals.in/products/surgicover" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is Surgicover?",
              "acceptedAnswer": { "@type": "Answer", "text": "Surgicover is a peri-operative clinical nutrition supplement by Sparrow Pharmaceuticals, formulated to support patients before and after surgery. It contains L-Arginine (200mg), L-Leucine (100mg), 6g PDCAAS 1.0 soya-milk protein, zero added sucrose, and 14 vitamins and minerals per 20g serving." }
            },
            {
              "@type": "Question",
              "name": "Is Surgicover safe for diabetic patients?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes. Surgicover contains zero added sucrose and is sweetened exclusively with sucralose (GI=0, non-caloric). The Diabetic Cover variant (Dry Fruits flavour) is specifically designed for Type 1 and Type 2 diabetic and pre-diabetic surgical patients. It will not raise blood glucose." }
            },
            {
              "@type": "Question",
              "name": "When should patients start taking Surgicover?",
              "acceptedAnswer": { "@type": "Answer", "text": "Start 5-7 days before elective surgery (prehabilitation phase), 2 servings per day. Resume from post-operative Day 2 after the clear liquid phase. Continue 1-2 servings per day for 14-30 days post-discharge during home recovery." }
            },
            {
              "@type": "Question",
              "name": "What are the variants of Surgicover?",
              "acceptedAnswer": { "@type": "Answer", "text": "Surgicover is available in 3 variants: Vanilla (smooth, for general compliance), Chocolate (for reduced appetite or taste changes), and Diabetic Cover in Dry Fruits flavour (zero sucrose, for diabetic and pre-diabetic surgical patients)." }
            },
            {
              "@type": "Question",
              "name": "How is Surgicover different from Ensure HP or PentaSure HP?",
              "acceptedAnswer": { "@type": "Answer", "text": "Surgicover is the only supplement in this category with a dual free-form L-Arginine (200mg) + L-Leucine (100mg) spike per serving for direct NOS and mTORC1 activation. Unlike Ensure HP (contains sucrose, no free L-Arginine/L-Leucine) and PentaSure HP (whey-based with fructose and maltodextrin), Surgicover uses lactose-compatible SPI protein and zero sucrose — purpose-built for the peri-operative window." }
            },
            {
              "@type": "Question",
              "name": "What is the correct dosage for Surgicover?",
              "acceptedAnswer": { "@type": "Answer", "text": "Standard dose: 1 heaped scoop (20g) in 150-200ml lukewarm water or milk. Pre-surgery: 2 servings/day. Post-op Day 2-5: 2 servings/day. Post-op Day 6+: 1-2 servings/day. For major surgery (oncology, orthopaedic, GI): 3-4 servings/day providing 18-24g protein and 600-800mg L-Arginine." }
            },
            {
              "@type": "Question",
              "name": "Can Surgicover be used after orthopaedic surgery?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes. Surgicover is widely used in orthopaedic surgery (ACL reconstruction, THA, TKA, joint replacement). L-Leucine activates mTORC1 to prevent disuse muscle atrophy during immobilisation. L-Arginine and Vitamin C drive collagen deposition for ligament and tendon repair. Vitamin D supports bone mineralisation." }
            },
            {
              "@type": "Question",
              "name": "How do I order Surgicover for a hospital or clinic?",
              "acceptedAnswer": { "@type": "Answer", "text": "For institutional or bulk procurement, contact Sparrow Pharmaceuticals at info@sparrowpharmaceuticals.in or call +91 80748 33565 / +91 63007 92061. You can also submit an order request at sparrowpharmaceuticals.in/order." }
            }
          ]
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.tag}>Clinical Nutrition</span>
          <h1>Surgicover</h1>
          <p>Advanced Peri-Operative Nutritional Therapy by Sparrow Pharmaceuticals</p>
        </div>
      </section>

      {/* Product Section */}
      <section className="section">
        <div className={`container ${styles.productSection}`}>

          {/* Gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImageWrap}>
              <img
                key={`${activeVariant.id}-${activeImage}`}
                src={imgSrc(activeImage)}
                alt={`Surgicover ${activeVariant.name} view ${activeImage}`}
                className={styles.mainImage}
              />
            </div>
            <div className={styles.reflection}>
              <img
                src={imgSrc(activeImage)}
                alt=""
                aria-hidden="true"
                className={styles.reflectionImg}
              />
            </div>
            <div className={styles.thumbnails}>
              {Array.from({ length: activeVariant.imageCount }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  className={`${styles.thumb} ${n === activeImage ? styles.thumbActive : ''}`}
                  onClick={() => setActiveImage(n)}
                  aria-label={`View image ${n}`}
                >
                  <img src={imgSrc(n)} alt={`Surgicover ${activeVariant.name} thumbnail ${n}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className={styles.info} data-reveal="d1">
            <h2 className={styles.productName}>Surgicover</h2>
            <p className={styles.productSubtitle}>Peri-Operative Clinical Nutrition Supplement</p>

            <div className={styles.variantSection}>
              <p className={styles.variantLabel}>Select Flavour</p>
              <div className={styles.variantBtns}>
                {variants.map((v) => (
                  <button
                    key={v.id}
                    className={`${styles.variantBtn} ${activeVariant.id === v.id ? styles.variantActive : ''}`}
                    style={activeVariant.id === v.id ? { background: v.accentColor, borderColor: v.accentColor } : {}}
                    onClick={() => handleVariantChange(v)}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>

            <p className={styles.variantDesc}>{activeVariant.description}</p>

            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <strong>30%</strong>
                <span>Protein</span>
              </div>
              <div className={styles.stat}>
                <strong>0 g</strong>
                <span>Added Sucrose</span>
              </div>
              <div className={styles.stat}>
                <strong>20 g</strong>
                <span>Per Serving</span>
              </div>
              <div className={styles.stat}>
                <strong>75 Kcal</strong>
                <span>Per Serve</span>
              </div>
            </div>

            <div className={styles.actions}>
              <Link to="/order">
                <button className={styles.orderBtn}>Order Now</button>
              </Link>
              <Link to="/contact">
                <button className={styles.enquiryBtn}>Enquire</button>
              </Link>
            </div>

            <p className={styles.disclaimer}>
              For optimal peri-operative metabolic support, consume <strong>1–2 servings daily</strong> or as directed by your clinical specialist.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className={`section section--alt`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Why Surgicover Works</h2>
          <p className={styles.sectionSub}>Clinically formulated to address the metabolic demands of surgical patients</p>
          <div className={styles.featuresGrid}>
            {[Zap, Dna, ShieldCheck, Microscope].map((Icon, i) => (
              <div key={keyFeatures[i].title} className={styles.featureCard} data-reveal={`d${i + 1}`}>
                <span className={styles.featureIcon}><Icon size={26} strokeWidth={1.6} /></span>
                <h3>{keyFeatures[i].title}</h3>
                <p>{keyFeatures[i].desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nutrition Table */}
      <section className="section">
        <div className="container">
          <h2 className={styles.sectionTitle}>Nutritional Composition</h2>
          <p className={styles.sectionSub}>Declared values per 20 g serving (one heaped scoop in 150 ml water or milk)</p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nutrient Parameter</th>
                  <th>Unit</th>
                  <th>Per 20 g Serve</th>
                  <th>Per 100 g Powder</th>
                </tr>
              </thead>
              <tbody>
                {nutritionRows.map((row) => (
                  <tr key={row.nutrient} className={row.highlight ? styles.rowHighlight : ''}>
                    <td>{row.nutrient}</td>
                    <td>{row.unit}</td>
                    <td>{row.per20g}</td>
                    <td>{row.per100g}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How to Prepare */}
      <section className={`section section--alt`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>How to Prepare</h2>
          <div className={styles.steps}>
            {instructions.map((step, i) => (
              <div key={i} className={styles.step}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  <span className={styles.stepLabel}>Step {i + 1}</span>
                </div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section className="section">
        <div className="container" style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 className={styles.sectionTitle}>Ingredients</h2>
          <p className={styles.ingredientsList}>{ingredients}</p>
          <div className={styles.declarations}>
            <strong>Regulatory Declarations:</strong> CONTAINS NATURALLY OCCURRING SUGARS. Contains Milk and Soy allergens. Not for parenteral/intravenous use. Best stored in a cool, dry place away from direct sunlight.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <h2>Ready to optimise surgical recovery?</h2>
          <p>Contact our clinical team for bulk pricing, institutional supply, or clinical samples.</p>
          <div className={styles.ctaActions}>
            <Link to="/order"><button className={styles.ctaPrimary}>Place Order</button></Link>
            <Link to="/contact"><button className={styles.ctaSecondary}>Contact Sales</button></Link>
          </div>
        </div>
      </section>
    </>
  )
}
