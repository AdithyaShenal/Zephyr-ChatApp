import type { UserProps } from "@/hooks/useMe";
import { create } from "zustand";

interface AuthStore {
  user: UserProps;
  setUser: (user: UserProps) => void;
  resetUser: () => void;
}

const initUser: UserProps = {
  _id: "",
  fullName: "",
  email: "",
  profilePic: "",
  createdAt: "",
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: initUser,

  setUser: (user) =>
    set({
      user,
    }),

  resetUser: () =>
    set({
      user: initUser,
    }),
}));

export default useAuthStore;
