'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './SQLInjectionVisualizer.module.css';

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false });

const VULN_CODE = `def unsafe_query(user_input):
    query = f"SELECT * FROM users WHERE id = '{user_input}'"
    cursor.execute(query)`;

const SAFE_CODE = `def safe_query(user_input):
    query = "SELECT * FROM users WHERE id = %s"
    cursor.execute(query, (user_input,))`;

export default function SQLInjectionVisualizer() {
  const [fixed, setFixed] = useState(false);
  const [hoverVuln, setHoverVuln] = useState(false);

  return (
    <section className={styles.section} aria-labelledby="sql-viz-heading">
      <h2 id="sql-viz-heading" className={styles.heading}>
        SQL Injection Visualizer
      </h2>
      <div className={styles.split}>
        <div className={styles.codePanel}>
          <div className={styles.panelHeader}>
            <span>{fixed ? 'Fixed code' : 'Vulnerable code'}</span>
            {!fixed && (
              <button
                type="button"
                className={styles.fixBtn}
                onClick={() => setFixed(true)}
              >
                Fix
              </button>
            )}
          </div>
          <pre className={styles.pre}>
            <code>
              {!fixed ? (
                <>
                  <span className={styles.func}>def unsafe_query(user_input):</span>
                  <br />
                  <span
                    className={`${styles.vulnLine} ${hoverVuln ? 'vuln-pulse' : ''}`}
                    onMouseEnter={() => setHoverVuln(true)}
                    onMouseLeave={() => setHoverVuln(false)}
                    title="String interpolation vulnerability"
                  >
                    {'    '}query = f&quot;SELECT * FROM users WHERE id = &apos;{'{user_input}'}&apos;&quot;
                  </span>
                  <br />
                  <span className={styles.comment}>{'    '}# 🔴 String interpolation vulnerability</span>
                  <br />
                  <span className={styles.line}>{'    '}cursor.execute(query)</span>
                </>
              ) : (
                <>
                  <span className={styles.func}>def safe_query(user_input):</span>
                  <br />
                  <span className={styles.safeLine}>{'    '}query = &quot;SELECT * FROM users WHERE id = %s&quot;</span>
                  <br />
                  <span className={styles.line}>{'    '}cursor.execute(query, (user_input,))</span>
                  <br />
                  <span className={styles.comment}>{'    '}# ✅ Parameterized query</span>
                </>
              )}
            </code>
          </pre>
          {hoverVuln && !fixed && (
            <p className={styles.tooltip}>
              User input is concatenated into the SQL string. An attacker can break out of the string and inject arbitrary SQL.
            </p>
          )}
        </div>
        <div className={styles.vizPanel}>
          <div className={styles.canvasWrap}>
            <Scene3D mode={fixed ? 'shield' : 'breach'} />
          </div>
          <p className={styles.caption}>
            {fixed
              ? 'Parameterized query — input is passed safely as data.'
              : 'Malicious payload can breach the query boundary.'}
          </p>
        </div>
      </div>
    </section>
  );
}
