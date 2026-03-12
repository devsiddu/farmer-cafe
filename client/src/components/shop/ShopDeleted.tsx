import { useNavigate } from "react-router-dom";
import { LogOut, RefreshCw, Mail, AlertTriangle, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";

const ShopDeleted = () => {
    const { user, logout, websiteEmail } = useApp();
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-200 flex items-center justify-center bg-linear-to-b from-red-50 via-rose-50 to-orange-50 overflow-hidden px-4">

            <style>{`
        @keyframes float-sad {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0);    }
          20%       { transform: translateX(-4px); }
          40%       { transform: translateX(4px);  }
          60%       { transform: translateX(-3px); }
          80%       { transform: translateX(3px);  }
        }
        @keyframes ping-red {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(2);   opacity: 0;   }
        }
        @keyframes fadeSlideUp {
          0%   { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0);    }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }

        .float-sad  { animation: float-sad 3.5s ease-in-out infinite; }
        .shake-once { animation: shake 0.6s ease-in-out 0.8s both; }
        .ping-red   { animation: ping-red 2s ease-out infinite; }
        .spin-ring  { animation: spin-slow 10s linear infinite; }

        .fade-1 { animation: fadeSlideUp 0.5s ease-out 0.1s both; }
        .fade-2 { animation: fadeSlideUp 0.5s ease-out 0.25s both; }
        .fade-3 { animation: fadeSlideUp 0.5s ease-out 0.4s both; }
        .fade-4 { animation: fadeSlideUp 0.5s ease-out 0.55s both; }
        .fade-5 { animation: fadeSlideUp 0.5s ease-out 0.7s both; }
      `}</style>

            {/* Background blobs */}
            <div className="absolute top-10  left-10  w-36 h-36 rounded-full bg-red-200/30   blur-2xl" />
            <div className="absolute bottom-16 right-8  w-44 h-44 rounded-full bg-rose-200/25  blur-2xl" />
            <div className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full bg-orange-200/20 blur-xl" />

            {/* Card */}
            <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden border border-red-100">

                {/* Top accent */}
                <div className="h-1.5 w-full bg-linear-to-r from-red-400 via-rose-500 to-red-400" />

                <div className="px-8 py-8 flex flex-col items-center text-center">

                    {/* Animated icon */}
                    <div className="relative mb-7 fade-1">
                        {/* Ping ring */}
                        <div className="absolute inset-0 w-20 h-20 rounded-full bg-red-300/40 ping-red" />
                        {/* Spinning dashed ring */}
                        <svg className="absolute -inset-3 spin-ring" width="104" height="104" viewBox="0 0 104 104">
                            <circle
                                cx="52" cy="52" r="48"
                                stroke="#f87171"
                                strokeWidth="1.5"
                                strokeDasharray="5 5"
                                fill="none"
                                opacity="0.4"
                            />
                        </svg>
                        {/* Shop deleted SVG illustration */}
                        <div className="relative w-20 h-20 rounded-2xl bg-red-50 border-2 border-red-200 flex items-center justify-center float-sad shake-once">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                {/* Shop building */}
                                <rect x="6" y="18" width="28" height="16" rx="2" fill="#fecaca" stroke="#f87171" strokeWidth="1.5" />
                                <rect x="15" y="24" width="10" height="10" rx="1" fill="#f87171" opacity="0.6" />
                                {/* Roof */}
                                <path d="M4 19L20 8l16 11" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" fill="#fee2e2" />
                                {/* X cross over shop */}
                                <line x1="10" y1="10" x2="30" y2="30" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                                <line x1="30" y1="10" x2="10" y2="30" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-xl font-bold text-gray-800 fade-2">
                        Your Shop Has Been Removed
                    </h1>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed fade-3">
                        An admin has deleted your shop from the platform. Your products and listings are no longer available.
                    </p>

                    {/* User info */}
                    {user && (
                        <div className="w-full mt-5 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 flex items-center gap-3 fade-3">
                            <img
                                src={user.imageUrl}
                                alt="profile"
                                className="w-9 h-9 rounded-full object-cover border border-gray-200 shrink-0"
                            />
                            <div className="text-left min-w-0">
                                <p className="text-sm font-semibold text-gray-700 truncate">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="text-xs text-gray-400 truncate">{user.email}</p>
                            </div>
                            <span className="ml-auto shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-500 border border-red-200">
                                Shop Removed
                            </span>
                        </div>
                    )}

                    {/* Reason box */}
                    <div className="w-full mt-5 bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-start gap-2.5 fade-4">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-red-600 leading-relaxed text-left">
                            This may be due to a <strong>policy violation</strong>, inactivity, or an administrative decision. Contact support for more information.
                        </p>
                    </div>

                    {/* Contact note */}
                    <div className="w-full mt-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-start gap-2.5 fade-4">
                        <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-600 leading-relaxed text-left">
                            To appeal or re-register your shop, reach out to us at{" "}
                            <a
                                href={`mailto:${websiteEmail}`}
                                className="font-semibold underline hover:text-blue-800 transition"
                            >
                                {websiteEmail}
                            </a>
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 w-full mt-6 fade-5">
                        <button
                            onClick={() => window.location.reload()}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition active:scale-95"
                        >
                            <RefreshCw className="w-3.5 h-3.5" />
                            Refresh
                        </button>
                        <button
                            onClick={() => { logout(); navigate("/login"); }}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition active:scale-95"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            Logout
                        </button>
                    </div>
                    {/* Re-register link */}
                    <button
                        onClick={() => { navigate("/"); }}
                        className="mt-3 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold border border-primary/20 text-primary hover:bg-primary/5 transition active:scale-95 fade-5"
                    >
                        Back
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShopDeleted;