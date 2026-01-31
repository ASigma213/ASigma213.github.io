'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './LiveTerminal.module.css';

const COMMANDS: Record<string, string> = {
  'sqlbase scan .': '> Scanning path for SQL injection patterns...\n  [████████████████████] 100%\n  Found 0 issues.',
  'sqlbase predict .': '> Predicting vulnerability likelihood...\n  Heuristic analysis complete.\n  Risk: LOW',
  'sqlbase remediate SQL_INJECTION python': '> Loading remediation for SQL_INJECTION (python)...\n  Use parameterized queries: cursor.execute("SELECT ... WHERE id = %s", (user_input,))',
};

export default function LiveTerminal() {
  const [prompt, setPrompt] = useState('$');
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<{ type: 'input' | 'output'; text: string }[]>([
    { type: 'output', text: 'SQLbase Security Nexus — type a command (e.g. sqlbase scan .)' },
  ]);
  const [cursor, setCursor] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    setLines((prev) => [...prev, { type: 'input', text: `${prompt} ${trimmed}` }]);
    setInput('');
    const output = COMMANDS[trimmed] ?? `> Unknown command: ${trimmed}\n  Try: sqlbase scan . | sqlbase predict . | sqlbase remediate SQL_INJECTION python`;
    setLines((prev) => [...prev, { type: 'output', text: output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') runCommand(input);
  };

  return (
    <section className={styles.section} aria-label="Live terminal">
      <div className={styles.header}>
        <span className={styles.title}>TERMINAL</span>
        <span className={styles.hint}>Linux / macOS: $ · Windows: &gt;</span>
      </div>
      <div className={styles.body}>
        <div className={styles.output}>
          {lines.map((line, i) => (
            <div
              key={i}
              className={line.type === 'input' ? styles.inputLine : styles.outputLine}
            >
              {line.text.split('\n').map((l, j) => (
                <div key={j}>{l || ' '}</div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.inputRow}>
          <span className={styles.promptChar}>{prompt}</span>
          <input
            type="text"
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="sqlbase scan ."
            aria-label="Terminal command input"
            spellCheck={false}
          />
          <span className={styles.cursor}>{cursor ? '▌' : ' '}</span>
        </div>
      </div>
      <div ref={bottomRef} />
    </section>
  );
}
