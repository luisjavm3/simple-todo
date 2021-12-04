import AppRoutes from './router/AppRoutes';
import { AuthProvider } from './utils/useAuth';

function App() {
  window.onbeforeunload = () => {
    localStorage.removeItem('simple_todo');
  };

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
