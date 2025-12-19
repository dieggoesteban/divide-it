import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="p-4 container mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">404 - Not Found</h1>
      <Link to="/" className="text-blue-500 hover:underline">Go Home</Link>
    </div>
  );
};

export default NotFoundPage;
