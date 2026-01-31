import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiError } from "./useSignUp";

export interface FriendProps {
  _id: string;
  fullName: string;
  email: string;
  profilePic?: string;
  lastSeen: string;
  createdAt: string;
}

const useGetFriends = () => {
  return useQuery<FriendProps[], AxiosError<ApiError>>({
    queryKey: ["friends"],
    queryFn: async () => {
      const res = await api.get("/friends/all");
      return res.data.result;
    },
  });
};

export default useGetFriends;
