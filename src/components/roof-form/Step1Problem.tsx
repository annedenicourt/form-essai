import { PROBLEM_OPTIONS, type FieldErrors, type RoofFormData } from "@/lib/roof-form-schema";
import { ChoiceCard, FieldError, PrimaryButton } from "./form-primitives";

export function Step1Problem({
  data,
  errors,
  update,
  onNext,
}: {
  data: RoofFormData;
  errors: FieldErrors;
  update: (patch: Partial<RoofFormData>) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-[16px] font-semibold text-white leading-tight">
          Quel problème constatez-vous ?
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {PROBLEM_OPTIONS.map((opt) => (
          <ChoiceCard
            key={opt}
            label={opt}
            selected={data.problem_type === opt}
            onClick={() => update({ problem_type: opt })}
            compact
          />
        ))}
      </div>
      <FieldError message={errors.problem_type} />

      <PrimaryButton type="button" onClick={onNext}>
        Continuer
      </PrimaryButton>
    </div>
  );
}
