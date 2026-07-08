import { PROBLEM_OPTIONS, type FieldErrors, type RoofFormData } from "@/lib/roof-form-schema";
import { BigChoiceCard, FieldError, PrimaryButton } from "./form-primitives";

const PROBLEM_IMAGES: Record<string, string> = {
  "Mousses / traces noires": "https://groupefrancerenov-construction.com/wp-content/uploads/2026/07/roof-moss.webp",
  "Tuiles abîmées": "https://groupefrancerenov-construction.com/wp-content/uploads/2026/07/tuiles-cassees.webp",
  "Infiltration ou fuite":
    "https://groupefrancerenov-construction.com/wp-content/uploads/2026/07/infiltration-toit.webp",
  "Toiture ancienne": "https://groupefrancerenov-construction.com/wp-content/uploads/2026/07/toiture-ancienne.webp",
  "Autre ": "https://groupefrancerenov-construction.com/wp-content/uploads/2026/07/gouttiere-abimee.webp",
  "Je ne sais pas": "https://groupefrancerenov-construction.com/wp-content/uploads/2026/07/roof-unknown.webp",
};

export function Step1Problem({
  data,
  errors,
  update,
  onNext,
}: {
  data: RoofFormData;
  errors: FieldErrors;
  update: (patch: Partial<RoofFormData>) => void;
  onNext: (patch?: Partial<RoofFormData>) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div>
        <h2 className="mb-1 text-[16px] font-semibold text-white leading-tight">Quel problème constatez-vous ?</h2>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {PROBLEM_OPTIONS.map((option) => (
          <BigChoiceCard
            key={option}
            label={option}
            selected={data.problem_type === option}
            onClick={() => onNext({ problem_type: option })}
            image={PROBLEM_IMAGES[option]}
          />
        ))}
      </div>
      <FieldError message={errors.problem_type} />

      <PrimaryButton type="button" onClick={() => onNext()} className="absolute bottom-22 md:bottom-14 left-0 w-full">
        Continuer
      </PrimaryButton>
    </div>
  );
}
