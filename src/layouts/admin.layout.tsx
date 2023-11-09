import React from "react";
import { Tabs, Table, Button, rem } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import { useGetUsers } from "../hooks/useGetUserById";
import dayjs from "dayjs";
import { useGetAllOrders } from "../hooks/useGetOrder";

const RenderUsers = () => {
  const { data } = useGetUsers();

  const rows = data?.results.map((element, index) => (
    <tr key={element?.id}>
      <td>{index + 1}</td>
      <td>{element?.firstname}</td>
      <td>{element?.lastname}</td>
      <td>{element?.gender}</td>
      <td>{element?.phonenumber}</td>
      <td>{element?.role}</td>
      <td>{dayjs(element?.birthday)?.format("DD/MM/YYYY")}</td>
      <td>{element?.shoeSize}</td>
      <td>{element?.status}</td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Gender</th>
          <th>Phone number</th>
          <th>Role</th>
          <th>Birthday</th>
          <th>Shoe size</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

const RenderOrders = () => {
  const { data } = useGetAllOrders();

  const rows = data?.map((element, index) => (
    <tr key={element?.id}>
      <td
        style={{
          height: rem(52),
        }}
      >
        {index + 1}
      </td>
      <td
        style={{
          height: rem(52),
        }}
      >
        {element?.address}
      </td>
      <td
        style={{
          height: rem(52),
          overflow: "hidden",
        }}
      >
        {element?.price}
      </td>
      <td
        style={{
          height: rem(52),
        }}
      >
        {element?.paymentMethod}
      </td>
      <td
        style={{
          height: rem(52),
        }}
      >
        {dayjs(element?.createdAt)?.format("DD/MM/YYYY")}
      </td>
      <td
        style={{
          height: rem(52),
        }}
      >
        {element?.status}
      </td>
      {/* <td
        style={{
          whiteSpace: "nowrap",
          width: "1%",
        }}
      >
        {element.status == "Waiting" ? <Button>Confirm</Button> : <></>}
      </td> */}
    </tr>
  ));

  return (
    <Table horizontalSpacing={"md"}>
      <thead>
        <tr>
          <th>Number</th>
          <th>Address</th>
          <th>Price</th>
          <th>Payment Method</th>
          <th>Create at</th>
          <th>Status</th>
          {/* <th>Action</th> */}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

const AdminLayout = () => {
  return (
    <Tabs defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="gallery" icon={<IconPhoto size="0.8rem" />}>
          User
        </Tabs.Tab>
        <Tabs.Tab value="messages" icon={<IconMessageCircle size="0.8rem" />}>
          Order
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" pt="xs">
        <RenderUsers />
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
        <RenderOrders />
      </Tabs.Panel>
    </Tabs>
  );
};

export default AdminLayout;
