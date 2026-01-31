'use client';

import { useState } from 'react';
import styles from './Sidebar.module.css';

type TreeNode = { name: string; children?: TreeNode[] };

const TREE: TreeNode[] = [
  {
    name: 'sqlbase/',
    children: [
      { name: 'scanner/', children: [{ name: 'pattern_detection.py' }, { name: 'vulnerability_scanner.py' }] },
      { name: 'tester/', children: [{ name: 'dynamic_injector.py' }] },
      { name: 'remediation/', children: [{ name: 'code_fixer.py' }] },
      { name: 'predictor/', children: [{ name: 'predictor.py' }] },
      { name: 'injector/', children: [{ name: 'security_pattern_injector.py' }] },
    ],
  },
];

function TreeItem({
  item,
  level,
  onSelect,
  selected,
}: {
  item: TreeNode;
  level: number;
  onSelect: (name: string) => void;
  selected: string | null;
}) {
  const isDir = item.name.endsWith('/');
  const [open, setOpen] = useState(level === 0);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className={styles.treeItem} style={{ paddingLeft: level * 12 }}>
      <button
        type="button"
        className={`${styles.row} ${selected === item.name ? styles.selected : ''}`}
        onClick={() => {
          if (isDir && hasChildren) setOpen((o) => !o);
          else onSelect(item.name);
        }}
        onMouseEnter={(e) => e.currentTarget.classList.add(styles.hover)}
        onMouseLeave={(e) => e.currentTarget.classList.remove(styles.hover)}
      >
        <span className={styles.icon}>
          {isDir ? (open ? '📂' : '📁') : '📄'}
        </span>
        <span>{item.name}</span>
      </button>
      {isDir && hasChildren && open && (
        <div className={styles.children}>
          {item.children!.map((child) => (
            <TreeItem
              key={child.name}
              item={child}
              level={level + 1}
              onSelect={onSelect}
              selected={selected}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (name: string) => void;
}) {
  return (
    <aside className={styles.sidebar} role="navigation" aria-label="File system explorer">
      <div className={styles.header}>
        <span className={styles.title}>FILE SYSTEM</span>
      </div>
      <nav className={styles.tree}>
        {TREE.map((item) => (
          <TreeItem
            key={item.name}
            item={item}
            level={0}
            onSelect={onSelect}
            selected={selected}
          />
        ))}
      </nav>
    </aside>
  );
}
