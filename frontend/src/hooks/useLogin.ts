import { api } from "@/services/apiClient";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { ApiError } from "./useSignUp";
import type { UserProps } from "./useMe";

interface LoginProps {
  email: string;
  password: string;
}

const useLogin = () => {
  const navigate = useNavigate();

  return useMutation<UserProps, AxiosError<ApiError>, LoginProps>({
    mutationFn: async (payload: LoginProps) => {
      const res = await api.post("/auth/login", payload);
      return res.data.result;
    },

    onSuccess: () => {
      toast.success("Login success", { duration: 3000 });
      navigate("/homePage");
    },
  });
};

export default useLogin;
