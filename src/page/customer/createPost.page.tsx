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
} from "@mantine/core";
import PostCard, { PostCardType } from "../../components/card/PostCard";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import { uploadImage } from "../../utils/firebase";
import { useCreatePost } from "../../hooks/useCreatePost";
import { useNavigate } from "react-router";
import { decode, isTokenValid } from "../../utils/jwt";

type Inputs = {
  content: any;
};

const CreatePostPage = () => {
  const { classes } = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const [isCreateLoading, setisCreateLoading] = useState<boolean>(false);
  const { mutate: createPost, isLoading: isCreatePostLoading } =
    useCreatePost();
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

    createPost(
      { content: data.content, resourceUrl: "", postResources: urls },
      {
        onSuccess(data, variables, context) {
          navigate("/profile");
        },
        onError(error, variables, context) {
          console.log(error);
        },
      }
    );

    // console.log(data, urls);
  };

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
  return (
    <div className={classes.main_container}>
      <div className={classes.main_wrapper}>
        <div className={classes.demo_wrapper}>
          <ActionIcon
            className={classes.back_wrapper}
            onClick={() => navigate("/")}
          >
            <IconArrowLeft className={classes.back_button} />
          </ActionIcon>
          <PostCard
            description={watch("content")}
            images={files}
            location="Caizo, egypt"
            postType={PostCardType.DEMO}
            ownerId={
              +decode(isTokenValid() ?? "")[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
              ]
            }
          />
        </div>
        <div className={classes.form_wrapper}>
          <p className={classes.form_title}>Create Post Agent</p>
          <p className={classes.form_description}>
            Film it, design it, publish it, write it, share it, launch it.
          </p>
          <Divider className={classes.form_divider} />

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
              loading={isCreatePostLoading || isCreateLoading}
              className={classes.button}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

const useStyles = createStyles({
  main_container: {
    display: "flex",
    justifyContent: "center",
    width: "100vw",
    backdropFilter: "blur(10px)",
    backgroundColor: "#eee",
    minHeight: "100vh",
    padding: `${rem(40)} 0 ${rem(100)} 0`,
  },
  main_wrapper: {
    width: rem(1412),
    border: "1px solid #eee",
    borderRadius: rem(20),
    display: "flex",
    backgroundColor: "#ffffff",
  },
  demo_wrapper: {
    marginRight: "12px",
  },
  form_wrapper: {
    margin: `${rem(6)} 0`,
    flex: 1,
  },
  form_title: {
    fontSize: rem(24),
    fontWeight: 600,
    margin: `0 ${rem(16)}`,
    marginTop: rem(10),
  },
  form_description: {
    fontWeight: 400,
    color: "#aaaaaa",
    margin: `0 ${rem(16)}`,
    marginBottom: rem(20),
  },
  form_divider: {
    marginBottom: rem(40),
  },
  form: {
    margin: `0 ${rem(16)}`,
    display: "flex",
    flexDirection: "column",
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
  back_wrapper: {
    borderRadius: rem(10),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: rem(40),
    height: rem(40),
    marginLeft: rem(4),
    marginTop: rem(4),
    marginBottom: rem(12),
  },
  back_button: {},
});

export default CreatePostPage;
