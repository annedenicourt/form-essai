import { PROBLEM_OPTIONS, type FieldErrors, type RoofFormData } from "@/lib/roof-form-schema";
import { BigChoiceCard, FieldError, PrimaryButton } from "./form-primitives";

import roofMoss from "@/assets/roof-form/roof-moss.jpg";
import roofBroken from "@/assets/roof-form/roof-broken-tiles.jpg";
import roofLeak from "@/assets/roof-form/roof-leak.jpg";
import roofOld from "@/assets/roof-form/roof-old.jpg";
import roofGutter from "@/assets/roof-form/roof-gutter.jpg";
import roofUnknown from "@/assets/roof-form/roof-unknown.jpg";

const PROBLEM_IMAGES: Record<string, string> = {
  "Mousses / traces noires": roofMoss,
  "Tuiles abîmées": roofBroken,
  "Infiltration ou fuite": roofLeak,
  "Toiture ancienne": roofOld,
  "Autre ": roofGutter,
  "Je ne sais pas": roofUnknown,
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
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-[16px] font-semibold text-white leading-tight">Quel problème constatez-vous ?</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {PROBLEM_OPTIONS.map((opt) => (
          <BigChoiceCard
            key={opt}
            label={opt}
            selected={data.problem_type === opt}
            onClick={() => update({ problem_type: opt })}
            image={PROBLEM_IMAGES[opt]}
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
