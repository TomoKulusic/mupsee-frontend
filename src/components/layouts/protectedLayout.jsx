import { Link, Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../../services/useAuth";
import ToolbarComponent from "../toolbar/toolbar";

export const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div className="toolbar">
        <ToolbarComponent></ToolbarComponent>
      </div>
      <div className="page">{outlet}</div>
    </div>

    // <div>
    //   <AppBar
    //     pages={[
    //       { label: "Settings", path: "settings" },
    //       { label: "Profile", path: "profile" }
    //     ]}
    //   />
    //   {outlet}
    // </div>
  );
};
