// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Settings from './pages/Settings';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';
import LoginPage from './LoginPage';

const App = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={isAuthenticated ? <AuthenticatedApp /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

const AuthenticatedApp = () => (
  <div style={{ display: 'flex' }}>
    <Sidebar />
    <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/edit-product/:id" element={<ProductForm />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  </div>
);

export default App;
