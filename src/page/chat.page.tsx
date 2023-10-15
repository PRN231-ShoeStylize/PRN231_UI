import {
  ActionIcon,
  Avatar,
  Divider,
  Grid,
  Input,
  Tooltip,
  createStyles,
  rem,
} from "@mantine/core";
import {
  IconAt,
  IconDots,
  IconDotsVertical,
  IconPlus,
} from "@tabler/icons-react";
import React from "react";
import { CiSearch } from "react-icons/ci";
import MessageCard from "../components/card/MessageCard";

const ChatPage = () => {
  const { classes } = useStyles();
  return (
    <Grid columns={24} gutter={0} className={classes.main_container}>
      <Grid.Col span={5} className={classes.message_container}>
        <div className={classes.message_header_wrapper}>
          <p className={classes.message_title}>Messages</p>
          <Tooltip
            transitionProps={{ transition: "skew-up", duration: 300 }}
            label="Create proposal"
          >
            <ActionIcon className={classes.message_icon_wrapper}>
              <IconPlus className={classes.message_icon} />
            </ActionIcon>
          </Tooltip>
        </div>
        <div className={classes.message_body}>
          <Input
            style={{
              margin: `${rem(12)} ${rem(12)} ${rem(20)}`,
            }}
            classNames={{ input: classes.message_input }}
            icon={<CiSearch size={20} />}
            placeholder="Your email"
          />
          {[1, 2, 3].map((item, index) => (
            <MessageCard key={index} />
          ))}
        </div>
      </Grid.Col>
      <Grid.Col span={13} className={classes.chat_container}>
        <div className={classes.chat_header_wrapper}>
          <Avatar
            src={
              "https://cdn.dribbble.com/userupload/10064008/file/original-ed9f97edacf253ce306dbca6adbbb5ff.png?resize=752x752"
            }
            className={classes.avatar}
            radius={rem(999)}
            size={rem(52)}
          />
          <p className={classes.chat_name}>Hello_its_me</p>
        </div>
      </Grid.Col>
      <Grid.Col span={6} className={classes.proposal_container}>
        <div className={classes.proposal_header_wrapper}>
          <p className={classes.proposal_title}>Posts</p>
          <ActionIcon className={classes.dot_wrapper}>
            <IconDotsVertical color="#5754ef" />
          </ActionIcon>
        </div>
        <div className={classes.proposal_body_wrapper}>
          <p>Active posts 6 </p>
        </div>
      </Grid.Col>
    </Grid>
  );
};

const useStyles = createStyles({
  main_container: {
    width: "100vw",
    height: "100vh",
  },
  message_container: {
    borderRight: "1px solid #ccc",
  },
  message_header_wrapper: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: rem(20),
    paddingRight: rem(20),
    marginTop: rem(16),
    paddingBottom: rem(28),
    borderBottom: "1px solid #ccc",
  },
  message_title: {
    fontSize: rem(22),
    fontWeight: 600,
  },
  message_icon_wrapper: {
    backgroundColor: "#514eef",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    width: rem(32),
    height: rem(32),
    cursor: "pointer",
    "&:hover": { backgroundColor: "#615ef0" },
  },
  message_icon: {
    color: "#fff",
  },
  message_body: {},
  message_input: {
    borderRadius: rem(12),
    backgroundColor: "#f6f6f6",
    height: rem(48),
  },
  chat_container: {
    borderRight: "1px solid #ccc",
  },
  chat_header_wrapper: {
    display: "flex",
    padding: `${rem(12)} ${rem(12)} ${rem(14)}`,
    borderBottom: "1px solid #ccc",
  },
  avatar: {
    border: "1px solid #eee",
    boxShadow: "0 2px 2px rgb(0 0 0 / 0.3)",
    marginRight: rem(12),
  },
  chat_name: {
    fontSize: rem(20),
    fontWeight: 600,
    paddingTop: rem(6),
  },
  proposal_container: {},
  proposal_header_wrapper: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${rem(20)} ${rem(24)} ${rem(26)}`,
    borderBottom: "1px solid #ccc",
  },
  proposal_title: {
    fontSize: rem(20),
    fontWeight: 600,
  },
  dot_wrapper: {
    backgroundColor: "#cecdfa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    width: rem(32),
    height: rem(32),
    "&:hover": { backgroundColor: "#efeffd" },
  },
  proposal_body_wrapper: {},
});

export default ChatPage;
