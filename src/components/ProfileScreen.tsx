import { 
  User, 
  FileText, 
  History, 
  Settings, 
  LogOut, 
  Bell, 
  Shield, 
  HelpCircle,
  ChevronRight 
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

interface ProfileScreenProps {
  onLogout: () => void;
}

export default function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const menuItems = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: 'Laporan Kiriman',
      subtitle: 'Filter berdasarkan tanggal',
      action: () => console.log('Laporan kiriman')
    },
    {
      icon: <History className="w-5 h-5" />,
      title: 'Riwayat Aktivitas',
      subtitle: 'Lihat semua aktivitas',
      action: () => console.log('Riwayat aktivitas')
    },
    {
      icon: <Bell className="w-5 h-5" />,
      title: 'Notifikasi',
      subtitle: 'Atur preferensi notifikasi',
      action: () => console.log('Pengaturan notifikasi')
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Keamanan',
      subtitle: 'Ubah password & keamanan',
      action: () => console.log('Pengaturan keamanan')
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: 'Pengaturan Umum',
      subtitle: 'Preferensi aplikasi',
      action: () => console.log('Pengaturan umum')
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: 'Bantuan & Dukungan',
      subtitle: 'FAQ dan kontak support',
      action: () => console.log('Bantuan')
    }
  ];

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Profil & Pengaturan
        </h1>
        <p className="text-gray-600 mt-1">Kelola akun dan preferensi sistem Anda</p>
      </div>

      {/* Profile Header */}
      <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full -translate-y-16 translate-x-16 opacity-20" />
        <div className="relative flex items-center gap-4">
          <Avatar className="w-20 h-20 ring-4 ring-indigo-100">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl">
              AS
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">Admin System</h2>
            <p className="text-gray-600">admin@cargotrack.com</p>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium">
                ID: ADM-001
              </span>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                Administrator
              </span>
            </p>
          </div>
          <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-600 p-3 rounded-xl transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </Card>

      {/* Quick Stats */}
      <Card className="p-4 rounded-xl border-0 shadow-sm bg-white">
        <h3 className="font-semibold text-foreground mb-3">Statistik Saya</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xl font-semibold text-primary">156</p>
            <p className="text-xs text-muted-foreground">Transaksi</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-accent">89%</p>
            <p className="text-xs text-muted-foreground">Efisiensi</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-foreground">24</p>
            <p className="text-xs text-muted-foreground">Hari Aktif</p>
          </div>
        </div>
      </Card>

      {/* Menu Items */}
      <Card className="rounded-xl border-0 shadow-sm bg-white overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-foreground">Menu Utama</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="text-primary">
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </Card>

      {/* App Info */}
      <Card className="p-4 rounded-xl border-0 shadow-sm bg-white">
        <h3 className="font-semibold text-foreground mb-3">Informasi Aplikasi</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Versi</span>
            <span className="text-foreground">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Build</span>
            <span className="text-foreground">2024.01.15</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Environment</span>
            <span className="text-foreground">Production</span>
          </div>
        </div>
      </Card>

      {/* Logout Button */}
      <Button 
        onClick={onLogout}
        variant="outline" 
        className="w-full py-6 rounded-lg border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Keluar dari Aplikasi
      </Button>
    </div>
  );
}