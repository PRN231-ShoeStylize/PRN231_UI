import React from "react";
import { Grid, Loader, createStyles, rem } from "@mantine/core";
import { useGetAllPost } from "../hooks/useGetAllPost";
import PostCard, { PostCardType } from "../components/card/PostCard";

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
  const { classes } = useStyles();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      {data?.map((item, index) => (
        <div key={index} className={classes.post_wrapper}>
          <PostCard
            description={item.content}
            images={item.postResources}
            location="Caizo, egypt"
            postType={PostCardType.PROPOSAL}
            ownerId={item?.onwerId}
          />
        </div>
      ))}
    </div>
  );
};

const useStyles = createStyles({
  post_wrapper: {
    marginBottom: rem(32),
    marginLeft: rem(286),
    marginTop: rem(32),
  },
});

export default HomePage;
