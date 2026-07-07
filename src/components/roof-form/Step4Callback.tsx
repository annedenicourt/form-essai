import { CALLBACK_OPTIONS, type FieldErrors, type RoofFormData } from "@/lib/roof-form-schema";
import { SmallChoiceCard, FieldError, FieldLabel, PrimaryButton, SecondaryButton, TextArea } from "./form-primitives";
import { Calendar, Clock } from "lucide-react";

export function Step4Callback({
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
        <h2 className="text-[16px] font-semibold text-white leading-tight">Quand souhaitez-vous être rappelé ?</h2>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {CALLBACK_OPTIONS.map((opt) => (
          <SmallChoiceCard
            key={opt}
            label={opt}
            selected={data.callback_preference === opt}
            onClick={() => update({ callback_preference: opt })}
            icon={opt === "Le plus rapidement possible" ? <Clock /> : <Calendar />}
          />
        ))}
      </div>
      <FieldError message={errors.callback_preference} />

      <div>
        <FieldLabel htmlFor="message">Message ou précision sur votre toiture</FieldLabel>
        <TextArea
          id="message"
          value={data.message}
          onChange={(e) => update({ message: e.target.value })}
          rows={5}
          placeholder="Optionnel"
        />
      </div>

      <div className="absolute bottom-16 left-0 w-full flex gap-2 pt-1 mt-6">
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
