import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { LogOut, RefreshCw, Mail, Clock, ArrowLeft } from "lucide-react";

const ApprovalLoader = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-linear-to-b from-amber-50 via-orange-50 to-yellow-50 overflow-hidden px-4">

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes ping-slow {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.9); opacity: 0;   }
        }
        @keyframes fadeSlideUp {
          0%   { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0);    }
        }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }

        .float-icon  { animation: float 3s ease-in-out infinite; }
        .spin-ring   { animation: spin-slow 8s linear infinite; }
        .ping-ring   { animation: ping-slow 2s ease-out infinite; }

        .fade-1 { animation: fadeSlideUp 0.5s ease-out 0.1s both; }
        .fade-2 { animation: fadeSlideUp 0.5s ease-out 0.25s both; }
        .fade-3 { animation: fadeSlideUp 0.5s ease-out 0.4s both; }
        .fade-4 { animation: fadeSlideUp 0.5s ease-out 0.55s both; }
        .fade-5 { animation: fadeSlideUp 0.5s ease-out 0.7s both; }
      `}</style>

      {/* Background decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-amber-200/30 blur-2xl" />
      <div className="absolute bottom-16 right-10 w-40 h-40 rounded-full bg-orange-200/30 blur-2xl" />
      <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-yellow-200/20 blur-xl" />

      {/* Card */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden border border-amber-100">

        {/* Top accent */}
        <div className="h-1.5 w-full bg-linear-to-r from-amber-400 via-orange-400 to-amber-400" />

        <div className="px-8 py-8 flex flex-col items-center text-center">

          {/* Animated clock icon */}
          <div className="relative mb-7 fade-1">
            {/* Outer ping ring */}
            <div className="absolute inset-0 w-20 h-20 rounded-full bg-amber-300/40 ping-ring" />
            {/* Spinning dashed ring */}
            <svg className="absolute -inset-3 spin-ring" width="104" height="104" viewBox="0 0 104 104">
              <circle
                cx="52" cy="52" r="48"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                fill="none"
                opacity="0.5"
              />
            </svg>
            {/* Icon container */}
            <div className="relative w-20 h-20 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center float-icon">
              <Clock className="w-9 h-9 text-amber-500" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-xl font-bold text-gray-800 leading-snug fade-2">
            Awaiting Admin Approval
          </h1>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed fade-3">
            Your account has been created successfully. An admin will review and approve your shop registration shortly.
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
              <span className="ml-auto shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                Pending
              </span>
            </div>
          )}

          {/* Steps */}
          <div className="w-full mt-5 fade-4">
            {[
              { step: 1, label: "Account Created", done: true },
              { step: 2, label: "Admin Review", done: false },
              { step: 3, label: "Shop Access Granted", done: false },
            ].map(({ step, label, done }, i) => (
              <div key={step} className="flex items-center gap-3 mb-2 last:mb-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${done
                    ? "bg-green-500 text-white"
                    : step === 2
                      ? "bg-amber-400 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}>
                  {done ? "✓" : step}
                </div>
                <div className="flex-1 h-px bg-gray-100" style={{ display: i === 2 ? "none" : "block" }} />
                <p className={`text-xs font-medium flex-1 text-left ${done ? "text-green-600" : step === 2 ? "text-amber-600" : "text-gray-400"
                  }`}>
                  {label}
                  {step === 2 && (
                    <span className="ml-1.5 text-[10px] bg-amber-50 text-amber-500 px-1.5 py-0.5 rounded-full border border-amber-100">
                      In Progress
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Info note */}
          <div className="w-full mt-5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-start gap-2.5 fade-4">
            <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-600 leading-relaxed text-left">
              You'll receive a notification once your account is approved. This usually takes <strong>24–48 hours</strong>.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 w-full mt-6 fade-5">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
            <button
              onClick={() => { logout(); navigate("/login"); }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-amber-500 text-white hover:bg-amber-600 transition active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ApprovalLoader;