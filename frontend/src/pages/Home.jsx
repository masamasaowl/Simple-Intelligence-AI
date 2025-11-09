import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import Button from '../components/common/Button';

function Home() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Simple Intelligence</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user?.name}</span>
            <Button onClick={handleLogout} variant="secondary">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
        <p className="text-gray-600">Chat interface coming soon...</p>
      </main>
    </div>
  );
}

export default Home;