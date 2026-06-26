import { useState } from 'react'
import styles from './ChatBot.module.css'

export default function ChatBot() {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.wrapper}>
      {open && (
        <div className={styles.window}>
          <div className={styles.windowHeader}>
            <span>Chat with us</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
          </div>
          <div className={styles.body}>
            <p className={styles.botMsg}>
              Hi! 👋 Welcome to Sparrow Pharma. How can we help you today?
            </p>
          </div>
          <div className={styles.inputRow}>
            <input type="text" placeholder="Type a message…" />
            <button>Send</button>
          </div>
        </div>
      )}
      <button
        className={styles.fab}
        onClick={() => setOpen(!open)}
        aria-label="Open chat"
      >
        💬
      </button>
    </div>
  )
}
