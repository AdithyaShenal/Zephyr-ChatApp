import PublicLayout from "@/layouts/PublicLayout";
import SignUpPage from "@/pages/SignUpPage";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router-dom";
import PrivateLayout from "@/layouts/PrivateLayout";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import LoginPage from "@/pages/LoginPage";
import FindPeople from "@/pages/FindPeople";
import IncomingRequestsComponent from "@/components/IncomingRequestsComponent";
import SentRequestsComponent from "@/components/SentRequestsComponent";
import ChatList from "@/components/ChatList";
import FriendList from "@/components/FriendList";
import AboutPage from "@/pages/AboutPage";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/signupPage",
        element: <SignUpPage />,
      },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        path: "/homePage",
        element: <HomePage />,
        children: [
          {
            index: true,
            element: <ChatList />,
          },
          {
            path: "friendList",
            element: <FriendList />,
          },
        ],
      },
      {
        path: "/profilePage",
        element: <ProfilePage />,
      },
      {
        path: "/settingsPage",
        element: <SettingsPage />,
      },
      {
        path: "/people",
        element: <FindPeople />,
        children: [
          {
            index: true,
            element: <IncomingRequestsComponent />,
          },
          {
            path: "sentRequests",
            element: <SentRequestsComponent />,
          },
        ],
      },
      {
        path: "/aboutPage",
        element: <AboutPage />,
      },
    ],
  },
]);

export default router;
