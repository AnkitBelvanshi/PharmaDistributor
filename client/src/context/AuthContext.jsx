import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { setToken, clearToken } from '../api/axiosInstance';
import { getMeApi, loginApi, logoutApi, refreshTokenApi } from '../api/authApi';

const AuthContext = createContext(null);

const initialState = { user: null, isAuthenticated: false, loading: true };

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADED':
      return { ...state, user: action.payload, isAuthenticated: !!action.payload, loading: false };
    case 'LOGIN':
      return { user: action.payload, isAuthenticated: true, loading: false };
    case 'LOGOUT':
      return { user: null, isAuthenticated: false, loading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Restore session from httpOnly refresh-token cookie on mount
  useEffect(() => {
    (async () => {
      try {
        const { accessToken } = await refreshTokenApi();
        setToken(accessToken);
        const user = await getMeApi();
        dispatch({ type: 'LOADED', payload: user });
      } catch {
        dispatch({ type: 'LOADED', payload: null });
      }
    })();
  }, []);

  const login = useCallback(async (credentials) => {
    const res = await loginApi(credentials);
    setToken(res.accessToken);
    dispatch({ type: 'LOGIN', payload: res.user });
    return res;
  }, []);

  const logout = useCallback(async () => {
    try { await logoutApi(); } catch { /* best-effort */ }
    clearToken();
    dispatch({ type: 'LOGOUT' });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
