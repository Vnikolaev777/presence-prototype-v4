import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { SchoolAfterMagic } from './pages/SchoolAfterMagic';
import { FacultyDirectoryPage } from './pages/FacultyDirectoryPage';

function PreviewApp() {
  const [page, setPage] = useState<'home' | 'directory'>('home');

  if (page === 'directory') {
    return <FacultyDirectoryPage onNavigate={(p) => setPage(p as any)} />;
  }
  return <SchoolAfterMagic onNavigate={(p) => setPage(p as any)} />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PreviewApp />
  </StrictMode>,
);
