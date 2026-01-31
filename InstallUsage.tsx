'use client';

import styles from './InstallUsage.module.css';

export default function InstallUsage() {
  return (
    <section className={styles.section} aria-labelledby="install-heading">
      <h2 id="install-heading" className={styles.heading}>
        Install &amp; Usage
      </h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.subhead}>Install</h3>
          <pre className={styles.pre}>
            <code>
{`python -m venv .venv
# Linux/macOS:
.venv/bin/activate
# Windows:
.venv\\Scripts\\activate
pip install -r requirements.txt
pip install -e .`}
            </code>
          </pre>
          <p className={styles.note}>Or run without install (from repo root):</p>
          <pre className={styles.pre}>
            <code>
{`# Linux/macOS/Windows (same commands)
PYTHONPATH=. python -m sqlbase scan .
PYTHONPATH=. python -m sqlbase predict .
PYTHONPATH=. python -m sqlbase remediate SQL_INJECTION python`}
            </code>
          </pre>
        </div>
        <div className={styles.card}>
          <h3 className={styles.subhead}>Usage</h3>
          <pre className={styles.pre}>
            <code>
{`# Scan path for SQL injection patterns
python -m sqlbase scan [path] [-o report.json] [--fail-on-findings]

# Predict vulnerability likelihood
python -m sqlbase predict [path]

# Get remediation for a vulnerability type and language
python -m sqlbase remediate SQL_INJECTION python`}
            </code>
          </pre>
        </div>
        <div className={styles.card}>
          <h3 className={styles.subhead}>Programmatic use</h3>
          <pre className={styles.pre}>
            <code>
{`from pathlib import Path
from sqlbase.scanner import SQLInjectionScanner
from sqlbase.tester import DynamicSQLiTester
from sqlbase.fixer import SqliCodeFixer
from sqlbase.remediation import RemediationKnowledgeBase
from sqlbase.injector import SecurityPatternInjector
from sqlbase.predictor import VulnerabilityPredictor

scanner = SQLInjectionScanner()
for v in scanner.scan_path(Path("src")):
    print(v["file"], v["line"], v["type"])`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
