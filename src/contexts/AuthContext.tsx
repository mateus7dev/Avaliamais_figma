import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'administrator' | 'teacher' | 'student' | 'parent' | 'secretary';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  cpf: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@avaliaplus.ma.gov.br': {
    password: 'admin123',
    user: {
      id: '1',
      name: 'Maria Silva',
      email: 'admin@avaliaplus.ma.gov.br',
      role: 'administrator',
      cpf: '123.456.789-00'
    }
  },
  'teacher@avaliaplus.ma.gov.br': {
    password: 'teacher123',
    user: {
      id: '2',
      name: 'João Santos',
      email: 'teacher@avaliaplus.ma.gov.br',
      role: 'teacher',
      cpf: '987.654.321-00'
    }
  },
  'student@avaliaplus.ma.gov.br': {
    password: 'student123',
    user: {
      id: '3',
      name: 'Ana Costa',
      email: 'student@avaliaplus.ma.gov.br',
      role: 'student',
      cpf: '456.789.123-00'
    }
  },
  'parent@avaliaplus.ma.gov.br': {
    password: 'parent123',
    user: {
      id: '4',
      name: 'Carlos Oliveira',
      email: 'parent@avaliaplus.ma.gov.br',
      role: 'parent',
      cpf: '321.654.987-00'
    }
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const account = mockUsers[email];
    if (account && account.password === password) {
      setUser(account.user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}