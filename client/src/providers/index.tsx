import AppRouter from "./router";
import { TanstackQueryProvider } from "./tanstackquery";
import SocketProvider from "./socket";

const AppProviders = () => {
  return (
    <>
      <TanstackQueryProvider>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </TanstackQueryProvider>
    </>
  );
};

export default AppProviders;
