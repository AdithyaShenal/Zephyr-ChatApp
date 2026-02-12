import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLottie } from "lottie-react";
import LogingAnimation from "../assets/Online Chat.json";
import WhatsappBg from "../assets/whatsapp.png";

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
  email: z.string().email("Please enter valid email"),
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

  const options = {
    animationData: LogingAnimation,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
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
              <LucideLogIn className="bg-black/5 size-10 p-2 rounded-lg mb-2" />
              <p className="font-semibold text-lg">Log in</p>
            </div>

            {/* Demo Credentials Banner */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="text-xl mt-0.5 flex-shrink-0 animate-wave">
                  👋
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-blue-900 mb-1.5">
                    Demo Account
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-blue-800 font-medium w-16">
                        Email:
                      </span>
                      <code className="px-1.5 py-0.5 bg-white rounded text-blue-900 font-mono text-xs">
                        washenal55@gmail.com
                      </code>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-blue-800 font-medium w-16">
                        Password:
                      </span>
                      <code className="px-1.5 py-0.5 bg-white rounded text-blue-900 font-mono text-xs">
                        12345
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <style>{`
              @keyframes wave {
                0% { transform: rotate(0deg); }
                10% { transform: rotate(14deg); }
                20% { transform: rotate(-8deg); }
                30% { transform: rotate(14deg); }
                40% { transform: rotate(-4deg); }
                50% { transform: rotate(10deg); }
                60% { transform: rotate(0deg); }
                100% { transform: rotate(0deg); }
              }
              .animate-wave {
                animation: wave 2s ease-in-out infinite;
                transform-origin: 70% 70%;
                display: inline-block;
              }
            `}</style>

            {isError && (
              <p className="text-center text-sm text-red-500 font-semibold mb-4">
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
                      placeholder="eg:- adithya@gmail.com"
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

      <div className="relative z-10 rounded-3xl p-10 shadow-2xl flex flex-col items-center overflow-hidden">
        <div className="text-2xl font-bold">Welcome back!</div>

        <div className="w-[450px]">{View}</div>

        <h1 className="mt-6 text-4xl racing-sans font-bold tracking-wide text-black">
          Zephyr
        </h1>

        <p className="mt-2 text-sm text-black text-center max-w-xs">
          Drift back into the conversation. Fast, fluid messaging for the modern
          world.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
