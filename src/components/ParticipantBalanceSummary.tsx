import React from 'react';
import { Participant } from '@/core/participants';
import { formatMoney, cn } from '@/lib/utils';

interface ParticipantBalanceSummaryProps {
  participant: Participant;
}

const ParticipantBalanceSummary: React.FC<ParticipantBalanceSummaryProps> = ({ participant }) => {
  // Use pre-calculated netAmount from participant (considers item exclusions)
  const balance = participant.netAmount || 0;
  const fairShare = participant.fairShare || 0;

  return (
    <div className="flex justify-between items-center p-2 border-b last:border-0">
      <div>
        <h3 className="font-medium">{participant.name}</h3>
        <p className="text-xs text-muted-foreground">
          Pagó: ${formatMoney(participant.amount)} | Cuota: ${formatMoney(fairShare)}
        </p>
      </div>
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
