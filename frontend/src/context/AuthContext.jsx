import { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount: restore session from localStorage and validate token
  useEffect(() => {
    const token    = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      // Optimistically restore user immediately (prevents flash of login page)
      setUser(JSON.parse(savedUser));

      // Then silently verify token with the server
      getMe()
        .then((res) => {
          // Server confirmed user is valid — update with fresh data
          setUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
        })
        .catch((err) => {
          // Token is expired or invalid — clean up and let user log in again
          console.warn('[AuthContext] Token validation failed:', err?.response?.data?.message);
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      // No session at all
      setLoading(false);
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    console.log('[AuthContext] Logged in:', userData.email);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    console.log('[AuthContext] Logged out');
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
