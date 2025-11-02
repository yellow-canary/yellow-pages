
import React, { useState } from 'react';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import ServiceList from './components/ServiceList';
import ManagementDashboard from './components/ManagementDashboard';
import { useAuth } from './hooks/useAuth';
import ServiceDetail from './components/ServiceDetail';
import TeamDetail from './components/TeamDetail';
import UserDetail from './components/UserDetail';
import SettingsPage from './components/SettingsPage';
import { ThemeProvider } from './context/ThemeContext';

type View = 'catalog' | 'management' | 'settings';
type ViewState = 
  | { name: 'catalog' }
  | { name: 'management' }
  | { name: 'settings' }
  | { name: 'serviceDetail', serviceId: string }
  | { name: 'teamDetail', teamId: string }
  | { name: 'userDetail', userId: string };

const MainContent: React.FC = () => {
    const { currentUser } = useAuth();
    const [history, setHistory] = useState<ViewState[]>([{ name: 'catalog' }]);
    
    const currentView = history[history.length - 1];
    
    const navigate = (view: ViewState) => setHistory(prev => [...prev, view]);
    const goBack = () => setHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
    
    const setRootView = (viewName: View) => {
      setHistory([{ name: viewName }]);
    }

    const handleViewProfile = () => {
        if (currentUser) {
            navigate({ name: 'userDetail', userId: currentUser.id });
        }
    };

    const renderContent = () => {
        switch (currentView.name) {
            case 'catalog':
                return <ServiceList onSelectService={(id) => navigate({ name: 'serviceDetail', serviceId: id })} onSelectTeam={(id) => navigate({ name: 'teamDetail', teamId: id })} onSelectUser={(id) => navigate({ name: 'userDetail', userId: id })} />;
            case 'serviceDetail':
                return <ServiceDetail serviceId={currentView.serviceId} onBack={goBack} onSelectTeam={(id) => navigate({ name: 'teamDetail', teamId: id })} onSelectUser={(id) => navigate({ name: 'userDetail', userId: id })} />;
            case 'teamDetail':
                return <TeamDetail teamId={currentView.teamId} onBack={goBack} onSelectService={(id) => navigate({ name: 'serviceDetail', serviceId: id })} onSelectUser={(id) => navigate({ name: 'userDetail', userId: id })} />;
            case 'userDetail':
                return <UserDetail userId={currentView.userId} onBack={goBack} onSelectService={(id) => navigate({ name: 'serviceDetail', serviceId: id })} onSelectTeam={(id) => navigate({ name: 'teamDetail', teamId: id })} />;
            case 'management':
                // If a non-admin tries to access management, show the catalog instead.
                return currentUser?.role === 'Admin' ? <ManagementDashboard onSelectTeam={(id) => navigate({ name: 'teamDetail', teamId: id })} onSelectUser={(id) => navigate({ name: 'userDetail', userId: id })} /> : <ServiceList onSelectService={(id) => navigate({ name: 'serviceDetail', serviceId: id })} onSelectTeam={(id) => navigate({ name: 'teamDetail', teamId: id })} onSelectUser={(id) => navigate({ name: 'userDetail', userId: id })} />;
            case 'settings':
                return <SettingsPage />;
            default:
                 return <ServiceList onSelectService={(id) => navigate({ name: 'serviceDetail', serviceId: id })} onSelectTeam={(id) => navigate({ name: 'teamDetail', teamId: id })} onSelectUser={(id) => navigate({ name: 'userDetail', userId: id })} />;
        }
    }

    // Determine active tab for header by looking for a root view in the history
    // FIX: The type of `activeHeaderTab` was not being correctly inferred because TypeScript 
    // doesn't narrow the type of `v.name` from the predicate in `find`.
    // This fix introduces an explicit check on the `name` property to ensure the correct type is assigned.
    const activeHeaderTabName = history.find(v => v.name === 'management' || v.name === 'catalog' || v.name === 'settings')?.name;
    const activeHeaderTab: View =
      activeHeaderTabName === 'catalog' || activeHeaderTabName === 'management' || activeHeaderTabName === 'settings'
        ? activeHeaderTabName
        : 'catalog';

    return (
        <div className="min-h-screen bg-primary">
            <Header 
              currentView={activeHeaderTab}
              setCurrentView={setRootView}
              onViewProfile={handleViewProfile}
            />
            <main className="container mx-auto px-4 py-8">
                {renderContent()}
            </main>
        </div>
    );
};


const App: React.FC = () => {
  return (
    <ThemeProvider>
      <DataProvider>
        <AuthProvider>
            <MainContent />
        </AuthProvider>
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;