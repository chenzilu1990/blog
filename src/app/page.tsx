import Link from 'next/link';
import Image from 'next/image';
import { getSortedPostsData, PostData } from '@/lib/posts';
import styles from './page.module.css';

export default function Home() {
  const allPostsData: PostData[] = getSortedPostsData();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.blogSection}>
          <h1 className={styles.heading}>最新文章</h1>
          <ul className={styles.list}>
            {allPostsData.map(({ id, date, title, featuredImage, excerpt }) => (
              <li key={id} className={styles.listItem}>
                {featuredImage && (
                  <div className={styles.imageContainer}>
                    <Link href={`/blog/${id}`}>
                      <Image
                        src={featuredImage}
                        alt={`${title} cover image`}
                        width={300}
                        height={169}
                        className={styles.featuredImage}
                      />
                    </Link>
                  </div>
                )}
                <Link href={`/blog/${id}`} className={styles.link}>
                  {title}
                </Link>
                <br />
                <small className={styles.date}>
                  {date}
                </small>
                {excerpt && (
                  <p className={styles.excerpt}>
                    {excerpt}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>© 2025 我的博客</p>
      </footer>
    </div>
  );
}

export const metadata = {
  title: '我的博客首页',
  description: '欢迎来到我的博客，这里有最新的文章。',
};
