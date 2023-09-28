import "./App.css";
import { MantineProvider } from "@mantine/core";

import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
import { Notifications } from "@mantine/notifications";

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

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Notifications limit={5} autoClose={4000}/>
        <AppRoute />
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
