import { PrimaryButton } from "./form-primitives";

export function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 py-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/20">
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h2 className="text-[17px] font-semibold text-white">
        Merci, votre demande a bien été envoyée.
      </h2>
      <p className="text-[13px] text-white/80 leading-snug max-w-[380px]">
        Un conseiller vous rappelle sous 24h pour préparer votre diagnostic toiture gratuit.
      </p>
      <div className="w-full pt-2">
        <PrimaryButton type="button" onClick={onReset}>
          Faire une nouvelle demande
        </PrimaryButton>
      </div>
    </div>
  );
}
