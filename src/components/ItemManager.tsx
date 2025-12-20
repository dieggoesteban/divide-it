import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Item, Participant } from '@/core/participants';
import { Trash2, Plus, Users } from 'lucide-react';

interface ItemManagerProps {
  items: Item[];
  onItemsChange: (items: Item[]) => void;
  participants?: Participant[];
}

export const ItemManager: React.FC<ItemManagerProps> = ({
  items,
  onItemsChange,
  participants = [],
}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

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

  const handleToggleItemParticipant = (itemId: string, participantId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    const currentExcluded = item.excludedParticipantIds || [];
    const newExcluded = currentExcluded.includes(participantId)
      ? currentExcluded.filter((id) => id !== participantId)
      : [...currentExcluded, participantId];

    // Validate at least one participant remains
    const includedCount = participants.length - newExcluded.length;
    if (includedCount === 0) {
      setError('Debe haber al menos un participante incluido.');
      return;
    }

    const updatedItems = items.map((i) =>
      i.id === itemId
        ? { ...i, excludedParticipantIds: newExcluded.length > 0 ? newExcluded : undefined }
        : i
    );
    onItemsChange(updatedItems);
    setError('');
  };

  const getIncludedCount = (item: Item): number => {
    const excludedCount = item.excludedParticipantIds?.length || 0;
    return participants.length - excludedCount;
  };

  const total = items.reduce((sum, item) => sum + item.amount, 0);
  const hasParticipants = participants.length > 0;

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
        <Button onClick={handleAddItem} size="icon" type="button" aria-label="Agregar item">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Participant Selection for New Item - REMOVED */}
      
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Items List */}
      <div className="border rounded-md max-h-[300px] overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground p-4 text-center">No hay items agregados.</p>
        ) : (
          <ul className="divide-y">
            {items.map((item) => {
              const includedCount = getIncludedCount(item);
              const hasExclusions = item.excludedParticipantIds && item.excludedParticipantIds.length > 0;
              const isExpanded = expandedItemId === item.id;

              return (
                <li key={item.id} className="p-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="truncate max-w-[150px]">{item.description}</span>
                    <div className="flex items-center gap-2">
                      {hasParticipants && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className={`h-6 px-2 text-xs ${hasExclusions ? 'text-amber-600' : 'text-muted-foreground'}`}
                          onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                          title={hasExclusions ? 'Tiene exclusiones' : 'Todos participan'}
                        >
                          <Users className="h-3 w-3 mr-1" />
                          {includedCount}/{participants.length}
                        </Button>
                      )}
                      <span className="font-medium">${item.amount.toFixed(2)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label={`Eliminar ${item.description}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Expanded participant selection for existing item */}
                  {isExpanded && hasParticipants && (
                    <div className="mt-2 border-t pt-2 space-y-1">
                      <p className="text-xs text-muted-foreground mb-1">¿Quién paga este item?</p>
                      {participants.map((p) => (
                        <label
                          key={p.id}
                          className="flex items-center gap-2 text-xs cursor-pointer hover:bg-muted p-1 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={!item.excludedParticipantIds?.includes(p.id)}
                            onChange={() => handleToggleItemParticipant(item.id, p.id)}
                            className="rounded"
                            aria-label={`Incluir a ${p.name} en este item`}
                          />
                          <span>{p.name}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
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
