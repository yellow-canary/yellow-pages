
import React, { useState } from 'react';
import { ApplicationService } from '../types';
import { useData } from '../context/DataContext';
import { useAuth } from '../hooks/useAuth';
import Modal from './Modal';

interface ServiceCardProps {
  service: ApplicationService;
  onViewDetails: (serviceId: string) => void;
  onSelectTeam: (teamId: string) => void;
  onSelectUser: (userId: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onViewDetails, onSelectTeam, onSelectUser }) => {
  const { users, teams, setServices } = useData();
  const { currentUser } = useAuth();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const owner = users.find(u => u.id === service.ownerId);
  const team = teams.find(t => t.id === service.teamId);

  const canManage = currentUser?.role === 'Admin' || currentUser?.id === service.ownerId;

  const handleDelete = () => {
      setServices(prev => prev.filter(s => s.id !== service.id));
      setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="bg-secondary border border-border rounded-lg p-6 flex flex-col justify-between hover:border-accent transition-all duration-300 shadow-lg h-full">
        <div>
          <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-text-main pr-2">{service.name}</h3>
              {canManage && (
                   <button onClick={() => setIsDeleteModalOpen(true)} className="text-muted hover:text-red-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                   </button>
              )}
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-muted" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              <span className="text-muted mr-2">Owner:</span>
              {owner ? (
                  <button onClick={() => onSelectUser(owner.id)} className="font-semibold text-text-main hover:text-accent hover:underline">
                      {owner.name}
                  </button>
              ) : ( <span className="font-semibold text-text-main">Unknown</span>)}
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-muted" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span className="text-muted mr-2">Team:</span>
              {team ? (
                  <button onClick={() => onSelectTeam(team.id)} className="font-semibold text-text-main hover:text-accent hover:underline">
                      {team.name}
                  </button>
              ) : (
                  <span className="font-semibold text-text-main">Unassigned</span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-border">
            <button onClick={() => onViewDetails(service.id)} className="text-accent text-sm font-semibold hover:underline">View Details</button>
        </div>
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
    </>
  );
};

export default ServiceCard;