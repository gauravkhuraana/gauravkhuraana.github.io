import React, { useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';
import KofiSupport from '@site/src/components/KofiSupport';
import ShareButton from '@site/src/components/ShareButton';
import styles from './FloatingActions.module.css';

function isContentPage(pathname: string): boolean {
  const isDocPage = pathname.startsWith('/docs/') &&
    !pathname.startsWith('/docs/category/');
  const isBlogPost = pathname !== '/blog/' &&
    pathname.startsWith('/blog/') &&
    !['/blog/archive', '/blog/authors', '/blog/tags'].some((route) =>
      pathname.startsWith(route),
    );

  return isDocPage || isBlogPost;
}

export default function FloatingActions(): React.JSX.Element | null {
  const { pathname } = useLocation();
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('.theme-layout-footer');
    if (!footer) {
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsFooterVisible(entry.isIntersecting);
    });

    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  if (!isContentPage(pathname) || isFooterVisible) {
    return null;
  }

  return (
    <nav className={styles.actions} aria-label="Page actions">
      <ShareButton className={styles.shareAction} />
      <KofiSupport size="small" className={styles.supportAction} />
    </nav>
  );
}