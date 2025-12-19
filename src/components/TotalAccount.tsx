import { useParticipants } from '@/context/ParticipantsContext';
import { getTotal } from '@/core/participants';
import { formatMoney } from '@/lib/utils';

const TotalAccount = () => {
  const { state } = useParticipants();
  const total = getTotal(state.participants);

  return (
    <div className="mt-6 p-4 bg-muted rounded-lg">
      <h2 className="text-2xl font-bold text-center">Total: ${formatMoney(total)}</h2>
    </div>
  );
};

export default TotalAccount;
