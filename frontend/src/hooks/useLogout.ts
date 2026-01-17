import { api } from "@/services/apiClient";
import { disconnectSocket } from "@/services/socketClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await api.post("/auth/logout");
      return res.data;
    },

    onSuccess: () => {
      disconnectSocket();
      queryClient.clear();
      toast.success("Logout Successfully");
      navigate("/");
    },

    onError: () => {
      toast.error("Logout failed");
    },
  });
};

export default useLogout;
