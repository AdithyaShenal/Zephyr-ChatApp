import { api } from "@/services/apiClient";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiError } from "./useSignUp";

const useFriendRequest = () => {
  return useMutation<unknown, AxiosError<ApiError>, string>({
    mutationFn: async (userId) => {
      const res = await api.post(`/friends/request/${userId}`);
      return res.data.result;
    },
  });
};

export default useFriendRequest;
