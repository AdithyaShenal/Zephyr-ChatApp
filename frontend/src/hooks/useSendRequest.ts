import { api } from "@/services/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiError } from "./useSignUp";
import toast from "react-hot-toast";

const useSendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError<ApiError>, string>({
    mutationFn: async (userId) => {
      const res = await api.post(`/friends/request/${userId}`);
      return res.data.result;
    },

    onSuccess: () => {
      toast.success("Request sent", { duration: 3000 });
      queryClient.invalidateQueries({ queryKey: ["sent", "requests"] });
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
  });
};

export default useSendRequest;
