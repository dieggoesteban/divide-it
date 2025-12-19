import React from 'react';
import { Transaction } from '@/core/participants';
import SuggestedTransaction from './SuggestedTransaction';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SuggestedTransactionsListProps {
  transactions: Transaction[];
}

const SuggestedTransactionsList: React.FC<SuggestedTransactionsListProps> = ({ transactions }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transacciones Sugeridas</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.map((transaction, index) => (
          <SuggestedTransaction key={index} transaction={transaction} />
        ))}
      </CardContent>
    </Card>
  );
};

export default SuggestedTransactionsList;
