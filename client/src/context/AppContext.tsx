import { createContext, useContext, useEffect, useState } from "react";
import type { AppContext as AppContextType, ProductType, ShopType, UserType } from "../types";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<UserType | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [shops, setShops] = useState<ShopType[]>([]);
    const [shop, setShop] = useState<ShopType | null>(null);

    const navigate = useNavigate();
    axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
    axios.defaults.withCredentials = true;

    const websiteEmail = import.meta.env.VITE_WEBSITE_EMAIL;

    const register = async (firstName: string, lastName: string, email: string, password: string, phone: string, location: string) => {
        try {

            const { data } = await axios.post("/api/user/register", { firstName, lastName, email, password, phone, location })

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
            const { data } = await axios.get("/api/products");
            if (data.success) {
                setProducts(data.products)
            } else {
                toast.error(data.message)
                setProducts([]);
            }
            setLoading(false);
        } catch (error: any) {
            console.error("Failed to fetch products : " + error.message);
        }
    }

    const fetchProductById = async (id: string): Promise<ProductType | undefined> => {
        try {
            const { data } = await axios.get(`/api/products/${id}`);

            if (!data.success) {
                toast.error(data.message);
                return undefined;
            }
            return data.product;
        } catch (error) {
            toast.error("Failed to fetch product");
            return undefined;
        }
    };

    const fetchShops = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get("/api/shop");
            if (data.success) {
                setShops(data.shops)
            } else {
                toast.error(data.message);
            }
            setLoading(false);
        } catch (error: any) {
            console.error("Failed to fetch shops : " + error.message);
        }
    }

    const fetchUserShop = async () => {
        try {
            const { data } = await axios.get("/api/shop/user");
            if (data.success) {
                setShop(data.shop);
            } else {
                toast.error(data.message);
            }
        } catch (error: any) {
            console.error("Failed to fetch user shop :" + error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchUser();
        fetchProducts();
        fetchShops();
        fetchUserShop();
        fetchProducts();
    }, [navigate]);

    return (
        <AppContext.Provider value={{ axios, websiteEmail, navigate, user, setUser, loading, setLoading, logout, login, products,setProducts, shops, fetchProductById, register, authLoading, fetchUser, shop }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useApp must be used within AppProvider!");
    return ctx;
};