import { CALLBACK_OPTIONS, PROJECT_OPTIONS, type FieldErrors, type RoofFormData } from "@/lib/roof-form-schema";
import { SmallChoiceCard, FieldError, FieldLabel, PrimaryButton, SecondaryButton, TextArea } from "./form-primitives";

export function Step3Project({
  data,
  errors,
  update,
  onNext,
  onBack,
}: {
  data: RoofFormData;
  errors: FieldErrors;
  update: (patch: Partial<RoofFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-[16px] font-semibold text-white leading-tight">Votre demande concerne plutôt :</h2>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {PROJECT_OPTIONS.map((opt) => (
          <SmallChoiceCard
            key={opt}
            label={opt}
            selected={data.project_type === opt}
            onClick={() => update({ project_type: opt })}
            compact
          />
        ))}
      </div>
      <FieldError message={errors.project_type} />

      <div>
        <FieldLabel required>Quand souhaitez-vous être rappelé ?</FieldLabel>
        <div className="grid grid-cols-2 gap-2">
          {CALLBACK_OPTIONS.map((opt) => (
            <SmallChoiceCard
              key={opt}
              label={opt}
              selected={data.callback_preference === opt}
              onClick={() => update({ callback_preference: opt })}
              compact
            />
          ))}
        </div>
        <FieldError message={errors.callback_preference} />
      </div>

      <div>
        <FieldLabel htmlFor="message">Message ou précision</FieldLabel>
        <TextArea
          id="message"
          value={data.message}
          onChange={(e) => update({ message: e.target.value })}
          rows={2}
          placeholder="Optionnel"
        />
      </div>

      <div className="flex gap-2 pt-1">
        <SecondaryButton type="button" onClick={onBack} className="flex-1">
          Retour
        </SecondaryButton>
        <PrimaryButton type="button" onClick={onNext} className="flex-[2]">
          Continuer
        </PrimaryButton>
      </div>
    </div>
  );
}
