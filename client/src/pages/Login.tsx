import { useState } from "react";

type Mode = "login" | "register";
type Role = "farmer" | "owner";

const Login = () => {
    const [mode, setMode] = useState<Mode>("login");
    const [role, setRole] = useState<Role>("farmer");

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        // owner only
        shopName: "",
        location: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: connect to backend
        console.log({ mode, role, form });
    };

    const isRegister = mode === "register";
    const isOwner = role === "owner";

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-sm p-8">

                {/* Logo / Title */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-primary">Farmer Cafe</h1>
                    <p className="text-sm text-gray-400 mt-1">
                        {isRegister ? "Create your account" : "Welcome back"}
                    </p>
                </div>

                {/* Role Toggle */}
                <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                    <button
                        onClick={() => setRole("farmer")}
                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${role === "farmer"
                                ? "bg-white text-primary shadow-sm"
                                : "text-gray-400 hover:text-gray-600"
                            }`}
                    >
                        🌾 Farmer
                    </button>
                    <button
                        onClick={() => setRole("owner")}
                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${role === "owner"
                                ? "bg-white text-primary shadow-sm"
                                : "text-gray-400 hover:text-gray-600"
                            }`}
                    >
                        🏪 Shop Owner
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                    {isRegister && (
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary transition"
                            />
                        </div>
                    )}

                    <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary transition"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary transition"
                        />
                    </div>

                    {isRegister && (
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">
                                Phone
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="+91 98765 43210"
                                value={form.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary transition"
                            />
                        </div>
                    )}

                    {/* Owner-only fields */}
                    {isRegister && isOwner && (
                        <>
                            <div className="h-px bg-gray-100 my-1" />
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                Shop Details
                            </p>

                            <div>
                                <label className="text-xs font-medium text-gray-500 mb-1 block">
                                    Shop Name
                                </label>
                                <input
                                    type="text"
                                    name="shopName"
                                    placeholder="Green Fields Store"
                                    value={form.shopName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary transition"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-500 mb-1 block">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Village, District"
                                    value={form.location}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary transition"
                                />
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full mt-2 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-200"
                    >
                        {isRegister ? "Create Account" : "Login"}
                    </button>
                </form>

                {/* Toggle mode */}
                <p className="text-center text-sm text-gray-400 mt-5">
                    {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                        onClick={() => setMode(isRegister ? "login" : "register")}
                        className="text-primary font-semibold hover:underline"
                    >
                        {isRegister ? "Login" : "Register"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;