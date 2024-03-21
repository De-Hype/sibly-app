import Cookies from "js-cookie";
import {Outlet, Navigate} from "react-router-dom";

const PrivateRoutes = () => {
    const user = Cookies.get("sibly_user");

  return (
    user ? <Outlet /> : <Navigate to="/login" />
  )
}

export default PrivateRoutes
