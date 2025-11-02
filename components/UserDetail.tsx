
import React from 'react';
import { useData } from '../context/DataContext';

interface UserDetailProps {
  userId: string;
  onBack: () => void;
  onSelectService: (serviceId: string) => void;
  onSelectTeam: (teamId: string) => void;
}

const UserDetail: React.FC<UserDetailProps> = ({ userId, onBack, onSelectService, onSelectTeam }) => {
  const { users, teams, services } = useData();

  const user = users.find(u => u.id === userId);
  const team = user?.teamId ? teams.find(t => t.id === user.teamId) : null;
  const ownedServices = services.filter(s => s.ownerId === userId);

  if (!user) {
    return (
      <div className="text-center p-8 bg-secondary rounded-lg border border-border">
        <h2 className="text-2xl font-bold text-text-main">User Not Found</h2>
        <p className="text-muted mt-2">The requested user does not exist or has been removed.</p>
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
        <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center text-white text-3xl font-bold">
                    {user.name.charAt(0)}
                </div>
            </div>
            <div>
                 <h1 className="text-3xl font-bold text-text-main">{user.name}</h1>
                 <p className="text-muted font-mono text-xs mt-1">ID: {user.id}</p>
            </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Info */}
            <div>
                <h2 className="text-xl font-semibold text-text-main mb-4 border-b border-border pb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-muted" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    User Information
                </h2>
                <div className="bg-primary p-4 rounded-lg border border-border space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-muted text-sm">Role:</span>
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${user.role === 'Admin' ? 'bg-purple-600 text-white' : 'bg-gray-600 text-gray-200'}`}>
                            {user.role}
                        </span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-muted text-sm">Team:</span>
                        {team ? (
                            <button onClick={() => onSelectTeam(team.id)} className="font-semibold text-text-main hover:text-accent hover:underline text-sm">
                                {team.name}
                            </button>
                        ) : (
                            <span className="text-gray-400 text-sm">Unassigned</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Owned Services */}
            <div>
                <h2 className="text-xl font-semibold text-text-main mb-4 border-b border-border pb-3 flex items-center">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-muted" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                    Owned Services ({ownedServices.length})
                </h2>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                     {ownedServices.length > 0 ? (
                        ownedServices.map(service => {
                            const serviceTeam = teams.find(t => t.id === service.teamId);
                            return (
                                <div key={service.id} className="bg-primary p-3 rounded-lg border border-border">
                                    <button onClick={() => onSelectService(service.id)} className="font-semibold text-text-main hover:text-accent text-left w-full text-sm">
                                        {service.name}
                                    </button>
                                    <p className="text-xs text-muted">Team: {serviceTeam?.name || 'Unknown'}</p>
                                </div>
                            )
                        })
                    ) : (
                        <p className="text-muted text-sm p-4 text-center bg-primary rounded-lg border border-border">This user does not own any services.</p>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;