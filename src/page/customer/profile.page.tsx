import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import {
  Avatar,
  Divider,
  Grid,
  Image,
  Modal,
  Tabs,
  Tooltip,
  createStyles,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconMessageCircle,
  IconPhoto,
  IconSettings,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import PostCard, { PostCardType } from "../../components/card/PostCard";
import { useGetPostByUserId } from "../../hooks/useGetPostByUserId";
import { TOKEN } from "../../constants/constants";
import jwtDecode from "jwt-decode";
import { decode, isTokenValid } from "../../utils/jwt";
import { GetPostResult } from "../../api/post/post.model";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isLoading } = useGetPostByUserId(
    +decode(isTokenValid() ?? "")[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ]
  );

  const renderImageGallery = (tooltip: string, posts: GetPostResult[]) => {
    return posts?.map((item, index) => (
      <Grid.Col span={2} key={index}>
        <Tooltip label={tooltip}>
          {item.postResources ? (
            <Carousel maw={320}>
              {item.postResources?.map((url, i) => (
                <Carousel.Slide key={i}>
                  <Image
                    onClick={open}
                    className={classes.image}
                    radius={"md"}
                    src={url}
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          ) : (
            <p>{item.content}</p>
          )}
        </Tooltip>
      </Grid.Col>
    ));
  };

  const renderProposalList = () => {
    return [1, 2, 3, 4].map((item, index) => <></>);
  };

  return (
    <div>
      <Modal size={1000} opened={opened} onClose={close}>
        <PostCard
          description={"discription"}
          images={[
            "https://cdn.dribbble.com/users/310241/screenshots/17122713/media/a22aca99333b76e4c03de79bde82f443.png",
            "https://cdn.dribbble.com/userupload/10793974/file/still-5197c203b4cc4ef6ea30354e0f221d3e.png",
            "https://cdn.dribbble.com/userupload/10793974/file/still-5197c203b4cc4ef6ea30354e0f221d3e.png",
            "https://cdn.dribbble.com/userupload/10793974/file/still-5197c203b4cc4ef6ea30354e0f221d3e.png",
          ]}
          avatar="https://cdn.dribbble.com/userupload/10064008/file/original-ed9f97edacf253ce306dbca6adbbb5ff.png?resize=752x752"
          location="Caizo, egypt"
          name="imozix"
          postType={PostCardType.POST}
        />
      </Modal>

      <div className={classes.avatar_wrapper}>
        <Avatar
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
          size={160}
          radius={999}
        />
        <p className={classes.name}>Hello_its_me</p>
      </div>
      <Tabs defaultValue="gallery">
        <Tabs.List>
          <Tabs.Tab value="gallery" icon={<IconPhoto size="0.8rem" />}>
            Gallery
          </Tabs.Tab>
          <Tabs.Tab value="messages" icon={<IconMessageCircle size="0.8rem" />}>
            Messages
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery" pt="xs">
          <Grid>{renderImageGallery("Proposal list", data ?? [])}</Grid>
          <p className={classes.title}>Active proposal</p>
          <Divider my="sm" />
          {/* <Grid>{renderImageGallery("Proposal list")}</Grid> */}
        </Tabs.Panel>

        <Tabs.Panel value="messages" pt="xs">
          Messages tab content
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

const useStyles = createStyles({
  avatar_wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  name: {
    fontWeight: 500,
    marginTop: rem(12),
    fontSize: rem(16),
  },
  carousel: {},
  image: {
    cursor: "pointer",
    "&:hover": {
      opacity: 0.6,
    },
    transition: ".5s ease",
  },
  title: {
    fontSize: rem(18),
    fontWeight: 600,
    marginTop: rem(32),
    marginBottom: rem(16),
  },
});

export default ProfilePage;
