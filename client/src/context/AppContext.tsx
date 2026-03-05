import { createContext, useContext, useEffect, useState } from "react";
import type { AppContext as AppContextType, ProductType, ShopType, UserType } from "../types";
import { dummyProducts, dummyShops, dummyUsers } from "../assets/assets";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductType[] | null>(null);
    const [shops, setShops] = useState<ShopType[] | null>(null);

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
            setShops(dummyShops);
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
        <AppContext.Provider value={{ user, setUser, loading, setLoading, logout, farmerSignUp, products, shops, fetchProductById }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useApp must be used within AppProvider!");
    return ctx;
};