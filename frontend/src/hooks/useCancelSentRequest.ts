import { api } from "@/services/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiError } from "./useSignUp";
import toast from "react-hot-toast";

const useCancelSentRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError<ApiError>, string>({
    mutationFn: async (requestId) => {
      const res = await api.post(`/friends/cancel/${requestId}`);
      return res.data.result;
    },

    onSuccess: () => {
      toast.success("Canceled the sent request", { duration: 3000 });
      queryClient.invalidateQueries({ queryKey: ["sent", "requests"] });
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
  });
};

export default useCancelSentRequest;
