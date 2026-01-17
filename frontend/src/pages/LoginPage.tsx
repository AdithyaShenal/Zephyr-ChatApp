import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { LucideLogIn } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import useLogin from "@/hooks/useLogin";

const schema = z.object({
  email: z.email("Please enter valid email"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

export type LoginFormData = z.infer<typeof schema>;

const LoginPage = () => {
  const { mutate: login, isPending, isError, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const submitHandler = (data: LoginFormData) => {
    console.log(data);
    login(data);
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      <div className="flex flex-col justify-center items-center p-10">
        <div className="grid w-full max-w-sm gap-4">
          <div></div>

          <div className="w-full max-w-md">
            <div className="mb-12 flex flex-col justify-center items-center">
              <LucideLogIn className="bg-black/5 size-10 p-2 rounded-lg mb-2" />
              <p className="font-semibold text-lg">Log in</p>
              <p className="text-sm text-gray-500">Let's whisper to wind!</p>
            </div>

            {isError && (
              <p className="text-center text-sm text-red-500 font-semibold">
                {error.response?.data.message}
              </p>
            )}

            <form onSubmit={handleSubmit(submitHandler)}>
              <FieldSet onSubmit={handleSubmit(submitHandler)}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      className="placeholder:text-sm"
                      {...register("email")}
                      id="email"
                      type="email"
                      placeholder="adithya"
                    />
                    {errors.email && (
                      <FieldDescription className="text-red-500 text-xs font-semibold">
                        {errors.email?.message}
                      </FieldDescription>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      className="placeholder:text-sm"
                      {...register("password")}
                      id="password"
                      type="password"
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <FieldDescription className="text-red-500 text-xs font-semibold">
                        {errors.password?.message}
                      </FieldDescription>
                    )}
                  </Field>

                  <Field orientation="horizontal">
                    <Button
                      disabled={isPending}
                      className="w-full"
                      type="submit"
                    >
                      {isPending && <Spinner />}
                      Log in
                    </Button>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </form>

            <p className="text-sm text-gray-500 my-4 text-center">
              Create an account?{" "}
              <Link
                to="/signupPage"
                className="font-semibold text-black"
                replace
              >
                <u>Sign up</u>
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block bg-gray-100 text-3xl">WindTalk</div>
    </div>
  );
};

export default LoginPage;
