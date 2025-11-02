
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../context/DataContext';

interface RegisterFormProps {
    onSuccess: () => void;
    onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [teamId, setTeamId] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const { teams } = useData();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!register(name, teamId)) {
            setError('A user with this name already exists.');
        } else {
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
                <label htmlFor="register-name" className="block text-sm font-medium text-muted mb-1">Username</label>
                <input
                    id="register-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-primary border border-border rounded-md py-2 px-3 focus:ring-accent focus:border-accent"
                    required
                />
            </div>
            <div>
                <label htmlFor="register-team" className="block text-sm font-medium text-muted mb-1">Team</label>
                <select
                    id="register-team"
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
            <button type="submit" className="w-full bg-accent hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
                Register
            </button>
             <p className="text-center text-sm text-muted">
                Already have an account?{' '}
                <button type="button" onClick={onSwitchToLogin} className="font-semibold text-accent hover:underline">
                    Log in here
                </button>
            </p>
        </form>
    );
};

export default RegisterForm;