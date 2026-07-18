import { z } from "zod";

const phoneRegex = /^\d{10,11}$/;

export const accountStepSchema = z.object({
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

export type AccountStepValues = z.infer<typeof accountStepSchema>;
