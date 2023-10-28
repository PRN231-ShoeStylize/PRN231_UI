import { useRoutes } from "react-router-dom";
import LoginPage from "../page/login.page";
import RegisterPage from "../page/register.page";
import MainHeader from "../components/header/MainHeader";
import HomePage from "../page/home.page";
import ShopHomePage from "../page/shop/shop.page";
import ChatPage from "../page/chat.page";
import CreatePostPage from "../page/customer/createPost.page";
import HomeLayout from "../layouts/home.layout";
import ProfilePage from "../page/customer/profile.page";
import CreateOrderPage from "../page/customer/createOrder.page";
import ProviderLayout from "../layouts/provider.layout";

const CommonRoute = () => {
  let element = useRoutes([
    {
      path: "",
      element: <LoginPage />,
      index: true,
    },
    {
      path: "",
      element: <HomeLayout />,
      children: [
        {
          path: "/customer",
          element: <HomePage />,
        },
        // {
        //   path: "/header",
        //   element: <MainHeader />,
        // },
        {
          path: "/chat",
          element: <ChatPage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/create-order/:id",
          element: <CreateOrderPage />,
        },
      ],
    },
    {
      path: "/provider",
      element: <ProviderLayout/>,
      children: [
        {
          path: "",
          element: <ShopHomePage/>
        }
      ]
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
      path: "/create",
      element: <CreatePostPage />,
    },
  ]);

  return element;
};

export default CommonRoute;
