
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, Role } from '../types';
import { useData } from './DataContext';

interface AuthContextType {
  currentUser: User | null;
  login: (userName: string) => boolean;
  logout: () => void;
  register: (userName: string, teamId: string) => User | null;
  updateCurrentUserProfile: (updates: { name: string; teamId?: string }) => { success: boolean; error?: string };
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { users, setUsers } = useData();

  const login = (userName: string): boolean => {
    const user = users.find(u => u.name.toLowerCase() === userName.toLowerCase());
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = (userName: string, teamId: string): User | null => {
    if (users.some(u => u.name.toLowerCase() === userName.toLowerCase())) {
      return null; // User already exists
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userName,
      role: 'User', // All new users are regular users
      teamId,
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return newUser;
  };

  const updateCurrentUserProfile = (updates: { name: string; teamId?: string }): { success: boolean; error?: string } => {
    if (!currentUser) {
        return { success: false, error: 'No user is logged in.' };
    }

    // Check if the new name is already taken by another user
    if (users.some(u => u.name.toLowerCase() === updates.name.toLowerCase() && u.id !== currentUser.id)) {
        return { success: false, error: 'This username is already taken.' };
    }

    const updatedUser: User = { ...currentUser, ...updates };
    
    setUsers(prevUsers => prevUsers.map(u => u.id === currentUser.id ? updatedUser : u));
    setCurrentUser(updatedUser);

    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register, updateCurrentUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
