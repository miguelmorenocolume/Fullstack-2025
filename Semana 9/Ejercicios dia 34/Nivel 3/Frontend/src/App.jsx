import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './App.css';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Protected from './pages/Protected';
import AdminUsers from './pages/AdminUsers';

function getCurrentUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

function RequireAuth({ children }) {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function RequireAdmin({ children }) {
  const user = getCurrentUser();
  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/protegido"
          element={
            <RequireAuth>
              <Protected user={user} />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/users"
          element={
            <RequireAuth>
              <RequireAdmin>
                <AdminUsers />
              </RequireAdmin>
            </RequireAuth>
          }
        />
        {/* Ruta comodín para no encontrados */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
