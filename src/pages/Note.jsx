import { useLoaderData, Link } from "react-router-dom";

export default function Note() {
  const note = useLoaderData();

  return (
    <div className="h-auto flex mt-20 justify-center bg-gray-10">
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-3xl text-green-700 mb-6">{note.title}</h1>
        <p className="text-lg">{note.body}</p>
        <Link
          className="flex flex-col items-center mt-6 bg-green-500 text-white px-4 py-2 rounded-md mr-2 w-full"
          to="/notes"
        >
          Назад
        </Link>
      </div>
    </div>
  );
}
