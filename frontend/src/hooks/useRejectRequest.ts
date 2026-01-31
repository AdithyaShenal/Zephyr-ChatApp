import { api } from "@/services/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiError } from "./useSignUp";
import toast from "react-hot-toast";

const useRejectRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError<ApiError>, string>({
    mutationFn: async (requestId) => {
      const res = await api.post(`/friends/reject/${requestId}`);
      return res.data.result;
    },

    onSuccess: () => {
      toast.success("Friend request rejected", { duration: 3000 });
      queryClient.invalidateQueries({ queryKey: ["people"] });
      queryClient.invalidateQueries({ queryKey: ["incoming", "requests"] });
    },
  });
};

export default useRejectRequest;
