import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="p-4 border-b bg-background">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Divide It</Link>
      </div>
    </header>
  );
};

export default Header;
