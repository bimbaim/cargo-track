import { 
  Home, 
  Package, 
  Users, 
  User, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ activeTab, onTabChange, onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      activeColor: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    {
      id: 'items',
      label: 'Manajemen Barang',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      activeColor: 'bg-gradient-to-r from-purple-500 to-purple-600'
    },
    {
      id: 'customers',
      label: 'Data Pelanggan',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      activeColor: 'bg-gradient-to-r from-green-500 to-green-600'
    },
    {
      id: 'reports',
      label: 'Laporan',
      icon: BarChart3,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      activeColor: 'bg-gradient-to-r from-red-600 to-red-700'
    },
    {
      id: 'profile',
      label: 'Profil & Pengaturan',
      icon: User,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      activeColor: 'bg-gradient-to-r from-indigo-600 to-indigo-700'
    }
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg border"
      >
        {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 
        ${isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
        ${isCollapsed ? 'lg:w-16' : 'w-64'}
        bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
        flex flex-col shadow-lg lg:shadow-none
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {/* Mengubah warna latar belakang dan bentuk sesuai referensi */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
              <Package className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                {/* Mengubah warna teks sesuai referensi */}
                <h1 className="font-bold text-xl text-gray-800">CargoTrack</h1>
                <p className="text-sm text-gray-500">Logistics Management</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? `${item.activeColor} text-white shadow-lg` 
                    : `hover:${item.bgColor} ${item.color} hover:shadow-md`
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : item.color}`} />
                {!isCollapsed && (
                  <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-700'}`}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <Button
            onClick={onLogout}
            variant="outline"
            className={`
              w-full ${isCollapsed ? 'px-2' : 'justify-start'} 
              border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300
            `}
          >
            <LogOut className="w-4 h-4" />
            {!isCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
}