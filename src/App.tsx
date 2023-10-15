import "./App.css";
import { MantineProvider } from "@mantine/core";

import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
import { QueryClient, QueryClientProvider } from "react-query";

const COIN_CARDS = [
  {
    image: "/coin-logos/doge-icon.svg",
    name: "Doge coin",
    date: "1/1/2021",
  },
  {
    image: "/coin-logos/bitcoin-icon.svg",
    name: "Bitcoin",
    date: "1/1/2010",
  },
] as {
  image: string;
  name: string;
  date: string;
}[];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
