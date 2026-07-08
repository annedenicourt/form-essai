import { PROJECT_OPTIONS, type FieldErrors, type RoofFormData } from "@/lib/roof-form-schema";
import { FieldError, PrimaryButton, SecondaryButton, BigChoiceCard } from "./form-primitives";

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
  onNext: (patch?: Partial<RoofFormData>) => void;
  onBack: () => void;
}) {
  const PROJECT_IMAGES: Record<string, string> = {
    "Nettoyage / démoussage":
      "https://groupefrancerenov-construction.com/wp-content/uploads/2026/07/artisan_traitement_toit.webp",
    "Traitement hydrofuge": "https://groupefrancerenov-construction.com/wp-content/uploads/2026/07/hydrofuge-toit.webp",
    Réparation: "https://groupefrancerenov-construction.com/wp-content/uploads/2026/07/artisan_toit.webp",
    "Avis/Diagnostic": "https://groupefrancerenov-construction.com/wp-content/uploads/2026/07/roof-unknown.webp",
  };
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-[16px] font-semibold text-white leading-tight">Votre demande concerne plutôt :</h2>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {PROJECT_OPTIONS.map((option) => (
          <BigChoiceCard
            key={option}
            label={option}
            selected={data.project_type === option}
            onClick={() => onNext({ project_type: option })}

            image={PROJECT_IMAGES[option]}
          />
        ))}
      </div>
      <FieldError message={errors.project_type} />

      <div className="absolute bottom-22 md:bottom-14 left-0 w-full flex gap-2 pt-1 mt-6">
        <SecondaryButton type="button" onClick={onBack} className="flex-1">
          Retour
        </SecondaryButton>
        <PrimaryButton type="button" onClick={() => onNext()} className="flex-[2]">
          Continuer
        </PrimaryButton>
      </div>
    </div>
  );
}
