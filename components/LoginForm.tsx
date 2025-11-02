
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface LoginFormProps {
    onSuccess: () => void;
    onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!login(name)) {
            setError('User not found. Please check the name or register.');
        } else {
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
                <label htmlFor="login-name" className="block text-sm font-medium text-muted mb-1">Username</label>
                <input
                    id="login-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-primary border border-border rounded-md py-2 px-3 focus:ring-accent focus:border-accent"
                    required
                />
            </div>
            <button type="submit" className="w-full bg-accent hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
                Log In
            </button>
            <p className="text-center text-sm text-muted">
                Don't have an account?{' '}
                <button type="button" onClick={onSwitchToRegister} className="font-semibold text-accent hover:underline">
                    Register here
                </button>
            </p>
        </form>
    );
};

export default LoginForm;
