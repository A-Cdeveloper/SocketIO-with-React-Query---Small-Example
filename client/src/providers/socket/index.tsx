import { useSocket } from "@/hooks/useSocket";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize Socket.IO connection
  useSocket();

  return <>{children}</>;
};

export default SocketProvider;
