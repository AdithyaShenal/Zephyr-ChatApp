import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import type { UserProps } from "./useMe";
import type { AxiosError } from "axios";
import type { ApiError } from "./useSignUp";

export function useAuth() {
  return useQuery<UserProps, AxiosError<ApiError>>({
    queryKey: ["user", "current"],
    queryFn: async () => {
      const res = await api.get("/user/me");
      return res.data.result;
    },
    retry: 1,
  });
}
