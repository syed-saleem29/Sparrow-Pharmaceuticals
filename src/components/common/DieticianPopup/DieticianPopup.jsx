import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import styles from './DieticianPopup.module.css'

export default function DieticianPopup() {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const cardRef = useRef(null)

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

  function handleOverlayClick(e) {
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      dismiss()
    }
  }

  if (!visible) return null

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Meet our dietician"
    >
      <div className={styles.card} ref={cardRef}>
        <button className={styles.close} onClick={dismiss} aria-label="Close">
          <X size={18} />
        </button>

        <div className={styles.content}>
          <div className={styles.left}>
            <span className={styles.badge}>Clinical Nutrition</span>
            <h2 className={styles.heading}>Meet Our<br />Dietician</h2>
            <p className={styles.doctorName}>Khadija Tabassum</p>
            <p className={styles.desc}>
              Have a surgical nutrition question? Khadija is here to guide surgeons,
              hospital teams, and clinical staff on peri-operative nutrition and Surgicover.
            </p>
            <a href="tel:+917815885166" className={styles.phone}>+91 78158 85166</a>
            <div className={styles.actions}>
              <button className={styles.btnPrimary} onClick={consult}>Consult Now</button>
              <button className={styles.btnOutline} onClick={dismiss}>Maybe Later</button>
            </div>
          </div>

          <div className={styles.right}>
            <img src="/images/dietician-hero.webp" alt="Clinical Dietician Khadija Tabassum" />
          </div>
        </div>
      </div>
    </div>
  )
}
