import React from "react";
import { Avatar, createStyles, rem } from "@mantine/core";

const MessageCard = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.main_container}>
      <div className={classes.avatar_wrapper}>
        <Avatar
          src={
            "https://cdn.dribbble.com/userupload/10064008/file/original-ed9f97edacf253ce306dbca6adbbb5ff.png?resize=752x752"
          }
          className={classes.avatar}
          radius={rem(999)}
          size={rem(52)}
        />
        <div className={classes.content_wrapper}>
          <p className={classes.name}>Hello_its_me</p>
          <p className={classes.message}>Create new lucifer .... </p>
        </div>
      </div>
      <p className={classes.time}>10m</p>
    </div>
  );
};

const useStyles = createStyles({
  main_container: {
    display: "flex",
    justifyContent: "space-between",
    padding: `0 ${rem(12)}`,
    marginBottom: rem(20),
  },
  avatar: {
    border: "1px solid #eee",
    boxShadow: "0 2px 2px rgb(0 0 0 / 0.3)",
    marginRight: rem(12),
  },
  avatar_wrapper: {
    display: "flex",
  },
  content_wrapper: {},
  name: {
    fontSize: rem(16),
    fontWeight: 600,
  },
  message: {
    fontSize: rem(14),
    fontWeight: 400,
    letterSpacing: rem(0.2),
    color: "#b6b6b6",
  },
  time: {
    fontSize: rem(14),
    fontWeight: 500,
    color: "#b6b6b6",
  },
});

export default MessageCard;
