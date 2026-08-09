import type { CapabilitiesData } from '@/types/domain';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import styles from './CapabilitiesSection.module.css';

interface CapabilitiesSectionProps {
  data: CapabilitiesData;
}

export function CapabilitiesSection({ data }: CapabilitiesSectionProps) {
  if (!data.items.length) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        {data.heading && (
          <Reveal className={styles.header}>
            <span className={styles.badge}>Năng lực</span>
            <h2 className={styles.title}>{data.heading.title}</h2>
            {data.heading.subtitle && (
              <p className={styles.subtitle}>{data.heading.subtitle}</p>
            )}
          </Reveal>
        )}
        <Stagger className={styles.grid}>
          {data.items.map((item, index) => (
            <StaggerItem key={index} className={styles.card}>
              <div className={styles.cardNumber}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              {item.description && (
                <p className={styles.cardDescription}>{item.description}</p>
              )}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
