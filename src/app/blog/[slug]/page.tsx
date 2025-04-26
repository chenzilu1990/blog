import { Metadata } from 'next';
import Image from 'next/image'; // 导入 Image 组件
import { getPostData, getAllPostIds, PostDataWithContent } from '@/lib/posts';
import styles from './page.module.css'; // 引入 CSS Module

type Props = {
  params: { slug: string }
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
  const postData: PostDataWithContent = await getPostData(awaitedParams.slug); // 使用 awaitedParams.slug
  return {
    title: postData.title,
    description: `阅读博客文章：${postData.title}`, // 可以更详细
  };
}

// 页面组件
export default async function Post({ params }: Props) {
  // 先 await params
  const awaitedParams = await params;
  const postData: PostDataWithContent = await getPostData(awaitedParams.slug); // 使用 awaitedParams.slug

  return (
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
  );
} 