import { useNetworkStatus } from "../hooks/useNetworkStatus";

export default function NetworkBanner() {
    const { isOnline, isSlow } = useNetworkStatus();

    if (!isOnline) {
        return (
            <div className="fixed top-0 left-0 w-full bg-red-600 text-white text-center p-2 z-50">
                ⚠️ No Internet Connection
            </div>
        );
    }

    if (isSlow) {
        return (
            <div className="fixed top-0 left-0 w-full bg-yellow-500 text-black text-center p-2 z-50">
                🐢 Slow Network Detected
            </div>
        );
    }

    return null;
}