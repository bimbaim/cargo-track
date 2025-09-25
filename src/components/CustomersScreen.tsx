import { useState, useMemo } from 'react'; // Import useMemo
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import FilterBar from './FilterBar';
import type { FilterState } from './FilterBar';
import CustomerCard from './CustomerCard';
import AddCustomerForm from './AddCustomerForm';
import ConfirmDialog from './ConfirmDialog';
import CustomerDetailPopup from './CustomerDetailPopup';

interface Customer {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive' | 'pending';
  type: 'regular' | 'premium' | 'vip' | 'enterprise';
  totalOrders: number;
  lastOrder: string;
  joinDate: string;
  notes: string;
}

// Definisikan komponen Pagination
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const SimplePagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center space-x-2 p-4 bg-white rounded-lg shadow-sm border border-purple-100">
      {/* Tombol Sebelumnya */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border rounded-full text-purple-600 hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Tampilan Nomor Halaman */}
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
            number === currentPage
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-purple-600 hover:bg-purple-100'
          }`}
        >
          {number}
        </button>
      ))}

      {/* Tombol Selanjutnya */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border rounded-full text-purple-600 hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Halaman selanjutnya"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};


export default function CustomersScreen() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [deleteCustomer, setDeleteCustomer] = useState<Customer | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  
  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4; // Menampilkan 4 card per halaman

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: '',
    type: '',
    dateFrom: null,
    dateTo: null
  });

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: 'Budi Santoso',
      company: 'PT Tech Indo Makmur',
      email: 'budi@techindo.com',
      phone: '+62 812-3456-7890',
      address: 'Jl. Sudirman No. 123, Jakarta Pusat',
      status: 'active',
      type: 'premium',
      totalOrders: 45,
      lastOrder: '15 Jan 2024',
      joinDate: '10 Mar 2023',
      notes: 'Pelanggan prioritas'
    },
    {
      id: 2,
      name: 'Siti Nurhaliza',
      company: 'CV Motor Sejahtera',
      email: 'siti@motorsejahtera.co.id',
      phone: '+62 813-2468-1357',
      address: 'Jl. Ahmad Yani No. 456, Surabaya',
      status: 'active',
      type: 'regular',
      totalOrders: 32,
      lastOrder: '14 Jan 2024',
      joinDate: '15 Jun 2023',
      notes: ''
    },
    {
      id: 3,
      name: 'Ahmad Rahman',
      company: 'Toko Kain Makmur',
      email: 'ahmad@kainmakmur.com',
      phone: '+62 814-9876-5432',
      address: 'Jl. Malioboro No. 789, Yogyakarta',
      status: 'pending',
      type: 'regular',
      totalOrders: 18,
      lastOrder: '12 Jan 2024',
      joinDate: '20 Aug 2023',
      notes: 'Menunggu verifikasi dokumen'
    },
    {
      id: 4,
      name: 'Dewi Kartika',
      company: 'PT Food Global Indonesia',
      email: 'dewi@foodglobal.id',
      phone: '+62 815-1111-2222',
      address: 'Jl. Gatot Subroto No. 321, Jakarta Selatan',
      status: 'active',
      type: 'vip',
      totalOrders: 67,
      lastOrder: '16 Jan 2024',
      joinDate: '05 Jan 2023',
      notes: 'Pelanggan VIP dengan volume tinggi'
    },
    {
      id: 5,
      name: 'Rizki Pratama',
      company: 'Toko Elektronik Barokah',
      email: 'rizki@elektronikbarokah.com',
      phone: '+62 816-3333-4444',
      address: 'Jl. Pahlawan No. 654, Medan',
      status: 'inactive',
      type: 'regular',
      totalOrders: 23,
      lastOrder: '08 Jan 2024',
      joinDate: '12 Sep 2023',
      notes: 'Tidak aktif sejak 3 bulan terakhir'
    },
    {
      id: 6,
      name: 'Maya Sari',
      company: 'Beauty Store Cantik',
      email: 'maya@beautycantik.co.id',
      phone: '+62 817-5555-6666',
      address: 'Jl. Dipati Ukur No. 987, Bandung',
      status: 'active',
      type: 'premium',
      totalOrders: 41,
      lastOrder: '15 Jan 2024',
      joinDate: '28 Apr 2023',
      notes: 'Fokus pada produk kosmetik'
    },
    {
      id: 7,
      name: 'Joko Susilo',
      company: 'PT Karya Sentosa',
      email: 'joko@karyasentosa.com',
      phone: '+62 818-7777-8888',
      address: 'Jl. Merdeka No. 1, Semarang',
      status: 'active',
      type: 'enterprise',
      totalOrders: 90,
      lastOrder: '10 Jan 2024',
      joinDate: '01 Jan 2023',
      notes: 'Kontrak tahunan'
    }
  ]);

  // Fungsi untuk mengubah halaman
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Filter Items (Dibuat dalam useMemo agar efisien)
  const filteredCustomers = useMemo(() => {
    const filtered = customers.filter(customer => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (
          !customer.name.toLowerCase().includes(searchLower) &&
          !customer.company.toLowerCase().includes(searchLower) &&
          !customer.email.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Status filter
      if (filters.status && filters.status !== 'none' && customer.status !== filters.status) {
        return false;
      }

      // Type filter
      if (filters.type && filters.type !== 'none' && customer.type !== filters.type) {
        return false;
      }

      return true;
    });

    return filtered;
  }, [customers, filters]);


  const handleAddCustomer = (newCustomer: Customer) => {
    setCustomers([...customers, { ...newCustomer, id: Date.now() }]);
    setCurrentPage(1); // Kembali ke halaman 1 saat item baru ditambahkan
  };

  const handleEditCustomer = (updatedCustomer: Customer) => {
    setCustomers(customers.map(c => (c.id === updatedCustomer.id ? updatedCustomer : c)));
    setEditCustomer(null);
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    // Memastikan status dan type diatur ke 'none' jika kosong, untuk konsistensi FilterState
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      status: newFilters.status || 'none',
      type: newFilters.type || 'none'
    }));
    setCurrentPage(1); // Reset halaman saat filter berubah
  };

  // LOGIC PAGINATION UTAMA
  const totalItems = filteredCustomers.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // LOGIC PENYESUAIAN HALAMAN SETELAH FILTER
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  } else if (totalPages === 0 && currentPage !== 1) {
    setCurrentPage(1);
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Item yang ditampilkan di halaman saat ini
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  // LOGIC PENGHAPUSAN dengan penyesuaian halaman
  const handleDeleteCustomer = () => {
    if (deleteCustomer) {
      const newCustomers = customers.filter(c => c.id !== deleteCustomer.id);
      setCustomers(newCustomers);
      setDeleteCustomer(null);
      setShowDeleteConfirm(false);
      
      // Hitung ulang halaman setelah penghapusan
      const newTotalItems = newCustomers.filter(c => {
        // Logika filter singkat untuk item yang tersisa
        if (filters.search && !c.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (filters.status && filters.status !== 'none' && c.status !== filters.status) return false;
        if (filters.type && filters.type !== 'none' && c.type !== filters.type) return false;
        return true;
      }).length;
      
      const newTotalPages = Math.ceil(newTotalItems / ITEMS_PER_PAGE);
      if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
      }
      // Jika newTotalPages adalah 0, currentPage akan tetap 1 (atau sudah di handle di atas)
    }
  };


  const handleEdit = (customer: Customer) => {
    setEditCustomer(customer);
    setShowAddForm(true);
  };

  const handleDelete = (customer: Customer) => {
    setDeleteCustomer(customer);
    setShowDeleteConfirm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditCustomer(null);
  };

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetailPopup(true);
  };

  const handleDetailEdit = () => {
    if (selectedCustomer) {
      setEditCustomer(selectedCustomer);
      setShowDetailPopup(false);
      setShowAddForm(true);
    }
  };

  const handleDetailDelete = () => {
    if (selectedCustomer) {
      setDeleteCustomer(selectedCustomer);
      setShowDetailPopup(false);
      setShowDeleteConfirm(true);
    }
  };

  const statusOptions = [
    { value: 'active', label: 'Aktif' },
    { value: 'inactive', label: 'Tidak Aktif' },
    { value: 'pending', label: 'Menunggu' }
  ];

  const typeOptions = [
    { value: 'regular', label: 'Regular' },
    { value: 'premium', label: 'Premium' },
    { value: 'vip', label: 'VIP' },
    { value: 'enterprise', label: 'Enterprise' }
  ];

  return (
    // Gunakan h-screen dan flex-col untuk layout penuh tanpa scroll utama
    <div className="flex flex-col h-screen p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      
      {/* Header (fixed content) */}
      <div className="space-y-6 flex-shrink-0 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Data Pelanggan
              </h1>
              <p className="text-purple-600 mt-1">
                <span className="font-semibold text-purple-800">{totalItems}</span> dari {customers.length} pelanggan ditemukan. Menampilkan {currentCustomers.length} item di halaman {currentPage}.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Bar (fixed content) */}
        <FilterBar
          onFilterChange={handleFilterChange}
          filterOptions={{
            statuses: statusOptions,
            types: typeOptions,
            showDateFilter: true,
            showSearchFilter: true
          }}
          searchPlaceholder="Cari nama, perusahaan, atau email..."
        />
      </div> {/* Akhir Header/Filter Wrapper */}

      {/* Customer List (Scrollable Area) */}
      {/* Menggunakan flex-1 dan overflow-y-auto untuk memungkinkan scroll hanya pada daftar item jika tinggi konten melebihi sisa ruang layar */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
        {/* Render item yang sudah di-slice */}
        {currentCustomers.map(customer => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CustomerCard
              {...customer}
              onClick={() => handleCustomerClick(customer)}
              onEdit={() => handleEdit(customer)}
              onDelete={() => handleDelete(customer)}
            />
          </motion.div>
        ))}

        {/* Empty State */}
        {totalItems === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-purple-200">
            <p className="text-purple-600">Tidak ada pelanggan yang ditemukan</p>
            <p className="text-sm text-purple-400 mt-1">Coba ubah kata kunci pencarian atau filter</p>
          </div>
        )}
      </div> {/* Akhir Customer List */}
      
      {/* Pagination (fixed content di bawah) */}
      <div className="flex-shrink-0 mt-4">
        <SimplePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setShowAddForm(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Tambah pelanggan baru"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Add/Edit Form */}
      <AddCustomerForm
        open={showAddForm}
        onClose={handleCloseForm}
        onSubmit={editCustomer ? handleEditCustomer : handleAddCustomer}
        editData={editCustomer}
      />

      {/* Customer Detail Popup */}
      <CustomerDetailPopup
        open={showDetailPopup}
        onClose={() => setShowDetailPopup(false)}
        customer={selectedCustomer}
        onEdit={handleDetailEdit}
        onDelete={handleDetailDelete}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteCustomer}
        title="Hapus Pelanggan"
        description={
          deleteCustomer
            ? `Apakah Anda yakin ingin menghapus pelanggan "${deleteCustomer.name}" dari ${deleteCustomer.company}? Tindakan ini tidak dapat dibatalkan.`
            : ''
        }
        confirmText="Hapus"
        cancelText="Batal"
        type="danger"
      />
    </div>
  );
}