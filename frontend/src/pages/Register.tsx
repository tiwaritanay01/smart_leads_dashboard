import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAuthActions } from "@/hooks/useAuthActions";
import { getErrorMessage } from "@/utils/errors";
import { UserRole } from "@/types/user";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import toast from "react-hot-toast";

const registerSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(8, "Minimum 8 characters"),
  role: z.nativeEnum(UserRole)
});

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register: registerUser, isLoading } = useAuthActions();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: UserRole.Sales
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const result = await registerUser(values);
      login(result.token, result.user);
      toast.success("Account created");
      navigate("/dashboard");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  });

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-ink/10 bg-white/90 p-8 shadow-soft">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.4em] text-slate">Register</p>
          <h1 className="font-display text-3xl font-semibold text-ink">
            Create your workspace
          </h1>
          <p className="mt-2 text-sm text-slate">
            Assign your role and start building a structured pipeline.
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
          <Select
            label="Role"
            options={[
              { label: "Admin", value: UserRole.Admin },
              { label: "Sales", value: UserRole.Sales }
            ]}
            error={errors.role?.message}
            {...register("role")}
          />
          <Button type="submit" loading={isLoading} className="w-full">
            Create account
          </Button>
        </form>
        <p className="mt-6 text-sm text-slate">
          Already have an account?{" "}
          <Link className="font-semibold text-ink" to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
