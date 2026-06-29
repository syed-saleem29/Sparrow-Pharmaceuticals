import { useParams, Link, Navigate } from 'react-router-dom'
import { Dna, Microscope, ShieldCheck, Activity, ArrowLeft } from 'lucide-react'
import { blogPosts } from '../../data/blogPosts'
import styles from './BlogPost.module.css'

const iconMap = { Dna, Microscope, ShieldCheck, Activity }

function renderBlock(block, i) {
  switch (block.type) {
    case 'lead':
      return <p key={i} className={styles.lead}>{block.text}</p>
    case 'h2':
      return <h2 key={i} className={styles.h2}>{block.text}</h2>
    case 'p':
      return <p key={i} className={styles.p}>{block.text}</p>
    case 'ul':
      return (
        <ul key={i} className={styles.ul}>
          {block.items.map((item, j) => <li key={j}>{item}</li>)}
        </ul>
      )
    case 'callout':
      return (
        <div key={i} className={styles.callout}>
          <strong>{block.title}</strong>
          <p>{block.text}</p>
        </div>
      )
    default:
      return null
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  const Icon = iconMap[post.bannerIcon] || Dna
  const currentIndex = blogPosts.indexOf(post)
  const prevPost = blogPosts[currentIndex - 1] || null
  const nextPost = blogPosts[currentIndex + 1] || null

  return (
    <>
      <div className={styles.hero} style={{ background: post.bannerColor }}>
        <div className="container">
          <Link to="/blog" className={styles.back}>
            <ArrowLeft size={16} /> All Articles
          </Link>
          <div className={styles.heroInner}>
            <Icon size={56} strokeWidth={1.1} color="rgba(255,255,255,0.85)" className={styles.heroIcon} />
            <div>
              <div className={styles.heroMeta}>
                <span className={styles.category}>{post.category}</span>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <h1>{post.title}</h1>
              <p className={styles.heroBy}>Sparrow Pharmaceuticals Clinical Team</p>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className={`container ${styles.articleWrap}`}>
          <article className={styles.article}>
            {post.content.map((block, i) => renderBlock(block, i))}
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.sideCard}>
              <h4>About Surgicover</h4>
              <p>Peri-operative clinical nutrition supplement by Sparrow Pharmaceuticals  formulated for the metabolic demands of surgical patients.</p>
              <Link to="/products/surgicover">
                <button className={styles.sideBtn}>View Product</button>
              </Link>
            </div>
            <div className={styles.sideCard}>
              <h4>Institutional Enquiries</h4>
              <p>Bulk supply, clinical samples, and institutional pricing for hospitals and surgical centres.</p>
              <Link to="/contact">
                <button className={styles.sideBtnOutline}>Contact Us</button>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {(prevPost || nextPost) && (
        <section className={`section section--alt ${styles.navSection}`}>
          <div className={`container ${styles.navRow}`}>
            {prevPost ? (
              <Link to={`/blog/${prevPost.slug}`} className={styles.navCard}>
                <span className={styles.navLabel}>← Previous</span>
                <span className={styles.navTitle}>{prevPost.title}</span>
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link to={`/blog/${nextPost.slug}`} className={`${styles.navCard} ${styles.navCardRight}`}>
                <span className={styles.navLabel}>Next →</span>
                <span className={styles.navTitle}>{nextPost.title}</span>
              </Link>
            ) : <div />}
          </div>
        </section>
      )}
    </>
  )
}
