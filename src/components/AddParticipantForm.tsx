import React, { useState } from 'react';
import { useParticipants } from '@/context/ParticipantsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ItemManagerDialog } from '@/components/ItemManagerDialog';
import { Item } from '@/core/participants';
import { ListPlus } from 'lucide-react';

const AddParticipantForm = () => {
  const { state, dispatch } = useParticipants();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);

  const handleItemsSave = (newItems: Item[]) => {
    setItems(newItems);
    if (newItems.length > 0) {
      const total = newItems.reduce((sum, item) => sum + item.amount, 0);
      setAmount(total.toFixed(2));
    } else {
      // If items cleared, keep the amount or reset? 
      // Let's reset if it was calculated, but maybe user wants to switch to manual.
      // For now, let's just update amount if items exist.
      // If items are cleared, we enable manual input again.
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (state.participants.find((p) => p.name === name)) {
      alert('Ya existe un participante con ese nombre');
      return;
    }

    const participant = {
      id: state.idCounter.toString(),
      name,
      amount: parseFloat(amount) || 0,
      items: items,
    };

    dispatch({ type: 'ADD_PARTICIPANT', payload: participant });
    dispatch({ type: 'INCREMENT_ID_COUNTER' });

    setName('');
    setAmount('');
    setItems([]);
  };

  const isAmountReadOnly = items.length > 0;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Añadir Participante</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del participante"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Monto</Label>
            <div className="flex gap-2">
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
                readOnly={isAmountReadOnly}
                className={isAmountReadOnly ? 'bg-muted' : ''}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsItemDialogOpen(true)}
                title="Desglosar gastos"
              >
                <ListPlus className="h-4 w-4 mr-2" />
                {items.length > 0 ? `${items.length} Items` : 'Desglosar'}
              </Button>
            </div>
            {isAmountReadOnly && (
              <p className="text-xs text-muted-foreground">
                El monto es calculado automáticamente basado en los items.
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Añadir participante
          </Button>
        </form>

        <ItemManagerDialog
          open={isItemDialogOpen}
          onOpenChange={setIsItemDialogOpen}
          initialItems={items}
          onSave={handleItemsSave}
          title={`Gastos de ${name || 'Participante'}`}
        />
      </CardContent>
    </Card>
  );
};

export default AddParticipantForm;
