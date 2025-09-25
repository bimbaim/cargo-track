import { useState } from 'react';
import { Plus } from 'lucide-react';
import ItemCard from './ItemCard';
import AddItemForm from './AddItemForm';
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

export default function ItemsScreen() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [deleteItem, setDeleteItem] = useState<Item | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: '',
    type: '',
    dateFrom: null,
    dateTo: null
  });

  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      code: 'CRG-001-2024',
      name: 'Elektronik Consumer - Smartphone',
      status: 'in_warehouse',
      customer: 'PT Tech Indo',
      date: '15 Jan 2024',
      quantity: 50,
      weight: '25 kg',
      destination: 'Jakarta',
      description: 'Smartphone untuk retail'
    },
    {
      id: 2,
      code: 'CRG-002-2024',
      name: 'Spare Part Otomotif - Filter Oli',
      status: 'in_container',
      customer: 'CV Motor Sejahtera',
      date: '14 Jan 2024',
      quantity: 200,
      weight: '50 kg',
      destination: 'Surabaya',
      description: 'Filter oli untuk kendaraan'
    },
    {
      id: 3,
      code: 'CRG-003-2024',
      name: 'Textil - Kain Katun Premium',
      status: 'delayed',
      customer: 'Toko Kain Makmur',
      date: '12 Jan 2024',
      quantity: 75,
      weight: '30 kg',
      destination: 'Bandung',
      description: 'Kain katun berkualitas tinggi'
    },
    {
      id: 4,
      code: 'CRG-004-2024',
      name: 'Makanan Kemasan - Snack Export',
      status: 'shipped',
      customer: 'PT Food Global',
      date: '13 Jan 2024',
      quantity: 300,
      weight: '100 kg',
      destination: 'Medan',
      description: 'Snack untuk ekspor'
    },
    {
      id: 5,
      code: 'CRG-005-2024',
      name: 'Peralatan Rumah Tangga - Blender',
      status: 'in_warehouse',
      customer: 'Toko Elektronik Barokah',
      date: '16 Jan 2024',
      quantity: 25,
      weight: '15 kg',
      destination: 'Yogyakarta',
      description: 'Blender untuk rumah tangga'
    },
    {
      id: 6,
      code: 'CRG-006-2024',
      name: 'Kosmetik Import - Skincare Set',
      status: 'in_container',
      customer: 'Beauty Store Cantik',
      date: '11 Jan 2024',
      quantity: 100,
      weight: '20 kg',
      destination: 'Makassar',
      description: 'Set perawatan kulit import'
    }
  ]);

  const handleAddItem = (newItem: Omit<Item, 'id'>) => {
    setItems([...items, { ...newItem, id: Date.now() }]);
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

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const filteredItems = items.filter(item => {
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
    if (filters.status && item.status !== filters.status) {
      return false;
    }

    // Date filter (not implemented fully)
    return true;
  });

  const statusOptions = [
    { value: 'in_warehouse', label: 'Di Gudang' },
    { value: 'in_container', label: 'Dalam Kontainer' },
    { value: 'delayed', label: 'Terlambat' },
    { value: 'shipped', label: 'Terkirim' }
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Manajemen Barang
            </h1>
            <p className="text-purple-600 mt-1">
              <span className="font-semibold text-purple-800">{filteredItems.length}</span> dari {items.length} item ditampilkan
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        onFilterChange={handleFilterChange}
        filterOptions={{
          statuses: statusOptions,
          showDateFilter: true,
          showSearchFilter: true
        }}
        searchPlaceholder="Cari kode barang, nama, atau pelanggan..."
      />

      {/* Items List */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <ItemCard 
            key={item.id} 
            {...item} 
            onClick={() => handleItemClick(item)}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-purple-200">
          <p className="text-purple-600">Tidak ada barang yang ditemukan</p>
          <p className="text-sm text-purple-400 mt-1">
            Coba ubah kata kunci pencarian atau filter
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <motion.button 
        onClick={() => setShowAddForm(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Tambah barang baru"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Add/Edit Form */}
      <AddItemForm
        open={showAddForm}
        onClose={handleCloseForm}
        onSubmit={editItem ? handleEditItem : handleAddItem}
        editData={editItem}
      />

      {/* Item Detail Popup */}
      <ItemDetailPopup
        open={showDetailPopup}
        onClose={() => setShowDetailPopup(false)}
        item={selectedItem}
        onEdit={handleDetailEdit}
        onDelete={handleDetailDelete}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
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
