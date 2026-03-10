import { useEffect, useState } from "react";

// navigator.connection is non-standard — needs manual type
interface NetworkInformation extends EventTarget {
  effectiveType: "slow-2g" | "2g" | "3g" | "4g";
  addEventListener(type: "change", listener: () => void): void;
  removeEventListener(type: "change", listener: () => void): void;
}

declare global {
  interface Navigator {
    connection?: NetworkInformation;
  }
}

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    const updateOnline = () => setIsOnline(true);
    const updateOffline = () => setIsOnline(false);

    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOffline);

    const connection = navigator.connection;

    const checkSpeed = () => {
      if (!connection) return;
      const slowTypes = ["slow-2g", "2g"];
      setIsSlow(slowTypes.includes(connection.effectiveType));
    };

    if (connection) {
      checkSpeed(); // run once on mount
      connection.addEventListener("change", checkSpeed);
    }

    return () => {
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOffline);
      // ✅ also clean up connection listener
      connection?.removeEventListener("change", checkSpeed);
    };
  }, []);

  return { isOnline, isSlow };
};
