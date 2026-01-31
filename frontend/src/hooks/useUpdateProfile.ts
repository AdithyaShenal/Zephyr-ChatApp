import { api } from "@/services/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { ApiError } from "./useSignUp";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profilePic: string) => {
      const res = await api.put("/user/update-profile", {
        profilePic,
      });
      return res.data.result;
    },
    onSuccess: () => {
      toast.success("Profile image updated", { id: "upload" });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    onMutate: () => toast.loading("Uploading image...", { id: "upload" }),

    onError: (error: AxiosError<ApiError>) => {
      const msg =
        error?.response?.data?.message || error?.message || "Upload failed!";
      toast.error(msg, { id: "upload" });
    },
  });
};

export default useUpdateProfile;
