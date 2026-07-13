import { z } from "zod";

export const chartFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe o nome completo")
    .max(120, "Nome muito longo"),
  birthDate: z
    .string()
    .min(1, "Informe a data de nascimento")
    .refine((value) => !Number.isNaN(new Date(value).getTime()), "Data inválida"),
  birthTime: z.string().min(1, "Informe o horário de nascimento"),
  city: z
    .string()
    .trim()
    .min(1, "Busque e selecione uma cidade"),
  lat: z.number({ message: "Selecione uma cidade na lista" }),
  lon: z.number({ message: "Selecione uma cidade na lista" }),
  tzone: z.number({ message: "Selecione o fuso horário" }),
});

export type ChartFormValues = z.infer<typeof chartFormSchema>;
