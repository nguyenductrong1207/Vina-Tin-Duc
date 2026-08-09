import type { StatisticsData } from '@/types/domain';
import { Reveal } from '@/components/motion';
import { AnimatedNumber } from '@/components/motion';
import styles from './StatisticsSection.module.css';

interface StatisticsSectionProps {
  data: StatisticsData;
}

export function StatisticsSection({ data }: StatisticsSectionProps) {
  if (!data.items.length) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        {data.heading && (
          <Reveal className={styles.header}>
            <h2 className={styles.title}>{data.heading.title}</h2>
            {data.heading.subtitle && (
              <p className={styles.subtitle}>{data.heading.subtitle}</p>
            )}
          </Reveal>
        )}
        <div className={styles.grid}>
          {data.items.map((item, index) => (
            <Reveal key={index} delay={index * 0.1} className={styles.stat}>
              <AnimatedNumber
                value={item.value}
                suffix={item.suffix}
                className={styles.value}
                suffixClassName={styles.suffix}
              />
              <span className={styles.label}>{item.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
