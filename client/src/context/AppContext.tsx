import { createContext, useContext, useEffect, useState } from "react";
import type { AppContext as AppContextType, UserType } from "../types";
import { dummyUsers } from "../assets/assets";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUser = async () => {
        try {
            setLoading(true);
            setUser(dummyUsers[4]);
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        try {
            setLoading(true);
            setUser(null);
            setLoading(false)

        } catch (error: any) {
            console.error(error.message)
        }
    }


    const farmerSignUp = async () => {
        try {

        } catch (error) {

        }
    }


    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AppContext.Provider value={{ user, setUser, loading, setLoading, logout, farmerSignUp }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useApp must be used within AppProvider!");
    return ctx;
};