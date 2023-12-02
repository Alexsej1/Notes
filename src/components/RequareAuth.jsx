import { Navigate } from "react-router-dom";
import { useUserContext } from "./UserContextProvider";

export const RequareAuth = ({ children }) => {
  const { user } = useUserContext();
  if (!user?.email) {
    return <Navigate to="/login" />;
  }
  return children;
};
