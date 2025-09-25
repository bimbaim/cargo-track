import { BarChart3, TrendingUp, Download, Filter, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { motion } from 'motion/react';

export default function ReportsScreen() {
  const reports = [
    {
      title: 'Laporan Pengiriman Bulanan',
      description: 'Detail pengiriman dan status barang bulan ini',
      value: '1,248',
      subtitle: 'Total pengiriman',
      color: 'from-blue-500 to-cyan-500',
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      title: 'Analisis Performa Gudang',
      description: 'Efisiensi operasional dan tingkat kepuasan',
      value: '94.5%',
      subtitle: 'Tingkat efisiensi',
      color: 'from-green-500 to-emerald-500',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: 'Laporan Keuangan',
      description: 'Pendapatan dan biaya operasional',
      value: 'Rp 45.2M',
      subtitle: 'Revenue bulan ini',
      color: 'from-purple-500 to-pink-500',
      icon: <Download className="w-6 h-6" />
    }
  ];

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Header */}
      <motion.div 
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Laporan & Analisis
            </h1>
            <p className="text-gray-600 mt-1">Pantau performa dan analisis bisnis Anda</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="rounded-xl">
              <Calendar className="w-4 h-4 mr-2" />
              Periode
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {reports.map((report, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white overflow-hidden relative cursor-pointer hover:shadow-xl transition-all duration-300">
              <div className={`absolute inset-0 bg-gradient-to-br ${report.color} opacity-5`} />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`bg-gradient-to-br ${report.color} p-3 rounded-xl text-white`}>
                    {report.icon}
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
                
                <h3 className="font-bold text-gray-800 mb-2">{report.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-800">{report.value}</span>
                  <span className="text-sm text-gray-500">{report.subtitle}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white">
          <h3 className="font-bold text-gray-800 mb-4">Statistik Cepat</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-sm text-gray-600">Total Pelanggan</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">1,248</div>
              <div className="text-sm text-gray-600">Barang Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">89</div>
              <div className="text-sm text-gray-600">Pengiriman Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">94.5%</div>
              <div className="text-sm text-gray-600">Tingkat Kepuasan</div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}