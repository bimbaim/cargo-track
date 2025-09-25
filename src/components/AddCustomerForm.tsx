import { useState, useEffect } from 'react'; // <--- IMPORT useEffect
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
// import { X } from 'lucide-react';

interface AddCustomerFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (customer: any) => void;
  editData?: any;
}

export default function AddCustomerForm({ open, onClose, onSubmit, editData }: AddCustomerFormProps) {
  const [formData, setFormData] = useState({
    name: editData?.name || '',
    company: editData?.company || '',
    email: editData?.email || '',
    phone: editData?.phone || '',
    address: editData?.address || '',
    type: editData?.type || 'regular',
    notes: editData?.notes || ''
  });

  // SOLUSI: Gunakan useEffect untuk menyinkronkan formData dengan editData
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || '',
        company: editData.company || '',
        email: editData.email || '',
        phone: editData.phone || '',
        address: editData.address || '',
        type: editData.type || 'regular',
        notes: editData.notes || ''
      });
    } else {
       // Reset form jika editData hilang (misalnya saat beralih ke mode "Tambah Baru")
       setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          address: '',
          type: 'regular',
          notes: ''
       });
    }
  }, [editData]); // <-- Dependensi: efek ini akan berjalan setiap kali editData berubah

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: editData?.id || Date.now(),
      orders: editData?.orders || Math.floor(Math.random() * 50) + 1,
      joinDate: editData?.joinDate || new Date().toLocaleDateString('id-ID')
    });
    onClose();
    // Hapus reset formData dari sini, karena sekarang diurus oleh useEffect
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between pb-4 border-b">
          <DialogTitle className="text-xl font-semibold text-slate-800">
            {editData ? 'Edit Pelanggan' : 'Tambah Pelanggan Baru'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-slate-700">
              Nama Lengkap *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="John Doe"
              required
              className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium text-slate-700">
              Nama Perusahaan *
            </Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              placeholder="PT. Maju Bersama"
              required
              className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="john@company.com"
                required
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                Nomor Telepon *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="081234567890"
                required
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium text-slate-700">
              Tipe Pelanggan
            </Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20">
                <SelectValue placeholder="Pilih tipe pelanggan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium text-slate-700">
              Alamat *
            </Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Jl. Sudirman No. 123, Jakarta"
              rows={2}
              required
              className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium text-slate-700">
              Catatan
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Catatan tambahan..."
              rows={2}
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
              {editData ? 'Update Pelanggan' : 'Tambah Pelanggan'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}