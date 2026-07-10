import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import styles from './Contact.module.css'
import Button from '../../components/common/Button/Button'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Helmet>
        <title>Contact Sparrow Pharmaceuticals | Surgicover Enquiries India</title>
        <meta name="description" content="Contact Sparrow Pharmaceuticals for Surgicover enquiries, hospital procurement, bulk orders, or clinical nutrition queries. Call +91 80748 33565 or email info@sparrowpharmaceuticals.in." />
        <link rel="canonical" href="https://sparrowpharmaceuticals.in/contact" />
      </Helmet>
      <section className={styles.hero}>
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Fill in the form and our team will get back within 24 hours.</p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.info}>
            <h2>Get in Touch</h2>

            <div className={styles.infoItem}>
              <strong>Phone</strong>
              <a href="tel:+918074833565">+91 80748 33565</a>
              <a href="tel:+916300792061">+91 63007 92061</a>
            </div>

            <div className={styles.infoItem}>
              <strong>Email</strong>
              <a href="mailto:info@sparrowpharmaceuticals.in">info@sparrowpharmaceuticals.in</a>
            </div>

            <div className={styles.infoItem}>
              <strong>Address</strong>
              <span>Sparrow Pharmaceuticals, India</span>
            </div>
          </div>

          <div className={styles.formWrap}>
            {submitted ? (
              <div className={styles.success}>
                <span>✅</span>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll be in touch shortly.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
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
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
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
                  <label>Message</label>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Tell us how we can help…"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" size="lg">Send Message</Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
