import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import PageNotFound from './pages/PageNotFound';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <LoginForm />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/" /> : <SignupForm />} 
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <PageNotFound />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;