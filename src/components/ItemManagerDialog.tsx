import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Item } from '@/core/participants';
import { ItemManager } from '@/components/ItemManager';

interface ItemManagerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialItems: Item[];
  onSave: (items: Item[]) => void;
  title?: string;
}

export const ItemManagerDialog: React.FC<ItemManagerDialogProps> = ({
  open,
  onOpenChange,
  initialItems,
  onSave,
  title = 'Gestionar Items',
}) => {
  const [items, setItems] = useState<Item[]>(initialItems);

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setItems(initialItems);
    }
  }, [open, initialItems]);

  const handleSave = () => {
    onSave(items);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <ItemManager items={items} onItemsChange={setItems} />

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar Cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
