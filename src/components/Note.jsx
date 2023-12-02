import { Link, useNavigate } from "react-router-dom";
import edit from "../images/edit.png";
import deleteImg from "../images/delete.png";

export default function Note({ note }) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    await fetch(`http://localhost:5000/notes/${note.id}`, {
      method: "DELETE",
    }).then(navigate("/notes"));
  };

  return (
    <Link to={`/notes/${note.id}`} className="block mb-4">
      <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xl font-medium mb-1">{note.title}</span>
          <span className="text-gray-500">{note.date}</span>
        </div>
        <div className="flex gap-2">
          <Link to={`/editNote/${note.id}`} key={note.id}>
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-200">
              <img src={edit} alt="Edit" className="w-4 h-4" />
            </button>
          </Link>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-200"
            onClick={handleDelete}
          >
            <img src={deleteImg} alt="Delete" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
