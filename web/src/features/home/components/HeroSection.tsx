import { Link } from 'react-router';
import { motion } from 'motion/react';
import type { HeroData } from '@/types/domain';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  data: HeroData;
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section
      className={styles.hero}
      style={
        data.backgroundImage
          ? { backgroundImage: `url(${data.backgroundImage.url})` }
          : undefined
      }
    >
      <div className={styles.overlay} />

      <div className={`container ${styles.content}`}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {data.title}
        </motion.h1>

        {data.subtitle && (
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {data.subtitle}
          </motion.p>
        )}

        {data.cta && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
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
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className={styles.scrollLine} />
      </motion.div>
    </section>
  );
}
