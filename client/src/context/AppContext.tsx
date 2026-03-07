import { createContext, useContext, useEffect, useState } from "react";
import type { AppContext as AppContextType, ProductType, ShopType, UserType } from "../types";
import { dummyProducts, dummyShops } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<UserType | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<ProductType[] | null>(null);
    const [shops, setShops] = useState<ShopType[] | null>(null);

    const navigate = useNavigate();
    axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
    axios.defaults.withCredentials = true;

    const register = async (firstName: string, lastName: string, email: string, password: string, phone: string) => {
        try {

            const { data } = await axios.post("/api/user/register", { firstName, lastName, email, password, phone })

            if (data.success) {
                toast.success(data.message);
                setUser(data.user)
                navigate("/", { replace: true })
            } else {
                toast.error(data.message)
            }
        } catch (error: any) {
            console.error("server register error: " + error.message)
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const { data } = await axios.post("/api/user/login", { email, password });
            if (data.success) {
                toast.success(data.message);
                setUser(data.user);
                navigate("/", { replace: true })
            } else {
                toast.error(data.message);
            }
        } catch (error: any) {
            console.log("Server Error : " + error.message)
            toast.error(error.message);
        }
    }

    const fetchUser = async () => {
        try {
            setAuthLoading(true);

            const { data } = await axios.get("/api/user/auth");

            if (data.success) {
                setUser(data.user);
            }

        } catch (error: any) {
            console.log(error.message);
        } finally {
            setAuthLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/user/logout");
            if (data.success) {
                setUser(null);
                toast.success(data.message)
            } else {
                toast.error(data.message);
            }
            setLoading(false)

        } catch (error: any) {
            console.error(error.message)
            toast.error(error.message);
        }
    }

    const fetchProducts = async () => {
        try {
            setLoading(true)
            setProducts(dummyProducts);
            setLoading(false);
        } catch (error: any) {
            console.error("Failed to fetch products : " + error.message);
        }
    }

    const fetchProductById = (id: string): ProductType | undefined => {
        const product = dummyProducts.find((item) => item._id === id);

        if (!product) return undefined;

        return product
    };

    const fetchShops = async () => {
        try {
            setLoading(true)
            setShops(dummyShops.filter(s=> s.status === "approved"));
            setLoading(false);
        } catch (error: any) {
            console.error("Failed to fetch shops : " + error.message);
        }
    }

    useEffect(() => {
        fetchUser();
        fetchProducts();
        fetchShops();
    }, []);

    return (
        <AppContext.Provider value={{ axios, navigate, user, setUser, loading, setLoading, logout, login, products, shops, fetchProductById, register,authLoading }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useApp must be used within AppProvider!");
    return ctx;
};