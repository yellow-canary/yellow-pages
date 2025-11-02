
import React from 'react';
import { useData } from '../context/DataContext';

interface TeamDetailProps {
  teamId: string;
  onBack: () => void;
  onSelectService: (serviceId: string) => void;
  onSelectUser: (userId: string) => void;
}

const TeamDetail: React.FC<TeamDetailProps> = ({ teamId, onBack, onSelectService, onSelectUser }) => {
  const { teams, users, services } = useData();

  const team = teams.find(t => t.id === teamId);
  const teamMembers = users.filter(u => u.teamId === teamId);
  const teamServices = services.filter(s => s.teamId === teamId);

  if (!team) {
    return (
      <div className="text-center p-8 bg-secondary rounded-lg border border-border">
        <h2 className="text-2xl font-bold text-text-main">Team Not Found</h2>
        <p className="text-muted mt-2">The requested team does not exist or has been removed.</p>
        <button onClick={onBack} className="mt-6 bg-accent hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
          Back to Management
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
        <h1 className="text-3xl font-bold text-text-main">{team.name}</h1>
        <p className="text-muted font-mono text-xs mt-2">ID: {team.id}</p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Team Members */}
            <div>
                <h2 className="text-xl font-semibold text-text-main mb-4 border-b border-border pb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-muted" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    Team Members ({teamMembers.length})
                </h2>
                <div className="space-y-3">
                    {teamMembers.length > 0 ? (
                        teamMembers.map(user => (
                            <div key={user.id} className="bg-primary p-3 rounded-lg border border-border">
                                <button onClick={() => onSelectUser(user.id)} className="font-semibold text-text-main hover:text-accent hover:underline">
                                    {user.name}
                                </button>
                                <p className="text-xs text-muted">{user.role}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted text-sm">No members in this team.</p>
                    )}
                </div>
            </div>

            {/* Team Services */}
            <div>
                <h2 className="text-xl font-semibold text-text-main mb-4 border-b border-border pb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-muted" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                    Services ({teamServices.length})
                </h2>
                <div className="space-y-3">
                     {teamServices.length > 0 ? (
                        teamServices.map(service => {
                            const owner = users.find(u => u.id === service.ownerId);
                            return (
                                <div key={service.id} className="bg-primary p-3 rounded-lg border border-border">
                                    <button onClick={() => onSelectService(service.id)} className="font-semibold text-text-main hover:text-accent text-left w-full">
                                        {service.name}
                                    </button>
                                    <p className="text-xs text-muted">Owner: {owner?.name || 'Unknown'}</p>
                                </div>
                            )
                        })
                    ) : (
                        <p className="text-muted text-sm">No services are managed by this team.</p>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;