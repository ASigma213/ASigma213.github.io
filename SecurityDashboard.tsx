'use client';

import { useState, useEffect } from 'react';
import styles from './SecurityDashboard.module.css';

export default function SecurityDashboard() {
  const [vulnCount, setVulnCount] = useState(3);
  const [protection, setProtection] = useState(72);
  const [fixProgress, setFixProgress] = useState(40);

  useEffect(() => {
    const t = setInterval(() => {
      setProtection((p) => Math.min(100, Math.max(0, p + (Math.random() - 0.5) * 2)));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className={styles.section} aria-labelledby="dashboard-heading">
      <h2 id="dashboard-heading" className={styles.heading}>
        Security Score Dashboard
      </h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Vulnerabilities</span>
          <span className={styles.cardValue}>{vulnCount}</span>
          <div className={styles.bar}>
            <div
              className={styles.barFill}
              style={{ width: `${Math.min(100, vulnCount * 25)}%`, background: 'var(--vuln-red)' }}
            />
          </div>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Protection level</span>
          <span className={styles.cardValue}>{Math.round(protection)}%</span>
          <div className={styles.shield} aria-hidden>
            <span className={styles.shieldIcon}>🛡</span>
          </div>
          <div className={styles.bar}>
            <div
              className={styles.barFill}
              style={{ width: `${protection}%`, background: 'var(--crt-green)' }}
            />
          </div>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Fix progress</span>
          <span className={styles.cardValue}>{fixProgress}%</span>
          <div className={styles.ring}>
            <svg viewBox="0 0 36 36">
              <path
                className={styles.ringBg}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={styles.ringFill}
                strokeDasharray={`${fixProgress}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
