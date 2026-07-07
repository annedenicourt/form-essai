import { PROBLEM_OPTIONS, type FieldErrors, type RoofFormData } from "@/lib/roof-form-schema";
import { BigChoiceCard, FieldError, PrimaryButton } from "./form-primitives";

import roofMoss from "@/assets/roof-form/roof-moss.jpg";
import roofUnknown from "/public/images/roof-form/roof-unknown.jpg";

const PROBLEM_IMAGES: Record<string, string> = {
  "Mousses / traces noires": roofMoss,
  "Tuiles abîmées": "/public/images/tuiles-cassees.png",
  "Infiltration ou fuite": "/public/images/infiltration-toit.png",
  "Toiture ancienne": "/public/images/toiture-ancienne.png",
  "Autre ": "/public/images/gouttiere-abimee.png",
  "Je ne sais pas": "/public/images/roof-unknown.jpg",
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {PROBLEM_OPTIONS.map((option) => (
          <BigChoiceCard
            key={option}
            label={option}
            selected={data.problem_type === option}
            onClick={() => update({ problem_type: option })}
            image={PROBLEM_IMAGES[option]}
          />
        ))}
      </div>
      <FieldError message={errors.problem_type} />

      <PrimaryButton type="button" onClick={onNext} className="absolute bottom-16 left-0 w-full">
        Continuer
      </PrimaryButton>
    </div>
  );
}
