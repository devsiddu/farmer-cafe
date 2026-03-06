import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext"



interface Props {
    allowedRoles: string[]
}


const ProtectRoute = ({ allowedRoles }: Props) => {

    const { user } = useApp();

    if (!allowedRoles.includes(user?.role!)) {
        return <Navigate to={"/"} replace />
    }

    return <Outlet />
}


export default ProtectRoute