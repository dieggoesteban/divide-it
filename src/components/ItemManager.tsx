import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Item } from '@/core/participants';
import { Trash2, Plus } from 'lucide-react';

interface ItemManagerProps {
  items: Item[];
  onItemsChange: (items: Item[]) => void;
}

export const ItemManager: React.FC<ItemManagerProps> = ({
  items,
  onItemsChange,
}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleAddItem = () => {
    if (!description.trim()) {
      setError('La descripción es obligatoria.');
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError('El monto debe ser mayor a 0.');
      return;
    }

    const newItem: Item = {
      id: crypto.randomUUID(),
      description: description.trim(),
      amount: amountValue,
    };

    onItemsChange([...items, newItem]);
    setDescription('');
    setAmount('');
    setError('');
  };

  const handleRemoveItem = (id: string) => {
    onItemsChange(items.filter((item) => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-4 py-4">
      {/* Add New Item Form */}
      <div className="grid grid-cols-[2fr,1fr,auto] gap-2 items-end">
        <div className="space-y-1">
          <Label htmlFor="item-desc">Descripción</Label>
          <Input
            id="item-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ej. Cena"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="item-amount">Monto</Label>
          <Input
            id="item-amount"
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddItem();
              }
            }}
          />
        </div>
        <Button onClick={handleAddItem} size="icon" type="button">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Items List */}
      <div className="border rounded-md max-h-[200px] overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground p-4 text-center">No hay items agregados.</p>
        ) : (
          <ul className="divide-y">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between items-center p-3 text-sm">
                <span className="truncate max-w-[200px]">{item.description}</span>
                <div className="flex items-center gap-3">
                  <span className="font-medium">${item.amount.toFixed(2)}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center pt-2 border-t">
        <span className="font-semibold">Total Calculado:</span>
        <span className="text-lg font-bold">${total.toFixed(2)}</span>
      </div>
    </div>
  );
};
