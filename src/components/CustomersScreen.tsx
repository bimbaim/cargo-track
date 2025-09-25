import { useState } from 'react';
import { Plus } from 'lucide-react';
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

export default function CustomersScreen() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [deleteCustomer, setDeleteCustomer] = useState<Customer | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
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
    }
  ]);

  const handleAddCustomer = (newCustomer: Customer) => {
    setCustomers([...customers, { ...newCustomer, id: Date.now() }]);
  };

  const handleEditCustomer = (updatedCustomer: Customer) => {
    setCustomers(customers.map(c => (c.id === updatedCustomer.id ? updatedCustomer : c)));
    setEditCustomer(null);
  };

  const handleDeleteCustomer = () => {
    if (deleteCustomer) {
      setCustomers(customers.filter(c => c.id !== deleteCustomer.id));
      setDeleteCustomer(null);
      setShowDeleteConfirm(false);
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

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const filteredCustomers = customers.filter(customer => {
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
    if (filters.status && customer.status !== filters.status) {
      return false;
    }

    // Type filter
    if (filters.type && customer.type !== filters.type) {
      return false;
    }

    return true;
  });

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
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Data Pelanggan
            </h1>
            <p className="text-purple-600 mt-1">
              <span className="font-semibold text-purple-800">{filteredCustomers.length}</span> dari {customers.length} pelanggan ditampilkan
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
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

      {/* Customer List */}
      <div className="space-y-3">
        {filteredCustomers.map(customer => (
          <CustomerCard
            key={customer.id}
            {...customer}
            onClick={() => handleCustomerClick(customer)}
            onEdit={() => handleEdit(customer)}
            onDelete={() => handleDelete(customer)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-purple-200">
          <p className="text-purple-600">Tidak ada pelanggan yang ditemukan</p>
          <p className="text-sm text-purple-400 mt-1">Coba ubah kata kunci pencarian atau filter</p>
        </div>
      )}

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
