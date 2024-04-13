import AppRoutes from '@/routes';
import { AppProvider } from '@/providers/app';
import usePreventZoom from './hooks/usePreventZoom';

function App() {
  usePreventZoom();
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
