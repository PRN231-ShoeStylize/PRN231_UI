import {
  Avatar,
  Button,
  Input,
  Menu,
  Text,
  createStyles,
  TextInput,
  rem,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import MainLogo from "../../assets/image/MainLogo.svg";
import {
  IconArrowsLeftRight,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
  IconChevronDown,
  IconShoe,
  IconUserCheck,
  IconLocation,
} from "@tabler/icons-react";
import { CiSearch } from "react-icons/ci";
import { ReactHTML, useState } from "react";
import { useNavigate } from "react-router";

const SearchCategory = {
  SHOE: <IconShoe size={"1.3rem"} stroke={1.5} />,
  SHOP: <IconUserCheck size={"1.3rem"} stroke={1.5} />,
  LOCATION: <IconLocation size={"1.3rem"} stroke={1.5} />,
};

const MainHeader = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [searchCategory, setSearchCategory] = useState<JSX.Element>(
    SearchCategory.SHOE
  );
  const { classes } = useStyles();

  return (
    <div className={classes.main_container}>
      <div className={classes.left_wrapper}>
        <img
          src={MainLogo}
          className={classes.logo}
          onClick={() => navigate("/")}
        />
        <TextInput
          classNames={{
            input: classes.search_input,
            icon: classes.search_icon,
          }}
          rightSection={
            <Menu transitionProps={{ transition: "pop-top-right" }}>
              <Menu.Target>
                <ActionIcon
                  size={36}
                  radius="xl"
                  color={"blue"}
                  variant="filled"
                >
                  {searchCategory}
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  icon={
                    <IconShoe
                      size={"1.3rem"}
                      stroke={1.5}
                      color={theme.colors.blue[6]}
                    />
                  }
                  onClick={() => setSearchCategory(SearchCategory.SHOE)}
                >
                  Shoe
                </Menu.Item>
                <Menu.Item
                  icon={
                    <IconUserCheck
                      size={"1.3rem"}
                      stroke={1.5}
                      color={theme.colors.cyan[6]}
                    />
                  }
                  onClick={() => setSearchCategory(SearchCategory.LOCATION)}
                >
                  Location
                </Menu.Item>
                <Menu.Item
                  icon={
                    <IconLocation
                      size={"1.3rem"}
                      stroke={1.5}
                      color={theme.colors.violet[6]}
                    />
                  }
                  onClick={() => setSearchCategory(SearchCategory.SHOP)}
                >
                  SHOP
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          }
          iconWidth={52}
          rightSectionWidth={52}
          icon={<CiSearch size={20} />}
          placeholder="Search here"
        ></TextInput>
      </div>

      <Menu>
        <Menu.Target>
          <Button className={classes.menu_button}>
            <Avatar
              className={classes.avatar}
              src="https://cdn.dribbble.com/users/255/screenshots/3152301/media/71d0deb12ea7b8971419d33b17f86b2d.png?resize=800x600&vertical=center"
              alt="it's me"
            />
            <Text className={classes.menu_text}>Hello_its_me</Text>
            <IconChevronDown
              color="#a5a5a5"
              size={16}
              style={{ paddingTop: "2px" }}
            />
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
          <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
          <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
          <Menu.Item
            icon={<IconSearch size={14} />}
            rightSection={
              <Text size="xs" color="dimmed">
                ⌘K
              </Text>
            }
          >
            Search
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
            Transfer my data
          </Menu.Item>
          <Menu.Item color="red" icon={<IconTrash size={14} />}>
            Delete my account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

const useStyles = createStyles({
  main_container: {
    width: "99vw",
    height: "6rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left_wrapper: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "6em",
    cursor: "pointer",
    marginRight: rem(300),
  },
  search_wrapper: {},
  search_input: {
    borderRadius: rem(20),
    backgroundColor: "#f6f6f6",
    width: "800px",
    height: rem(48),
  },
  menu_button: {
    backgroundColor: "#f6f6f6",
    color: "#000",
    paddingLeft: 0,
    border: 0,
    borderRadius: "4em",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#D8D9DA",
    },
    transition: "background-color 0.5s ease",
    height: "max-content",
    padding: ".4em",
  },
  menu_text: {
    margin: "0em .5em",
  },
  avatar: {
    borderRadius: "20em",
  },
  search_icon: {},
});

export default MainHeader;
