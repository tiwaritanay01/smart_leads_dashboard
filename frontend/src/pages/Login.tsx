import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAuthActions } from "@/hooks/useAuthActions";
import { getErrorMessage } from "@/utils/errors";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(8, "Minimum 8 characters")
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { login: loginUser, isLoading } = useAuthActions();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const result = await loginUser(values);
      login(result.token, result.user);
      toast.success("Welcome back");
      navigate("/dashboard");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  });

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-ink/10 bg-white/90 p-8 shadow-soft">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.4em] text-slate">Sign in</p>
          <h1 className="font-display text-3xl font-semibold text-ink">
            Welcome to Smart Leads
          </h1>
          <p className="mt-2 text-sm text-slate">
            Track every opportunity and stay on top of your pipeline.
          </p>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="you@company.com"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            error={errors.password?.message}
          />
          <Button type="submit" loading={isLoading} className="w-full">
            Sign in
          </Button>
        </form>
        <p className="mt-6 text-sm text-slate">
          New here?{" "}
          <Link className="font-semibold text-ink" to="/register">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
