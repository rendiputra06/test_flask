import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './layout/DashboardLayout';

function App() {
  // Simple auth check, will be replaced with context
  const isAuthenticated = !!localStorage.getItem('accessToken');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
