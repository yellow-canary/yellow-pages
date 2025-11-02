
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Team } from '../types';

interface TeamManagementProps {
    onSelectTeam: (teamId: string) => void;
}

const TeamManagement: React.FC<TeamManagementProps> = ({ onSelectTeam }) => {
    const { teams, setTeams, users } = useData();
    const [newTeamName, setNewTeamName] = useState('');

    const handleCreateTeam = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTeamName.trim() === '') return;

        const newTeam: Team = {
            id: `team-${Date.now()}`,
            name: newTeamName.trim(),
        };
        setTeams(prev => [...prev, newTeam]);
        setNewTeamName('');
    };
    
    const handleDeleteTeam = (teamId: string) => {
        if (users.some(u => u.teamId === teamId)) {
            alert("Cannot delete a team with assigned users. Please reassign users first.");
            return;
        }
        if (window.confirm("Are you sure you want to delete this team?")) {
            setTeams(prev => prev.filter(t => t.id !== teamId));
        }
    };


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-lg font-semibold text-text-main mb-4">Existing Teams</h3>
                <div className="space-y-3">
                    {teams.map(team => {
                         const memberCount = users.filter(u => u.teamId === team.id).length;
                         return (
                            <div key={team.id} className="bg-primary p-4 rounded-lg border border-border flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-text-main">{team.name}</p>
                                    <p className="text-xs text-muted">{memberCount} member{memberCount !== 1 ? 's' : ''}</p>
                                    <button onClick={() => onSelectTeam(team.id)} className="text-accent text-xs font-semibold hover:underline mt-2">View Details</button>
                                </div>
                                <button
                                    onClick={() => handleDeleteTeam(team.id)}
                                    className="text-muted hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-text-main mb-4">Create New Team</h3>
                <form onSubmit={handleCreateTeam} className="bg-primary p-4 rounded-lg border border-border space-y-4">
                    <div>
                        <label htmlFor="team-name" className="block text-sm font-medium text-muted mb-1">Team Name</label>
                        <input
                            id="team-name"
                            type="text"
                            value={newTeamName}
                            onChange={(e) => setNewTeamName(e.target.value)}
                            className="w-full bg-secondary border border-border rounded-md py-2 px-3 focus:ring-accent focus:border-accent"
                            placeholder="e.g., Security Operations"
                        />
                    </div>
                    <button type="submit" className="w-full bg-accent hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
                        Create Team
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TeamManagement;