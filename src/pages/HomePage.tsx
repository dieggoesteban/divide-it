import { Link } from 'react-router-dom';
import { useParticipants } from '@/context/ParticipantsContext';
import AddParticipantForm from '@/components/AddParticipantForm';
import ParticipantsList from '@/components/ParticipantsList';
import TotalAccount from '@/components/TotalAccount';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const { dispatch } = useParticipants();

  const handleReset = () => {
    if (confirm('¿Estás seguro de reiniciar la aplicación? Se borrarán todos los participantes.')) {
      dispatch({ type: 'CLEAR_PARTICIPANTS' });
      dispatch({ type: 'RESET_ID_COUNTER' });
    }
  };

  return (
    <div className="p-4 container mx-auto max-w-2xl">
      <AddParticipantForm />
      <ParticipantsList />
      <TotalAccount />
      
      <div className="mt-8 flex justify-end gap-4">
        <Button variant="destructive" onClick={handleReset}>
          Reiniciar
        </Button>
        <Button asChild>
          <Link to="/results">Calcular</Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
