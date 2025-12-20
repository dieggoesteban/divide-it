import { Link } from 'react-router-dom';
import { useParticipants } from '@/context/ParticipantsContext';
import {
  getTotal,
  getParticipantsWithNetAmountCalc,
  getSuggestedTransactions,
} from '@/core/participants';
import { formatMoney } from '@/lib/utils';
import ParticipantsBalanceList from '@/components/ParticipantsBalanceList';
import SuggestedTransactionsList from '@/components/SuggestedTransactionsList';
import { Button } from '@/components/ui/button';

const ResultsPage = () => {
  const { state } = useParticipants();
  const { participants } = state;

  const total = getTotal(participants);
  const calculatedParticipants = getParticipantsWithNetAmountCalc(participants);
  const suggestedTransactions = getSuggestedTransactions(calculatedParticipants) || [];

  return (
    <div className="p-4 container mx-auto max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Resultados</h2>
      
      <div className="grid grid-cols-1 gap-4 mb-6 p-4 bg-muted rounded-lg">
        <div className="text-center">
          <h3 className="text-sm text-muted-foreground">Total del Grupo</h3>
          <p className="text-xl font-bold">${formatMoney(total)}</p>
        </div>
      </div>

      <ParticipantsBalanceList participants={calculatedParticipants} />

      {total > 0 && participants.length > 1 && suggestedTransactions.length > 0 && (
        <SuggestedTransactionsList transactions={suggestedTransactions} />
      )}

      <div className="mt-8">
        <Button asChild variant="secondary" className="w-full">
          <Link to="/">Volver</Link>
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;
