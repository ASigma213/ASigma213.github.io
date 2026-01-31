'use client';

import { useState } from 'react';
import styles from './DynamicTestingSimulator.module.css';

const PAYLOADS = [
  "1 OR 1=1 --",
  "admin' --",
  "'; DROP TABLE users; --",
  "1' UNION SELECT * FROM passwords --",
  "' OR '1'='1",
];

export default function DynamicTestingSimulator() {
  const [query, setQuery] = useState("SELECT * FROM users WHERE id = '");
  const [inputVal, setInputVal] = useState('');
  const [selectedPayload, setSelectedPayload] = useState<string | null>(null);
  const [result, setResult] = useState<'blocked' | 'breach' | null>(null);
  const [score, setScore] = useState(100);

  const runTest = (payload: string) => {
    setSelectedPayload(payload);
    const isMalicious = /('|--|OR|UNION|DROP|;)/i.test(payload);
    if (isMalicious) {
      setResult('blocked');
      setScore((s) => Math.min(100, s + 2));
    } else {
      setResult('breach');
      setScore((s) => Math.max(0, s - 15));
    }
  };

  const showProtection = () => {
    setResult('blocked');
    setScore(100);
    setSelectedPayload(null);
  };

  return (
    <section className={styles.section} aria-labelledby="dyn-heading">
      <h2 id="dyn-heading" className={styles.heading}>
        Dynamic Testing Simulator
      </h2>
      <div className={styles.layout}>
        <div className={styles.queryBox}>
          <label className={styles.label}>Query under test</label>
          <div className={styles.queryDisplay}>
            <code>
              {query}
              <span className={styles.inputSlot}>
                {selectedPayload || inputVal || '[ ]'}
              </span>
              '
            </code>
          </div>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter value..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            aria-label="Test input value"
          />
        </div>
        <div className={styles.payloads}>
          <span className={styles.label}>Payloads</span>
          <ul className={styles.list}>
            {PAYLOADS.map((p) => (
              <li key={p}>
                <button
                  type="button"
                  className={`${styles.payloadBtn} ${selectedPayload === p ? styles.selected : ''}`}
                  onClick={() => runTest(p)}
                >
                  {p}
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <button type="button" className={styles.primaryBtn} onClick={showProtection}>
              Show Protection
            </button>
          </div>
        </div>
        <div className={styles.feedback}>
          <div className={styles.scoreRing}>
            <span className={styles.scoreNum}>{score}</span>
            <span className={styles.scoreLabel}>Security</span>
          </div>
          {result && (
            <div className={result === 'blocked' ? styles.blocked : styles.breach}>
              {result === 'blocked' ? '✓ Blocked' : '✗ Breach'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
