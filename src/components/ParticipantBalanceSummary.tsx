import React from 'react';
import { Participant, getNetAmount } from '@/core/participants';
import { formatMoney, cn } from '@/lib/utils';

interface ParticipantBalanceSummaryProps {
  participant: Participant;
  totalIndividual: number;
}

const ParticipantBalanceSummary: React.FC<ParticipantBalanceSummaryProps> = ({ participant, totalIndividual }) => {
  const balance = getNetAmount(participant, totalIndividual);

  return (
    <div className="flex justify-between items-center p-2 border-b last:border-0">
      <h3 className="font-medium">{participant.name}:</h3>
      <h4
        className={cn(
          "font-bold",
          balance > 0 ? "text-green-600" : balance < 0 ? "text-red-600" : "text-gray-600"
        )}
      >
        {balance > 0 ? "+" : balance < 0 ? "-" : ""} ${formatMoney(Math.abs(balance))}
      </h4>
    </div>
  );
};

export default ParticipantBalanceSummary;
