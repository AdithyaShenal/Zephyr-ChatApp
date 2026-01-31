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

import { useLottie } from "lottie-react";
import SignipAnimation from "../assets/Video Chat.json";
import WhatsappBg from "../assets/whatsapp.png";

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

  const options = {
    animationData: SignipAnimation,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      <div className="relative z-10 rounded-md p-10 shadow-2xl flex flex-col items-center">
        {/* Fixed the typo here */}
        <div className="text-2xl font-bold">Ready to dive in?</div>

        {/* Animation */}
        <div className="w-[450px]">{View}</div>

        {/* Brand text */}
        <h1 className="mt-6 text-4xl racing-sans font-bold tracking-wide text-black">
          Zephyr
        </h1>

        {/* Tagline */}
        <p className="mt-2 text-sm text-black text-center max-w-xs">
          Where speed meets simplicity. Experience a lighter way to stay
          connected.
        </p>
      </div>

      <div
        className="flex flex-col justify-center items-center p-10"
        style={{
          // This creates a white "wash" at 90% opacity over the image
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 1)), url(${WhatsappBg})`,
          backgroundRepeat: "",
          backgroundSize: "", // Adjust size to your liking
        }}
      >
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
    </div>
  );
};

export default SignUpPage;
