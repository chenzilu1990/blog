import { Metadata } from 'next';
import Image from 'next/image'; // 导入 Image 组件
import { getPostData, getAllPostIds, PostDataWithContent } from '@/lib/posts';
import styles from './page.module.css'; // 引入 CSS Module
import Script from 'next/script';

type Props = {
  params: Promise<{ slug: string }>
}

// 生成静态路径
export async function generateStaticParams() {
  const paths = getAllPostIds();
  // The paths returned by getAllPostIds are already in the correct format
  // { params: { id: '...' } } -> needs to be { slug: '...' }
  return paths.map(path => ({
    slug: path.params.id
  }));
}

// 动态生成页面元数据
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 先 await params
  const awaitedParams = await params;
  const postData: PostDataWithContent = await getPostData(awaitedParams.slug);
  
  // 创建预览文本（从 HTML 中移除标签）
  const description = postData.contentHtml
    .replace(/<[^>]*>/g, '') // 移除 HTML 标签
    .substring(0, 160) // 限制描述长度
    .trim() + '...';
  
  return {
    title: postData.title,
    description: description,
    openGraph: {
      title: postData.title,
      description: description,
      type: 'article',
      publishedTime: postData.date,
      authors: ['博客作者'],
      images: postData.featuredImage 
        ? [
            {
              url: postData.featuredImage,
              width: 800,
              height: 450,
              alt: postData.title,
            }
          ] 
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: postData.title,
      description: description,
      images: postData.featuredImage ? [postData.featuredImage] : [],
    },
    alternates: {
      canonical: `/blog/${awaitedParams.slug}`,
    },
  };
}

// 页面组件
export default async function Post({ params }: Props) {
  // 先 await params
  const awaitedParams = await params;
  const postData: PostDataWithContent = await getPostData(awaitedParams.slug);

  // 文章的 JSON-LD 结构化数据
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: postData.title,
    datePublished: postData.date,
    dateModified: postData.date,
    author: {
      '@type': 'Person',
      name: process.env.NEXT_PUBLIC_AUTHOR_NAME || '博客作者',
    },
    image: postData.featuredImage || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/default-og-image.jpg`,
    publisher: {
      '@type': 'Organization',
      name: process.env.NEXT_PUBLIC_SITE_NAME || '我的个人博客',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/logo.png`,
      }
    },
    description: postData.contentHtml.replace(/<[^>]*>/g, '').substring(0, 160).trim() + '...',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/blog/${awaitedParams.slug}`,
    },
  };

  return (
    <>
      <Script id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className={styles.article}>
        {/* 显示封面图片 */}
        {postData.featuredImage && (
          <div className={styles.featuredImageContainer}>
             <Image
                src={postData.featuredImage}
                alt={`${postData.title} featured image`}
                width={800} // 文章页用大图
                height={450} // 调整为 16:9 比例
                priority // 标记为优先加载，因为通常在视口内
                className={styles.featuredImageSingle}
              />
          </div>
        )}
        <h1 className={styles.title}>{postData.title}</h1>
        <div className={styles.date}>{postData.date}</div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </>
  );
} 