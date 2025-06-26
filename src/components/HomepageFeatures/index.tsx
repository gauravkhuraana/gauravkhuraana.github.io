import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Who Am I?',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
      My name is Gaurav Khurana, I am a software tester and automation and AI enthusiast.
      I have been working in the software industry for over 15+ years.
      Currently Working in Micrsoft for 6+ years
      </>
    ),
  },
  {
    title: 'Sharing is Caring',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
       I  believe in #SharingIsCaring. This  website is a collection of
        resources, tools, and tips that I have found useful in my journey as a tester.
      </>
    ),
  },
  {
    title: 'Udzial Means Share',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
       I have a youtube channel( @Udzial ) and blog with the name ( udzial.com )
       Udzial Is a polish word that means "share".
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
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
