const Loader = () => {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-b from-emerald-50 via-green-50 to-lime-50 overflow-hidden">

      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-4deg); }
          50%       { transform: rotate(4deg);  }
        }
        @keyframes sway2 {
          0%, 100% { transform: rotate(3deg);  }
          50%       { transform: rotate(-3deg); }
        }
        @keyframes floatUp {
          0%   { transform: translateY(0px) rotate(0deg);   opacity: 0.9; }
          100% { transform: translateY(-80px) rotate(20deg); opacity: 0;   }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0);   }
          50%       { transform: translateY(-8px); }
        }
        @keyframes grow {
          0%   { transform: scaleY(0); opacity: 0; }
          100% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes fadeSlideUp {
          0%   { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0);    }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.4; }
          100% { transform: scale(1.8); opacity: 0;   }
        }
        @keyframes dot-wave {
          0%, 80%, 100% { transform: scaleY(0.4); }
          40%            { transform: scaleY(1);   }
        }
        @keyframes leaf-fall {
          0%   { transform: translateY(-10px) rotate(0deg);  opacity: 0; }
          10%  { opacity: 1; }
          100% { transform: translateY(60px) rotate(120deg); opacity: 0; }
        }

        .tree-sway       { animation: sway 3s ease-in-out infinite; transform-origin: bottom center; }
        .tree-sway-2     { animation: sway2 3.5s ease-in-out infinite; transform-origin: bottom center; }
        .float-particle  { animation: floatUp 2.5s ease-in infinite; }
        .bag-bounce      { animation: bounce-slow 2s ease-in-out infinite; }
        .stem-grow       { animation: grow 1s ease-out forwards; transform-origin: bottom; }
        .fade-up         { animation: fadeSlideUp 0.8s ease-out forwards; }
        .pulse-ring      { animation: pulse-ring 1.8s ease-out infinite; }

        .dot1 { animation: dot-wave 1.2s ease-in-out infinite 0s;    }
        .dot2 { animation: dot-wave 1.2s ease-in-out infinite 0.2s;  }
        .dot3 { animation: dot-wave 1.2s ease-in-out infinite 0.4s;  }

        .leaf1 { animation: leaf-fall 3s ease-in infinite 0s;   }
        .leaf2 { animation: leaf-fall 3s ease-in infinite 0.8s; }
        .leaf3 { animation: leaf-fall 3s ease-in infinite 1.6s; }
      `}</style>

      {/* Ground strip */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-200/60 to-transparent" />

      {/* ── Scene ── */}
      <div className="relative flex items-end justify-center gap-8 mb-10" style={{ height: 180 }}>

        {/* Left small tree */}
        <div className="tree-sway-2 flex flex-col items-center" style={{ marginBottom: 0 }}>
          <svg width="56" height="130" viewBox="0 0 56 130" fill="none">
            {/* Trunk */}
            <rect x="24" y="95" width="8" height="35" rx="4" fill="#92400e" />
            {/* Bottom layer */}
            <ellipse cx="28" cy="90" rx="22" ry="16" fill="#16a34a" />
            {/* Mid layer */}
            <ellipse cx="28" cy="68" rx="18" ry="14" fill="#15803d" />
            {/* Top layer */}
            <ellipse cx="28" cy="50" rx="13" ry="11" fill="#166534" />
            {/* Top tip */}
            <ellipse cx="28" cy="36" rx="8" ry="8" fill="#14532d" />
            {/* Highlight dots */}
            <circle cx="20" cy="62" r="3" fill="#4ade80" opacity="0.5" />
            <circle cx="34" cy="75" r="2" fill="#4ade80" opacity="0.4" />
          </svg>
          {/* Falling leaves */}
          <div className="absolute top-8 left-2 leaf1">
            <svg width="10" height="10" viewBox="0 0 10 10"><ellipse cx="5" cy="5" rx="4" ry="2" fill="#4ade80" transform="rotate(30 5 5)"/></svg>
          </div>
          <div className="absolute top-4 right-1 leaf2">
            <svg width="8" height="8" viewBox="0 0 8 8"><ellipse cx="4" cy="4" rx="3" ry="1.5" fill="#86efac" transform="rotate(-20 4 4)"/></svg>
          </div>
        </div>

        {/* Center: Fertilizer bag + pulse */}
        <div className="flex flex-col items-center relative" style={{ marginBottom: 8 }}>
          {/* Pulse ring */}
          <div className="absolute bottom-0 w-16 h-16 rounded-full bg-primary/20 pulse-ring" />

          {/* Floating particles */}
          <div className="absolute -top-4 left-2 float-particle" style={{ animationDelay: "0s" }}>
            <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="#a3e635" opacity="0.8"/></svg>
          </div>
          <div className="absolute -top-2 right-0 float-particle" style={{ animationDelay: "0.8s" }}>
            <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill="#4ade80" opacity="0.7"/></svg>
          </div>
          <div className="absolute top-0 left-8 float-particle" style={{ animationDelay: "1.5s" }}>
            <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="2.5" fill="#86efac" opacity="0.6"/></svg>
          </div>

          {/* Fertilizer Bag SVG */}
          <div className="bag-bounce">
            <svg width="90" height="110" viewBox="0 0 90 110" fill="none">
              {/* Bag body */}
              <rect x="10" y="25" width="70" height="78" rx="10" fill="#16a34a"/>
              {/* Bag shine */}
              <rect x="10" y="25" width="70" height="20" rx="10" fill="#15803d"/>
              {/* Bag tie top */}
              <rect x="30" y="12" width="30" height="16" rx="6" fill="#166534"/>
              {/* Tie knot */}
              <ellipse cx="45" cy="14" rx="10" ry="5" fill="#14532d"/>
              {/* Label white box */}
              <rect x="18" y="48" width="54" height="40" rx="6" fill="white" opacity="0.92"/>
              {/* NPK text */}
              <text x="45" y="64" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d" fontFamily="monospace">NPK</text>
              {/* Leaf icon on label */}
              <ellipse cx="31" cy="78" rx="7" ry="4" fill="#4ade80" transform="rotate(-30 31 78)"/>
              <line x1="31" y1="78" x2="31" y2="85" stroke="#16a34a" strokeWidth="1.5"/>
              {/* 20-20-20 text */}
              <text x="52" y="80" textAnchor="middle" fontSize="8" fill="#166534" fontFamily="monospace">20-20-20</text>
              {/* Bottom stripe */}
              <rect x="10" y="92" width="70" height="11" rx="0" fill="#15803d"/>
              <rect x="10" y="98" width="70" height="5" rx="0" fill="#166534"/>
              {/* Bottom round */}
              <rect x="10" y="95" width="70" height="8" rx="5" fill="#166534"/>
              {/* Dots pattern on bag */}
              <circle cx="20" cy="36" r="2" fill="#4ade80" opacity="0.4"/>
              <circle cx="70" cy="36" r="2" fill="#4ade80" opacity="0.4"/>
            </svg>
          </div>
        </div>

        {/* Right big tree */}
        <div className="tree-sway flex flex-col items-center">
          <svg width="72" height="155" viewBox="0 0 72 155" fill="none">
            {/* Trunk */}
            <rect x="30" y="115" width="12" height="40" rx="5" fill="#92400e"/>
            {/* Root hints */}
            <ellipse cx="24" cy="153" rx="10" ry="3" fill="#78350f" opacity="0.5"/>
            <ellipse cx="48" cy="153" rx="10" ry="3" fill="#78350f" opacity="0.5"/>
            {/* Bottom layer */}
            <ellipse cx="36" cy="108" rx="28" ry="20" fill="#16a34a"/>
            {/* Mid layer */}
            <ellipse cx="36" cy="82" rx="23" ry="18" fill="#15803d"/>
            {/* Upper layer */}
            <ellipse cx="36" cy="58" rx="18" ry="15" fill="#166534"/>
            {/* Near top */}
            <ellipse cx="36" cy="38" rx="12" ry="11" fill="#14532d"/>
            {/* Tip */}
            <ellipse cx="36" cy="22" rx="7" ry="8" fill="#052e16"/>
            {/* Highlights */}
            <circle cx="25" cy="78" r="4"  fill="#4ade80" opacity="0.4"/>
            <circle cx="46" cy="95" r="3"  fill="#86efac" opacity="0.35"/>
            <circle cx="30" cy="52" r="3"  fill="#4ade80" opacity="0.3"/>
            {/* Coconuts */}
            <circle cx="30" cy="100" r="4" fill="#92400e"/>
            <circle cx="42" cy="103" r="3.5" fill="#78350f"/>
          </svg>
          {/* Falling leaves */}
          <div className="absolute top-6 right-2 leaf3">
            <svg width="12" height="12" viewBox="0 0 12 12"><ellipse cx="6" cy="6" rx="5" ry="2.5" fill="#4ade80" transform="rotate(45 6 6)"/></svg>
          </div>
        </div>

      </div>

      {/* ── Logo / Brand ── */}
      <div className="fade-up flex flex-col items-center gap-2" style={{ animationDelay: "0.2s", opacity: 0 }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12a10 10 0 0 1 10-10z"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">
            Farmers<span className="text-secondary">Cafe</span>
          </h1>
        </div>
        <p className="text-xs text-gray-400 tracking-widest uppercase">
          Growing together
        </p>
      </div>

      {/* ── Loading dots ── */}
      <div className="flex items-center gap-1.5 mt-8">
        <div className="dot1 w-2 h-6 bg-primary rounded-full" />
        <div className="dot2 w-2 h-6 bg-secondary rounded-full" />
        <div className="dot3 w-2 h-6 bg-primary/60 rounded-full" />
      </div>

      <p className="text-xs text-gray-400 mt-3 tracking-wide">
        Loading your farm store...
      </p>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 opacity-20">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" stroke="#16a34a" strokeWidth="2" strokeDasharray="4 4"/>
        </svg>
      </div>
      <div className="absolute bottom-24 right-8 opacity-15">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <circle cx="15" cy="15" r="13" stroke="#15803d" strokeWidth="2" strokeDasharray="3 3"/>
        </svg>
      </div>
      <div className="absolute top-1/4 right-12 opacity-10">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="28" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="5 5"/>
        </svg>
      </div>

    </div>
  );
};

export default Loader;