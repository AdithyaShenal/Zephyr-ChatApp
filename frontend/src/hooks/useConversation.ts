import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiError } from "./useSignUp";
import { api } from "@/services/apiClient";
import type { ChatUserProps } from "./useUsers";

export interface Conversation {
  _id: string;
  lastMessage: string;
  visited: boolean;
  chatUserId: ChatUserProps;
  time: string;
}

const useConversation = () => {
  return useQuery<Conversation[], AxiosError<ApiError>>({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await api.get("/conversation");
      return res.data.result;
    },
  });
};

export default useConversation;
