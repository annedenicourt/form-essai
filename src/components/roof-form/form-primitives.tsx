import type { ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function FieldLabel({ children, htmlFor, required }: { children: React.ReactNode; htmlFor?: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-[13px] font-medium text-white mb-1">
      {children}
      {required && <span className="text-brand-orange ml-0.5">*</span>}
    </label>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-[11px] text-orange-200">{message}</p>;
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }) {
  const { hasError, className = "", ...rest } = props;
  return (
    <input
      {...rest}
      className={`h-9 w-full rounded-lg border bg-white px-3 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-brand-orange/60 ${
        hasError ? "border-orange-300" : "border-white/10"
      } ${className}`}
    />
  );
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement> & { hasError?: boolean }) {
  const { hasError, className = "", ...rest } = props;
  return (
    <textarea
      {...rest}
      className={`w-full rounded-lg border bg-white px-3 py-2 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-brand-orange/60 ${
        hasError ? "border-orange-300" : "border-white/10"
      } ${className}`}
    />
  );
}

export function PrimaryButton({ children, className = "", ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand-orange px-4 text-[14px] font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-brand-orange-hover disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, className = "", ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`inline-flex h-10 items-center justify-center rounded-lg border border-white/25 bg-transparent px-4 text-[13px] font-medium text-white transition hover:bg-white/10 disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}

export function ChoiceCard({
  label,
  selected,
  onClick,
  compact = false,
  icon,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-lg border transition ${
        compact ? "px-3 py-2 text-[13px]" : "px-3 py-2.5 text-[13px]"
      } ${
        selected
          ? "border-brand-orange bg-brand-orange/15 text-white shadow-[0_0_0_1px_var(--color-brand-orange)]"
          : "border-white/15 bg-brand-navy-2 text-white/90 hover:border-white/30 hover:bg-brand-navy-3"
      }`}
    >
      {icon ? (
        <span className="inline-flex items-center gap-2">
          <span className={selected ? "text-brand-orange" : "text-white/70"}>
            {icon}
          </span>
          {label}
        </span>
      ) : (
        label
      )}
    </button>
  );
}
