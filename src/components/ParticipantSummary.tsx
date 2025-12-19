import React, { useState } from 'react';
import { Participant } from '@/core/participants';
import { useParticipants } from '@/context/ParticipantsContext';
import { formatMoney } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Pencil, Trash2, List } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface ParticipantSummaryProps {
  participant: Participant;
}

const ParticipantSummary: React.FC<ParticipantSummaryProps> = ({ participant }) => {
  const { dispatch } = useParticipants();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(participant.name);
  const [editAmount, setEditAmount] = useState(participant.amount.toString());

  const handleDelete = () => {
    if (confirm(`¿Estás seguro de eliminar a ${participant.name}?`)) {
      dispatch({ type: 'REMOVE_PARTICIPANT', payload: { id: participant.id } });
    }
  };

  const handleEdit = () => {
    setEditName(participant.name);
    setEditAmount(participant.amount.toString());
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    dispatch({
      type: 'UPDATE_PARTICIPANT',
      payload: {
        ...participant,
        name: editName,
        amount: parseFloat(editAmount),
      },
    });
    setIsEditing(false);
  };

  return (
    <>
      <Card className="mb-2">
        <CardContent className="flex justify-between items-center p-4">
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Link to={`/participant/${participant.id}`} className="hover:underline flex items-center gap-2">
                {participant.name}
                {participant.items && participant.items.length > 0 && (
                  <List className="h-4 w-4 text-muted-foreground" />
                )}
              </Link>
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
        <DialogContent>
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
              <label htmlFor="edit-amount" className="text-sm font-medium">Monto</label>
              <Input
                id="edit-amount"
                type="number"
                step="0.01"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
              />
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
