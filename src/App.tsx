import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import ItemsScreen from './components/ItemsScreen';
import CustomersScreen from './components/CustomersScreen';
import ProfileScreen from './components/ProfileScreen';
import ReportsScreen from './components/ReportsScreen';
import Sidebar from './components/Sidebar';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'items':
        return <ItemsScreen />;
      case 'customers':
        return <CustomersScreen />;
      case 'reports':
        return <ReportsScreen />;
      case 'profile':
        return <ProfileScreen onLogout={handleLogout} />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {renderActiveScreen()}
      </div>
    </div>
  );
}