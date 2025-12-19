import { useParams } from 'react-router-dom';

const ParticipantDetailsPage = () => {
  const { id } = useParams();
  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Participant Details: {id}</h1>
    </div>
  );
};

export default ParticipantDetailsPage;
