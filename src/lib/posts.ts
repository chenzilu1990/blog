import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// 定义文章元数据的类型
export interface PostData {
  id: string;
  title: string;
  date: string;
  featuredImage?: string; // 添加可选的 featuredImage 字段
  excerpt?: string; // 添加可选的文章摘要字段
  [key: string]: any; // 允许其他元数据字段
}

// 定义包含 HTML 内容的文章数据类型
export interface PostDataWithContent extends PostData {
  contentHtml: string;
  featuredImage?: string; // 添加可选的 featuredImage 字段
}

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getSortedPostsData(): PostData[] {
  // Get file names under /content/posts
  const fileNames = fs.readdirSync(postsDirectory).filter(fileName => fileName.endsWith('.md'));
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // 提取元数据，包括 featuredImage
    const data = matterResult.data as { title: string; date: string; featuredImage?: string };

    // 创建摘要（取内容的前 150 个字符）
    const contentText = matterResult.content;
    const excerpt = contentText.substring(0, 150).trim() + (contentText.length > 150 ? '...' : '');

    // Combine the data with the id
    return {
      id,
      title: data.title,
      date: data.date,
      featuredImage: data.featuredImage || null, // 如果不存在则设为 null 或 undefined
      excerpt: excerpt, // 添加摘要
    } as PostData; // 确保返回类型符合 PostData
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory).filter(fileName => fileName.endsWith('.md'));

  // Returns an array that looks like:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: string): Promise<PostDataWithContent> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // 提取元数据，包括 featuredImage
  const data = matterResult.data as { title: string; date: string; featuredImage?: string };

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    title: data.title,
    date: data.date,
    featuredImage: data.featuredImage || null, // 如果不存在则设为 null 或 undefined
  } as PostDataWithContent; // 确保返回类型符合 PostDataWithContent
} 