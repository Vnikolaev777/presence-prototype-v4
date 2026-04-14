import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { SchoolBefore } from './pages/SchoolBefore.tsx';
import { SchoolAfter } from './pages/SchoolAfter.tsx';
import { SchoolAfterMagic } from './pages/SchoolAfterMagic.tsx';
import { DesignSelection } from './pages/DesignSelection.tsx';
import { StudentDashboard } from './pages/StudentDashboard.tsx';

const path = window.location.pathname;

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
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ComponentToRender />
  </StrictMode>,
);
