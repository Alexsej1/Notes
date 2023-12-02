import {
  Routes,
  Route,
  Link,
  redirect,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { Notfoundpage } from "./pages/Notfoundpage";
import { Login } from "./pages/Login";
import { About } from "./pages/About";

import Layout from "./components/Layout";
import { Home } from "./pages/Home";

import "./main.css";
import UserContextProvider from "./components/UserContextProvider";
import { RequareAuth } from "./components/RequareAuth";
import { Notes } from "./pages/Notes";

import { loader as notesLoader } from "./pages/Notes";
import { loader as editNoteLoader } from "./pages/EditNote";
import AddNote from "./pages/AddNote";
import EditNote from "./pages/EditNote";
import Note from "./pages/Note";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequareAuth>
        <Layout />
      </RequareAuth>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/notes",
        loader: notesLoader,
        element: <Notes />,
      },
      {
        path: "/addNote",
        element: <AddNote />,
      },
      {
        path: "/editNote/:id",
        loader: editNoteLoader,
        element: <EditNote />,
      },
      {
        path: "/notes/:id",
        loader: editNoteLoader,
        element: <Note />,
      },
      {
        path: "*",
        element: <Notfoundpage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />;
    </UserContextProvider>
  );
}
export default App;
