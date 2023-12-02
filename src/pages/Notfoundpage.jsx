import { Link } from "react-router-dom";

const Notfoundpage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-500 text-white">
      <h1 className="text-4xl font-bold mb-4">Error 404</h1>
      <p className="text-lg mb-4">This page doesn't exist.</p>
      <Link to="/" className="text-lg underline">
        Home
      </Link>
    </div>
  );
};

export { Notfoundpage };
