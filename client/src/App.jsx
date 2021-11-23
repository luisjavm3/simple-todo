import AppRoutes from './router/AppRoutes';
import { AuthProvider } from './utils/useAuth';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
