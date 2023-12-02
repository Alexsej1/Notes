import { z } from "zod";

export const User = z.object({
  email: z.string().email({ message: "Пожалуйста, введите правильный email" }),
  password: z
    .string()
    .min(8, { message: "Пароль должен содержать не менее 8 символов." })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Пароль должен содержать хотя бы одну заглавную букву.",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Пароль должен содержать хотя бы одну цифру.",
    }),
  repPassword: z
    .string()
    .min(8, { message: "Пароли должны содержать не менее 8 символов." }),
  date: z.string(),
});
