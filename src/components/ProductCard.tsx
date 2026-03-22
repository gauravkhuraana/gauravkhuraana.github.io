import React from 'react';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  title: string;
  description: string;
  link: string;
  image?: string;
  linkLabel?: string;
}

export default function ProductCard({
  title,
  description,
  link,
  image,
  linkLabel = 'Buy on Amazon',
}: ProductCardProps): React.ReactElement {
  const isAmazon = link.includes('amzn.to') || link.includes('amazon.');
  const label = linkLabel || (isAmazon ? 'Buy on Amazon' : 'Check it out');

  return (
    <div className={styles.card}>
      {image && (
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} className={styles.image} loading="lazy" />
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <a
          href={link}
          className={styles.buyButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label} &rarr;
        </a>
      </div>
    </div>
  );
}
