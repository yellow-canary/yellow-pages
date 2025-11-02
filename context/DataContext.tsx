import React, { createContext, useState, ReactNode, useContext, SetStateAction, Dispatch } from 'react';
import { ApplicationService, Team, User } from '../types';

// Mock Data
const MOCK_USERS: User[] = [
  { id: 'user-1', name: 'Alice', role: 'Admin', teamId: 'team-1' },
  { id: 'user-2', name: 'Bob', role: 'User', teamId: 'team-1' },
  { id: 'user-3', name: 'Charlie', role: 'User', teamId: 'team-2' },
  { id: 'user-4', name: 'Diana', role: 'User', teamId: 'team-2' },
];

const MOCK_TEAMS: Team[] = [
  { id: 'team-1', name: 'Platform Engineering' },
  { id: 'team-2', name: 'Data Science' },
  { id: 'team-3', name: 'Frontend' },
];

const MOCK_SERVICES: ApplicationService[] = [
  { id: 'svc-1', name: 'Authentication Service', ownerId: 'user-1', teamId: 'team-1', documentationUrl: 'https://docs.auth.example.com', repositoryUrl: 'https://github.com/example/auth-service' },
  { id: 'svc-2', name: 'Billing API', ownerId: 'user-2', teamId: 'team-1', repositoryUrl: 'https://github.com/example/billing-api' },
  { id: 'svc-3', name: 'ML Model Runner', ownerId: 'user-3', teamId: 'team-2', documentationUrl: 'https://docs.ml.example.com', repositoryUrl: 'https://github.com/example/ml-runner' },
  { id: 'svc-4', name: 'Data Ingestion Pipeline', ownerId: 'user-4', teamId: 'team-2' },
  { id: 'svc-5', name: 'Customer Dashboard', ownerId: 'user-1', teamId: 'team-3', repositoryUrl: 'https://github.com/example/dashboard' },
];

interface DataContextType {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  teams: Team[];
  setTeams: Dispatch<SetStateAction<Team[]>>;
  services: ApplicationService[];
  setServices: Dispatch<SetStateAction<ApplicationService[]>>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [teams, setTeams] = useState<Team[]>(MOCK_TEAMS);
  const [services, setServices] = useState<ApplicationService[]>(MOCK_SERVICES);

  return (
    <DataContext.Provider value={{ users, setUsers, teams, setTeams, services, setServices }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};