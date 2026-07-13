import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tablero VM — Dashboard Comercial',
  description: 'Panel de control de ventas y leads — Visa Management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
