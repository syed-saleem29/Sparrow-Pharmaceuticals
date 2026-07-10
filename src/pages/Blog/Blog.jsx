import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Dna, Microscope, ShieldCheck, Activity } from 'lucide-react'
import { blogPosts } from '../../data/blogPosts'
import styles from './Blog.module.css'

const iconMap = { Dna, Microscope, ShieldCheck, Activity }

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Clinical Nutrition Blog — Surgicover | Sparrow Pharmaceuticals</title>
        <meta name="description" content="Evidence-based articles on peri-operative nutrition, ERAS protocols, L-Arginine wound healing, soya vs whey protein, and glycaemic control in surgery. By Sparrow Pharmaceuticals." />
        <link rel="canonical" href="https://sparrowpharmaceuticals.in/blog" />
      </Helmet>
      <section className={styles.hero}>
        <div className="container">
          <h1>Clinical Insights</h1>
          <p>
            Evidence-based articles on peri-operative nutrition, surgical recovery science,
            and ERAS protocols  written by the Sparrow Pharmaceuticals clinical team.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {blogPosts.map((post) => {
              const Icon = iconMap[post.bannerIcon] || Dna
              return (
                <article key={post.slug} className={styles.card}>
                  <div className={styles.cardBanner} style={{ background: post.bannerColor }}>
                    <Icon size={44} strokeWidth={1.2} color="rgba(255,255,255,0.9)" />
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.meta}>
                      <span className={styles.category}>{post.category}</span>
                      <span className={styles.date}>{post.date}</span>
                      <span className={styles.readTime}>{post.readTime}</span>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className={styles.readMore}>
                      Read Article →
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
