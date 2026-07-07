import { z } from "zod";
import { phoneRegex } from "./auth";

const nameField = z
  .string()
  .trim()
  .min(2, "Informe o nome completo")
  .max(120, "Nome muito longo");

const emailField = z.string().trim().toLowerCase().email("E-mail inválido");

const phoneField = z
  .string()
  .trim()
  .transform((value) => value.replace(/\D/g, ""))
  .pipe(z.string().regex(phoneRegex, "Informe um telefone válido com DDD"));

export const adminCreateUserSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  password: z
    .string()
    .min(6, "A senha precisa ter ao menos 6 caracteres")
    .max(72, "Senha muito longa"),
});

export type AdminCreateUserFormValues = z.infer<typeof adminCreateUserSchema>;

export const adminUpdateUserSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
});

export type AdminUpdateUserFormValues = z.infer<typeof adminUpdateUserSchema>;

export const adminUpdatePasswordSchema = z
  .object({
    password: z.string().min(6, "A senha precisa ter ao menos 6 caracteres").max(72, "Senha muito longa"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type AdminUpdatePasswordFormValues = z.infer<typeof adminUpdatePasswordSchema>;

export const adminRoleSchema = z.object({
  role: z.enum(["user", "admin"]),
});

export type AdminRoleFormValues = z.infer<typeof adminRoleSchema>;
