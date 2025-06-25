import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PostDetails from './pages/PostDetails';
import "./App.css"; // Asegúrate de tener un archivo CSS para estilos globales

// Layout para ocultar el navbar en login/registro
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

// Rutas protegidas por sesión
const PrivateRoute = ({ element }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Cargando...</p>;
  return user ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element }) => {
  const { user } = useAuth();
  return !user ? element : <Navigate to="/" />;
};

const AppRoutes = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<PrivateRoute element={<Home />} />} />
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="/posts/:id" element={<PrivateRoute element={<PostDetails />} />} />
      <Route path="/post/:id" element={<PrivateRoute element={<PostDetails />} />} />

      <Route path="/login" element={<PublicRoute element={<Login />} />} />
      <Route path="/register" element={<PublicRoute element={<Register />} />} />
    </Routes>
  </Layout>
);

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
