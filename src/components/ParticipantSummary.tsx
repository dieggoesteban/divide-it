import React, { useState } from 'react';
import { Participant, Item } from '@/core/participants';
import { useParticipants } from '@/context/ParticipantsContext';
import { formatMoney } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Pencil, Trash2, List } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ItemManager } from '@/components/ItemManager';

interface ParticipantSummaryProps {
  participant: Participant;
}

const ParticipantSummary: React.FC<ParticipantSummaryProps> = ({ participant }) => {
  const { state, dispatch } = useParticipants();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(participant.name);
  const [editAmount, setEditAmount] = useState(participant.amount.toString());
  const [editItems, setEditItems] = useState<Item[]>(participant.items || []);

  const handleDelete = () => {
    if (confirm(`¿Estás seguro de eliminar a ${participant.name}?`)) {
      dispatch({ type: 'REMOVE_PARTICIPANT', payload: { id: participant.id } });
    }
  };

  const handleEdit = () => {
    setEditName(participant.name);
    setEditAmount(participant.amount.toString());
    setEditItems(participant.items || []);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    dispatch({
      type: 'UPDATE_PARTICIPANT',
      payload: {
        ...participant,
        name: editName,
        amount: parseFloat(editAmount) || 0,
        items: editItems,
      },
    });
    setIsEditing(false);
  };

  const handleItemsChange = (newItems: Item[]) => {
    setEditItems(newItems);
    if (newItems.length > 0) {
      const total = newItems.reduce((sum, item) => sum + item.amount, 0);
      setEditAmount(total.toFixed(2));
    } else {
      // If all items are removed, reset amount to 0 to avoid confusion
      setEditAmount('0');
    }
  };

  return (
    <>
      <Card className="mb-2">
        <CardContent className="flex justify-between items-center p-4">
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">
              {participant.name}
              {participant.items && participant.items.length > 0 && (
                <List className="h-4 w-4 text-muted-foreground" />
              )}
            </h3>
            <p className="text-gray-600">${formatMoney(participant.amount)}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleEdit}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDelete} className="text-red-500 hover:text-red-700">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Participante</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="edit-name" className="text-sm font-medium">Nombre</label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="edit-amount" className="text-sm font-medium">Monto Total</label>
              <Input
                id="edit-amount"
                type="number"
                step="0.01"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                readOnly={editItems.length > 0}
                className={editItems.length > 0 ? 'bg-muted' : ''}
              />
              {editItems.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  El monto es calculado automáticamente basado en los items.
                </p>
              )}
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2">Desglose de Gastos</h4>
              <ItemManager items={editItems} onItemsChange={handleItemsChange} participants={state.participants} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancelar</Button>
            <Button onClick={handleSaveEdit}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ParticipantSummary;
