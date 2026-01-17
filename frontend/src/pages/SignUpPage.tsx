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
import { UserPen } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import useSignUp from "@/hooks/useSignUp";

const schema = z.object({
  fullName: z.string().min(1, "Please enter full name"),
  email: z.email("Please enter valid email"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

export type SignupFormData = z.infer<typeof schema>;

const SignUpPage = () => {
  const { mutate, isError, error, isPending } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(schema),
  });

  const submitHandler = (data: SignupFormData) => {
    console.log(data);
    mutate(data);
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      <div className="flex flex-col justify-center items-center p-10">
        <div className="grid w-full max-w-sm gap-4">
          <div></div>

          <div className="w-full max-w-md">
            <div className="mb-12 flex flex-col justify-center items-center">
              <UserPen className="bg-black/5 size-10 p-2 rounded-lg mb-2" />
              <p className="font-semibold text-lg">Create Account</p>
              <p className="text-sm text-gray-500">
                Get started with your free account
              </p>
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
                    <FieldLabel htmlFor="fullname">Full name</FieldLabel>
                    <Input
                      className="placeholder:text-sm"
                      {...register("fullName")}
                      id="fullname"
                      type="text"
                      placeholder="Adithya Shenal"
                    />
                    {errors.fullName && (
                      <FieldDescription className="text-red-500 text-xs font-semibold">
                        {errors.fullName.message}
                      </FieldDescription>
                    )}
                  </Field>

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
                      Sign up
                    </Button>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </form>

            <p className="text-sm text-gray-500 my-4 text-center">
              Already have an account?{" "}
              <Link to="/" className="font-semibold text-black" replace>
                <u>Log in</u>
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block bg-gray-100 text-3xl">WindTalk</div>
    </div>
  );
};

export default SignUpPage;
