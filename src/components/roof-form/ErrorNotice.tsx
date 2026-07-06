import { PrimaryButton, SecondaryButton } from "./form-primitives";

export function ErrorNotice({ onRetry, onBack }: { onRetry: () => void; onBack: () => void }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 py-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20">
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-red-300" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      </div>
      <h2 className="text-[16px] font-semibold text-white">
        Une erreur est survenue lors de l'envoi.
      </h2>
      <p className="text-[13px] text-white/80 leading-snug">
        Veuillez réessayer ou nous contacter directement par téléphone.
      </p>
      <div className="w-full flex gap-2 pt-2">
        <SecondaryButton type="button" onClick={onBack} className="flex-1">
          Retour
        </SecondaryButton>
        <PrimaryButton type="button" onClick={onRetry} className="flex-[2]">
          Réessayer
        </PrimaryButton>
      </div>
    </div>
  );
}
