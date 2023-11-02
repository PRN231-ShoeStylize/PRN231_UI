import React from "react";
import { IMainNavBarProp } from "../components/common/navbar.model";
import { IconDeviceIpadPlus, IconHome2 } from "@tabler/icons-react";
import MainHeader from "../components/header/MainHeader";
import { Avatar, Grid } from "@mantine/core";
import MainNavbar from "../components/common/MainNavbar";
import { Outlet } from "react-router";
const ProviderLayout: React.FC = () => {
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

export default ProviderLayout;
