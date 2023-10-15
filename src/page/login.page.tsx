import React from "react";
import { FormikProvider, useFormik } from "formik";
import {
  Button,
  Card,
  createStyles,
  Divider,
  Input,
  PasswordInput,
  Text,
} from "@mantine/core";
import { IconLock, IconMail } from "@tabler/icons-react";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { useLogin } from "../hooks/useLogin";
import { TOKEN } from "../constants/constants";
import { useNavigate } from "react-router";

const LoginPage: React.FC = (): React.ReactElement => {
  const { classes } = useStyles();
  const { mutate: login, isLoading: isLoginLoading } = useLogin();
  const navigate = useNavigate();

  const handleLogin = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    login(
      { email: username, password },
      {
        onSuccess(data, variables, context) {
          sessionStorage.setItem(TOKEN, data);
          navigate("/home");
        },
        onError(error, variables, context) {
          console.log(error);
        },
      }
    );
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: handleLogin,
  });

  return (
    <div className={classes.container}>
      <Card
        shadow="sm"
        padding="sm"
        className={classes.card_box}
        radius="md"
        withBorder
      >
        <div className={classes.btn_wraper}>
          <div className={classes.optionSelected}>Login</div>
          <div className={classes.option}>Sign up</div>
        </div>
        <FormikProvider value={formik}>
          <div className={classes.form_wrapper}>
            <Input.Wrapper>
              <div style={{ display: "flex" }}>
                <div>
                  <IconMail size="0.9em" color="#B37FEB" />
                </div>
                <Input.Label style={{ color: "#B37FEB" }}>Email</Input.Label>
              </div>
              <Input
                value={formik.values.username}
                onChange={(value) =>
                  formik.setFieldValue("username", value.target.value)
                }
                radius="sm"
                placeholder="yourname@gmail.com"
              />
            </Input.Wrapper>
            <br />
            <Input.Wrapper>
              <div style={{ display: "flex" }}>
                <div>
                  <IconLock size="0.9em" color="#B37FEB" />
                </div>
                <Input.Label style={{ color: "#B37FEB" }}>Password</Input.Label>
              </div>
              <PasswordInput
                value={formik.values.password}
                onChange={(value) =>
                  formik.setFieldValue("password", value.target.value)
                }
                radius="sm"
                placeholder="Your#Password123!"
              />
            </Input.Wrapper>
          </div>

          <div className={classes.button_box}>
            <Button
              onClick={() => formik.handleSubmit()}
              variant="light"
              style={{ background: "#B37FEB", color: "white" }}
              fullWidth
              mt="md"
              radius="md"
              loading={isLoginLoading}
            >
              Log In
            </Button>
          </div>
          <div style={{ padding: "0 6%" }}>
            <Divider my="xs" label="Or" labelPosition="center" />
          </div>
          <div className={classes.button_box}>
            <Button
              variant="default"
              color="white"
              fullWidth
              mt="md"
              radius="md"
              leftIcon={<FcGoogle />}
            >
              Continue with Google
            </Button>
            <Button
              variant="default"
              color="white"
              fullWidth
              mt="md"
              radius="md"
              leftIcon={<BsApple />}
            >
              Continue with Apple
            </Button>
          </div>
        </FormikProvider>
      </Card>
    </div>
  );
};

const useStyles = createStyles({
  container: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btn_wraper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card_box: {
    width: "30%",
  },
  option: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 2.5%",
    paddingBottom: "2%",
    width: "20%",
    textAlign: "center",
  },
  optionSelected: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 2.5%",
    paddingBottom: "2%",
    width: "20%",
    textAlign: "center",
    borderColor: "#B37FEB",
    borderBottom: "3px solid",
  },
  form_wrapper: {
    padding: "1em 2em",
  },
  button_box: {
    padding: "1em 2em",
    margin: "0",
    width: "100%",
  },
});

export default LoginPage;
