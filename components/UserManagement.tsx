
import React from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../types';

interface UserManagementProps {
    onSelectUser: (userId: string) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ onSelectUser }) => {
    const { users, setUsers, teams } = useData();
    const { currentUser } = useAuth();

    const handleTeamChange = (userId: string, teamId: string) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId ? { ...user, teamId: teamId || undefined } : user
            )
        );
    };

    const handleRoleChange = (userId: string, role: Role) => {
        setUsers(prevUsers =>
            prevUsers.map(user => {
                if (user.id === userId) {
                    // When a user becomes an Admin, unassign them from any team for consistency.
                    const newTeamId = role === 'Admin' ? undefined : user.teamId;
                    return { ...user, role, teamId: newTeamId };
                }
                return user;
            })
        );
    };

    return (
        <div>
            <h3 className="text-lg font-semibold text-text-main mb-4">Users</h3>
            <div className="overflow-x-auto bg-primary rounded-lg border border-border">
                <table className="min-w-full divide-y divide-border">
                    <thead className="bg-secondary">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Role</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Team</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {users.map(user => {
                            return (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-main">
                                        <button onClick={() => onSelectUser(user.id)} className="hover:text-accent hover:underline">
                                            {user.name}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                                        <select
                                            value={user.role}
                                            onChange={e => handleRoleChange(user.id, e.target.value as Role)}
                                            className="bg-primary border border-border rounded-md py-1 px-2 focus:ring-accent focus:border-accent text-text-main"
                                            disabled={user.id === currentUser?.id}
                                        >
                                            <option value="User">User</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                                        <select
                                            value={user.teamId || ''}
                                            onChange={e => handleTeamChange(user.id, e.target.value)}
                                            className="bg-primary border border-border rounded-md py-1 px-2 focus:ring-accent focus:border-accent text-text-main"
                                            disabled={user.role === 'Admin'}
                                        >
                                            <option value="">Unassigned</option>
                                            {teams.map(team => (
                                                <option key={team.id} value={team.id}>{team.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;