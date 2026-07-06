import { useEffect, useRef, useState } from "react";
import type { FieldErrors, RoofFormData } from "@/lib/roof-form-schema";
import { useAddressAutocomplete, type AddressSuggestion } from "@/lib/addressAutocomplete";
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
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [justSelected, setJustSelected] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { suggestions, loading } = useAddressAutocomplete(justSelected ? "" : data.address);

  useEffect(() => {
    if (justSelected) return;
    if (data.address.trim().length >= 3) setOpen(true);
    else setOpen(false);
    setActiveIndex(-1);
  }, [data.address, justSelected]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function pick(s: AddressSuggestion) {
    setJustSelected(true);
    update({
      address: s.address || s.label,
      postal_code: s.postal_code,
      city: s.city,
    });
    setOpen(false);
    setActiveIndex(-1);
    // Réautorise l'autocomplétion après la sélection si l'utilisateur retape
    setTimeout(() => setJustSelected(false), 50);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(suggestions.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      pick(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const showDropdown = open && (loading || suggestions.length > 0);

  return (
    <div className="flex flex-col gap-3">
      <div className="mb-6">
        <h2 className="text-[16px] font-semibold text-white leading-tight">Où se situe le logement ?</h2>
        <p className="mt-0.5 text-[12px] text-white/70">Ces informations nous permettent de vérifier votre zone d'intervention</p>
      </div>

      <div ref={wrapperRef} className="relative">
        <FieldLabel htmlFor="address">Adresse du logement</FieldLabel>
        <TextInput
          id="address"
          value={data.address}
          onChange={(e) => {
            setJustSelected(false);
            update({ address: e.target.value });
          }}
          onFocus={() => {
            if (data.address.trim().length >= 3 && suggestions.length > 0) setOpen(true);
          }}
          onKeyDown={onKeyDown}
          placeholder="Ex : 12 rue des Tuiles"
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
        />
        {showDropdown && (
          <ul
            role="listbox"
            className="absolute left-0 right-0 top-full mt-1 z-20 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden"
          >
            {loading && suggestions.length === 0 && (
              <li className="px-3 py-2 text-[13px] italic text-slate-500">Recherche…</li>
            )}
            {suggestions.map((s, i) => (
              <li
                key={`${s.label}-${i}`}
                role="option"
                aria-selected={i === activeIndex}
                onMouseDown={(e) => {
                  e.preventDefault();
                  pick(s);
                }}
                onMouseEnter={() => setActiveIndex(i)}
                className={`px-3 py-2 text-[13px] cursor-pointer text-slate-800 ${
                  i === activeIndex ? "bg-slate-100" : "hover:bg-slate-100"
                }`}
              >
                {s.label}
              </li>
            ))}
          </ul>
        )}
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
