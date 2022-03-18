
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/UseAuth";

/*Its going to be a boolean : is the user logged in or not*/
const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
             auth?.user ? 
                 <Outlet />
                : <Navigate to="/signin" state={{ from: location }} replace />
    );
}

export default RequireAuth;