import { Navigate } from "react-router-dom";
import { useAuth } from "./../../store/authContext";

const RequireAuth = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default RequireAuth;
