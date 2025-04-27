import Link from 'next/link';
import Image from 'next/image';
import { getSortedPostsData, PostData } from '@/lib/posts';
import styles from './page.module.css';
import Script from 'next/script';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '陈自路的博客',
  description: '欢迎来到我的博客，这里有最新的文章。',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  const allPostsData: PostData[] = getSortedPostsData();

  // 为首页添加结构化数据
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: process.env.NEXT_PUBLIC_SITE_NAME || '我的个人博客',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || '分享我的技术文章、经验和想法的个人博客',
    publisher: {
      '@type': 'Person',
      name: process.env.NEXT_PUBLIC_AUTHOR_NAME || '博客作者',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <Script
        id="home-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

      </div>
    </>
  );
}
