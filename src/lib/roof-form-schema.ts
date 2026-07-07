import { z } from "zod";

export const PROBLEM_OPTIONS = [
  "Mousses / traces noires",
  "Tuiles abîmées",
  "Infiltration ou fuite",
  "Toiture ancienne",
  "Autre ",
  "Je ne sais pas",
] as const;

export const PROJECT_OPTIONS = [
  "Nettoyage / démoussage",
  "Traitement hydrofuge",
  "Réparation",
  "Avis/Diagnostic",
] as const;

export const CALLBACK_OPTIONS = [
  "Le plus rapidement possible",
  "Dans la journée",
  "En fin de journée",
  "Cette semaine",
  "Peu importe",
] as const;

export const step1Schema = z.object({
  problem_type: z.string().min(1, "Merci de sélectionner une option"),
});

export const step2Schema = z.object({
  address: z.string().max(200).optional().default(""),
  postal_code: z.string().regex(/^\d{5}$/, "Code postal invalide (5 chiffres)"),
  city: z.string().trim().min(1, "Ville obligatoire").max(100),
});

export const step3Schema = z.object({
  project_type: z.string().min(1, "Merci de sélectionner une option"),
});

export const step4Schema = z.object({
  callback_preference: z.string().min(1, "Merci de sélectionner un moment"),
  message: z.string().max(1000).optional().default(""),
});

export const step5Schema = z.object({
  lastname: z.string().trim().min(1, "Nom obligatoire.").max(80),
  firstname: z.string().trim().max(80).optional().default(""),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/, "Numéro de téléphone invalide."),
  email: z
    .string()
    .trim()
    .refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), {
      message: "Email invalide",
    })
    .optional()
    .default(""),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consentement requis" }),
  }),
});

export type RoofFormData = {
  problem_type: string;
  address: string;
  postal_code: string;
  city: string;
  project_type: string;
  callback_preference: string;
  message: string;
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
  consent: boolean;
};

export const emptyFormData: RoofFormData = {
  problem_type: "",
  address: "",
  postal_code: "",
  city: "",
  project_type: "",
  callback_preference: "",
  message: "",
  lastname: "",
  firstname: "",
  phone: "",
  email: "",
  consent: false,
};

export type FieldErrors = Partial<Record<keyof RoofFormData, string>>;

export function validateStep(step: 1 | 2 | 3 | 4 | 5, data: RoofFormData): FieldErrors {
  const schemas = { 1: step1Schema, 2: step2Schema, 3: step3Schema, 4: step4Schema, 5: step5Schema };
  const result = schemas[step].safeParse(data);
  if (result.success) return {};
  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof RoofFormData;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}
