import { Outlet, useNavigate, useRoutes } from "react-router-dom";
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
import PostDetailPage from "../page/customer/postDetail.page";
import ProposalPage from "../page/shop/proposal.page";
import OrderPage from "../page/shop/order.page";
import AdminLayout from "../layouts/admin.layout";

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

        {
          path: "/profile",
          element: <ProfilePage />,
          index: true,
        },
        {
          path: "/create-order/:id",
          element: <CreateOrderPage />,
        },
        {
          path: "/post/:id",
          element: <PostDetailPage />,
        },
      ],
    },
    {
      path: "/provider",
      element: <ProviderLayout />,
      children: [
        {
          path: "",
          element: <ShopHomePage />,
        },
        {
          path: "/provider/proposal",
          element: <ProposalPage />,
        },
        {
          path: "/provider/order",
          element: <OrderPage />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
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
    {
      path: "/chat",
      element: <ChatPage />,
    },
  ]);

  return element;
};

export default CommonRoute;
