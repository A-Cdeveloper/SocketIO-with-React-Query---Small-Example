import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import { useAuthStore } from "@/store/authStore";
export const useLogin = () => {
  const { login: loginToStore } = useAuthStore();
  const {
    mutate: loginMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data) => {
      loginToStore(data.user!, data.token, data.refreshToken);
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return { loginMutation, isPending, error };
};
