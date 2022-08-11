import { Navigate, useOutlet } from "react-router-dom";
import { useSelector } from "react-redux";

const NoHeader = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const outlet = useOutlet();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <> {outlet}</>;
};

export default NoHeader;
