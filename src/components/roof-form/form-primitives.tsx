import type { ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function FieldLabel({
  children,
  htmlFor,
  required,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
}) {
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
      className={`h-9 w-full rounded-lg border bg-white px-3 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-brand-orange/60 ${hasError ? "border-orange-300" : "border-white/10"
        } ${className}`}
    />
  );
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement> & { hasError?: boolean }) {
  const { hasError, className = "", ...rest } = props;
  return (
    <textarea
      {...rest}
      className={`w-full rounded-lg border bg-white px-3 py-2 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-brand-orange/60 ${hasError ? "border-orange-300" : "border-white/10"
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

export function SmallChoiceCard({
  label,
  selected,
  onClick,
  compact = false,
  icon,
  image,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
  icon?: React.ReactNode;
  image?: string;
}) {
  const base =
    "w-full text-left rounded-lg transition hover:border-brand-orange hover:shadow-[0_0_0_2px_var(--color-brand-orange)]";
  const state = selected
    ? "border-brand-orange bg-orange-100 shadow-[0_0_0_2px_var(--color-brand-orange)]"
    : " bg-white hover:border-brand-orange";

  if (image) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${base} ${state} flex flex-col items-center gap-1.5 text-slate-800`}
      >
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
          className="w-full h-[80px] object-cover rounded-tr-lg rounded-tl-lg"
        />
        <span className="mt-3 text-center text-[12px] leading-tight font-medium">{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${compact ? "px-3 py-2 text-[13px]" : "px-3 py-2.5 text-[13px]"} ${state}`}
    >
      {icon ? (
        <div className="flex items-center text-center gap-2">
          <div className="text-brand-orange">{icon}</div>
          {label}
        </div>
      ) : (
        label
      )}
    </button>
  );
}

export function BigChoiceCard({
  label,
  selected,
  onClick,
  compact = false,
  icon,
  image,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
  icon?: React.ReactNode;
  image?: string;
}) {
  const base =
    "w-full h-32 md:h-36 text-left bg-white rounded-lg transition hover:border-brand-orange hover:shadow-[0_0_0_2px_var(--color-brand-orange)]";
  const state = selected
    ? "border-brand-orange shadow-[0_0_0_2px_var(--color-brand-orange)]"
    : " hover:border-brand-orange";

  if (image) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${base} ${state} flex flex-col items-center gap-1.5 text-slate-800`}
      >
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
          className="w-full h-[70px] md:h-[100px] object-cover rounded-tr-lg rounded-tl-lg"
        />
        <span className="mt-2 text-center text-[12px] leading-tight font-medium">{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${compact ? "px-3 py-2 text-[13px]" : "px-3 py-2.5 text-[13px]"} ${state}`}
    >
      {icon ? (
        <div className="flex flex-col items-center text-center gap-2">
          <div className="text-brand-orange">{icon}</div>
          {label}
        </div>
      ) : (
        label
      )}
    </button>
  );
}
