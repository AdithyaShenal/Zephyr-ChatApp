import PublicLayout from "@/layouts/PublicLayout";
import SignUpPage from "@/pages/SignUpPage";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router-dom";
import PrivateLayout from "@/layouts/PrivateLayout";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import LoginPage from "@/pages/LoginPage";
import FindPeople from "@/pages/FindPeople";

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
        index: true,
        element: <HomePage />,
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
      },
    ],
  },
]);

export default router;
