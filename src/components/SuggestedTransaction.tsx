import React from 'react';
import { Transaction } from '@/core/participants';
import { formatMoney } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface SuggestedTransactionProps {
  transaction: Transaction;
}

const SuggestedTransaction: React.FC<SuggestedTransactionProps> = ({ transaction }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md mb-2">
      <span className="font-medium">{transaction.from.name}</span>
      <div className="flex flex-col items-center px-2">
        <span className="text-sm font-bold text-primary">${formatMoney(transaction.amount)}</span>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </div>
      <span className="font-medium">{transaction.to.name}</span>
    </div>
  );
};

export default SuggestedTransaction;
