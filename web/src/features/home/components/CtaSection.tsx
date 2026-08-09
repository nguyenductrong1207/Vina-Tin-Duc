import { Link } from 'react-router';
import type { CtaSectionData } from '@/types/domain';
import { Reveal } from '@/components/motion';
import styles from './CtaSection.module.css';

interface CtaSectionProps {
  data: CtaSectionData;
}

export function CtaSection({ data }: CtaSectionProps) {
  return (
    <section
      className={styles.section}
      style={
        data.backgroundImage
          ? { backgroundImage: `url(${data.backgroundImage.url})` }
          : undefined
      }
    >
      <div className={styles.overlay} />
      <div className={`container ${styles.content}`}>
        <Reveal>
          <h2 className={styles.title}>{data.title}</h2>
        </Reveal>
        {data.description && (
          <Reveal delay={0.1}>
            <p className={styles.description}>{data.description}</p>
          </Reveal>
        )}
        {data.cta && (
          <Reveal delay={0.2}>
            {data.cta.isExternal ? (
              <a
                href={data.cta.url}
                className={styles.cta}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{data.cta.label}</span>
                <svg className={styles.ctaArrow} viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </a>
            ) : (
              <Link to={data.cta.url} className={styles.cta}>
                <span>{data.cta.label}</span>
                <svg className={styles.ctaArrow} viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </Link>
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
}
