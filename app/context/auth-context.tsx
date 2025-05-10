import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Constants from 'expo-constants';
import { AccountType } from '../(app)/_layout';

type AuthContextType = {
  token: string | null;
  role: AccountType | null;
  sub: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  setToken: (token: string | null) => void;
  setRole: (role: AccountType | null) => void;
  setSub: (sub: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<AccountType | null>(null);
  const [sub, setSub] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP;
  const LOCAL_PORT = Constants.expoConfig?.extra?.LOCAL_PORT;
  const baseUrl = `http://${LOCAL_IP}:${LOCAL_PORT}`;

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const savedToken = await SecureStore.getItemAsync('token');


        if (savedToken) {
          const decoded: any = jwtDecode(savedToken);
          setToken(savedToken);
          setRole(decoded.role);
          setSub(decoded.sub);
          axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;

        }
      } catch (err) {
        console.error('Failed to load auth:', err);
        await SecureStore.deleteItemAsync('token');
      } finally {
        setLoading(false);
      }
    };

    loadAuth();

    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && !error.config._retry) {
          error.config._retry = true;
          try {
            await refreshAccessToken();
            return axios(error.config); // retry original request
          } catch (refreshErr) {
            logout();
            return Promise.reject(refreshErr);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await axios.post(`${baseUrl}/auth/login`, { email, password });
    const { access_token, refresh_token } = data;

    const decoded: any = jwtDecode(access_token);

    await SecureStore.setItemAsync('token', access_token);
    await SecureStore.setItemAsync('refresh_token', refresh_token);

    setToken(access_token);
    setRole(decoded.role);
    setSub(decoded.sub);

    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  };

  const logout = async () => {
    setToken(null);
    setRole(null);
    setSub(null);
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('refresh_token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const refreshAccessToken = async () => {
    const refreshToken = await SecureStore.getItemAsync('refresh_token');
    if (!refreshToken) throw new Error('No refresh token available');

    const { data } = await axios.post(`${baseUrl}/auth/refresh`, {
      refresh_token: refreshToken,
    });

    const newAccessToken = data.access_token;
    const decoded: any = jwtDecode(newAccessToken);

    await SecureStore.setItemAsync('token', newAccessToken);
    setToken(newAccessToken);
    setRole(decoded.role);
    setSub(decoded.sub);

    axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
    return newAccessToken;
  };

  return (
    <AuthContext.Provider
      value={{ token, role, sub, login, logout, loading ,setToken, setRole, setSub}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
