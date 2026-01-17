import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiError } from "./useSignUp";

export interface ChatUserProps {
  _id: string;
  fullName: string;
  email: string;
  profilePic?: string;
  createdAt: string;
  lastSeen: string;
}

const useUsers = () => {
  return useQuery<ChatUserProps[], AxiosError<ApiError>>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/message/users");
      return res.data.result;
    },
  });
};

export default useUsers;
