'use client';

import { useState } from 'react';
import styles from './CIPipelineVisualizer.module.css';

const STAGES = [
  { id: 'push', label: 'Git Push', icon: '↑' },
  { id: 'tests', label: 'Tests Running', icon: '◉' },
  { id: 'scan', label: 'Security Scan', icon: '▣' },
  { id: 'deploy', label: 'Deploy', icon: '▶' },
] as const;

type StageId = (typeof STAGES)[number]['id'];

export default function CIPipelineVisualizer() {
  const [activeStage, setActiveStage] = useState<StageId | null>(null);
  const [failAt, setFailAt] = useState<StageId | null>(null);

  return (
    <section className={styles.section} aria-labelledby="ci-heading">
      <h2 id="ci-heading" className={styles.heading}>
        CI/CD Pipeline Visualizer
      </h2>
      <p className={styles.sub}>
        GitHub Actions: <code>.github/workflows/security-scan.yml</code> runs on ubuntu-latest, windows-latest, macos-latest.
      </p>
      <div className={styles.pipeline}>
        {STAGES.map((stage, i) => {
          const isActive = activeStage === stage.id;
          const isFailed = failAt === stage.id;
          const isPast = failAt ? STAGES.findIndex((s) => s.id === failAt) > i : false;
          return (
            <div key={stage.id} className={styles.stageWrap}>
              <button
                type="button"
                className={`${styles.stage} ${isActive ? styles.active : ''} ${isFailed ? styles.failed : ''} ${isPast ? styles.past : ''}`}
                onClick={() => setActiveStage(isActive ? null : stage.id)}
                onDoubleClick={() => setFailAt(isFailed ? null : stage.id)}
                aria-pressed={isActive}
                aria-label={`Stage: ${stage.label}. ${isFailed ? 'Failed' : 'Click for details'}`}
              >
                <span className={styles.icon}>{stage.icon}</span>
                <span>{stage.label}</span>
                {stage.id === 'scan' && (
                  <span className={styles.badge}>sqlbase</span>
                )}
              </button>
              {isFailed && (
                <div className={styles.failBanner} role="status">
                  FAIL: Vulnerability Found
                </div>
              )}
              {i < STAGES.length - 1 && (
                <div className={styles.connector} />
              )}
            </div>
          );
        })}
      </div>
      {activeStage && (
        <div className={styles.logPanel} role="region" aria-label="Stage logs">
          <div className={styles.logHeader}>
            Logs: {STAGES.find((s) => s.id === activeStage)?.label}
          </div>
          <pre className={styles.logContent}>
            {activeStage === 'push' && '$ git push origin main\n> Pushing to remote...\n✓ Pushed.'}
            {activeStage === 'tests' && '$ pytest\n> Running tests...\n✓ 42 passed.'}
            {activeStage === 'scan' && '$ sqlbase scan .\n> Scanning for SQL injection patterns...\n✓ No findings (or FAIL: Vulnerability Found)'}
            {activeStage === 'deploy' && '$ deploy\n> Deploying...\n✓ Deployed.'}
          </pre>
        </div>
      )}
    </section>
  );
}
