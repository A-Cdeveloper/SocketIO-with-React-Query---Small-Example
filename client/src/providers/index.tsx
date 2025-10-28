import AppRouter from "./router";
import { TanstackQueryProvider } from "./tanstackquery";
import { useSocket } from "@/hooks/useSocket";

const AppProviders = () => {
  // Initialize Socket.IO connection
  useSocket();

  return (
    <>
      <TanstackQueryProvider>
        <AppRouter />
      </TanstackQueryProvider>
    </>
  );
};

export default AppProviders;
