import { api } from "@/services/apiClient";
import type { AxiosError } from "axios";
import type { ApiError } from "./useSignUp";
import { useQuery } from "@tanstack/react-query";
import type { PeopleProps } from "./useGetPeople";

export interface IncomingRequestProps {
  _id: string;
  recipient: string;
  requester: PeopleProps;
  status: "string";
  blockedBy: string;
}

const useIncomingRequests = () => {
  return useQuery<IncomingRequestProps[], AxiosError<ApiError>>({
    queryKey: ["incoming", "requests"],
    queryFn: async () => {
      const res = await api.get("/friends/incoming");
      return res.data.result;
    },
  });
};

export default useIncomingRequests;
