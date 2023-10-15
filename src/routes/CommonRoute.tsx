import { useRoutes } from "react-router-dom";
import LoginPage from "../page/login.page";
import RegisterPage from "../page/register.page";
import MainHeader from "../components/header/MainHeader";
import { HomePage } from "../page/home.page";
import CreatePostPage from "../page/createPost.page";
import ChatPage from "../page/chat.page";

const CommonRoute = () => {
  let element = useRoutes([
    {
      path: "",
      element: <LoginPage />,
      index: true,
    },
    {
      path: "home",
      element: <HomePage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/header",
      element: <MainHeader />,
    },
    {
      path: "/chat",
      element: <ChatPage />,
    },
    {
      path: "/create",
      element: <CreatePostPage />,
    },
  ]);

  return element;
};

export default CommonRoute;
