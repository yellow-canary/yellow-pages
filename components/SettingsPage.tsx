
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../context/DataContext';
import { useTheme } from '../hooks/useTheme';

const SettingsPage: React.FC = () => {
  const { currentUser, updateCurrentUserProfile } = useAuth();
  const { teams } = useData();
  const { theme, toggleTheme } = useTheme();

  const [name, setName] = useState('');
  const [teamId, setTeamId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setTeamId(currentUser.teamId || '');
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!currentUser) {
      setError('You must be logged in to update your profile.');
      return;
    }

    if (!name.trim()) {
        setError('Username cannot be empty.');
        return;
    }
    
    if (currentUser.role === 'User' && !teamId) {
        setError('You must select a team.');
        return;
    }

    const result = updateCurrentUserProfile({
      name: name.trim(),
      teamId: currentUser.role === 'Admin' ? undefined : teamId,
    });

    if (result.success) {
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setError(result.error || 'Failed to update profile.');
    }
  };

  if (!currentUser) {
    return (
      <div className="text-center p-8 bg-secondary rounded-lg border border-border">
        <h2 className="text-2xl font-bold text-text-main">Please log in</h2>
        <p className="text-muted mt-2">You need to be logged in to view settings.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-secondary p-8 rounded-lg border border-border">
        <h1 className="text-3xl font-bold text-text-main mb-6">Settings</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="settings-name" className="block text-sm font-medium text-muted mb-1">Username</label>
            <input
              id="settings-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-primary border border-border rounded-md py-2 px-3 focus:ring-accent focus:border-accent"
              required
            />
          </div>
          <div>
            <label htmlFor="settings-team" className="block text-sm font-medium text-muted mb-1">Team</label>
            <select
              id="settings-team"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              className="w-full bg-primary border border-border rounded-md py-2 px-3 focus:ring-accent focus:border-accent disabled:opacity-50 disabled:cursor-not-allowed"
              required={currentUser.role !== 'Admin'}
              disabled={currentUser.role === 'Admin'}
            >
              <option value="" disabled={currentUser.role !== 'Admin'}>
                {currentUser.role === 'Admin' ? 'Admins are not in a team' : 'Select a team'}
              </option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
          </div>
          <div className="pt-2 flex justify-end items-center">
             {error && <p className="text-red-500 text-sm mr-4">{error}</p>}
             {successMessage && <p className="text-green-400 text-sm mr-4">{successMessage}</p>}
            <button type="submit" className="bg-accent hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
              Save Changes
            </button>
          </div>
        </form>

        <div className="pt-6 border-t border-border mt-6">
          <h2 className="text-lg font-semibold text-text-main mb-4">Appearance</h2>
          <div className="flex justify-between items-center bg-primary p-4 rounded-lg">
            <span className="text-sm font-medium text-muted">
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-secondary ${
                theme === 'dark' ? 'bg-accent' : 'bg-gray-400'
              }`}
              role="switch"
              aria-checked={theme === 'dark'}
            >
              <span className="sr-only">Toggle theme</span>
              <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;