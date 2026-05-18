import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';
import ProjectDetails from './pages/ProjectDetails';
import Projects from './pages/Projects';
import Login from './pages/Login';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path="/add-project" element={<ProtectedRoute><AddProject /></ProtectedRoute>} />
        <Route path="/project/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
        <Route path="/project/:id/edit" element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;