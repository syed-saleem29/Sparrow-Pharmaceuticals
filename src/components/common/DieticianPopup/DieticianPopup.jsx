import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import styles from './DieticianPopup.module.css'

export default function DieticianPopup() {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('dieticianPopupDismissed')) return
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  function dismiss() {
    setVisible(false)
    sessionStorage.setItem('dieticianPopupDismissed', '1')
  }

  function consult() {
    dismiss()
    navigate('/dietician')
  }

  if (!visible) return null

  return (
    <div className={styles.popup} role="dialog" aria-label="Meet our dietician">
      <button className={styles.close} onClick={dismiss} aria-label="Close">
        <X size={16} />
      </button>

      <div className={styles.avatar}>KT</div>

      <div className={styles.body}>
        <p className={styles.label}>Clinical Dietician</p>
        <h3 className={styles.name}>Khadija Tabassum</h3>
        <p className={styles.tagline}>Have a surgical nutrition question? I'm here to help.</p>
        <a href="tel:+917815885166" className={styles.phone}>+91 78158 85166</a>
      </div>

      <div className={styles.actions}>
        <button className={styles.btnPrimary} onClick={consult}>Consult Now</button>
        <button className={styles.btnGhost} onClick={dismiss}>Maybe Later</button>
      </div>
    </div>
  )
}
