import { z } from "zod";

export const phoneRegex = /^\d{10,11}$/;

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome")
    .max(120, "Nome muito longo"),
  email: z.string().trim().toLowerCase().email("E-mail inválido"),
  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => value.length === 0 || phoneRegex.test(value), {
      message: "Informe um telefone válido com DDD",
    }),
  password: z
    .string()
    .min(6, "A senha precisa ter ao menos 6 caracteres")
    .max(72, "Senha muito longa"),
  acceptedTerms: z.boolean().refine((value) => value === true, {
    message: "Você precisa aceitar os Termos de Uso e a Política de Privacidade",
  }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("E-mail inválido"),
  password: z.string().min(1, "Informe sua senha"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome completo")
    .max(120, "Nome muito longo"),
  email: z.string().trim().toLowerCase().email("E-mail inválido"),
  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/\D/g, ""))
    .pipe(z.string().regex(phoneRegex, "Informe um telefone válido com DDD")),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Informe sua senha atual"),
    newPassword: z.string().min(6, "A nova senha precisa ter ao menos 6 caracteres"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As senhas não coincidem",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "A nova senha deve ser diferente da atual",
    path: ["newPassword"],
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;
