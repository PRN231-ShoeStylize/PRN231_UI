import React, { useState } from "react";
import MainHeader from "../../components/header/MainHeader";
import { Button, Grid, Modal, TextInput, createStyles } from "@mantine/core";
import MainNavbar from "../../components/common/MainNavbar";
import { IconHome2 } from "@tabler/icons-react";
import { IMainNavBarProp } from "../../components/common/navbar.model";
import ProposalCard from "../../components/proposal-card/proposal.component";
import { useDisclosure } from "@mantine/hooks";
import { FormikProvider, useFormik } from "formik";



const ShopHomePage: React.FC = () => {
    const mockdata: IMainNavBarProp[] = [
        { icon: IconHome2, label: "Home" },
    ];

    const [opened, { open, close }] = useDisclosure();
    const [value, setValue] = useState('');
    const formik = useFormik({
        initialValues: {
            username: undefined,
            password: undefined
        },
        onSubmit: (values) => handleLogin(values)
    });

    const handleLogin = (value: any) => {

    }

    return (
        <>
            <MainHeader />
            <Grid>
                <Grid.Col span={1}>
                    <MainNavbar items={mockdata} />
                </Grid.Col>
                <Grid.Col span={11}>
                    <ProposalCard handleOpenSubmitModal={open} />
                </Grid.Col>
            </Grid>
            <Modal opened={opened} onClose={close} title="Proposal" centered>
                <FormikProvider value={formik}>
                    <TextInput
                        label="Mock label"
                        value={value}
                        onChange={(event) => setValue(event.currentTarget.value)}
                    />
                    <Button  onClick={() => formik.handleSubmit()} style={{color: 'white' }} fullWidth mt="md" radius="md">
                        Submit
                    </Button>
                </FormikProvider>
            </Modal>
        </>
    )
}


export default ShopHomePage;


