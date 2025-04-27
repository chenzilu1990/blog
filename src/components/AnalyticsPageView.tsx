'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// 声明 gtag 类型，避免 TypeScript 错误
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set' | 'consent',
      targetId: string,
      config?: Record<string, any> | Date
    ) => void;
  }
}

export function AnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (!measurementId) return;
    
    // 当路由变化时，发送页面浏览事件
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // 确保 gtag 已正确加载
    if (typeof window.gtag === 'function') {
      window.gtag('config', measurementId, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
} 