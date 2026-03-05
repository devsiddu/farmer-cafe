import { useState } from "react";

type Mode = "login" | "register";

const Login = () => {
    const [mode, setMode] = useState<Mode>("login");

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: connect to backend
        console.log({ mode, form });
    };

    const isRegister = mode === "register";

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

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                    {isRegister && (
                        <div className="flex gap-4">
                            <div>
                                <label className="text-xs font-medium text-gray-500 mb-1 block">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary transition"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-500 mb-1 block">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Doe"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary transition"
                                />
                            </div>
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