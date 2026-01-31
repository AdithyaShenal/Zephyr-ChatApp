import { api } from "@/services/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiError } from "./useSignUp";
import toast from "react-hot-toast";

const useAcceptRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError<ApiError>, string>({
    mutationFn: async (requestId) => {
      const res = await api.post(`/friends/accept/${requestId}`);
      return res.data.result;
    },

    onSuccess: () => {
      toast.success("Friend request accepted", { duration: 3000 });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["incoming", "requests"] });
    },
  });
};

export default useAcceptRequest;
