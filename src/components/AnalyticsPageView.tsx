'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

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

// 实际使用 useSearchParams 的组件包装在 Suspense 中
function AnalyticsPageViewInner() {
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

// 导出带有 Suspense 边界的组件
export function AnalyticsPageView() {
  return (
    <Suspense fallback={null}>
      <AnalyticsPageViewInner />
    </Suspense>
  );
} 