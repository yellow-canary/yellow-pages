import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../hooks/useAuth';
import { ApplicationService } from '../types';

interface AddServiceFormProps {
  onSuccess: () => void;
}

const AddServiceForm: React.FC<AddServiceFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [teamId, setTeamId] = useState('');
  const [documentationUrl, setDocumentationUrl] = useState('');
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const { teams, setServices } = useData();
  const { currentUser } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !teamId || !currentUser) return;
    
    const newService: ApplicationService = {
      id: `svc-${Date.now()}`,
      name,
      teamId,
      ownerId: currentUser.id,
      documentationUrl: documentationUrl || undefined,
      repositoryUrl: repositoryUrl || undefined,
    };
    
    setServices(prev => [...prev, newService]);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="service-name" className="block text-sm font-medium text-muted mb-1">Service Name</label>
        <input
          id="service-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-primary border border-border rounded-md py-2 px-3 focus:ring-accent focus:border-accent"
          required
        />
      </div>
      <div>
        <label htmlFor="service-team" className="block text-sm font-medium text-muted mb-1">Team</label>
        <select
          id="service-team"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          className="w-full bg-primary border border-border rounded-md py-2 px-3 focus:ring-accent focus:border-accent"
          required
        >
          <option value="" disabled>Select a team</option>
          {teams.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
      </div>
       <div>
        <label htmlFor="repository-url" className="block text-sm font-medium text-muted mb-1">Repository URL (Optional)</label>
        <input
          id="repository-url"
          type="url"
          value={repositoryUrl}
          onChange={(e) => setRepositoryUrl(e.target.value)}
          placeholder="https://github.com/example/service"
          className="w-full bg-primary border border-border rounded-md py-2 px-3 focus:ring-accent focus:border-accent"
        />
      </div>
      <div>
        <label htmlFor="documentation-url" className="block text-sm font-medium text-muted mb-1">Documentation URL (Optional)</label>
        <input
          id="documentation-url"
          type="url"
          value={documentationUrl}
          onChange={(e) => setDocumentationUrl(e.target.value)}
          placeholder="https://docs.example.com"
          className="w-full bg-primary border border-border rounded-md py-2 px-3 focus:ring-accent focus:border-accent"
        />
      </div>
      <button type="submit" className="w-full bg-accent hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
        Add Service
      </button>
    </form>
  );
};

export default AddServiceForm;