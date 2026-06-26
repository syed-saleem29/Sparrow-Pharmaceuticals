import styles from './Blog.module.css'

const posts = [
  {
    id: 1,
    date: 'June 2025',
    category: 'Healthcare',
    title: 'The Importance of Sterile Surgical Covers in Modern Operating Theatres',
    excerpt:
      'Surgical-site infections remain a leading cause of post-operative complications. We explore how advanced barrier products like Surgicover are setting new standards.',
  },
  {
    id: 2,
    date: 'May 2025',
    category: 'Product Update',
    title: 'Surgicover Now Available in Three New Sizes',
    excerpt:
      'Responding to feedback from healthcare professionals, we have expanded the Surgicover range to accommodate a wider variety of clinical needs.',
  },
  {
    id: 3,
    date: 'April 2025',
    category: 'Industry News',
    title: 'Understanding ISO 13485: What It Means for Medical Device Quality',
    excerpt:
      'A practical guide to ISO 13485 certification and why it matters when sourcing medical devices and surgical consumables.',
  },
]

export default function Blog() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1>Blog</h1>
          <p>Insights on healthcare, product updates, and industry news from the Sparrow team.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {posts.map((post) => (
              <article key={post.id} className={styles.card}>
                <div className={styles.imgPlaceholder}>[ Blog Image ]</div>
                <div className={styles.cardBody}>
                  <div className={styles.meta}>
                    <span className={styles.category}>{post.category}</span>
                    <span className={styles.date}>{post.date}</span>
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <button className={styles.readMore}>Read More →</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
