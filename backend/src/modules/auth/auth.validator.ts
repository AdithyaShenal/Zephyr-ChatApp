import { email, z } from "zod";

export const signupSchema = z
  .object({
    fullName: z
      .string({ error: "Fullname is required" })
      .min(3, "Full name must be at least 3 characters"),
    email: z.email("Email address is empty of Invalid"),
    password: z.string().min(5, "Password must be at least 5 characters"),
  })
  .refine((data) => data !== undefined, {
    message: "Requset body is required.",
  });

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(5, { error: "Password must be at least 5 characters" }),
});
