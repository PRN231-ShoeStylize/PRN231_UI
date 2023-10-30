import {
  TextInput,
  Button,
  Group,
  createStyles,
  rem,
  Box,
  Image,
  NumberInput,
} from "@mantine/core";
import { useFormik, FormikProvider } from "formik";
import { Carousel } from "@mantine/carousel";
import { useParams } from "react-router";

const CreateOrderPage = () => {
  const { classes } = useStyles();
  const params = useParams();
  const handleLogin = ({
    price,
    address,
    paymentMethod,
  }: {
    price: number;
    address: string;
    paymentMethod: "COD";
  }) => {
    console.log(price, address, paymentMethod, params.id);
  };
  const formik = useFormik({
    initialValues: {
      price: 0,
      address: "",
      paymentMethod: "COD",
    },
    onSubmit: handleLogin,
  });
  return (
    <div>
      <p className={classes.title}>Order name: ABCXYZ</p>
      <Carousel maw={320} className={classes.carousel}>
        <Carousel.Slide>
          <Image
            radius={"md"}
            src={
              "https://cdn.dribbble.com/userupload/10793974/file/still-5197c203b4cc4ef6ea30354e0f221d3e.png?resize=450x338"
            }
          />
        </Carousel.Slide>
        <Carousel.Slide maw={320}>
          <Image
            radius={"md"}
            src={
              "https://cdn.dribbble.com/userupload/10793974/file/still-5197c203b4cc4ef6ea30354e0f221d3e.png?resize=450x338"
            }
          />
        </Carousel.Slide>
      </Carousel>
      <FormikProvider value={formik}>
        <Box maw={800}>
          <NumberInput
            className={classes.input}
            label="Price"
            placeholder="Total price"
            // value={formik.values.price}
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
            <Button type="submit" onClick={() => formik.handleSubmit()}>
              Submit
            </Button>
          </Group>
        </Box>
      </FormikProvider>
    </div>
  );
};

const useStyles = createStyles({
  form_wrapper: {},
  title: {
    fontSize: rem(18),
    fontWeight: 600,
    marginBottom: rem(16),
  },
  input: { margin: rem(12), marginRight: 0 },
  carousel: {
    marginBottom: rem(12),
  },
});

export default CreateOrderPage;
