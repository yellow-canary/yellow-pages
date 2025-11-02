
import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../hooks/useAuth';
import Modal from './Modal';

interface ServiceDetailProps {
  serviceId: string;
  onBack: () => void;
  onSelectTeam: (teamId: string) => void;
  onSelectUser: (userId: string) => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceId, onBack, onSelectTeam, onSelectUser }) => {
  const { services, users, teams, setServices } = useData();
  const { currentUser } = useAuth();

  const service = services.find(s => s.id === serviceId);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(service?.name || '');
  const [editedOwnerId, setEditedOwnerId] = useState(service?.ownerId || '');
  const [editedTeamId, setEditedTeamId] = useState(service?.teamId || '');
  const [editedDocumentationUrl, setEditedDocumentationUrl] = useState(service?.documentationUrl || '');
  const [editedRepositoryUrl, setEditedRepositoryUrl] = useState(service?.repositoryUrl || '');


  useEffect(() => {
    if (service) {
        setEditedName(service.name);
        setEditedOwnerId(service.ownerId);
        setEditedTeamId(service.teamId);
        setEditedDocumentationUrl(service.documentationUrl || '');
        setEditedRepositoryUrl(service.repositoryUrl || '');
    }
  }, [service]);
  
  const owner = service ? users.find(u => u.id === service.ownerId) : null;
  const team = service ? teams.find(t => t.id === service.teamId) : null;

  const canManage = currentUser?.role === 'Admin' || currentUser?.id === service?.ownerId;

  const handleSave = () => {
    if (!service) return;
    setServices(prev => prev.map(s => 
        s.id === serviceId 
        ? { 
            ...s, 
            name: editedName, 
            ownerId: editedOwnerId, 
            teamId: editedTeamId,
            documentationUrl: editedDocumentationUrl || undefined,
            repositoryUrl: editedRepositoryUrl || undefined,
          }
        : s
    ));
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (service) {
        setEditedName(service.name);
        setEditedOwnerId(service.ownerId);
        setEditedTeamId(service.teamId);
        setEditedDocumentationUrl(service.documentationUrl || '');
        setEditedRepositoryUrl(service.repositoryUrl || '');
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!service) return;
    setServices(prev => prev.filter(s => s.id !== service.id));
    setIsDeleteModalOpen(false);
    onBack();
  };


  if (!service) {
    return (
      <div className="text-center p-8 bg-secondary rounded-lg border border-border">
        <h2 className="text-2xl font-bold text-text-main">Service Not Found</h2>
        <p className="text-muted mt-2">The requested service does not exist or has been removed.</p>
        <button onClick={onBack} className="mt-6 bg-accent hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
          Back
        </button>
      </div>
    );
  }

  return (
    <div>
       <button onClick={onBack} className="mb-6 text-sm font-semibold text-accent hover:underline flex items-center transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back
      </button>

      <div className="bg-secondary p-8 rounded-lg border border-border">
        <div className="flex justify-between items-start mb-2">
            <div>
                {isEditing ? (
                    <input 
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="text-3xl font-bold text-text-main bg-primary border border-border rounded-md py-2 px-3 w-full"
                    />
                ) : (
                    <h1 className="text-3xl font-bold text-text-main">{service.name}</h1>
                )}
                <p className="text-muted font-mono text-xs mt-2">ID: {service.id}</p>
            </div>
            {canManage && !isEditing && (
                <div className="flex items-center space-x-2">
                    <button onClick={() => setIsEditing(true)} className="bg-accent hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md flex items-center text-sm transition-colors">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" /></svg>
                        Edit Service
                    </button>
                     <button onClick={() => setIsDeleteModalOpen(true)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md flex items-center text-sm transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        Delete
                    </button>
                </div>
            )}
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-primary p-6 rounded-lg border border-border space-y-4">
            <h2 className="text-xl font-semibold text-text-main mb-4 border-b border-border pb-3">Ownership Details</h2>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-muted" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              <div>
                <p className="text-sm text-muted">Owner</p>
                {isEditing ? (
                    <select value={editedOwnerId} onChange={e => setEditedOwnerId(e.target.value)} className="w-full bg-secondary border border-border rounded-md py-1 px-2 focus:ring-accent focus:border-accent">
                        {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                ) : (
                    <button onClick={() => owner && onSelectUser(owner.id)} className="font-semibold text-text-main hover:text-accent hover:underline disabled:no-underline disabled:cursor-default" disabled={!owner}>
                      {owner?.name || 'Unknown'}
                    </button>
                )}
              </div>
            </div>
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-muted" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <div>
                <p className="text-sm text-muted">Team</p>
                {isEditing ? (
                     <select value={editedTeamId} onChange={e => setEditedTeamId(e.target.value)} className="w-full bg-secondary border border-border rounded-md py-1 px-2 focus:ring-accent focus:border-accent">
                        {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                ) : (
                    <button onClick={() => team && onSelectTeam(team.id)} className="font-semibold text-text-main hover:text-accent hover:underline disabled:no-underline disabled:cursor-default" disabled={!team}>
                        {team?.name || 'Unassigned'}
                    </button>
                )}
              </div>
            </div>
          </div>

          <div className="bg-primary p-6 rounded-lg border border-border">
            <h2 className="text-xl font-semibold text-text-main mb-4 border-b border-border pb-3">Service Metadata</h2>
            <ul className="space-y-3 text-sm">
                <li className="flex justify-between"><span className="text-muted">Version:</span> <span className="font-mono text-text-main">1.2.5</span></li>
                <li className="flex justify-between"><span className="text-muted">Deployment Status:</span> <span className="text-green-400 font-semibold">Active</span></li>
                <li className="flex justify-between"><span className="text-muted">API Endpoint:</span> <span className="font-mono text-text-main">/api/v1/{service.name.toLowerCase().replace(/\s/g, '-')}</span></li>
                <li className="flex justify-between"><span className="text-muted">Created:</span> <span className="font-mono text-text-main">2023-10-27</span></li>
                {service.repositoryUrl && !isEditing && (
                    <li className="flex justify-between items-center"><span className="text-muted">Repository:</span> 
                        <a href={service.repositoryUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-accent hover:underline break-all text-right ml-2">
                           View Repository
                        </a>
                    </li>
                 )}
            </ul>
             {isEditing && (
                <div className="mt-4">
                    <label htmlFor="repo-url" className="block text-sm font-medium text-muted mb-1">Repository URL</label>
                    <input 
                        id="repo-url"
                        type="url"
                        value={editedRepositoryUrl}
                        onChange={(e) => setEditedRepositoryUrl(e.target.value)}
                        placeholder="https://github.com/example/service"
                        className="text-text-main bg-secondary border border-border rounded-md py-2 px-3 w-full"
                    />
                </div>
            )}
          </div>
        </div>
        
        {/* Documentation Section */}
        <div className="mt-8 bg-primary p-6 rounded-lg border border-border">
            <h2 className="text-xl font-semibold text-text-main mb-4 border-b border-border pb-3">Documentation</h2>
            {isEditing ? (
                 <div>
                    <label htmlFor="doc-url" className="block text-sm font-medium text-muted mb-1">Documentation URL</label>
                    <input 
                        id="doc-url"
                        type="url"
                        value={editedDocumentationUrl}
                        onChange={(e) => setEditedDocumentationUrl(e.target.value)}
                        placeholder="https://docs.example.com"
                        className="text-text-main bg-secondary border border-border rounded-md py-2 px-3 w-full"
                    />
                </div>
            ) : service.documentationUrl ? (
                <a href={service.documentationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-accent/80 hover:bg-accent text-white font-bold py-2 px-4 rounded-md transition-colors">
                    View Documentation
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
            ) : (
                <p className="text-muted">No documentation URL provided.</p>
            )}
        </div>

        {isEditing && (
            <div className="mt-8 flex justify-end space-x-4">
                <button onClick={handleCancel} className="bg-secondary hover:bg-primary border border-border text-text-main font-bold py-2 px-4 rounded-md transition-colors">Cancel</button>
                <button onClick={handleSave} className="bg-accent hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md transition-colors">Save Changes</button>
            </div>
        )}
      </div>
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
        <div className="text-text-main">
            <p>Are you sure you want to delete the service "{service.name}"?</p>
            <p className="text-sm text-muted mt-2">This action cannot be undone.</p>
            <div className="mt-6 flex justify-end space-x-4">
                <button onClick={() => setIsDeleteModalOpen(false)} className="bg-secondary hover:bg-primary border border-border text-text-main font-bold py-2 px-4 rounded-md transition-colors">Cancel</button>
                <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors">Delete</button>
            </div>
        </div>
    </Modal>
    </div>
  );
};

export default ServiceDetail;