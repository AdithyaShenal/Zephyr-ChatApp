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

const useGetPeople = (searchQuery?: string) => {
  return useQuery<PeopleProps[], AxiosError<ApiError>>({
    queryKey: ["people", searchQuery],
    queryFn: async () => {
      const params = searchQuery ? { search: searchQuery } : {};
      const res = await api.get("/friends/mutual", { params });
      return res.data.result;
    },
  });
};

export default useGetPeople;
