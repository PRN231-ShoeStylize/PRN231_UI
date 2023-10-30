import React, { useEffect, useState } from "react";
import MainHeader from "../../components/header/MainHeader";
import {
  Button,
  Grid,
  Modal,
  TextInput,
  createStyles,
  Text,
  Image,
  Input,
  FileInput,
} from "@mantine/core";
import MainNavbar from "../../components/common/MainNavbar";
import { IconHome2 } from "@tabler/icons-react";
import { IMainNavBarProp } from "../../components/common/navbar.model";
import ProposalCard from "../../components/proposal-card/proposal.component";
import { useDisclosure } from "@mantine/hooks";
import { FormikProvider, useFormik } from "formik";
import { showNotification } from "@mantine/notifications";
import { PostAPI } from "../../api/post/post.api";
import { GetPostResult, IPost } from "../../api/post/post.model";
import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import { CreateProposalParams } from "../../api/proposal/proposal.model";
import { ProposalAPI } from "../../api/proposal/proposal.api";
import { uploadImage } from "../../utils/firebase";

const ShopHomePage: React.FC = () => {
  const mockdata: IMainNavBarProp[] = [
    { icon: IconHome2, label: "Home", href: "" },
  ];

  const [posts, setPosts] = useState<GetPostResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number>(-1);
  const [files, setFiles] = useState<File[]>([]);
  const [opened, { open, close }] = useDisclosure();
  const [imageOpend, openImageController] = useDisclosure();

  const TRANSITION_DURATION = 200;
  const [embla, setEmbla] = useState<Embla | null>(null);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  const formik = useFormik({
    initialValues: {
      description: "",
      postId: -1,
      price: 100,
      submissionResources: [],
    },
    onSubmit: (values) => handleSubmit(values),
  });

  useEffect(() => {
    const getAllPost = async () => {
      const res = await PostAPI.getAllPost();
      return res;
    };

    getAllPost().then((res) => {
      setPosts(res);
      console.log(res);
    });
  }, []);

  const handleSubmit = async (params: CreateProposalParams) => {
    setIsLoading(true);
    var urls: string[] = [];
    await Promise.all(
      files?.map(async (file: File) => {
        var url = await uploadImage(file);

        if (url) {
          urls.push(url);
        }
      })
    );
    params.submissionResources = urls;
    params.postId = selectedPostId;
    debugger;
    const result = await ProposalAPI._createProposal(params);
    if (result) {
      showNotification({
        title: "Success",
        message: "Proposal submitted",
        color: "lime",
        // classNames: classes,
      });
    } else {
      showNotification({
        title: "Error",
        message: "Failed to submit proposal",
        color: "red",
        // classNames: classes,
      });
    }
    setIsLoading(false);
    close();
  };

  const handleDisplayImage = (links: string[]) => {
    setDisplayedImages(links);
    openImageController.open();
  };

  const handleOpenSubmitModal = (postId: number) => {
    setSelectedPostId(postId);
    open();
  };

  const handleCloseSubmitModal = () => {
    close();
    formik.resetForm();
    setFiles([]);
  };

  return (
    <>
      <Grid>
        <Grid.Col span={11}>
          {posts.map((post) => (
            <ProposalCard
              post={post}
              handleOpenSubmitModal={handleOpenSubmitModal}
              handleDisplayImage={handleDisplayImage}
            />
          ))}
        </Grid.Col>
      </Grid>
      <Modal
        opened={opened}
        onClose={handleCloseSubmitModal}
        title={<h2>Create Proposal</h2>}
        centered
      >
        <FormikProvider value={formik}>
          <TextInput
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          <TextInput
            label="Price"
            name="price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          <FileInput
            accept="image/png,image/jpeg"
            label="Resources"
            placeholder="Put your file(s) here"
            multiple
            value={files}
            onChange={setFiles}
          />
          <Button
            onClick={() => formik.handleSubmit()}
            loading={isLoading}
            style={{ color: "white" }}
            fullWidth
            mt="md"
            radius="md"
          >
            Submit
          </Button>
        </FormikProvider>
      </Modal>
      <Modal
        opened={imageOpend}
        onClose={openImageController.close}
        // size={1000}
      >
        <div style={{ height: 500, display: "flex" }}>
          <Carousel
            getEmblaApi={setEmbla}
            withIndicators
            height="100%"
            style={{ flex: 1 }}
            loop
            dragFree
          >
            {displayedImages.map((image) => (
              <Carousel.Slide>
                <Image src={image} height={500} />
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      </Modal>
    </>
  );
};

export default ShopHomePage;
