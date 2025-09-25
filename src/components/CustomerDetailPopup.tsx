import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Building2, User, Mail, Phone, Calendar, Package, Edit, Trash2 } from 'lucide-react';

interface CustomerDetailPopupProps {
  open: boolean;
  onClose: () => void;
  customer: {
    id: number;
    name: string;
    company: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive' | 'pending';
    totalOrders: number;
    lastOrder: string;
    type?: string;
    address?: string;
    joinDate?: string;
  } | null;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CustomerDetailPopup({ open, onClose, customer, onEdit, onDelete }: CustomerDetailPopupProps) {
  if (!customer) return null;

  const statusConfig = {
    active: { label: 'Aktif', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    inactive: { label: 'Tidak Aktif', color: 'bg-gray-100 text-gray-800 border-gray-200' },
    pending: { label: 'Menunggu', color: 'bg-amber-100 text-amber-800 border-amber-200' }
  };

  const typeConfig = {
    regular: { label: 'Regular', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    premium: { label: 'Premium', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    vip: { label: 'VIP', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    enterprise: { label: 'Enterprise', color: 'bg-slate-50 text-slate-700 border-slate-200' }
  };

  const currentStatus = statusConfig[customer.status];
  const currentType = customer.type ? typeConfig[customer.type as keyof typeof typeConfig] : null;

  const handleContactClick = (action: 'phone' | 'email') => {
    if (action === 'phone') {
      window.open(`tel:${customer.phone}`, '_self');
    } else {
      window.open(`mailto:${customer.email}`, '_self');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-purple-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-purple-600" />
            Detail Pelanggan
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Building2 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-purple-900">{customer.name}</h3>
                  <p className="text-sm text-purple-700">{customer.company}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className={`text-sm px-3 py-1 rounded-full border ${currentStatus.color}`}>
                  {currentStatus.label}
                </Badge>
                {currentType && (
                  <Badge className={`text-sm px-3 py-1 rounded-full border ${currentType.color}`}>
                    {currentType.label}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-purple-900 flex items-center gap-2">
              <User className="w-4 h-4" />
              Informasi Kontak
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Blok Email yang sudah diperbaiki */}
              <div className="flex items-center justify-between gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                {/* MENGHAPUS ikon Mail besar yang menyebabkan penimpahan */}
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-blue-600 font-medium">Email</p>
                  {/* Menambahkan min-w-0 dan truncate agar teks panjang tidak tumpang tindih */}
                  <p className="font-semibold text-blue-900 truncate">{customer.email}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleContactClick('email')}
                  className="text-blue-600 border-blue-300 hover:bg-blue-100 shrink-0"
                >
                  <Mail className="w-3 h-3" />
                </Button>
              </div>

              {/* Blok Telepon yang sudah diperbaiki */}
              <div className="flex items-center justify-between gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                {/* MENGHAPUS ikon Phone besar yang menyebabkan penimpahan */}
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-green-600 font-medium">Telepon</p>
                  <p className="font-semibold text-green-900 truncate">{customer.phone}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleContactClick('phone')}
                  className="text-green-600 border-green-300 hover:bg-green-100 shrink-0"
                >
                  <Phone className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {customer.address && (
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-xs text-orange-600 font-medium mb-1">Alamat</p>
                <p className="text-orange-900">{customer.address}</p>
              </div>
            )}
          </div>

          <Separator />

          {/* Business Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-purple-900 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Informasi Bisnis
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg border border-pink-200">
                <Package className="w-5 h-5 text-pink-600" />
                <div>
                  <p className="text-xs text-pink-600 font-medium">Total Pesanan</p>
                  <p className="font-bold text-pink-900 text-lg">{customer.totalOrders}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-xs text-indigo-600 font-medium">Pesanan Terakhir</p>
                  <p className="font-semibold text-indigo-900">{customer.lastOrder}</p>
                </div>
              </div>

              {customer.joinDate && (
                <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg border border-teal-200 md:col-span-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="text-xs text-teal-600 font-medium">Bergabung Sejak</p>
                    <p className="font-semibold text-teal-900">{customer.joinDate}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onEdit}
              className="flex items-center gap-2 border-purple-200 text-purple-700"
            >
              <Edit className="w-4 h-4" />
              Update
            </Button>
            <Button
              variant="outline"
              onClick={onDelete}
              className="flex items-center gap-2 border-red-200 text-red-700"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}