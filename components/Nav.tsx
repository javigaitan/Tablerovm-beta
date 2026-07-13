'use client';
import type { TabId, NavTab } from '@/types';
import styles from './Nav.module.css';

const TABS: NavTab[] = [
  { id: 'arquitectura', label: '🏗️ Arquitectura' },
  { id: 'flujo',        label: '🔄 Flujo de Trabajo' },
  { id: 'areas',        label: '👥 Áreas' },
  { id: 'paneles',      label: '📊 Paneles' },
  { id: 'campos',       label: '📋 Campos' },
  { id: 'acceso',       label: '🔐 Acceso' },
  { id: 'preguntas',    label: '❓ Preguntas' },
  { id: 'preview',      label: '👁️ Vista Previa Beta', accent: 'gold' },
  { id: 'conversion',   label: '🎯 Conversión', accent: 'gold' },
  { id: 'admin',        label: '⚙️ Administración' },
];

interface NavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function Nav({ activeTab, onTabChange }: NavProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>VM</span>
          <div>
            <div className={styles.logoTitle}>Tablero VM</div>
            <div className={styles.logoSub}>Dashboard Comercial</div>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={[
              styles.tab,
              activeTab === tab.id ? styles.active : '',
              tab.accent === 'gold' ? styles.gold : '',
            ].join(' ')}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
