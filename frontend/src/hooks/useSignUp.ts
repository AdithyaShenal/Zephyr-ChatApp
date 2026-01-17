import type { SignupFormData } from "@/pages/SignUpPage";
import { api } from "@/services/apiClient";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export interface ApiError {
  message: string;
  status: number;
  code: string;
  details: string;
}

const useSignUp = () => {
  const navigate = useNavigate();

  return useMutation<unknown, AxiosError<ApiError>, SignupFormData>({
    mutationFn: async (payload: SignupFormData) => {
      const res = await api.post("/auth/signup", payload);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Sign up Successful!", { duration: 5000 });
      navigate("/homePage");
    },
  });
};

export default useSignUp;
