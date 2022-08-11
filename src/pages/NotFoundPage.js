import { Navigate } from "react-router-dom";

const NotFoundPage = ({ user }) => {
  if (user) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default NotFoundPage;
