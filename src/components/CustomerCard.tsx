import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Building2, Phone, Mail, MoreVertical, Edit, Trash2 } from 'lucide-react';

interface CustomerCardProps {
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  totalOrders: number;
  lastOrder: string;
  type?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

export default function CustomerCard({ 
  name, 
  company, 
  email, 
  phone, 
  status, 
  totalOrders, 
  lastOrder,
  type,
  onEdit,
  onDelete,
  onClick 
}: CustomerCardProps) {
  const statusConfig = {
    active: { label: 'Aktif', color: 'bg-emerald-100 text-emerald-800' },
    inactive: { label: 'Tidak Aktif', color: 'bg-slate-100 text-slate-800' },
    pending: { label: 'Menunggu', color: 'bg-yellow-100 text-yellow-800' }
  };

  const typeConfig = {
    regular: { label: 'Regular', color: 'bg-blue-50 text-blue-700' },
    premium: { label: 'Premium', color: 'bg-purple-50 text-purple-700' },
    vip: { label: 'VIP', color: 'bg-amber-50 text-amber-700' },
    enterprise: { label: 'Enterprise', color: 'bg-slate-50 text-slate-700' }
  };

  const currentStatus = statusConfig[status];
  const currentType = type ? typeConfig[type as keyof typeof typeConfig] : null;

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking menu
  };

  const handleContactClick = (e: React.MouseEvent, action: 'phone' | 'email') => {
    e.stopPropagation();
    if (action === 'phone') {
      window.open(`tel:${phone}`, '_self');
    } else {
      window.open(`mailto:${email}`, '_self');
    }
  };

  return (
    <Card 
      // Mengubah style Card agar sama persis dengan referensi
      className="p-4 rounded-xl border-0 shadow-sm bg-white cursor-pointer hover:shadow-md hover:bg-purple-100 transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {/* Mengubah style container ikon agar sama persis dengan referensi */}
          <div className="bg-purple-600/10 p-2 rounded-lg">
            <Building2 className="w-4 h-4 text-purple-600" />
          </div>
          
          <div className="flex-1 min-w-0">
            {/* Mengubah jarak mb-2 menjadi mb-1 seperti referensi */}
            <div className="flex items-center gap-2 mb-1">
              {/* Mengubah warna teks agar lebih umum seperti di referensi */}
              <p className="font-semibold text-foreground truncate">{name}</p>
              
              {/* Mengubah style Badge agar rounded-full dan tanpa border */}
              <Badge className={`text-xs rounded-full px-2 py-1 ${currentStatus.color}`}>
                {currentStatus.label}
              </Badge>
              {currentType && (
                <Badge className={`text-xs rounded-full px-2 py-1 ${currentType.color}`}>
                  {currentType.label}
                </Badge>
              )}
            </div>
            
            {/* Mengubah style teks company (menghapus font-medium) */}
            <p className="text-sm text-foreground mb-2 truncate">{company}</p>
            
            <div className="space-y-1">
              {/* Mengubah warna teks detail kontak agar sesuai referensi */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="w-3 h-3" />
                <span className="truncate">{email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="w-3 h-3" />
                <span>{phone}</span>
              </div>
            </div>
            
            {/* Mengubah warna teks footer dan border menjadi abu-abu */}
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-2 pt-2 border-t border-gray-100">
              <span>{totalOrders} pesanan</span>
              <span>Terakhir: {lastOrder}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          {/* Mempertahankan DropdownMenu tetapi mengubah style tombolnya */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                // Mengubah style tombol agar sesuai dengan tombol "MoreVertical" di referensi
                className="text-muted-foreground hover:text-foreground p-1"
                onClick={handleMenuClick}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.();
                }}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-800"
              >
                <Edit className="w-4 h-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.();
                }}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex gap-1">
            {/* Mengubah style tombol kontak agar sesuai dengan referensi */}
            <Button
              variant="ghost"
              size="sm"
              className="bg-blue-600/10 text-blue-600 p-1.5 rounded-md hover:bg-blue-600/20 transition-colors"
              onClick={(e) => handleContactClick(e, 'phone')}
            >
              <Phone className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-emerald-600/10 text-emerald-600 p-1.5 rounded-md hover:bg-emerald-600/20 transition-colors"
              onClick={(e) => handleContactClick(e, 'email')}
            >
              <Mail className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}