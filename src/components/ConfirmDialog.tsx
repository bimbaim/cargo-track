import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export default function ConfirmDialog({ 
  open, 
  onClose, 
  onConfirm, 
  title, 
  description, 
  confirmText = 'Konfirmasi',
  cancelText = 'Batal',
  type = 'danger'
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          buttonClass: 'bg-red-600 hover:bg-red-700 text-white'
        };
      case 'warning':
        return {
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          buttonClass: 'bg-yellow-600 hover:bg-yellow-700 text-white'
        };
      default:
        return {
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white'
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader className="flex flex-row items-start gap-4">
          <div className={`${typeStyles.iconBg} p-3 rounded-full`}>
            <AlertTriangle className={`w-6 h-6 ${typeStyles.iconColor}`} />
          </div>
          <div className="flex-1">
            <AlertDialogTitle className="text-lg font-semibold text-slate-800">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-2 text-slate-600 leading-relaxed">
              {description}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3 pt-4">
          <AlertDialogCancel 
            onClick={onClose}
            className="border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className={typeStyles.buttonClass}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}