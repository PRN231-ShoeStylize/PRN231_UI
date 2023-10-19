import { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  rem,
  Avatar,
} from "@mantine/core";
import { IconLogout, IconSwitchHorizontal } from "@tabler/icons-react";
import { IMainNavBarProps } from "./navbar.model";
import { useNavigate } from "react-router";

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const MainNavbar: React.FC<IMainNavBarProps> = ({ items }) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login");
  };

  const links = items.map((link, index) => (
    <NavbarLink
      key={link.label}
      active={index === active}
      onClick={() => {
        navigate(link.href);
        setActive(index);
      }}
      icon={link.icon}
      label={link.label}
    />
  ));

  return (
    <Navbar height={750} width={{ base: 80 }} p="md">
      <Center>{/* <MantineLogo type="mark" size={30} /> */}</Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
          <NavbarLink icon={IconLogout} onClick={handleLogout} label="Logout" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

export default MainNavbar;
