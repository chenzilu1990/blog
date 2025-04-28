import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';

// 使用 Geist 作为拉丁文字体
export const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

// 导入霞鹜文楷字体（本地字体）
// 假设字体文件已放置在 public/fonts 目录下
export const lxgwWenKai = localFont({
  src: [
    {
      path: '../../public/fonts/LXGWWenKaiLite-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/LXGWWenKaiLite-Medium.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/LXGWWenKaiLite-Light.ttf',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--font-lxgw-wenkai',
  display: 'swap',
}); 