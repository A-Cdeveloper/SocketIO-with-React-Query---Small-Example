import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import { CustomInput } from "@/components/customComponents/CustomInput";
import { Button } from "@/components/ui/button";
import { loginSchema, type LoginForm } from "../schemas/auth";
import { useNavigate } from "react-router";

const LoginFormular = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const { loginMutation, isPending, error } = useLogin();

  const onSubmit = (data: LoginForm) => {
    loginMutation(data, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <div className="max-w-sm mx-auto my-8 bg-background dark:bg-foreground/10 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-2 dark:text-white">
        Login to your account
      </h1>
      <p className="text-center text-sm text-muted-foreground dark:text-muted-foreground mb-4">
        Enter your email and password to login to your account
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <CustomInput
          {...register("email")}
          type="email"
          placeholder="Email"
          error={errors.email?.message}
          required
        />
        <CustomInput
          {...register("password")}
          type="password"
          placeholder="Password"
          error={errors.password?.message}
          required
        />
        {error && <div className="text-destructive">{error.message}</div>}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full cursor-pointer my-4"
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default LoginFormular;
