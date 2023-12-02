import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";

export const loader = async ({ params }) => {
  const note = await fetch(`http://localhost:5000/notes/${params.id}`).then(
    (r) => r.json()
  );
  return note;
};

function EditNote() {
  const note = useLoaderData();
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const navigate = useNavigate();

  const handleSetName = useCallback((e) => setTitle(e.target.value), []);
  const handleSetText = useCallback((e) => setBody(e.target.value), []);

  const handleEdit = async () => {
    await fetch(`http://localhost:5000/notes/${note.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: title,
        body: body,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
    navigate("/notes");
  };

  return (
    <div className="h-auto flex flex-col pt-20 items-center bg-green-10">
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-3xl text-green-700 mb-6">Edit note</h1>
        <div className="flex flex-col gap-4">
          <input
            placeholder="Name"
            value={title}
            onChange={handleSetName}
            className="border border-green-300 p-2 rounded-md"
          ></input>
          <textarea
            placeholder="EditNote text..."
            value={body}
            onChange={handleSetText}
            className="border border-green-300 p-2 rounded-md h-36"
          ></textarea>
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-md mr-2"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditNote;
