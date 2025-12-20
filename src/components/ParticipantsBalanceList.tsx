import React from 'react';
import { Participant } from '@/core/participants';
import ParticipantBalanceSummary from './ParticipantBalanceSummary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ParticipantsBalanceListProps {
  participants: Participant[];
}

const ParticipantsBalanceList: React.FC<ParticipantsBalanceListProps> = ({ participants }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Balances</CardTitle>
      </CardHeader>
      <CardContent>
        {participants.length > 0 ? (
          participants.map((participant) => (
            <ParticipantBalanceSummary
              key={participant.id}
              participant={participant}
            />
          ))
        ) : (
          <p className="text-gray-500">Aún no hay participantes.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ParticipantsBalanceList;
