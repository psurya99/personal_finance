import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Sidebar, View } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { ExpensesView } from './components/expenses/ExpensesView';
import { AdvisorView } from './components/advisor/AdvisorView';
import { SettingsView } from './components/settings/SettingsView';
import { CurrencyProvider } from './context/CurrencyContext';
import { UserProvider } from './context/UserContext';
import { RegistrationModal } from './components/auth/RegistrationModal';

function App() {
    const [currentView, setCurrentView] = useState<View>('dashboard');

    const renderView = () => {
        switch (currentView) {
            case 'dashboard':
                return <DashboardView />;
            case 'expenses':
                return <ExpensesView />;
            case 'advisor':
                return <AdvisorView />;
            case 'settings':
                return <SettingsView />;
            default:
                return <DashboardView />;
        }
    };

    return (
        <CurrencyProvider>
            <UserProvider>
                <RegistrationModal />
                <Layout currentView={currentView} onViewChange={setCurrentView}>
                    {renderView()}
                </Layout>
            </UserProvider>
        </CurrencyProvider>
    );
}

export default App;
