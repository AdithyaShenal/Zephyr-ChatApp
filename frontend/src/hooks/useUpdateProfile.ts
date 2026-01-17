import { api } from "@/services/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export default useUpdateProfile;
