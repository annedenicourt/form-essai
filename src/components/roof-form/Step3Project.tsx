import { PROJECT_OPTIONS, type FieldErrors, type RoofFormData } from "@/lib/roof-form-schema";
import { SmallChoiceCard, FieldError, PrimaryButton, SecondaryButton, BigChoiceCard } from "./form-primitives";
import img1 from "@/assets/roof-form/artisan_traitement_toit.png";
import img2 from "@/assets/roof-form/hydrofuge-toit.png";
import img3 from "@/assets/roof-form/artisan_toit.png";
import img4 from "@/assets/roof-form/roof-unknown.jpg";

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
  const PROJECT_IMAGES: Record<string, string> = {
    "Nettoyage / démoussage": img1,
    "Traitement hydrofuge": img2,
    Réparation: img3,
    "Avis/Diagnostic": img4,
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
            onClick={() => update({ project_type: option })}
            image={PROJECT_IMAGES[option]}
          />
        ))}
      </div>
      <FieldError message={errors.project_type} />

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
