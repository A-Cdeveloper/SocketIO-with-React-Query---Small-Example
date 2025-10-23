import AppRouter from "./router";
import { TanstackQueryProvider } from "./tanstackquery";

const AppProviders = () => {
  return (
    <>
      <TanstackQueryProvider>
        <AppRouter />
      </TanstackQueryProvider>
    </>
  );
};

export default AppProviders;
