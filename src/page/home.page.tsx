import React from "react";
import HeaderLayout from "../layouts/header.layout";
import CoinCardComponent from "../components/coin-card.component";
import { Grid, Loader } from "@mantine/core";
import { useGetAllPost } from "../hooks/useGetAllPost";
import PostCard from "../components/card/PostCard";

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
export const HomePage: React.FC = (): React.ReactElement => {
  const { data, isError, isLoading } = useGetAllPost();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <HeaderLayout />{" "}
      <Grid ml="lg" mr="lg">
        {COIN_CARDS.map((coin, index) => {
          return (
            <Grid.Col
              md={6}
              lg={6}
              style={{
                height: "160px",
                width: "400px",
              }}
              key={index}
            >
              <CoinCardComponent
                date={coin.date}
                logo={coin.image}
                name={coin.name}
              />
            </Grid.Col>
          );
        })}
      </Grid>
      {data?.map((item, index) => (
        <PostCard
          description={item.content}
          images={item.postResources}
          avatar="https://cdn.dribbble.com/userupload/10064008/file/original-ed9f97edacf253ce306dbca6adbbb5ff.png?resize=752x752"
          location="Caizo, egypt"
          name="imozix"
          key={index}
        />
      ))}
    </>
  );
};
