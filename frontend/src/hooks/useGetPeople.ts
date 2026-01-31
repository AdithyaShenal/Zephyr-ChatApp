import { api } from "@/services/apiClient";
import type { AxiosError } from "axios";
import type { ApiError } from "./useSignUp";
import { useQuery } from "@tanstack/react-query";

export interface PeopleProps {
  _id: string;
  fullName: string;
  email: string;
  profilePic?: string;
  createdAt: string;
  lastSeen: string;
}

const useGetPeople = () => {
  return useQuery<PeopleProps[], AxiosError<ApiError>>({
    queryKey: ["people"],
    queryFn: async () => {
      const res = await api.get("/friends/mutual");
      return res.data.result;
    },
  });
};

export default useGetPeople;
