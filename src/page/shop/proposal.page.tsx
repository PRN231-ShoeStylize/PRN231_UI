import React, { useEffect, useState } from "react";
import {
  IProposal,
  ProposalStatus,
  UpdateProposalParams,
} from "../../api/proposal/proposal.model";
import {
  Modal,
  Tabs,
  Image,
  TextInput,
  Button,
  FileInput,
  Text,
  Loader,
} from "@mantine/core";
import { ProposalAPI } from "../../api/proposal/proposal.api";
import ProposalWithStatus from "../../components/proposal-card/proposal-with-status.component";
import { useDisclosure } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import { FormikProvider, useFormik } from "formik";
import { showNotification } from "@mantine/notifications";
import { uploadImage } from "../../utils/firebase";
import * as Yup from "yup";
const UpdateProposalSchema = Yup.object().shape({
  description: Yup.string(),
  price: Yup.number().max(1000000, "Price should be less than $1000000"),
  submissionResources: Yup.array()
    .of(Yup.string())
    .max(10, "Only 10 attachments are allowed"),
});
const ProposalPage: React.FC = () => {
  const [proposalStatus, setProposalStatus] = useState<string | null>(
    ProposalStatus.Pending
  );
  const [proposals, setProposals] = useState<IProposal[]>();
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(false);
  const [proposalId, setProposalId] = useState<number>(-1);
  const [imageOpend, openImageController] = useDisclosure();
  const [files, setFiles] = useState<File[]>([]);
  const [opened, { open, close }] = useDisclosure();
  const formik = useFormik<UpdateProposalParams>({
    initialValues: {
      description: "",
      price: 100,
      submissionResources: [],
    },
    validationSchema: UpdateProposalSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = async (params: any) => {
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
    debugger;
    var param: UpdateProposalParams = {
      ...formik.values,
      submissionResources: [],
    };
    if(urls.length > 5){
      formik.setErrors({
        ...formik.errors,
        submissionResources: "Submission resources must not exceed 5 attachments"
      })
      setIsLoading(false);
      return;
    }
    if (urls.length > 0) {
      param.submissionResources = urls;
    }
    const result = await ProposalAPI._updateProposal(proposalId, param);
    debugger;
    if (result) {
      setReload(!reload);
      showNotification({
        title: "Success",
        message: "Proposal updated",
        color: "lime",
      });
    } else {
      showNotification({
        title: "Error",
        message: "Failed to update proposal",
        color: "red",
      });
    }
    setIsLoading(false);
    handleCloseSubmitModal();
  };

  const handleOpenEditModal = async (proposalId: number) => {
    const prop = await ProposalAPI._getProposalById(proposalId);
    setProposalId(proposalId);
    formik.setValues({
      ...formik.values,
      description: prop.data.description,
      price: prop.data.price,
    });
    open();
  };

  const handleCloseSubmitModal = () => {
    close();
    setProposalId(-1);
    setFiles([]);
    formik.resetForm();
  };

  useEffect(() => {
    setIsLoading(true);
    const getAllPost = async () => {
      const res = await ProposalAPI._getProposal({
        status: proposalStatus == null ? undefined : proposalStatus,
        isOfCurrentUser: true,
      });
      return res;
    };

    getAllPost().then((res) => {
      setProposals(res.data.results);
      console.log(res.data.results);
    });
    setIsLoading(false);
  }, [proposalStatus, reload]);


  const handleDisplayImage = (links: string[]) => {
    setDisplayedImages(links);
    openImageController.open();
  };

  return (
    <>
      <Tabs
        value={proposalStatus}
        onTabChange={setProposalStatus}
        // onClick={setActiveTab}
      >
        <Tabs.List>
          <Tabs.Tab value={ProposalStatus.Pending}>Pending Proposal</Tabs.Tab>
          <Tabs.Tab value={ProposalStatus.Accepted}>Accepted Proposal</Tabs.Tab>
          <Tabs.Tab value={ProposalStatus.Rejected}>Rejected Proposal</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      {isLoading && <Loader color="blue" />}
      {!isLoading && (
        <>
          {proposals?.map((proposal, index) => (
            <ProposalWithStatus
              handleOpenEditModal={handleOpenEditModal}
              proposal={proposal}
              handleDisplayImage={handleDisplayImage}
            />
          ))}
        </>
      )}
      <Modal opened={imageOpend} onClose={openImageController.close}>
        <div style={{ height: 500, display: "flex" }}>
          <Carousel
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
      <Modal
        opened={opened}
        onClose={handleCloseSubmitModal}
        title={<h2>Update Proposal</h2>}
        centered
      >
        <FormikProvider value={formik}>
          <TextInput
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          {formik.errors.description && <Text color="red">{formik.errors.description}</Text>}
          <TextInput
            label="Price"
            name="price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          {formik.errors.price && <Text color="red">{formik.errors.price}</Text>}
          <FileInput
            accept="image/png,image/jpeg"
            label="Resources"
            placeholder="Put your file(s) here"
            multiple
            value={files}
            onChange={(files) => {
              if(files.length>=5){
                formik.setErrors({
                  ...formik.errors,
                  submissionResources: "Submission resources must not exceed 5 attachments"
                })
                setFiles([])
              }else{
                formik.setFieldError('submissionResources',undefined)
                setFiles(files)
              }
              
            }}
          />
          <Text color="red">
            *If you select a file, your old value would be overriden
          </Text>
          {formik.errors.submissionResources && <Text color="red">{formik.errors.submissionResources}</Text>}
          <Button
            onClick={() => formik.handleSubmit()}
            // loading={isLoading}
            style={{ color: "white" }}
            fullWidth
            mt="md"
            radius="md"
          >
            Submit
          </Button>
        </FormikProvider>
      </Modal>
    </>
  );
};
export default ProposalPage;
