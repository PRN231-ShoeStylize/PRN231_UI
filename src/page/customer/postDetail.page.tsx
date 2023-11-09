import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import PostCard, { PostCardType } from "../../components/card/PostCard";
import { useForm, SubmitHandler } from "react-hook-form";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { uploadImage } from "../../utils/firebase";
import {
  Button,
  createStyles,
  rem,
  Text,
  Divider,
  Textarea,
  Image,
  SimpleGrid,
  ActionIcon,
  Flex,
  Loader,
  Box,
  Avatar,
  Tooltip,
  Modal,
  NumberInput,
  TextInput,
  Group,
  Notification,
} from "@mantine/core";
import { useGetPostByPostId } from "../../hooks/useGetPostByPostId";
import { useGetProposalList } from "../../hooks/useGetProposalList";
import {
  IconCheck,
  IconExclamationCircle,
  IconMessageShare,
  IconSquareRoundedPlus,
  IconX,
} from "@tabler/icons-react";
import {
  GetProposalResult,
  ProposalStatus,
} from "../../api/proposal/proposal.model";
import { useDisclosure } from "@mantine/hooks";
import { FormikProvider, useFormik } from "formik";
import { Carousel } from "@mantine/carousel";
import { useCreateOrder } from "../../hooks/useCreateOrder";
import { OrderStatus } from "../../api/order/order.modal";
import { notifications } from "@mantine/notifications";
import { useUpdatePostProfile } from "../../hooks/useUpdatePost";

type Inputs = {
  content: any;
};

