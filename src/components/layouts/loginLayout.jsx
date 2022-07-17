import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../../services/useAuth";

export const HomeLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  //   if (user) {
  //     return <Navigate to="/mupsee/dashboard" replace />;
  //   }

  return <div>{outlet}</div>;
};
