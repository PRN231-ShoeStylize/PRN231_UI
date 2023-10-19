import React, { useState } from "react";
import MainHeader from "../../components/header/MainHeader";
import { Button, Grid, Modal, TextInput, createStyles } from "@mantine/core";
import MainNavbar from "../../components/common/MainNavbar";
import { IconHome2 } from "@tabler/icons-react";
import { IMainNavBarProp } from "../../components/common/navbar.model";
import ProposalCard from "../../components/proposal-card/proposal.component";
import { useDisclosure } from "@mantine/hooks";
import { FormikProvider, useFormik } from "formik";
import { showNotification } from "@mantine/notifications";

const ShopHomePage: React.FC = () => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const floating = focused || value.length > 0 || undefined;

  const [opened, { open, close }] = useDisclosure();

  const formik = useFormik({
    initialValues: {
      username: undefined,
      password: undefined,
    },
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (value: any) => {
    const result = true;
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
  };

  return (
    <>
      {/* <MainHeader /> */}

      <ProposalCard handleOpenSubmitModal={open} />
      <Modal
        opened={opened}
        onClose={close}
        title={<h2>Create Proposal</h2>}
        centered
      >
        <FormikProvider value={formik}>
          <TextInput
            label="Mock label"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
          <Button
            onClick={() => formik.handleSubmit()}
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

export default ShopHomePage;
