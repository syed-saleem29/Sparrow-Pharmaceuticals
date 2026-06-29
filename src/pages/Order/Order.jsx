import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import styles from './Order.module.css'

const productVariants = {
  Surgicover: ['Vanilla', 'Chocolate', 'Diabetic Cover'],
}

export default function Order() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', organization: '',
    product: 'Surgicover', variant: '', quantity: '', notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'product' ? { variant: '' } : {}),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const variants = productVariants[form.product] || []

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1>Place an Order</h1>
          <p>Fill in your details and our sales team will confirm your order within 24 hours.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.formWrap} data-reveal>
            {submitted ? (
              <div className={styles.success}>
                <CheckCircle size={52} color="var(--color-secondary)" strokeWidth={1.5} />
                <h3>Order Request Received!</h3>
                <p>Our team will contact you shortly to confirm and process your order.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Order Details</h2>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Full Name</label>
                    <input type="text" name="name" placeholder="Dr. Jane Smith"
                      value={form.name} onChange={handleChange} required />
                  </div>
                  <div className={styles.field}>
                    <label>Email Address</label>
                    <input type="email" name="email" placeholder="jane@hospital.com"
                      value={form.email} onChange={handleChange} required />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Phone Number</label>
                    <input type="tel" name="phone" placeholder="+91 00000 00000"
                      value={form.phone} onChange={handleChange} required />
                  </div>
                  <div className={styles.field}>
                    <label>Organisation / Hospital</label>
                    <input type="text" name="organization" placeholder="City General Hospital"
                      value={form.organization} onChange={handleChange} />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Product</label>
                    <select name="product" value={form.product} onChange={handleChange}>
                      <option value="Surgicover">Surgicover</option>
                    </select>
                  </div>

                  {variants.length > 0 && (
                    <div className={styles.field}>
                      <label>Flavour / Variant</label>
                      <select name="variant" value={form.variant} onChange={handleChange} required>
                        <option value="">Select a flavour</option>
                        {variants.map((v) => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className={styles.field}>
                  <label>Quantity (units / boxes)</label>
                  <input type="number" name="quantity" placeholder="e.g. 100" min="1"
                    value={form.quantity} onChange={handleChange} required />
                </div>

                <div className={styles.field}>
                  <label>Additional Notes</label>
                  <textarea name="notes" rows="4"
                    placeholder="Size requirements, delivery instructions, special requests…"
                    value={form.notes} onChange={handleChange} />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Submit Order Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