const PostDetailPage = () => {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [chosedProposalData, setchosedProposalData] = useState<{
    id: number;
    price: number;
  }>({ id: 0, price: 0 });

  const params = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<Inputs>();
  const [isCreateLoading, setisCreateLoading] = useState<boolean>(false);

  const { mutate: updatePost, isLoading: isUpdatePostLoading } =
    useUpdatePostProfile();

  const { data, isLoading } = useGetPostByPostId(+(params?.id ?? 0));
  const { data: proposalData, isLoading: isProposalLoading } =
    useGetProposalList({ postId: +(params?.id ?? 0) });

  const [files, setFiles] = useState<FileWithPath[]>([]);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    var urls: string[] = [];
    setisCreateLoading(true);

    await Promise.all(
      files?.map(async (item: FileWithPath) => {
        var url = await uploadImage(item);

        if (url) {
          urls.push(url);
        }
      })
    );
    setisCreateLoading(false);

    updatePost(
      {
        content: data.content,
        resourceUrl: urls?.[0],
        postResources: urls,
        postId: +(params?.id ?? 0),
        status: "Active",
      },
      {
        onSuccess(data, variables, context) {
          navigate(0);
        },
        onError(error, variables, context) {
          console.log(error);
        },
      }
    );

    // console.log(data, urls);
  };

  const { mutate: createOrder, isLoading: createOrderLoading } =
    useCreateOrder();

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    console.log(imageUrl);

    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  //Order

  const handleCreateOrder = ({
    price,
    address,
    paymentMethod,
  }: {
    price: number;
    address: string;
    paymentMethod: "COD";
  }) => {
    createOrder(
      {
        address,
        paymentMethod,
        price,
        proposalId: chosedProposalData.id,
        status: ProposalStatus.Accepted,
      },
      {
        onSuccess(data, variables, context) {
          notifications.show({
            title: "Created",
            message: "Your order is created! 🤥",
            color: "green",
            icon: <IconX />,
          });
          close();
          navigate(0);
        },
        onError(error, variables, context) {
          notifications.show({
            title: "Created failed",
            message: "Something wrong with your order! 🤥",
            color: "red",
            icon: <IconExclamationCircle />,
          });
          console.log(error);
          close();
        },
      }
    );
  };
  const formik = useFormik({
    initialValues: {
      price: 0,
      address: "",
      paymentMethod: "COD",
    },
    onSubmit: handleCreateOrder,
  });

  const renderProposal = (proposals: GetProposalResult[]) => {
    return proposals?.map((item, index) => (
      <Flex
        justify="flex-start"
        key={index}
        my={28}
        py={14}
        mr={40}
        style={{
          boxShadow: "1px 2px 5px 0px rgba(133,120,120,0.75)",
          borderRadius: rem(8),
        }}
      >
        {item?.submissionResources.length > 0 && (
          <Carousel maw={400} mr={40} ml={12}>
            {item?.submissionResources?.map((item, index) => (
              <Carousel.Slide key={index}>
                <Image
                  radius={"md"}
                  src={item}
                  withPlaceholder
                  width={400}
                  height={240}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        )}
        <Box>
          <Flex align={"center"}>
            <Avatar size={48} radius={1000} mr={12} />
            <p>{item?.createdByFirstName + " " + item?.createdByLastName}</p>
          </Flex>
          <p style={{ marginLeft: rem(60), marginBottom: rem(12) }}>
            {item.description}
          </p>
          {data?.status != "Done" ? (
            <>
              <Tooltip label={"Chat with provider"}>
                <Button variant="subtle">
                  {" "}
                  <IconMessageShare />
                </Button>
              </Tooltip>
              <Tooltip label={"Accept proposal"}>
                <Button
                  onClick={() => {
                    setchosedProposalData({ id: item?.id, price: item?.price });
                    formik.setFieldValue("price", item?.price);
                    open();
                  }}
                  variant="subtle"
                >
                  <IconSquareRoundedPlus />
                </Button>
              </Tooltip>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Flex>
    ));
  };

  if (isLoading || isProposalLoading) {
    return <Loader />;
  }

  return (
    <div className={classes.main_container}>
      <Modal opened={opened} onClose={close} title="Create order">
        <FormikProvider value={formik}>
          <Box maw={800}>
            <NumberInput
              readOnly
              className={classes.input}
              label="Price"
              placeholder="Total price"
              value={formik.values.price}
              onChange={(value) => formik.setFieldValue("price", value)}
            />
            <TextInput
              className={classes.input}
              label="Address"
              value={formik.values.address}
              onChange={(value) =>
                formik.setFieldValue("address", value.target.value)
              }
              placeholder="Deliver address"
            />
            <TextInput
              className={classes.input}
              readOnly
              label="Payment Method"
              placeholder="Deliver address"
              value={"COD"}
            />

            <Group position="right" mt="md">
              <Button
                loading={createOrderLoading}
                type="submit"
                onClick={() => formik.handleSubmit()}
              >
                Submit
              </Button>
            </Group>
          </Box>
        </FormikProvider>
      </Modal>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "lg", sm: "xl" }}
        justify={"space-around"}
      >
        <div>
          <PostCard
            description={data?.content ?? ""}
            images={data?.postResources ?? []}
            location="Caizo, egypt"
            postType={PostCardType.DEMO}
            ownerId={data?.onwerId ?? 0}
          />
        </div>
        {data?.status != "Done" ? (
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Textarea
              placeholder="Description"
              label="Description"
              className={classes.text_input}
              autosize
              minRows={4}
              error={errors.content?.message as String}
              {...register("content", { required: "This is required" })}
            ></Textarea>

            <div className={classes.drop_zone}>
              <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
                <Text ta="center">Drop images here</Text>
              </Dropzone>

              <SimpleGrid
                cols={4}
                breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                mt={previews.length > 0 ? "xl" : 0}
              >
                {previews}
              </SimpleGrid>
            </div>
            <Button
              type="submit"
              loading={isUpdatePostLoading || isCreateLoading}
              className={classes.button}
            >
              Update
            </Button>
          </form>
        ) : (
          <div>
            <Notification
              icon={<IconCheck size="1.1rem" />}
              color="teal"
              title="Post is closed"
              style={{
                width: rem(500),
              }}
            >
              This post is closed
            </Notification>
          </div>
        )}
      </Flex>
      <div>
        <p className={classes.title}>Active proposal</p>
        <Divider my="sm" />
        {<div>{renderProposal(proposalData?.results ?? [])}</div>}
      </div>
    </div>
  );
};

const useStyles = createStyles({
  main_container: {},

  form: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    marginRight: rem(100),
  },
  text_input: {
    marginBottom: rem(20),
  },
  drop_zone: {
    marginBottom: rem(20),
  },
  button: {
    alignSelf: "flex-end",
  },
  title: {
    fontSize: rem(18),
    fontWeight: 600,
    marginTop: rem(32),
    marginBottom: rem(16),
  },
  input: { margin: rem(12), marginRight: 0 },
});

export default PostDetailPage;
