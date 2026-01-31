'use client';

import { useEffect, useState } from 'react';
import styles from './Hero.module.css';

const ASCII_ART = `
  ███████╗ ██████╗ ██╗     ██████╗  █████╗ ███████╗███████╗
  ██╔════╝██╔═══██╗██║     ██╔══██╗██╔══██╗██╔════╝██╔════╝
  ███████╗██║   ██║██║     ██████╔╝███████║███████╗█████╗  
  ╚════██║██║   ██║██║     ██╔══██╗██╔══██║╚════██║██╔══╝  
  ███████║╚██████╔╝███████╗██████╔╝██║  ██║███████║███████╗
  ╚══════╝ ╚═════╝ ╚══════╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝
  SECURITY SCANNER
`;

const BOOT_LINES = [
  '> INITIALIZING SQLBASE SECURITY NEXUS...',
  '> LOADING PATTERN DETECTION MODULE...',
  '> LOADING VULNERABILITY SCANNER...',
  '> LOADING DYNAMIC INJECTOR...',
  '> LOADING REMEDIATION KNOWLEDGE BASE...',
  '> SYSTEM READY.',
];

export default function Hero() {
  const [bootIndex, setBootIndex] = useState(0);
  const [showAscii, setShowAscii] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [typedCommand, setTypedCommand] = useState('');
  const fullCommand = 'sqlbase init';
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setBootIndex(0), 400);
    const intervals: NodeJS.Timeout[] = [];
    BOOT_LINES.forEach((_, i) => {
      intervals.push(
        setTimeout(() => setBootIndex(i + 1), 600 + (i + 1) * 350)
      );
    });
    const t2 = setTimeout(() => setShowAscii(true), 600 + BOOT_LINES.length * 350 + 200);
    const t3 = setTimeout(() => setShowPrompt(true), 600 + BOOT_LINES.length * 350 + 800);
    return () => {
      clearTimeout(t1);
      intervals.forEach(clearTimeout);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    if (!showPrompt) return;
    let i = 0;
    const id = setInterval(() => {
      if (i <= fullCommand.length) {
        setTypedCommand(fullCommand.slice(0, i));
        i++;
      } else clearInterval(id);
    }, 80);
    return () => clearInterval(id);
  }, [showPrompt]);

  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.hero} aria-label="Terminal boot sequence">
      <div className={styles.boot}>
        {BOOT_LINES.slice(0, bootIndex).map((line, i) => (
          <div key={i} className={`${styles.line} terminal-text`}>
            {line}
          </div>
        ))}
      </div>
      {showAscii && (
        <pre className={`${styles.ascii} terminal-text`} aria-hidden>
          {ASCII_ART}
        </pre>
      )}
      {showPrompt && (
        <div className={styles.prompt}>
          <span className={styles.dollar}>$</span>
          <span className="terminal-text">{typedCommand}</span>
          <span className={styles.cursor}>{cursorVisible ? '▌' : ' '}</span>
        </div>
      )}
      <p className={styles.tagline}>
        Cross-platform SQL injection scanning · Dynamic testing · Code fixing · Remediation
      </p>
    </section>
  );
}
