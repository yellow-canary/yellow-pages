
import React, { useState } from 'react';
import UserManagement from './UserManagement';
import TeamManagement from './TeamManagement';

type ManagementTab = 'users' | 'teams';

interface ManagementDashboardProps {
    onSelectTeam: (teamId: string) => void;
    onSelectUser: (userId: string) => void;
}

const ManagementDashboard: React.FC<ManagementDashboardProps> = ({ onSelectTeam, onSelectUser }) => {
    const [activeTab, setActiveTab] = useState<ManagementTab>('users');

    return (
        <div className="bg-secondary p-6 rounded-lg border border-border">
            <h2 className="text-2xl font-bold mb-6 text-text-main">Admin Management</h2>
            <div className="border-b border-border mb-6">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`${
                            activeTab === 'users'
                                ? 'border-accent text-accent'
                                : 'border-transparent text-muted hover:text-text-main hover:border-gray-500'
                        } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors`}
                    >
                        User Management
                    </button>
                    <button
                        onClick={() => setActiveTab('teams')}
                        className={`${
                            activeTab === 'teams'
                                ? 'border-accent text-accent'
                                : 'border-transparent text-muted hover:text-text-main hover:border-gray-500'
                        } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors`}
                    >
                        Team Management
                    </button>
                </nav>
            </div>
            <div>
                {activeTab === 'users' && <UserManagement onSelectUser={onSelectUser} />}
                {activeTab === 'teams' && <TeamManagement onSelectTeam={onSelectTeam} />}
            </div>
        </div>
    );
};

export default ManagementDashboard;