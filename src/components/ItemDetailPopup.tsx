import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Package, Calendar, User, MapPin, Weight, Hash, Edit, Trash2 } from 'lucide-react';

interface ItemDetailPopupProps {
  open: boolean;
  onClose: () => void;
  item: {
    id: number;
    code: string;
    name: string;
    status: 'in_warehouse' | 'in_container' | 'delayed' | 'shipped';
    customer: string;
    date: string;
    quantity: number;
    weight?: string;
    destination?: string;
    description?: string;
  } | null;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ItemDetailPopup({ open, onClose, item, onEdit, onDelete }: ItemDetailPopupProps) {
  if (!item) return null;

  const statusConfig = {
    in_warehouse: { label: 'Di Gudang', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    in_container: { label: 'Dalam Kontainer', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    delayed: { label: 'Terlambat', color: 'bg-red-100 text-red-800 border-red-200' },
    shipped: { label: 'Terkirim', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' }
  };

  const currentStatus = statusConfig[item.status];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-purple-900 flex items-center gap-2">
            <Package className="w-6 h-6 text-purple-600" />
            Detail Barang
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-purple-900">{item.code}</h3>
                  <p className="text-sm text-purple-700">{item.name}</p>
                </div>
              </div>
              <Badge className={`text-sm px-3 py-1 rounded-full border ${currentStatus.color}`}>
                {currentStatus.label}
              </Badge>
            </div>
            
            {item.description && (
              <p className="text-sm text-purple-700 bg-white/50 p-3 rounded-lg border border-purple-200">
                {item.description}
              </p>
            )}
          </div>

          <Separator />

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <User className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs text-blue-600 font-medium">Pelanggan</p>
                  <p className="font-semibold text-blue-900">{item.customer}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <Calendar className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-xs text-green-600 font-medium">Tanggal</p>
                  <p className="font-semibold text-green-900">{item.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <Hash className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-xs text-orange-600 font-medium">Jumlah</p>
                  <p className="font-semibold text-orange-900">{item.quantity} pcs</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {item.destination && (
                <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg border border-pink-200">
                  <MapPin className="w-5 h-5 text-pink-600" />
                  <div>
                    <p className="text-xs text-pink-600 font-medium">Tujuan</p>
                    <p className="font-semibold text-pink-900">{item.destination}</p>
                  </div>
                </div>
              )}

              {item.weight && (
                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <Weight className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="text-xs text-indigo-600 font-medium">Berat</p>
                    <p className="font-semibold text-indigo-900">{item.weight}</p>
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