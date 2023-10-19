import React from "react";
import MainHeader from "../components/header/MainHeader";
import { Outlet } from "react-router";
import { Grid, Avatar } from "@mantine/core";
import MainNavbar from "../components/common/MainNavbar";
import { IMainNavBarProp } from "../components/common/navbar.model";
import { IconHome2, IconDeviceIpadPlus } from "@tabler/icons-react";

const HomeLayout = () => {
  const iconAvatar = () => {
    return (
      <Avatar
        src="https://cdn.dribbble.com/userupload/10064008/file/original-ed9f97edacf253ce306dbca6adbbb5ff.png?resize=752x752"
        alt="it's me"
      />
    );
  };

  const mockdata: IMainNavBarProp[] = [
    { icon: IconHome2, label: "Home", href: "/" },
    { icon: IconDeviceIpadPlus, label: "Create new post", href: "/create" },
    { icon: iconAvatar, label: "Profile", href: "/profile" },
  ];

  return (
    <>
      <MainHeader />
      <Grid>
        <Grid.Col span={1}>
          <MainNavbar items={mockdata} />
        </Grid.Col>
        <Grid.Col span={11}>
          <Outlet />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default HomeLayout;
