export type Role = 'Admin' | 'User';

export interface User {
  id: string;
  name: string;
  role: Role;
  teamId?: string;
}

export interface Team {
  id: string;
  name: string;
}

export interface ApplicationService {
  id: string;
  name: string;
  ownerId: string;
  teamId: string;
  documentationUrl?: string;
  repositoryUrl?: string;
}