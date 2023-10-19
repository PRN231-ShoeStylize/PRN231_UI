import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Image,
  Tooltip,
  createStyles,
  rem,
} from "@mantine/core";
import {
  IconDots,
  IconMessageShare,
  IconSquareRoundedPlus,
} from "@tabler/icons-react";
import { FileWithPath } from "@mantine/dropzone";
import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";

function isFileWithPath(pet: FileWithPath | string): pet is FileWithPath {
  return (pet as FileWithPath).path !== undefined;
}

export enum PostCardType {
  POST = "POST",
  PROPOSAL = "PROPOSAL",
  DEMO = "DEMO",
}

export type PostCardProps = {
  avatar: string;
  name: string;
  location: string;
  description: string;
  images: FileWithPath[] | string[];
  postType: PostCardType;
};

const PostCard = ({
  avatar,
  description,
  images,
  location,
  name,
  postType,
}: PostCardProps) => {
  const [data, setData] = useState<{
    chatToolTip: string;
    createToolTip: string;
  }>({ chatToolTip: "Demo", createToolTip: "Demo" });

  useEffect(() => {
    switch (postType) {
      case PostCardType.POST:
        setData({
          chatToolTip: "Chat with provider",
          createToolTip: "Create order",
        });

        break;
      case PostCardType.PROPOSAL:
        setData({
          chatToolTip: "Chat with owner",
          createToolTip: "Create proposal",
        });
        break;
    }
  }, []);

  const TRANSITION_DURATION = 200;
  const { classes } = useStyles();
  const [embla, setEmbla] = useState<Embla | null>(null);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  const renderImages = images.map((item, index) => {
    var imageUrl: string = item as string;
    if (isFileWithPath(item)) {
      imageUrl = URL.createObjectURL(item);
    } else {
      imageUrl = item;
    }

    return (
      <Carousel.Slide h={"auto"} className={classes.image_wrapper} key={index}>
        <img
          onLoad={() => URL.revokeObjectURL(imageUrl)}
          src={imageUrl}
          className={classes.image}
        />
      </Carousel.Slide>
    );
  });

  return (
    <div className={classes.main_container}>
      <div className={classes.header_wrapper}>
        <Avatar
          size={rem(48)}
          className={classes.avatar}
          radius={rem(999)}
          src={avatar}
        />
        <div className={classes.name_wrapper}>
          <p className={classes.name}>{name}</p>
          <p className={classes.location}>{location}</p>
        </div>
        <IconDots className={classes.header_icon} />
      </div>
      <div className={classes.contain_wrapper}>
        <p>{description}</p>
      </div>
      <Carousel
        getEmblaApi={setEmbla}
        style={{
          overflow: "hidden",
          margin: `${rem(10)} ${rem(10)}`,
          border: "1px solid #E8DED1",
          borderRadius: rem(30),
        }}
      >
        {renderImages}
      </Carousel>

      <div className={classes.action_wrapper}>
        <div className={classes.icon_wrapper}>
          <Tooltip
            label={data.chatToolTip}
            transitionProps={{ transition: "pop-top-left", duration: 300 }}
          >
            <Button className={classes.button} variant="subtle">
              <IconMessageShare />
            </Button>
          </Tooltip>
        </div>
        <div className={classes.icon_wrapper}>
          <Tooltip
            label={data.createToolTip}
            transitionProps={{ transition: "pop-top-left", duration: 300 }}
          >
            <Button className={classes.button} variant="subtle">
              <IconSquareRoundedPlus />
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

const useStyles = createStyles({
  main_container: {
    width: rem(800),
    border: "1px solid #eee",
    borderRadius: rem(20),
  },
  header_wrapper: {
    display: "flex",
    padding: `${rem(10)}`,
    paddingBottom: 0,
    alignItems: "center",
  },
  avatar: {
    marginRight: rem(12),
    border: "1px solid #eee",
    boxShadow: "0 2px 2px rgb(0 0 0 / 0.3)",
  },
  name_wrapper: {},
  name: {
    color: "#102844",
    fontSize: rem(16),
    fontWeight: 500,
  },
  location: {
    fontSize: rem(14),
    color: "#767278",
    fontWeight: 400,
  },
  header_icon: {
    marginLeft: "auto",
  },
  contain_wrapper: {
    padding: `${rem(10)} ${rem(12)}`,
    paddingBottom: 0,
  },
  image_wrapper: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#E8DED1",
  },
  image: {
    objectFit: "scale-down",
    maxHeight: rem(500),
    // maxWidth: rem(760),
  },
  action_wrapper: {
    display: "flex",
  },
  icon_wrapper: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
  },
  button: {
    width: "100%",
    height: rem(52),
    margin: `0 ${rem(10)}`,
    color: "#929292",
  },
});

export default PostCard;
