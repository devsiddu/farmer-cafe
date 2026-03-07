import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Loader from "../components/Loader";

interface Props {
    allowedRoles: string[];
}

const ProtectRoute = ({ allowedRoles }: Props) => {

    const { user, authLoading } = useApp();

    if (authLoading) {
        return <Loader />;
    }

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectRoute;