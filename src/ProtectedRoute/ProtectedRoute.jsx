import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
      fetch('http://localhost:3000/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (response.ok) {
            setIsAuthenticated(true); // Token is valid, user is authenticated
          } else {
            setIsAuthenticated(false); // Invalid token
          }
        })
        .catch(() => {
          setIsAuthenticated(false); // Error occurred, user not authenticated
        })
        .finally(() => setLoading(false)); // End loading
    } else {
      setIsAuthenticated(false); // No token found
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading message while checking auth
  }

  return isAuthenticated ? children : <Redirect to="/login" />; // Redirect to login if not authenticated
};

export default ProtectedRoute;
