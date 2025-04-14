import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

type AuthContextType = {
  token: string | null;
  role: string | null;
  login: (email: string, password: string) => Promise<string>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}:any) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const loadAuth = async () => {
      const savedToken = await SecureStore.getItemAsync('token');
      if (savedToken) {
        const decoded: any = jwtDecode.jwtDecode(savedToken);
        setToken(savedToken);
        setRole(decoded.role);
        axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
      }
    };
    loadAuth();
    const interceptor = axios.interceptors.response.use(
        (res) => res,
        async (err) => {
          if (err.response?.status === 401 && !err.config._retry) {
            err.config._retry = true;
            try {
              await refreshAccessToken();
              return axios(err.config); // retry original request
            } catch (refreshError) {
              logout();
              return Promise.reject(refreshError);
            }
          }
          return Promise.reject(err);
        }
      );
  
      // Clean up the interceptor on unmount
      return () => {
        axios.interceptors.response.eject(interceptor);
      }
  }, []);

  const login = async (email: string, password: string): Promise<string> => {
    const res = await axios.post('http://localhost:3000/auth/login', { email, password });
    const { access_token, refresh_token } = res.data;
    const decoded: any = jwtDecode.jwtDecode(access_token);
  
    await SecureStore.setItemAsync('token', access_token);
    await SecureStore.setItemAsync('refresh_token', refresh_token);
  
    setToken(access_token);
    setRole(decoded.role);
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  
    return decoded.role;
  };
  
  

  const logout = async () => {
    setToken(null);
    setRole(null);
    await SecureStore.deleteItemAsync('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const refreshAccessToken = async () => {
    const refreshToken = await SecureStore.getItemAsync('refresh_token');
    if (!refreshToken) throw new Error('No refresh token available');
  
    const res = await axios.post('http://localhost:3000/auth/refresh', {
      refresh_token: refreshToken,
    });
  
    const newAccessToken = res.data.access_token;
    const decoded: any = jwtDecode.jwtDecode(newAccessToken);
  
    await SecureStore.setItemAsync('token', newAccessToken);
    setToken(newAccessToken);
    setRole(decoded.role);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
  
    return newAccessToken;
  };
  

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
