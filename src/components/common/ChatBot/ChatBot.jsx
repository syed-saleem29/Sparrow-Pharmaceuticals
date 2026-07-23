import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, X, Send } from 'lucide-react'
import styles from './ChatBot.module.css'

const WELCOME = {
  text: "Hi! I'm the Sparrow Assistant 👋\n\nAsk me anything about Surgicover   ingredients, variants, how to order, pricing, or clinical evidence. I'm here to help.",
  quickReplies: ['What is Surgicover?', 'Product variants', 'How to order', 'Speak to the team'],
}

const QUICK_MESSAGES = {
  'What is Surgicover?': 'What is Surgicover and what does it do?',
  'Product variants':    'What flavours / variants does Surgicover come in?',
  'How to order':        'How can I place an order for Surgicover?',
  'Speak to the team':   'How do I contact the Sparrow Pharmaceuticals team?',
}

export default function ChatBot() {
  const [open, setOpen]         = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [started, setStarted]   = useState(false)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)
  const navigate  = useNavigate()

  // Show welcome message when first opened
  useEffect(() => {
    if (open && !started) {
      setStarted(true)
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setMessages([{ from: 'bot', ...WELCOME }])
      }, 600)
    }
  }, [open, started])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Build history array for the API (excluding welcome message)
  function buildHistory(msgs) {
    return msgs
      .filter((_, i) => i > 0) // skip the welcome message
      .map((m) => ({ role: m.from === 'user' ? 'user' : 'model', text: m.text }))
  }

  async function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const userMsg = { from: 'user', text: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = buildHistory([...messages, userMsg])
      const res = await fetch('/api/chat.php', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ message: trimmed, history }),
      })
      const text = await res.text()
      let data
      try {
        data = JSON.parse(text)
      } catch {
        setMessages((prev) => [...prev, { from: 'bot', text: 'Server error: ' + text.slice(0, 300) }])
        setLoading(false)
        return
      }
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: data.reply || "Sorry, I couldn't get a response. Please try again." },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: "I'm having trouble connecting. Please contact us at info@sparrowpharmaceuticals.in or call +91 80748 33565." },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleQuickReply(label) {
    sendMessage(QUICK_MESSAGES[label] || label)
  }

  function handleNav(path) {
    setOpen(false)
    navigate(path)
  }

  // Detect navigation intent in bot replies and surface action buttons
  function getNavButtons(text) {
    const t = text.toLowerCase()
    const buttons = []
    if (/order form|place.*order|\/order/.test(t))    buttons.push({ label: 'Go to Order Form →', to: '/order' })
    if (/contact form|contact us|\/contact/.test(t))  buttons.push({ label: 'Contact Us →', to: '/contact' })
    if (/blog|clinical evidence|read more/.test(t))   buttons.push({ label: 'Read Clinical Blog →', to: '/blog' })
    return buttons
  }

  return (
    <div className={styles.wrapper}>
      {open && (
        <div className={styles.window}>
          {/* Header */}
          <div className={styles.windowHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar}>S</div>
              <div>
                <p className={styles.botName}>Sparrow Assistant</p>
                <p className={styles.botStatus}>Powered by AI · Online</p>
              </div>
            </div>
            <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className={styles.body}>
            {messages.map((msg, i) => {
              const navBtns = msg.from === 'bot' ? getNavButtons(msg.text) : []
              return (
                <div key={i} className={`${styles.bubble} ${msg.from === 'user' ? styles.user : styles.bot}`}>
                  <p className={styles.bubbleText}>{msg.text}</p>

                  {navBtns.length > 0 && (
                    <div className={styles.navLinks}>
                      {navBtns.map((b) => (
                        <button key={b.to} className={styles.navLink} onClick={() => handleNav(b.to)}>
                          {b.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {msg.quickReplies?.length > 0 && (
                    <div className={styles.quickReplies}>
                      {msg.quickReplies.map((qr) => (
                        <button key={qr} className={styles.quickReply} onClick={() => handleQuickReply(qr)}>
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            {loading && (
              <div className={`${styles.bubble} ${styles.bot}`}>
                <div className={styles.typingDots}><span /><span /><span /></div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className={styles.inputRow}>
            <input
              ref={inputRef}
              className={styles.inputField}
              type="text"
              placeholder="Ask me anything…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              disabled={loading}
            />
            <button
              className={styles.sendBtn}
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle */}
      <button
        className={`${styles.fab} ${open ? styles.fabOpen : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
        {!open && <span className={styles.badge} />}
      </button>
    </div>
  )
}
