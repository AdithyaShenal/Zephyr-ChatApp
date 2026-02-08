import NavBar from "@/components/Navbar/NavBar";
import { useAuth } from "@/hooks/useAuth";
import LoadingPage from "@/pages/LoadingPage";
import { connectSocket, disconnectSocket } from "@/services/socketClient";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { setupSocketListeners } from "@/services/socketListeners";

const PrivateLayout = () => {
  const { data: user, isLoading, isError } = useAuth();
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    if (!user) return;
    setUser(user);
  }, [user, setUser]);

  useEffect(() => {
    if (!user) return;

    console.log("🔌 Connecting socket for user:", user._id);
    const socket = connectSocket(user._id);

    // Set up all listeners once
    setupSocketListeners(socket);

    return () => {
      console.log("🔌 Disconnecting socket");
      disconnectSocket();
    };
  }, [user]);

  if (isLoading) return <LoadingPage />;

  if (!user && isError) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-screen flex flex-col min-h-0">
      <header className="shrink-0">
        <NavBar />
      </header>
      <main className="flex-1 min-h-0">
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
