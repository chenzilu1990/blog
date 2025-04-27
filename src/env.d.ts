declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // 站点信息
      NEXT_PUBLIC_SITE_URL: string;
      NEXT_PUBLIC_SITE_NAME: string;
      NEXT_PUBLIC_SITE_DESCRIPTION: string;
      
      // 作者信息
      NEXT_PUBLIC_AUTHOR_NAME: string;
      NEXT_PUBLIC_AUTHOR_TWITTER: string;
      
      // 其他配置
      NEXT_PUBLIC_DEFAULT_LOCALE: string;
      
      // Google Analytics
      NEXT_PUBLIC_GA_MEASUREMENT_ID: string;
      
      // 标准 Node.js 环境变量
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

// 防止将此文件视为普通模块
export {}; 