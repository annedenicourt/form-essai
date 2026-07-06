import type { FieldErrors, RoofFormData } from "@/lib/roof-form-schema";
import { FieldError, FieldLabel, PrimaryButton, SecondaryButton, TextInput } from "./form-primitives";

export function Step5Contact({
  data,
  errors,
  update,
  onSubmit,
  onBack,
  submitting,
}: {
  data: RoofFormData;
  errors: FieldErrors;
  update: (patch: Partial<RoofFormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  submitting: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-[16px] font-semibold text-white leading-tight">
          Vos coordonnées
        </h2>
        <p className="mt-0.5 text-[12px] text-white/70">
          Un conseiller vous rappelle pour valider votre demande avant tout déplacement.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <FieldLabel htmlFor="lastname" required>Nom</FieldLabel>
          <TextInput
            id="lastname"
            value={data.lastname}
            onChange={(e) => update({ lastname: e.target.value })}
            hasError={!!errors.lastname}
            autoComplete="family-name"
          />
          <FieldError message={errors.lastname} />
        </div>
        <div>
          <FieldLabel htmlFor="firstname">Prénom</FieldLabel>
          <TextInput
            id="firstname"
            value={data.firstname}
            onChange={(e) => update({ firstname: e.target.value })}
            autoComplete="given-name"
          />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="phone" required>Téléphone</FieldLabel>
        <TextInput
          id="phone"
          type="tel"
          value={data.phone}
          onChange={(e) => update({ phone: e.target.value })}
          placeholder="06 12 34 56 78"
          hasError={!!errors.phone}
          autoComplete="tel"
        />
        <FieldError message={errors.phone} />
      </div>

      <div>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <TextInput
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => update({ email: e.target.value })}
          placeholder="prenom.nom@email.fr"
          hasError={!!errors.email}
          autoComplete="email"
        />
        <FieldError message={errors.email} />
      </div>

      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={data.consent}
          onChange={(e) => update({ consent: e.target.checked })}
          className="mt-0.5 h-4 w-4 rounded border-white/30 accent-brand-orange"
        />
        <span className="text-[11px] leading-snug text-white/85">
          J'accepte que mes informations soient utilisées pour être recontacté dans
          le cadre de ma demande de diagnostic toiture gratuit.
        </span>
      </label>
      <FieldError message={errors.consent} />

      <div className="flex gap-2 pt-1">
        <SecondaryButton type="button" onClick={onBack} className="flex-1" disabled={submitting}>
          Retour
        </SecondaryButton>
        <PrimaryButton type="button" onClick={onSubmit} disabled={submitting} className="flex-[2]">
          {submitting ? "Envoi en cours…" : "Faire vérifier ma toiture"}
        </PrimaryButton>
      </div>
      <p className="text-center text-[11px] text-white/70 -mt-1">
        Gratuit et sans engagement — un conseiller vous rappelle sous 24h.
      </p>
    </div>
  );
}
