import React, { useState } from 'react';
import { useParticipants } from '@/context/ParticipantsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AddParticipantForm = () => {
  const { state, dispatch } = useParticipants();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (state.participants.find((p) => p.name === name)) {
      alert('Ya existe un participante con ese nombre');
      return;
    }

    const participant = {
      id: state.idCounter.toString(),
      name,
      amount: parseFloat(amount),
    };

    dispatch({ type: 'ADD_PARTICIPANT', payload: participant });
    dispatch({ type: 'INCREMENT_ID_COUNTER' });

    setName('');
    setAmount('');
  };

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
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Añadir participante
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddParticipantForm;
