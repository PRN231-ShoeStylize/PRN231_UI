import { Button, Divider, Input, PasswordInput, Text } from '@mantine/core'
import { IconLock, IconMail } from '@tabler/icons-react'
import { yupResolver } from '@hookform/resolvers/yup';
import React, {SyntheticEvent, useCallback} from 'react'
import { BsApple } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { useStyles } from './LoginBox.style'
import * as yup from 'yup';
import { useForm } from 'react-hook-form'
import {FormikProvider, useFormik} from "formik";
import {Web3} from "web3";
const schema = yup.object().shape({
    email: yup.string().required("*Email should not be empty").matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, '*Incorrect email format'),
    password: yup.string().required("*Password should not be empty").min(8, '*Password should have at least 8 characters')
})
let web3: Web3 | undefined = undefined;

const LoginBox : React.FC = () => {
    const { classes } = useStyles();
    const { register, handleSubmit, formState: {errors}, getValues } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = () => {
        console.log(getValues('email'))
    }

    const handleLogin = useCallback(async (values: {
        email: string; password: string;
    }) => {
       if (!web3) {
            try {
                // Request account access if needed
                    await window.ethereum.enable();

                web3 = new Web3(window.ethereum);
            } catch (error) {
                window.alert('You need to allow MetaMask.');
                return;
            }
            const coinbase = await web3.eth.getCoinbase();
            if (!coinbase) {
                window.alert('Please activate MetaMask first.');
                return;
            }
        }

        const resp = await fetch('http://localhost:8080/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                publicAddress: '0x1234567890',
                signature: '1234567890',
                username: 'testadmin',
                password: '12345678',
                type: 'WALLET_ADDRESS'
            }),
        });

        const body = await resp.body;
        const json = await resp.json();
        console.log(json)
    }, []);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values: {
            email: string; password: string;
        }) => handleLogin(values),
    })
    return(
        <FormikProvider value={formik}>
            <div className={classes.form_wrapper}>
                    <Input.Wrapper>
                        <div style={{ display: 'flex' }}>
                            <div>
                                <IconMail size="0.9em" color="#B37FEB" />
                            </div>
                            <Input.Label style={{ color: "#B37FEB" }}>Email</Input.Label>
                        </div>
                        <Input {...register('email')}  radius="sm" placeholder='yourname@gmail.com'></Input>
                        {errors.email && (<Text c="red">{errors.email.message}</Text>)}
                    </Input.Wrapper>
                    <br />
                    <Input.Wrapper>
                        <div style={{ display: 'flex' }}>
                            <div>
                                <IconLock size="0.9em" color="#B37FEB" />
                            </div>
                            <Input.Label style={{ color: "#B37FEB" }}>Password</Input.Label>
                        </div>
                        <PasswordInput {...register('password')} radius="sm" placeholder='Your#Password123!'></PasswordInput>
                        {errors.password && (<Text c="red">{errors.password.message}</Text>)}
                    </Input.Wrapper>
                </div>

                <div className={classes.button_box}>
                    <Button onClick={() => formik.handleSubmit()} variant="light" style={{ background: "#B37FEB", color: 'white' }} fullWidth mt="md" radius="md">
                        Log In
                    </Button>
                </div>
                <div style={{ padding: '0 6%' }}>
                    <Divider my="xs" label="Or" labelPosition="center" />
                </div>
                <div className={classes.button_box}>
                    <Button variant="default" color='white' fullWidth mt="md" radius="md"
                        leftIcon={
                                <FcGoogle/>
                        }
                    >
                        Continue with Google
                    </Button>
                    <Button variant="default" color='white' fullWidth mt="md" radius="md"
                        leftIcon={
                                <BsApple/>
                        }
                    >
                        Continue with Apple
                    </Button>
                </div>
        </FormikProvider>
    )
}

export default LoginBox;
