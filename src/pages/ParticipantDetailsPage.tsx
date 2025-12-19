import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useParticipants } from '@/context/ParticipantsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pencil } from 'lucide-react';
import { ItemManagerDialog } from '@/components/ItemManagerDialog';
import { Item } from '@/core/participants';

const ParticipantDetailsPage = () => {
  const { id } = useParams();
  const { state, dispatch } = useParticipants();
  const participant = state.participants.find((p) => p.id === id);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!participant) {
    return (
      <div className="container mx-auto p-4">
        <p>Participante no encontrado.</p>
        <Link to="/">
          <Button variant="link">Volver al inicio</Button>
        </Link>
      </div>
    );
  }

  const handleSaveItems = (newItems: Item[]) => {
    const newAmount = newItems.reduce((sum, item) => sum + item.amount, 0);
    dispatch({
      type: 'UPDATE_PARTICIPANT',
      payload: {
        ...participant,
        items: newItems,
        amount: newAmount,
      },
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Link to="/" className="mb-4 inline-block">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{participant.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">Total Gastado</p>
            <p className="text-3xl font-bold">${participant.amount.toFixed(2)}</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Desglose de Gastos</h3>
              <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)}>
                <Pencil className="h-3 w-3 mr-2" />
                Editar Items
              </Button>
            </div>
            
            {participant.items && participant.items.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left">Descripción</th>
                      <th className="px-4 py-2 text-right">Monto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {participant.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-2 max-w-[200px] truncate" title={item.description}>{item.description}</td>
                        <td className="px-4 py-2 text-right">${item.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground italic">No hay items desglosados.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <ItemManagerDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialItems={participant.items || []}
        onSave={handleSaveItems}
        title={`Editar gastos de ${participant.name}`}
      />
    </div>
  );
};

export default ParticipantDetailsPage;
