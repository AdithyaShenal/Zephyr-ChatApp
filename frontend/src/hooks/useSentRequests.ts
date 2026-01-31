import { api } from "@/services/apiClient";
import type { AxiosError } from "axios";
import type { ApiError } from "./useSignUp";
import { useQuery } from "@tanstack/react-query";
import type { PeopleProps } from "./useGetPeople";

export interface SentRequestProps {
  _id: string;
  recipient: PeopleProps;
  requester: string;
  status: "string";
  blockedBy: string;
}

const useSentRequests = () => {
  return useQuery<SentRequestProps[], AxiosError<ApiError>>({
    queryKey: ["sent", "requests"],
    queryFn: async () => {
      const res = await api.get("/friends/sent");
      return res.data.result;
    },
  });
};

export default useSentRequests;
