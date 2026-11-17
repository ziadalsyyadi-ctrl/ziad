import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeLiveUpdates } from './live-update.ts';

createRoot(document.getElementById('root')!).render(<App />);
void initializeLiveUpdates();
