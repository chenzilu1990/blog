'use client';

import { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // 检查用户是否已同意 Cookie 使用
    const hasConsent = localStorage.getItem('cookie-consent');
    if (!hasConsent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShowConsent(false);
    
    // 如果用户接受 Cookie，告知 Google Analytics
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
      });
    }
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'false');
    setShowConsent(false);
    
    // 如果用户拒绝 Cookie，告知 Google Analytics
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
      });
    }
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className={styles.cookieConsent}>
      <div className={styles.container}>
        <p className={styles.message}>
          本网站使用 Cookie 来增强您的浏览体验并分析网站使用情况。
          通过继续使用我们的网站，您同意我们的 Cookie 政策。
        </p>
        <div className={styles.buttons}>
          <button 
            className={`${styles.button} ${styles.accept}`}
            onClick={acceptCookies}
          >
            接受
          </button>
          <button 
            className={`${styles.button} ${styles.decline}`}
            onClick={declineCookies}
          >
            拒绝
          </button>
        </div>
      </div>
    </div>
  );
} 