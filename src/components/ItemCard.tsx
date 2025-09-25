import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { MoreVertical, Package, Edit, Trash2 } from 'lucide-react';

interface ItemCardProps {
  code: string;
  name: string;
  status: 'in_warehouse' | 'in_container' | 'delayed' | 'shipped';
  customer: string;
  date: string;
  quantity: number;
  weight?: string;
  destination?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

export default function ItemCard({ 
  code, 
  name, 
  status, 
  customer, 
  date, 
  quantity,
  weight,
  destination,
  onEdit,
  onDelete,
  onClick 
}: ItemCardProps) {
  const statusConfig = {
    in_warehouse: { label: 'Di Gudang', color: 'bg-blue-100 text-blue-800' },
    in_container: { label: 'Dalam Kontainer', color: 'bg-amber-100 text-amber-800' },
    delayed: { label: 'Terlambat', color: 'bg-red-100 text-red-800' },
    shipped: { label: 'Terkirim', color: 'bg-emerald-100 text-emerald-800' }
  };

  const currentStatus = statusConfig[status];

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking menu
  };

  return (
    <Card 
      // PERUBAHAN UTAMA: Menggunakan hover:bg-purple-100 agar lebih jelas
      className="p-4 rounded-xl border-0 shadow-sm bg-white cursor-pointer hover:shadow-md hover:bg-purple-100 transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="bg-purple-600/10 p-2 rounded-lg">
            <Package className="w-4 h-4 text-purple-600" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold text-foreground truncate">{code}</p>
              <Badge className={`text-xs rounded-full px-2 py-1 ${currentStatus.color}`}>
                {currentStatus.label}
              </Badge>
            </div>
            
            <p className="text-sm text-foreground mb-1 truncate">{name}</p>
            <p className="text-xs text-muted-foreground mb-1">Pelanggan: {customer}</p>
            {destination && (
              <p className="text-xs text-muted-foreground mb-1">Tujuan: {destination}</p>
            )}
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{date}</span>
              <div className="flex items-center gap-3">
                <span>{quantity} pcs</span>
                {weight && <span>{weight}</span>}
              </div>
            </div>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
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
      </div>
    </Card>
  );
}