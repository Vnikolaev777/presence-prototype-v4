import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { SchoolBefore } from './pages/SchoolBefore.tsx';
import { SchoolAfter } from './pages/SchoolAfter.tsx';
import { SchoolAfterMagic } from './pages/SchoolAfterMagic.tsx';
import { DesignSelection } from './pages/DesignSelection.tsx';
import { StudentDashboard } from './pages/StudentDashboard.tsx';
import { AcademicsPage } from './pages/AcademicsPage.tsx';
import { AuditPreviewPage } from './components/AuditPreviews.tsx';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const path = window.location.pathname.replace(basePath, '');

let ComponentToRender = App;
if (path === '/school-before') {
  ComponentToRender = SchoolBefore;
} else if (path === '/school-after') {
  ComponentToRender = SchoolAfter;
} else if (path === '/school-after-magic') {
  ComponentToRender = SchoolAfterMagic;
} else if (path === '/design-selection') {
  ComponentToRender = DesignSelection;
} else if (path === '/student-dashboard') {
  ComponentToRender = StudentDashboard;
} else if (path === '/academics') {
  ComponentToRender = AcademicsPage;
} else if (path === '/audit-preview') {
  ComponentToRender = AuditPreviewPage;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ComponentToRender />
  </StrictMode>,
);
