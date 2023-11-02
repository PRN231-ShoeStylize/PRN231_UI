import React from "react";
import { Avatar, createStyles, rem } from "@mantine/core";
import { useGetUserById } from "../../hooks/useGetUserById";

const MessageCard = ({
  userId,
  isActive,
  name,
  avatar,
}: {
  userId: number;
  isActive: boolean;
  name: string;
  avatar: string;
}) => {
  const { classes } = useStyles();
  return (
    <div
      className={classes.main_container}
      style={{
        backgroundColor: isActive ? "#eee" : "#fff",
      }}
    >
      <div className={classes.avatar_wrapper}>
        <Avatar
          src={avatar}
          className={classes.avatar}
          radius={rem(999)}
          size={rem(52)}
        />
        <div className={classes.content_wrapper}>
          <p className={classes.name}>
            {/* {data?.firstname ?? "" + " " + data?.lastname ?? ""} */}
            {name}
          </p>
          <p className={classes.message}>Incoming message</p>
        </div>
      </div>
      {/* <p className={classes.time}>10m</p> */}
    </div>
  );
};

const useStyles = createStyles({
  main_container: {
    display: "flex",
    justifyContent: "space-between",
    padding: `0 ${rem(12)}`,
    paddingTop: rem(4),
    paddingBottom: rem(4),
    margin: `${rem(0)} ${rem(6)}`,
    marginBottom: rem(6),
    borderRadius: rem(12),
    cursor: "pointer",
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
