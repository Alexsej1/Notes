import { Link, useLoaderData } from "react-router-dom";
import Note from "../components/Note";

export const loader = () => {
  const notes = fetch(
    `http://localhost:5000/notes?userId=${
      JSON.parse(localStorage.getItem("user")).id
    }`
  ).then((r) => r.json());
  return notes;
};

export function Notes() {
  const notes = useLoaderData();

  return (
    <div className="h-auto flex flex-col mt-20 items-center  bg-gray-10">
      <h1 className="text-3xl text-green-700 mb-6">Notes:</h1>
      <Link to="/AddNote">
        <button className="bg-green-500 text-white px-4 py-2 mb-5 rounded-md mr-2">
          Add new note
        </button>
      </Link>
      <div className="w-full max-w-md">
        {notes
          .sort((a, b) => a.id < b.id)
          .map((note) => (
            <Note key={note.id} note={note} />
          ))}
      </div>
    </div>
  );
}
