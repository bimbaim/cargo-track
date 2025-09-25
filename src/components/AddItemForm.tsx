import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface AddItemFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (item: any) => void;
  editData?: any;
}

export default function AddItemForm({ open, onClose, onSubmit, editData }: AddItemFormProps) {
  const [formData, setFormData] = useState({
    code: editData?.code || '',
    name: editData?.name || '',
    customer: editData?.customer || '',
    weight: editData?.weight || '',
    destination: editData?.destination || '',
    status: editData?.status || 'pending',
    description: editData?.description || ''
  });

  // SOLUSI: Menggunakan useEffect untuk memuat data editData ke formData
  useEffect(() => {
    if (editData) {
      setFormData({
        code: editData.code || '',
        name: editData.name || '',
        customer: editData.customer || '',
        weight: editData.weight || '',
        destination: editData.destination || '',
        status: editData.status || 'pending',
        description: editData.description || ''
      });
    } else {
      // Reset form saat editData tidak ada (untuk mode tambah baru)
      setFormData({
        code: '',
        name: '',
        customer: '',
        weight: '',
        destination: '',
        status: 'pending',
        description: ''
      });
    }
  }, [editData]); // Efek ini akan dijalankan setiap kali editData berubah

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: editData?.id || Date.now(),
      date: editData?.date || new Date().toLocaleDateString('id-ID')
    });
    onClose();
    // Hapus reset formData dari sini, karena sudah diurus oleh useEffect
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between pb-4 border-b">
          <DialogTitle className="text-xl font-semibold text-slate-800">
            {editData ? 'Edit Barang' : 'Tambah Barang Baru'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-sm font-medium text-slate-700">
                Kode Barang *
              </Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
                placeholder="CRG-001"
                required
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-sm font-medium text-slate-700">
                Berat (kg) *
              </Label>
              <Input
                id="weight"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                placeholder="25"
                required
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-slate-700">
              Nama Barang *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Elektronik"
              required
              className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer" className="text-sm font-medium text-slate-700">
              Pelanggan *
            </Label>
            <Input
              id="customer"
              value={formData.customer}
              onChange={(e) => setFormData({...formData, customer: e.target.value})}
              placeholder="PT. Maju Bersama"
              required
              className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination" className="text-sm font-medium text-slate-700">
              Tujuan *
            </Label>
            <Input
              id="destination"
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
              placeholder="Jakarta"
              required
              className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium text-slate-700">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
              <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-slate-700">
              Deskripsi
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Deskripsi tambahan..."
              rows={3}
              className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {editData ? 'Update Barang' : 'Tambah Barang'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Komponen ItemCard tidak perlu diubah, karena masalahnya ada di AddItemForm dan komponen induk yang memanggilnya.
// ... (Kode ItemCard Anda yang tidak perlu diubah) ...