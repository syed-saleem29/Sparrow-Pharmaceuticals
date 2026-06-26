import { useState } from 'react'
import styles from './Order.module.css'
import Button from '../../components/common/Button/Button'

export default function Order() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', organization: '', product: 'Surgicover', quantity: '', notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1>Place an Order</h1>
          <p>Fill in your details below and our sales team will confirm your order within 24 hours.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.formWrap}>
            {submitted ? (
              <div className={styles.success}>
                <span>🎉</span>
                <h3>Order Request Received!</h3>
                <p>Our team will contact you shortly to confirm and process your order.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Order Details</h2>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Full Name</label>
                    <input type="text" name="name" placeholder="Dr. Jane Smith" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className={styles.field}>
                    <label>Email Address</label>
                    <input type="email" name="email" placeholder="jane@hospital.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Phone Number</label>
                    <input type="tel" name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} required />
                  </div>
                  <div className={styles.field}>
                    <label>Organization / Hospital</label>
                    <input type="text" name="organization" placeholder="City General Hospital" value={form.organization} onChange={handleChange} />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Product</label>
                    <select name="product" value={form.product} onChange={handleChange}>
                      <option value="Surgicover">Surgicover</option>
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label>Quantity (units / boxes)</label>
                    <input type="number" name="quantity" placeholder="e.g. 100" min="1" value={form.quantity} onChange={handleChange} required />
                  </div>
                </div>

                <div className={styles.field}>
                  <label>Additional Notes</label>
                  <textarea name="notes" rows="4" placeholder="Size requirements, delivery instructions…" value={form.notes} onChange={handleChange} />
                </div>

                <Button type="submit" size="lg" variant="secondary">Submit Order Request</Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
