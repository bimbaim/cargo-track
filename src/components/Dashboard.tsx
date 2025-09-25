import { useState } from 'react';
import { Search, Package, TrendingUp, AlertTriangle, Clock, Truck, DollarSign, Users, BarChart3 } from 'lucide-react';
import InteractiveStatsCard from './InteractiveStatsCard';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { motion } from 'framer-motion'; 
import AddItemForm from './AddItemForm';
import AddCustomerForm from './AddCustomerForm'; // <--- TAMBAHAN: Import AddCustomerForm

export default function Dashboard() {
  const [isAddItemFormOpen, setIsAddItemFormOpen] = useState(false);
  const [isAddCustomerFormOpen, setIsAddCustomerFormOpen] = useState(false); // <--- TAMBAHAN: State untuk form pelanggan

  const stats = [
    {
      title: 'Total Barang Aktif',
      value: '1,248',
      subtitle: 'Items',
      icon: <Package className="w-6 h-6" />,
      trend: 'up' as const,
      trendValue: '+12%',
      color: 'blue' as const
    },
    {
      title: 'Barang Masuk Hari Ini',
      value: '47',
      subtitle: 'New Items',
      icon: <TrendingUp className="w-6 h-6" />,
      trend: 'up' as const,
      trendValue: '+8',
      color: 'green' as const
    },
    {
      title: 'Total Pelanggan',
      value: '156',
      subtitle: 'Customers',
      icon: <Users className="w-6 h-6" />,
      trend: 'up' as const,
      trendValue: '+5',
      color: 'purple' as const
    },
    {
      title: 'Pendapatan Bulan Ini',
      value: 'Rp 45.2M',
      subtitle: 'Revenue',
      icon: <DollarSign className="w-6 h-6" />,
      trend: 'up' as const,
      trendValue: '+18%',
      color: 'indigo' as const
    },
    {
      title: 'Pengiriman Aktif',
      value: '89',
      subtitle: 'In Transit',
      icon: <Truck className="w-6 h-6" />,
      trend: 'up' as const,
      trendValue: '+3',
      color: 'orange' as const
    },
    {
      title: 'Perlu Tindakan',
      value: '23',
      subtitle: 'Action Required',
      icon: <AlertTriangle className="w-6 h-6" />,
      trend: 'down' as const,
      trendValue: '-5',
      color: 'red' as const
    }
  ];

  const notifications = [
    { type: 'urgent', message: '5 kontainer akan tiba dalam 2 jam' },
    { type: 'info', message: 'Laporan mingguan siap diunduh' },
    { type: 'warning', message: '12 item mendekati tanggal kedaluwarsa' }
  ];

  const handleAddItemSubmit = (item: any) => {
    console.log('Barang baru ditambahkan:', item);
    // Logika untuk menyimpan data barang
  };
  
  // <--- TAMBAHAN: Dummy function untuk Submit Pelanggan
  const handleAddCustomerSubmit = (customer: any) => {
    console.log('Pelanggan baru ditambahkan:', customer);
    // Logika untuk menyimpan data pelanggan
  };

  return (
    <div className="p-6 space-y-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard Overview
              </h1>
              <p className="text-gray-600 mt-1">Selamat datang kembali! Berikut ringkasan sistem hari ini.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        
        {/* Quick Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input 
            placeholder="Cari kode barang, pelanggan, atau invoice..."
            className="pl-12 py-4 rounded-lg bg-white border-slate-200 shadow-sm text-base focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, staggerChildren: 0.1 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <InteractiveStatsCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full -translate-y-16 translate-x-16 opacity-20" />
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              Notifikasi Penting
            </h3>
            <div className="space-y-4">
              {notifications.map((notif, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  whileHover={{ x: 4 }}
                >
                  <Badge 
                    className={`rounded-full px-2 py-1 ${
                      notif.type === 'urgent' ? 'bg-red-100 text-red-700' : 
                      notif.type === 'warning' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {notif.type === 'urgent' ? '🚨' : notif.type === 'warning' ? '⚠️' : 'ℹ️'}
                  </Badge>
                  <p className="text-sm text-gray-700 flex-1 font-medium">{notif.message}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full -translate-y-16 -translate-x-16 opacity-20" />
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              Aksi Cepat
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {/* Input Barang Baru */}
              <motion.button 
                onClick={() => setIsAddItemFormOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl flex items-center justify-center gap-3 hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Package className="w-5 h-5" />
                <span className="font-medium">Input Barang Baru</span>
              </motion.button>
              
              {/* Lihat Laporan Lengkap */}
              <motion.button 
                className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl flex items-center justify-center gap-3 hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <BarChart3 className="w-5 h-5" />
                <span className="font-medium">Lihat Laporan Lengkap</span>
              </motion.button>
              
              {/* Tambah Pelanggan */}
              <motion.button 
                onClick={() => setIsAddCustomerFormOpen(true)} // <--- TAMBAHAN: onClick untuk membuka form pelanggan
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl flex items-center justify-center gap-3 hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Users className="w-5 h-5" />
                <span className="font-medium">Tambah Pelanggan</span>
              </motion.button>
            </div>
          </Card>
        </motion.div>
      </div>
      
      {/* Komponen AddItemForm */}
      <AddItemForm
        open={isAddItemFormOpen}
        onClose={() => setIsAddItemFormOpen(false)}
        onSubmit={handleAddItemSubmit}
        editData={null} 
      />
      
      {/* <--- TAMBAHAN: Komponen AddCustomerForm */}
      <AddCustomerForm
        open={isAddCustomerFormOpen}
        onClose={() => setIsAddCustomerFormOpen(false)}
        onSubmit={handleAddCustomerSubmit}
        editData={null}
      />
      
    </div>
  );
}