import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiError } from "./useSignUp";

export interface UserProps {
  _id: string;
  fullName: string;
  email: string;
  profilePic?: string;
  createdAt: string;
}

const useMe = () => {
  return useQuery<UserProps, AxiosError<ApiError>>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get("/user/me");
      return res.data.result;
    },
  });
};

export default useMe;
