
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Modal from './Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface HeaderProps {
    currentView: 'catalog' | 'management' | 'settings';
    setCurrentView: (view: 'catalog' | 'management' | 'settings') => void;
    onViewProfile: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, onViewProfile }) => {
    const { currentUser, logout } = useAuth();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    return (
        <header className="bg-secondary border-b border-border sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-8">
                    <h1 className="text-xl font-bold text-text-main">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2 text-accent" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                        Service Mesh Catalog
                    </h1>
                    {currentUser && (
                         <div className="flex items-center space-x-4">
                            <button onClick={() => setCurrentView('catalog')} className={`px-3 py-1 text-sm rounded-md ${currentView === 'catalog' ? 'bg-accent text-white font-semibold' : 'text-muted hover:text-text-main'}`}>Catalog</button>
                            {currentUser.role === 'Admin' && (
                                <button onClick={() => setCurrentView('management')} className={`px-3 py-1 text-sm rounded-md ${currentView === 'management' ? 'bg-accent text-white font-semibold' : 'text-muted hover:text-text-main'}`}>Management</button>
                            )}
                            <button onClick={() => setCurrentView('settings')} className={`px-3 py-1 text-sm rounded-md ${currentView === 'settings' ? 'bg-accent text-white font-semibold' : 'text-muted hover:text-text-main'}`}>Settings</button>
                         </div>
                    )}
                </div>
                <div className="flex items-center space-x-4">
                    {currentUser ? (
                        <>
                            <span className="text-muted">Welcome, 
                                <button onClick={onViewProfile} className="font-semibold text-text-main hover:text-accent hover:underline transition-colors ml-1">
                                    {currentUser.name}
                                </button>
                            </span>
                            <button onClick={logout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setIsLoginOpen(true)} className="text-muted hover:text-accent font-semibold text-sm transition-colors">
                                Log In
                            </button>
                            <button onClick={() => setIsRegisterOpen(true)} className="bg-accent hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors">
                                Register
                            </button>
                        </>
                    )}
                </div>
            </nav>
            <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} title="Log In">
                <LoginForm onSuccess={() => setIsLoginOpen(false)} onSwitchToRegister={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }} />
            </Modal>
            <Modal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} title="Register">
                <RegisterForm onSuccess={() => setIsRegisterOpen(false)} onSwitchToLogin={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }} />
            </Modal>
        </header>
    );
};

export default Header;