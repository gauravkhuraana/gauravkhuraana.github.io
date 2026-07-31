import React from 'react';
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

  if (!isContentPage(pathname)) {
    return null;
  }

  return (
    <nav className={styles.actions} aria-label="Page actions">
      <ShareButton className={styles.shareAction} />
      <KofiSupport size="small" className={styles.supportAction} />
    </nav>
  );
}