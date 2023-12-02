import { Link } from "react-router-dom";
import { useUserContext } from "../components/UserContextProvider";

const About = () => {
  const { user } = useUserContext();

  return (
    <div className="h-auto flex flex-col  pt-20 items-center bg-green-10">
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-3xl text-green-700 mb-6">About me</h1>
        <div className="flex flex-col gap-4">
          <div className="email">
            Email: <span className="text-green-600">{user.email}</span>
          </div>
          <div className="date">
            Date sign up: <span className="text-green-600">{user.date}</span>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Link to="/notes">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md">
              Go to notes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { About };
