import { useParticipants } from '@/context/ParticipantsContext';
import ParticipantSummary from './ParticipantSummary';

const ParticipantsList = () => {
  const { state } = useParticipants();

  return (
    <section className="mt-6">
      <h2 className="text-xl font-bold mb-4">Participantes</h2>
      {state.participants.length > 0 ? (
        <div className="space-y-2">
          {state.participants.map((participant) => (
            <ParticipantSummary key={participant.id} participant={participant} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Aún no hay participantes.</p>
      )}
    </section>
  );
};

export default ParticipantsList;
