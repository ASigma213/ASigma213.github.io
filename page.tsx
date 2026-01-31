'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import Sidebar from '@/components/Sidebar';
import SQLInjectionVisualizer from '@/components/SQLInjectionVisualizer';
import DynamicTestingSimulator from '@/components/DynamicTestingSimulator';
import CIPipelineVisualizer from '@/components/CIPipelineVisualizer';
import SecurityDashboard from '@/components/SecurityDashboard';
import LiveTerminal from '@/components/LiveTerminal';
import InstallUsage from '@/components/InstallUsage';
import styles from './page.module.css';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [showDocs, setShowDocs] = useState(false);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.navToggle}
          onClick={() => setShowDocs((v) => !v)}
          aria-expanded={showDocs}
          aria-label="Toggle documentation navigation"
        >
          {showDocs ? '◀' : '▶'} sqlbase/
        </button>
        <h1 className={styles.siteTitle}>SQLbase Security Nexus</h1>
      </header>
      <div className={styles.mainLayout}>
        <div className={`${styles.sidebarWrap} ${showDocs ? styles.open : ''}`}>
          <Sidebar selected={selectedFile} onSelect={setSelectedFile} />
        </div>
        <main className={styles.main}>
          <Hero />
          <InstallUsage />
          <SecurityDashboard />
          <SQLInjectionVisualizer />
          <DynamicTestingSimulator />
          <CIPipelineVisualizer />
          <LiveTerminal />
        </main>
      </div>
    </div>
  );
}
