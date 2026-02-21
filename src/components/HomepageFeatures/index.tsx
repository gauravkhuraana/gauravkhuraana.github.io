import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  image?: string;
  imageFallback?: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Udzial Means Share',
    image: '/img/udziallogo-optimized.webp',
    imageFallback: '/img/udziallogo-optimized.jpg',
    description: (
      <>
       I  believe in #SharingIsCaring. This  website is a collection of
        resources, tools, and tips that I have found useful in my journey as a tester.
      </>
    ),
  },
    {
    title: 'Who Am I?',
    image: '/img/gauravkhurana-optimized.webp',
    imageFallback: '/img/gauravkhurana-optimized.jpg',
    description: (
      <>
      My name is Gaurav Khurana, I am a software tester and automation and AI enthusiast.
      I have been working in the software industry for over 15+ years.
      Currently working at Microsoft for over 6 years
      </>
    ),
  },
  {
    title: 'What You’ll Find Here',
    image: '/img/testautomationAI-optimized.webp',
    imageFallback: '/img/testautomationAI-optimized.jpg',
    description: (
      <>
       From beginner tutorials to advanced automation tips — this site is packed with hands-on resources to help you grow.
      </>
    ),
  },
];

function Feature({title, Svg, image, imageFallback, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {Svg ? (
          <Svg className={styles.featureSvg} role="img" aria-label={title} />
        ) : image ? (
          <picture>
            <source srcSet={image} type="image/webp" />
            {imageFallback && <source srcSet={imageFallback} type="image/jpeg" />}
            <img
              src={imageFallback || image}
              alt={`${title} illustration`}
              className={styles.featureSvg}
              width={200}
              height={200}
              style={{ maxWidth: '200px', height: 'auto' }}
              loading="lazy"
              decoding="async"
            />
          </picture>
        ) : null}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
