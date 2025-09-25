import { useState, useMemo } from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import ItemCard from './ItemCard';
import AddItemForm from './AddItemForm';
// PERBAIKAN: Import ConfirmDialog dari file yang benar
import ConfirmDialog from './ConfirmDialog'; 
import ItemDetailPopup from './ItemDetailPopup';
import FilterBar, { type FilterState } from './FilterBar';
import { motion } from 'motion/react';

// Definisikan tipe item
export interface Item {
  id: number;
  code: string;
  name: string;
  status: 'in_warehouse' | 'in_container' | 'delayed' | 'shipped';
  customer: string;
  date: string;
  quantity: number;
  weight: string;
  destination: string;
  description: string;
}

// Definisikan komponen Pagination sederhana
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Component Pagination sederhana untuk ditampilkan di bawah daftar item
const SimplePagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Jika hanya ada 1 halaman, jangan tampilkan pagination
  if (totalPages <= 1) return null;

  // Buat array halaman [1, 2, 3, ...]
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


export default function ItemsScreen() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [deleteItem, setDeleteItem] = useState<Item | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  
  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Diatur menjadi 4 item per halaman sesuai permintaan
  const ITEMS_PER_PAGE = 4; 

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'none',
    type: 'none',
    dateFrom: null,
    dateTo: null
  });

  // Data Item dummy
  const [items, setItems] = useState<Item[]>([
    { id: 1, code: 'CRG-001-2024', name: 'Elektronik Consumer - Smartphone', status: 'in_warehouse', customer: 'PT Tech Indo', date: '15 Jan 2024', quantity: 50, weight: '25 kg', destination: 'Jakarta', description: 'Smartphone untuk retail' },
    { id: 2, code: 'CRG-002-2024', name: 'Spare Part Otomotif - Filter Oli', status: 'in_container', customer: 'CV Motor Sejahtera', date: '14 Jan 2024', quantity: 200, weight: '50 kg', destination: 'Surabaya', description: 'Filter oli untuk kendaraan' },
    { id: 3, code: 'CRG-003-2024', name: 'Textil - Kain Katun Premium', status: 'delayed', customer: 'Toko Kain Makmur', date: '12 Jan 2024', quantity: 75, weight: '30 kg', destination: 'Bandung', description: 'Kain katun berkualitas tinggi' },
    { id: 4, code: 'CRG-004-2024', name: 'Makanan Kemasan - Snack Export', status: 'shipped', customer: 'PT Food Global', date: '13 Jan 2024', quantity: 300, weight: '100 kg', destination: 'Medan', description: 'Snack untuk ekspor' },
    { id: 5, code: 'CRG-005-2024', name: 'Peralatan Rumah Tangga - Blender', status: 'in_warehouse', customer: 'Toko Elektronik Barokah', date: '16 Jan 2024', quantity: 25, weight: '15 kg', destination: 'Yogyakarta', description: 'Blender untuk rumah tangga' },
    { id: 6, code: 'CRG-006-2024', name: 'Kosmetik Import - Skincare Set', status: 'in_container', customer: 'Beauty Store Cantik', date: '11 Jan 2024', quantity: 100, weight: '20 kg', destination: 'Makassar', description: 'Set perawatan kulit import' },
    { id: 7, code: 'CRG-007-2024', name: 'Alat Tulis Kantor', status: 'in_warehouse', customer: 'PT Office Plus', date: '10 Jan 2024', quantity: 150, weight: '10 kg', destination: 'Samarinda', description: 'Kertas dan Pena' },
    { id: 8, code: 'CRG-008-2024', name: 'Furnitur Kayu Jati', status: 'shipped', customer: 'CV Mebel Indah', date: '09 Jan 2024', quantity: 10, weight: '300 kg', destination: 'Palembang', description: 'Meja dan Kursi' },
    { id: 9, code: 'CRG-009-2024', name: 'Mainan Anak Edukasi', status: 'delayed', customer: 'Toko Anak Cerdas', date: '08 Jan 2024', quantity: 80, weight: '40 kg', destination: 'Denpasar', description: 'Puzzle dan Blocks' },
    { id: 10, code: 'CRG-010-2024', name: 'Suplemen Kesehatan', status: 'in_container', customer: 'Klinik Sehat', date: '07 Jan 2024', quantity: 120, weight: '12 kg', destination: 'Bogor', description: 'Vitamin dan Mineral' },
  ]);

  // Fungsi untuk mengubah halaman
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Filter Items (Dibuat dalam useMemo agar efisien)
  const filteredItems = useMemo(() => {
    const filtered = items.filter(item => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (!item.code.toLowerCase().includes(searchLower) &&
            !item.name.toLowerCase().includes(searchLower) &&
            !item.customer.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Status filter
      if (filters.status && filters.status !== 'none' && item.status !== filters.status) {
        return false;
      }
      return true;
    });
    
    return filtered;
  }, [items, filters]);

  // Handle filter change dan reset page
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // SELALU reset ke halaman 1 ketika filter berubah
  };

  // LOGIC PAGINATION UTAMA
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Pastikan currentPage tidak melebihi totalPages setelah filtering
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  } else if (totalPages === 0 && currentPage !== 1) {
    // Kasus khusus jika filter menghasilkan 0 item, kembali ke hal 1
    setCurrentPage(1);
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Item yang ditampilkan di halaman saat ini
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // LOGIC CRUD lainnya...
  const handleAddItem = (newItem: Omit<Item, 'id'>) => {
    setItems([...items, { ...newItem, id: Date.now() } as Item]);
    setCurrentPage(1); // Kembali ke halaman 1 saat item baru ditambahkan
  };

  const handleEditItem = (updatedItem: Item) => {
    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
    setEditItem(null);
  };

  const handleDeleteItem = () => {
    if (deleteItem) {
      setItems(items.filter(item => item.id !== deleteItem.id));
      setDeleteItem(null);
      setShowDeleteConfirm(false);
      
      // Pindah ke halaman sebelumnya jika halaman saat ini menjadi kosong
      // setelah penghapusan
      const newTotalItems = items.length - 1;
      const newTotalPages = Math.ceil(newTotalItems / ITEMS_PER_PAGE);
      if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
      }
    }
  };

  const handleEdit = (item: Item) => {
    setEditItem(item);
    setShowAddForm(true);
  };

  const handleDelete = (item: Item) => {
    setDeleteItem(item);
    setShowDeleteConfirm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditItem(null);
  };

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setShowDetailPopup(true);
  };

  const handleDetailEdit = () => {
    if (selectedItem) {
      setEditItem(selectedItem);
      setShowDetailPopup(false);
      setShowAddForm(true);
    }
  };

  const handleDetailDelete = () => {
    if (selectedItem) {
      setDeleteItem(selectedItem);
      setShowDetailPopup(false);
      setShowDeleteConfirm(true);
    }
  };
  // END LOGIC CRUD

  const statusOptions = [
    { value: 'in_warehouse', label: 'Di Gudang' },
    { value: 'in_container', label: 'Dalam Kontainer' },
    { value: 'delayed', label: 'Terlambat' },
    { value: 'shipped', label: 'Terkirim' }
  ];

  return (
    // Menggunakan flex-col dan h-screen untuk layout penuh layar
    <div className="flex flex-col h-screen p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      
      {/* Header (fixed content) */}
      <div className="space-y-6 flex-shrink-0 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Manajemen Barang
              </h1>
              <p className="text-purple-600 mt-1">
                <span className="font-semibold text-purple-800">{totalItems}</span> dari {items.length} item ditemukan. Menampilkan {currentItems.length} item di halaman {currentPage}.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Bar (fixed content) */}
        <FilterBar
          onFilterChange={handleFilterChange}
          filterOptions={{
            statuses: statusOptions,
            showDateFilter: true,
            showSearchFilter: true
          }}
          searchPlaceholder="Cari kode barang, nama, atau pelanggan..."
        />
      </div> {/* Akhir Header/Filter Wrapper */}

      {/* Items List (Mengisi ruang yang tersedia, tanpa scroll utama) */}
      <div className="flex-1 space-y-3 pb-4"> 
        {/* Render item yang sudah di-slice */}
        {currentItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ItemCard 
              {...item} 
              onClick={() => handleItemClick(item)}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item)}
            />
          </motion.div>
        ))}
        
        {/* Empty State */}
        {totalItems === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-purple-200">
            <p className="text-purple-600">Tidak ada barang yang ditemukan</p>
            <p className="text-sm text-purple-400 mt-1">
              Coba ubah kata kunci pencarian atau filter
            </p>
          </div>
        )}
      </div> {/* Akhir Items List */}

      {/* Pagination (fixed content di bawah) */}
      <div className="flex-shrink-0 mt-4">
        <SimplePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Floating Action Button (fixed position) */}
      <motion.button 
        onClick={() => setShowAddForm(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Tambah barang baru"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Popups dan Dialogs (seharusnya berada di luar flow utama) */}
      <AddItemForm
        open={showAddForm}
        onClose={handleCloseForm}
        onSubmit={editItem ? handleEditItem : handleAddItem}
        editData={editItem}
      />

      <ItemDetailPopup
        open={showDetailPopup}
        onClose={() => setShowDetailPopup(false)}
        item={selectedItem}
        onEdit={handleDetailEdit}
        onDelete={handleDetailDelete}
      />

      <ConfirmDialog // Ini sekarang adalah komponen ConfirmDialog yang benar
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteItem}
        title="Hapus Barang"
        description={`Apakah Anda yakin ingin menghapus barang "${deleteItem?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        cancelText="Batal"
        type="danger"
      />
    </div>
  );
}