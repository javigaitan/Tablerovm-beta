'use client';
import { useState } from 'react';
import type { TabId } from '@/types';
import Nav from '@/components/Nav';
import Arquitectura from '@/components/tabs/Arquitectura';
import Flujo       from '@/components/tabs/Flujo';
import Areas       from '@/components/tabs/Areas';
import Paneles     from '@/components/tabs/Paneles';
import Campos      from '@/components/tabs/Campos';
import Acceso      from '@/components/tabs/Acceso';
import Preguntas   from '@/components/tabs/Preguntas';
import Preview     from '@/components/tabs/Preview';
import Conversion  from '@/components/tabs/Conversion';
import Admin       from '@/components/tabs/Admin';

const TAB_MAP: Record<TabId, React.ReactNode> = {
  arquitectura: <Arquitectura />,
  flujo:        <Flujo />,
  areas:        <Areas />,
  paneles:      <Paneles />,
  campos:       <Campos />,
  acceso:       <Acceso />,
  preguntas:    <Preguntas />,
  preview:      <Preview />,
  conversion:   <Conversion />,
  admin:        <Admin />,
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabId>('preview');

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Nav activeTab={activeTab} onTabChange={setActiveTab} />
      <main style={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>
        {TAB_MAP[activeTab]}
      </main>
    </div>
  );
}
