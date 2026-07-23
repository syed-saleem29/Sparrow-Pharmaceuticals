import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import styles from './Dietician.module.css'
import Button from '../../components/common/Button/Button'

const HIGHLIGHTS = [
  {
    icon: '🩺',
    title: 'Surgical Nutrition Guidance',
    body: "Get personalised advice on pre- and post-operative nutrition protocols tailored to your patient's surgery type and health status.",
  },
  {
    icon: '📋',
    title: 'Product Integration Support',
    body: 'Our dietician helps hospital teams integrate Surgicover into existing ERAS and recovery protocols across all surgical departments.',
  },
  {
    icon: '💬',
    title: 'Direct Consultation',
    body: 'Reach out via the form below or contact us directly   we respond within 24 hours on all clinical queries.',
  },
]

export default function Dietician() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    hospital: '',
    role: '',
    query: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Helmet>
        <title>Consult Our Clinical Dietician | Sparrow Pharmaceuticals</title>
        <meta name="description" content="Consult Sparrow Pharmaceuticals' clinical dietician for peri-operative nutrition guidance, Surgicover integration into ERAS protocols, and surgical nutrition support for hospitals and clinical teams." />
        <link rel="canonical" href="https://sparrowpharmaceuticals.in/dietician" />
      </Helmet>

      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <span className={styles.badge}>Clinical Nutrition</span>
            <h1>Meet Our Dietician</h1>
            <p className={styles.doctorName}>Khadija Tabassum</p>
            <p>
              Have a clinical nutrition question? Khadija is available to guide
              surgeons, hospital procurement teams, and clinical staff on peri-operative nutrition
              and Surgicover integration.
            </p>
            <a href="tel:+917815885166" className={styles.heroPhone}>📞 +91 78158 85166</a>
          </div>
          <div className={styles.heroImage}>
            <img src="/images/dietician-hero.webp" alt="Sparrow Pharmaceuticals clinical dietician" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.highlights}>
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className={styles.card}>
                <span className={styles.cardIcon}>{h.icon}</span>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.formSection}`}>
        <div className={`container ${styles.layout}`}>
          <div className={styles.info}>
            <h2>Get in Touch</h2>
            <p className={styles.infoSubtext}>
              Fill in the form and our dietician will get back to you within 24 hours.
            </p>

            <div className={styles.infoItem}>
              <strong>Email</strong>
              <a href="mailto:info@sparrowpharmaceuticals.in">info@sparrowpharmaceuticals.in</a>
            </div>

            <div className={styles.infoItem}>
              <strong>Phone</strong>
              <a href="tel:+918074833565">+91 80748 33565</a>
              <a href="tel:+916300792061">+91 63007 92061</a>
            </div>

            <div className={styles.infoItem}>
              <strong>Response Time</strong>
              <span>Within 24 hours on working days</span>
            </div>

            <div className={styles.infoItem}>
              <strong>Available For</strong>
              <span>Surgeons, clinical dieticians, hospital procurement teams, nursing staff</span>
            </div>
          </div>

          <div className={styles.formWrap}>
            {submitted ? (
              <div className={styles.success}>
                <span>✅</span>
                <h3>Query Received!</h3>
                <p>Thank you for reaching out. Our dietician will respond within 24 hours.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Dr. Jane Smith"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="jane@hospital.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 00000 00000"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.field}>
                    <label>Hospital / Clinic Name</label>
                    <input
                      type="text"
                      name="hospital"
                      placeholder="City General Hospital"
                      value={form.hospital}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label>Your Role</label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your role…</option>
                    <option>Surgeon</option>
                    <option>Clinical Dietician</option>
                    <option>Hospital Procurement</option>
                    <option>Nursing Staff</option>
                    <option>Patient / Caregiver</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label>Your Query</label>
                  <textarea
                    name="query"
                    rows="5"
                    placeholder="Describe your clinical nutrition query, patient case, or how you'd like to use Surgicover…"
                    value={form.query}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" size="lg">Send Query</Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
