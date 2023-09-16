import {
  Avatar,
  Button,
  Input,
  Menu,
  Text,
  createStyles,
  TextInput,
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
} from "@tabler/icons-react";
import { CiSearch } from "react-icons/ci";
const MainHeader = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.main_container}>
      <img src={MainLogo} className={classes.logo} />
      <TextInput
        style={{
          backgroundColor: "yellow",
        }}
        icon={<CiSearch />}
        placeholder="Your email"
      ></TextInput>
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
    width: "100vw",
    height: "6rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    height: "6em",
  },
  search_input: {
    borderRadius: "5em",
    fontWeight: 500,
    width: "40em",
    color: "#000",
    backgroundColor: "#f6f6f6",
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
});

export default MainHeader;
