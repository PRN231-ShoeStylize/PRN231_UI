import {
  Avatar,
  Button,
  Grid,
  Image,
  NumberInput,
  Select,
  Table,
  Tabs,
  Textarea,
  createStyles,
  rem,
} from "@mantine/core";
import {
  IconExclamationCircle,
  IconMessageCircle,
  IconPhoto,
  IconReceipt,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useGetPostByUserId } from "../../hooks/useGetPostByUserId";
import { decode, isTokenValid } from "../../utils/jwt";
import { GetPostResult } from "../../api/post/post.model";
import { useLocation, useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { DateInput, DateInputProps } from "@mantine/dates";
import { useGetUserByToken } from "../../hooks/useGetUserById";
import { setInitForm } from "../../utils/form";
import { GetUserResult, UpdateProfileParams } from "../../api/user/user.model";
import { useGetOrderByToken } from "../../hooks/useGetOrder";
import { GetOrderResult } from "../../api/order/order.modal";
import dayjs from "dayjs";
import { useUpdateUserProfile } from "../../hooks/useUpdateUserProfile";
import { notifications } from "@mantine/notifications";

const ProfilePage = () => {
  const { classes } = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading } = useGetPostByUserId(
    +decode(isTokenValid() ?? "")[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ]
  );
  const { data: userData, isLoading: isUserLoading } = useGetUserByToken();
  const { data: orderData } = useGetOrderByToken();

  const { mutate, isLoading: updateUserLoading } = useUpdateUserProfile();
  // const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<UpdateProfileParams>({ shouldUnregister: false });

  useEffect(() => {
    if (userData) {
      const { birthday, firstname, shoeSize, lastname, phonenumber, gender } =
        userData;
      // setInitForm<UpdateProfileParams, keyof UpdateProfileParams>(
      //   {
      //     birthday: new Date(birthday),
      //     firstname,
      //     shoeSize,
      //     lastname,
      //     phonenumber,
      //     gender,
      //   },
      //   [
      //     "firstname",
      //     "shoeSize",
      //     "birthday",
      //     "lastname",
      //     "phonenumber",
      //     "gender",
      //   ],
      //   form.setValue
      // );

      form.reset({
        birthday: dayjs(birthday).format("MMMM D, YYYY") as any,
        firstname,
        gender,
        lastname,
        phonenumber,
        shoeSize,
      });
    }
  }, [userData, location.key]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setValue,
  } = form;

  const onSubmit: SubmitHandler<UpdateProfileParams> = async (data) => {
    mutate(data, {
      onSuccess(data, variables, context) {
        notifications.show({
          title: "Success",
          message: "Your profile is updated! 🤥",
          color: "green",
          icon: <IconX />,
        });
      },
      onError(error, variables, context) {
        notifications.show({
          title: "Update failed",
          message: "Something wrong with your profile! 🤥",
          color: "red",
          icon: <IconExclamationCircle />,
        });
        console.log(error);
      },
    });
  };

  const renderImageGallery = (tooltip: string, posts: GetPostResult[]) => {
    return posts?.map((item, index) => (
      <Grid.Col span={2} key={index}>
        {item.postResources ? (
          <Image
            height={200}
            onClick={() => navigate(`/post/${item.id}`)}
            className={classes.image}
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

  const renderOrderTable = (data: GetOrderResult[]) => {
    const rows = data?.map((element, index) => (
      <tr key={element?.id}>
        <td>{index + 1}</td>
        <td>{element?.proposal?.post?.content}</td>
        <td>{element?.proposal?.description}</td>
        <td>
          {element?.proposal?.createdByFirstName +
            " " +
            element?.proposal?.createdByLastName}
        </td>
        <td>{element?.price}</td>
        <td>{element?.address}</td>
        <td>{dayjs(element?.createdAt)?.format("DD/MM/YYYY")}</td>
        <td>{element?.paymentMethod}</td>
        <td>{element?.status}</td>
      </tr>
    ));

    return (
      <Table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Post content</th>
            <th>Order description</th>
            <th>Provider</th>
            <th>Price</th>
            <th>Address</th>
            <th>Created time</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  };

  return (
    <div>
      {/* <Modal size={1000} opened={opened} onClose={close}>
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
      </Modal> */}

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
          <Tabs.Tab value="Order" icon={<IconReceipt size="0.8rem" />}>
            Order
          </Tabs.Tab>
          <Tabs.Tab value="messages" icon={<IconMessageCircle size="0.8rem" />}>
            Profile
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery" pt="xs">
          <Grid>{renderImageGallery("Proposal list", data ?? [])}</Grid>
        </Tabs.Panel>

        <Tabs.Panel value="Order" pt="xs">
          <div>{renderOrderTable(orderData ?? [])}</div>
        </Tabs.Panel>

        <Tabs.Panel value="messages" pt="xs">
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Textarea
              className={classes.text_input}
              placeholder="FirstName"
              label="FirstName"
              // className={classes.text_input}
              autosize
              minRows={1}
              error={errors.firstname?.message as String}
              {...register("firstname", { required: "This is required" })}
            />
            <Textarea
              className={classes.text_input}
              placeholder="LastName"
              label="LastName"
              // className={classes.text_input}
              autosize
              minRows={1}
              error={errors.lastname?.message as String}
              {...register("lastname", { required: "This is required" })}
            />
            <Textarea
              className={classes.text_input}
              placeholder="PhomeNumber"
              label="PhomeNumber"
              // className={classes.text_input}
              autosize
              minRows={1}
              error={errors.phonenumber?.message as String}
              {...register("phonenumber", { required: "This is required" })}
            />
            <DateInput
              className={classes.text_input}
              placeholder="Birthday"
              label="Birthday"
              error={errors.birthday?.message as String}
              {...register("birthday", {
                required: "This is required",
              })}
              defaultValue={null}
              onChange={(data: Date) => {
                setValue("birthday", data);
              }}
            />
            <NumberInput
              className={classes.text_input}
              placeholder="Shoe size"
              label="Shoe size"
              {...register("shoeSize", { required: "This is required" })}
              defaultValue={getValues("shoeSize")}
              onChange={(data: number) => setValue("shoeSize", data)}
              min={33}
              max={43}
            />
            <Select
              className={classes.text_input}
              label="Gender"
              placeholder="Pick one"
              data={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ]}
              {...register("gender", { required: "This is required" })}
              defaultValue={getValues("gender")}
              onChange={(data: string) => setValue("gender", data)}
            />
            <Button type="submit" className={classes.button}>
              Update
            </Button>
          </form>
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
  form: {
    marginTop: rem(12),
    marginBottom: rem(32),
    marginRight: `${rem(32)}`,
    display: "flex",
    flexDirection: "column",
  },
  text_input: {
    marginBottom: rem(20),
  },
  button: {
    alignSelf: "flex-start",
  },
});

export default ProfilePage;
