import {
  ActionIcon,
  Avatar,
  Grid,
  Input,
  Tooltip,
  createStyles,
  rem,
  Flex,
  Center,
  ScrollArea,
  Image,
  Loader,
} from "@mantine/core";
import {
  IconBrandWeibo,
  IconDotsVertical,
  IconPlus,
  IconSend,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import MessageCard from "../components/card/MessageCard";
import { RemoteSignalrService } from "../utils/signalr";
import { decode, isTokenValid } from "../utils/jwt";
import { useGetUserById } from "../hooks/useGetUserById";
import { useGetPostByPostId } from "../hooks/useGetPostByPostId";
import { useGetPostByUserId } from "../hooks/useGetPostByUserId";
import { GetPostResult } from "../api/post/post.model";
import { useNavigate } from "react-router";
import { useGetUserByRole } from "../hooks/useGetUserResultByRole";
import { UserRole } from "../api/user/user.model";
import { useGetProposalList } from "../hooks/useGetProposalList";
import {
  GetProposalListResult,
  GetProposalResult,
} from "../api/proposal/proposal.model";

export type Message = {
  sentBy: number;
  recievedBy: number;
  chatRoomId: number;
  content: string;
  sentAt: string;
};

const renderMessageCard = ({
  chatRoomId,
  content,
  recievedBy,
  sentAt,
  sentBy,
  key,
}: Message & { key: number }) => {
  // console.log(content, sentAt);
  const user_id = +decode(isTokenValid() ?? "")[
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
  ];

  return (
    <Flex
      key={key}
      mb={rem(6)}
      style={{
        alignSelf: sentBy === user_id ? "flex-end" : "flex-start",
        marginRight: rem(12),
      }}
    >
      <Avatar color="blue" radius="xl" />
      <Center
        style={{
          backgroundColor: "#eee",
          borderRadius: rem(6),
          paddingLeft: rem(8),
          paddingRight: rem(8),
          marginLeft: rem(12),
        }}
      >
        <p style={{ fontSize: rem(14) }}>{content}</p>
      </Center>
    </Flex>
  );
};

const PostSection = ({
  user_id,
  imageStyle,
}: {
  user_id: number;
  imageStyle: string;
}) => {
  const { data: postList } = useGetPostByUserId(user_id);
  const navigate = useNavigate();

  const renderImageGallery = (posts: GetPostResult[]) => {
    return posts?.map((item, index) => (
      <Grid.Col span={6} key={index}>
        {item.postResources ? (
          <Image
            height={200}
            onClick={() => navigate(`/post/${item.id}`)}
            className={imageStyle}
            radius={"md"}
            src={item?.postResources?.[0]}
            fit="cover"
          />
        ) : (
          <p>{item.content}</p>
        )}
      </Grid.Col>
    ));
  };

  return (
    <div>
      <Grid gutter={"xs"} m={0}>
        {renderImageGallery(postList ?? [])}
      </Grid>
    </div>
  );
};

const ProposalSection = ({
  proposal_id,
  imageStyle,
}: {
  proposal_id: number;
  imageStyle: string;
}) => {
  const { data: proposalList } = useGetProposalList({
    createdById: proposal_id,
  });
  const navigate = useNavigate();
  const renderImageGallery = (posts: GetProposalResult[]) => {
    return posts?.map((item, index) => (
      <Grid.Col span={12} key={index}>
        {item.submissionResources ? (
          <Image
            height={200}
            onClick={() => navigate(`/post/${item.id}`)}
            className={imageStyle}
            radius={"md"}
            src={item?.submissionResources?.[0]}
            fit="cover"
          />
        ) : (
          <p>{item.description}</p>
        )}
      </Grid.Col>
    ));
  };

  return (
    <Grid gutter={0} columns={24}>
      {renderImageGallery(proposalList?.results ?? [])}
    </Grid>
  );
};

const ChatPage = () => {
  const user_id = +decode(isTokenValid() ?? "")[
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
  ];
  const user_role = decode(isTokenValid() ?? "")[
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  ];
  const { classes } = useStyles();
  const [message, setmessage] = useState<Message[]>([]);
  const [value, setValue] = useState<string>("");
  const [signalr, setSignalr] = useState<RemoteSignalrService>();
  const [activeMessageUserId, setactiveMessageUserId] = useState<number>(0);
  const { data } = useGetUserById(activeMessageUserId);
  const { data: userListData, isLoading: isUserListDataLoading } =
    useGetUserByRole({
      role: user_role == "Customer" ? UserRole.PROVIDER : UserRole.CUSTOMER,
    });

  const handleSendMessage = (params: {
    receivedById: number;
    content: string;
  }) => {
    signalr?.sendMessage(params);
  };

  useEffect(() => {
    if (activeMessageUserId != 0) {
      const getSignalRConnection = async () => {
        const signalRHub = await RemoteSignalrService.initializeService();

        signalRHub.onReceivedChatRoom(
          (data: {
            firstAccountId: number;
            id: number;
            secondAccountId: number;
            messages: Message[];
          }) => {
            setmessage(data.messages);
          }
        );

        await signalRHub.getChatRoom({
          finderId: activeMessageUserId,
          numberOfMessage: 100,
          pageOfMessages: 0,
        });
        setSignalr(signalRHub);
      };

      getSignalRConnection();
    }
  }, [activeMessageUserId]);

  useEffect(() => {
    if (signalr) {
      signalr?.onReceivedMessage((data: Message) => {
        console.log(data);

        setmessage([data, ...message]);
      });
    }

    return () => {};
  }, [message]);

  useEffect(() => {
    if (userListData && userListData.results.length > 0) {
      setactiveMessageUserId(userListData.results[0].id);
    }

    return () => {};
  }, [userListData]);

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
              margin: `${rem(12)} ${rem(6)} ${rem(8)}`,
            }}
            classNames={{ input: classes.message_input }}
            icon={<CiSearch size={20} />}
            placeholder="Your email"
          />
          {isUserListDataLoading ? (
            <Loader />
          ) : (
            userListData?.results?.map((item, index) => (
              <div key={index} onClick={() => setactiveMessageUserId(item.id)}>
                <MessageCard
                  userId={item.id}
                  isActive={item.id == activeMessageUserId}
                  avatar={item.avatarUrl}
                  name={item?.firstname ?? "" + " " + item?.lastname ?? ""}
                />
              </div>
            ))
          )}
        </div>
      </Grid.Col>
      <Grid.Col span={13} className={classes.chat_container}>
        <div className={classes.chat_wrapper}>
          <div className={classes.chat_header_wrapper}>
            <Avatar
              src={data?.avatarUrl ?? ""}
              className={classes.avatar}
              radius={rem(999)}
              size={rem(52)}
            />
            <p className={classes.chat_name}>
              {data?.firstname ?? "" + " " + data?.lastname ?? ""}
            </p>
          </div>
          <ScrollArea className={classes.chat_body_scroll_wrapper}>
            <div className={classes.chat_body_wrapper}>
              {[...message].reverse().map((item, index) => {
                return renderMessageCard({ ...item, key: index });
              })}
            </div>
          </ScrollArea>
          <div className={classes.chat_input_wrapper}>
            <Input
              placeholder="Your email"
              icon={<IconBrandWeibo size={16} />}
              value={value}
              rightSection={
                <ActionIcon
                  variant="transparent"
                  color={"blue"}
                  onClick={() => {
                    handleSendMessage({
                      receivedById: activeMessageUserId,
                      content: value,
                    });
                    setmessage([
                      {
                        chatRoomId: 0,
                        content: value,
                        recievedBy: activeMessageUserId,
                        sentBy: user_id,
                        sentAt: new Date().toString(),
                      },
                      ...message,
                    ]);

                    setValue("");
                  }}
                >
                  <IconSend size="1.125rem" />
                </ActionIcon>
              }
              onChange={(event) => setValue(event.currentTarget.value)}
            />
          </div>
        </div>
      </Grid.Col>
      <Grid.Col span={6} className={classes.proposal_container}>
        <div className={classes.proposal_wrapper}>
          <div className={classes.proposal_header_wrapper}>
            <p className={classes.proposal_title}>
              {user_role == UserRole.CUSTOMER ? "Proposals" : "Posts"}
            </p>
            <ActionIcon className={classes.dot_wrapper}>
              <IconDotsVertical color="#5754ef" />
            </ActionIcon>
          </div>
          <ScrollArea className={classes.proposal_body_wrapper}>
            {user_role == UserRole.CUSTOMER ? (
              <PostSection user_id={user_id} imageStyle={classes.image} />
            ) : (
              <ProposalSection
                proposal_id={user_id}
                imageStyle={classes.image}
              />
            )}
          </ScrollArea>
        </div>
      </Grid.Col>
    </Grid>
  );
};

const useStyles = createStyles({
  main_container: {
    // width: "100vw",
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
  chat_wrapper: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    height: "100vh",
  },
  chat_header_wrapper: {
    display: "flex",
    padding: `${rem(12)} ${rem(12)} ${rem(14)}`,
    borderBottom: "1px solid #ccc",
  },
  chat_body_scroll_wrapper: {
    flex: 3,
    flexGrow: 1,
    marginTop: rem(10),
  },
  chat_body_wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  chat_input_wrapper: {
    marginTop: rem(8),
    marginBottom: rem(8),
    marginLeft: rem(4),
    marginRight: rem(4),
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
  proposal_wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
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
  proposal_body_wrapper: {
    // margin: `${rem(10)}`,
    flex: 1,
  },
  image: {
    cursor: "pointer",
    "&:hover": {
      opacity: 0.6,
    },
    transition: ".5s ease",
  },
});

export default ChatPage;
