import type { FieldErrors, RoofFormData } from "@/lib/roof-form-schema";
import { FieldError, FieldLabel, PrimaryButton, SecondaryButton, TextInput } from "./form-primitives";

export function Step2Location({
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
      <div className="mb-6">
        <h2 className="text-[16px] font-semibold text-white leading-tight">Où se situe le logement ?</h2>
        <p className="mt-0.5 text-[12px] text-white/70">Ces informations nous permettent de vérifier votre zone d'intervention</p>
      </div>

      <div>
        <FieldLabel htmlFor="address">Adresse du logement</FieldLabel>
        <TextInput
          id="address"
          value={data.address}
          onChange={(e) => update({ address: e.target.value })}
          placeholder="Ex : 12 rue des Tuiles"
          autoComplete="street-address"
        />
      </div>

      <div className="grid grid-cols-[110px_1fr] gap-2">
        <div>
          <FieldLabel htmlFor="postal_code" required>
            Code postal
          </FieldLabel>
          <TextInput
            id="postal_code"
            value={data.postal_code}
            onChange={(e) => update({ postal_code: e.target.value.replace(/\D/g, "").slice(0, 5) })}
            inputMode="numeric"
            placeholder="75001"
            hasError={!!errors.postal_code}
            autoComplete="postal-code"
          />
          <FieldError message={errors.postal_code} />
        </div>
        <div>
          <FieldLabel htmlFor="city" required>
            Ville
          </FieldLabel>
          <TextInput
            id="city"
            value={data.city}
            onChange={(e) => update({ city: e.target.value })}
            placeholder="Paris"
            hasError={!!errors.city}
            autoComplete="address-level2"
          />
          <FieldError message={errors.city} />
        </div>
      </div>

      <div className="flex gap-2 pt-1 mt-6">
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
