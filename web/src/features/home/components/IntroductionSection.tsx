import type { IntroductionData } from '@/types/domain';
import { Reveal } from '@/components/motion';
import styles from './IntroductionSection.module.css';

interface IntroductionSectionProps {
  data: IntroductionData;
}

export function IntroductionSection({ data }: IntroductionSectionProps) {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <Reveal direction="left" className={styles.text}>
          {data.heading && (
            <>
              <span className={styles.badge}>Về chúng tôi</span>
              <h2 className={styles.title}>{data.heading.title}</h2>
              {data.heading.subtitle && (
                <p className={styles.subtitle}>{data.heading.subtitle}</p>
              )}
            </>
          )}
          {data.content && (
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          )}
        </Reveal>
        {data.image && (
          <Reveal direction="right" delay={0.2} className={styles.imageWrapper}>
            <img
              src={data.image.url}
              alt={data.image.alternativeText ?? 'Giới thiệu công ty'}
              className={styles.image}
              loading="lazy"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
