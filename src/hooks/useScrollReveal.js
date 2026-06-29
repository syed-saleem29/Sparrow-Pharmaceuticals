import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('[data-reveal]')

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      )

      els.forEach((el) => {
        el.classList.remove('revealed')
        observer.observe(el)
      })

      return () => observer.disconnect()
    }, 60)

    return () => clearTimeout(timer)
  }, [pathname])
}
