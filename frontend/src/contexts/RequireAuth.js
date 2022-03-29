import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RequireAuth = ( ) => {
    const location = useLocation();
    const {user} = useAuth();
    console.log(user);

    return (
            (user) 
                ? <Outlet/>
                : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;