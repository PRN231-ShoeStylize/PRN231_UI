import React from "react";
import { Grid, Loader, createStyles, rem } from "@mantine/core";
import { useGetAllPost } from "../hooks/useGetAllPost";
import PostCard, { PostCardType } from "../components/card/PostCard";

export const HomePage: React.FC = (): React.ReactElement => {
  const { data, isError, isLoading } = useGetAllPost();
  const { classes } = useStyles();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {data?.map((item, index) => (
        <div key={index} className={classes.post_wrapper}>
          <PostCard
            description={item.content}
            images={item.postResources}
            avatar="https://cdn.dribbble.com/userupload/10064008/file/original-ed9f97edacf253ce306dbca6adbbb5ff.png?resize=752x752"
            location="Caizo, egypt"
            name="imozix"
            postType={PostCardType.PROPOSAL}
          />
        </div>
      ))}
    </>
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
