import { getSortedPostsData } from '@/lib/posts';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  const posts = getSortedPostsData();
  
  // 为所有博客文章创建站点地图条目
  const blogEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  
  // 添加主要页面
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
    // 如果有其他固定页面，也可以添加在这里
  ];
  
  return [...routes, ...blogEntries];
} 