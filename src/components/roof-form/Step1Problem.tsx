import { ChevronsDown, Clock, Droplet, Hammer, HelpCircle, Sprout } from "lucide-react";

import { PROBLEM_OPTIONS, type FieldErrors, type RoofFormData } from "@/lib/roof-form-schema";
import { ChoiceCard, FieldError, PrimaryButton } from "./form-primitives";

const PROBLEM_ICONS: Record<string, React.ReactNode> = {
  "Mousses / traces noires": <Sprout size={20} />,
  "Tuiles abîmées": <Hammer size={20} />,
  "Infiltration ou fuite": <Droplet size={20} />,
  "Toiture ancienne": <Clock size={20} />,
  "Gouttières / débords de toit": <ChevronsDown size={20} />,
  "Je ne sais pas": <HelpCircle size={20} />,
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

      <div className="grid grid-cols-3 gap-2">
        {PROBLEM_OPTIONS.map((opt) => (
          <ChoiceCard
            key={opt}
            label={opt}
            selected={data.problem_type === opt}
            onClick={() => update({ problem_type: opt })}
            icon={PROBLEM_ICONS[opt]}
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
