import { useLocation } from 'react-router-dom'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import styles from './PageTransition.module.css'

export default function PageTransition({ children }) {
  const { pathname } = useLocation()
  useScrollReveal()

  return (
    <div key={pathname} className={styles.page}>
      {children}
    </div>
  )
}
