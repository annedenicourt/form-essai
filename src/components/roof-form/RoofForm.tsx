import { useCallback, useState } from "react";
import { emptyFormData, validateStep, type FieldErrors, type RoofFormData } from "@/lib/roof-form-schema";
import { submitLeadToGoogleSheets } from "@/lib/submitLead";
import { ProgressBar } from "./ProgressBar";
import { Step1Problem } from "./Step1Problem";
import { Step2Location } from "./Step2Location";
import { Step3Project } from "./Step3Project";
import { Step4Callback } from "./Step4Callback";
import { Step5Contact } from "./Step5Contact";
import { SuccessScreen } from "./SuccessScreen";
import { ErrorNotice } from "./ErrorNotice";

type Status = "idle" | "submitting" | "success" | "error";
type StepIndex = 1 | 2 | 3 | 4 | 5;

export function RoofForm() {
  const [step, setStep] = useState<StepIndex>(1);
  const [data, setData] = useState<RoofFormData>(emptyFormData);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = useCallback((patch: Partial<RoofFormData>) => {
    setData((prev) => ({ ...prev, ...patch }));
    setErrors((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(patch)) delete next[key as keyof RoofFormData];
      return next;
    });
  }, []);

  /* const goNext = useCallback(() => {
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(5, s + 1) as StepIndex);
  }, [step, data]); */

  const goNext = useCallback(
    (patch?: Partial<RoofFormData>) => {
      const nextData = patch ? { ...data, ...patch } : data;

      const stepErrors = validateStep(step, nextData);

      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }

      if (patch) {
        setData(nextData);
      }

      setErrors({});
      setStep((s) => Math.min(5, s + 1) as StepIndex);
    },
    [step, data],
  );

  const goBack = useCallback(() => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1) as StepIndex);
  }, []);

  const notifyParentSuccess = useCallback(() => {
    window.parent.postMessage(
      {
        type: "ROOF_FORM_SUCCESS",
        source: "landing-page-toiture",
      },
      "*",
    );
  }, []);

  const submit = useCallback(async () => {
    const stepErrors = validateStep(5, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setStatus("submitting");
    try {
      await submitLeadToGoogleSheets({
        problem_type: data.problem_type,
        project_type: data.project_type,
        callback_preference: data.callback_preference,
        address: data.address,
        postal_code: data.postal_code,
        city: data.city,
        lastname: data.lastname,
        firstname: data.firstname,
        phone: data.phone,
        email: data.email,
        message: data.message,
        consent: data.consent,
      });
      setStatus("success");
      notifyParentSuccess();
      //window.top?.location.assign("https://groupefrancerenov-construction.com/resultats/");
    } catch (err) {
      console.error("[RoofForm] submit error:", err);
      setStatus("error");
    }
  }, [data, notifyParentSuccess]);

  const reset = useCallback(() => {
    setData(emptyFormData);
    setErrors({});
    setStep(1);
    setStatus("idle");
  }, []);

  return (
    <div className="w-full max-w-[520px] h-[700px] mx-auto p-4 sm:p-5 bg-brand-navy rounded-2xl  shadow-xl">
      <div className="mb-3 text-center">
        <h1 className="text-[18px] sm:text-[19px] font-bold text-white leading-tight tracking-tight">
          FAITES VÉRIFIER VOTRE TOITURE
        </h1>
        <p className="mt-1 text-[16px] text-lime-500 font-bold">Diagnostic gratuit — Sans engagement</p>
      </div>

      {status === "success" ? (
        <SuccessScreen onReset={reset} />
      ) : status === "error" ? (
        <ErrorNotice onRetry={submit} onBack={() => setStatus("idle")} />
      ) : (
        <div className="relative flex flex-col h-full">
          <ProgressBar current={step} total={5} />
          {step === 1 && <Step1Problem data={data} errors={errors} update={update} onNext={goNext} />}
          {step === 2 && <Step2Location data={data} errors={errors} update={update} onNext={goNext} onBack={goBack} />}
          {step === 3 && <Step3Project data={data} errors={errors} update={update} onNext={goNext} onBack={goBack} />}
          {step === 4 && <Step4Callback data={data} errors={errors} update={update} onNext={goNext} onBack={goBack} />}
          {step === 5 && (
            <Step5Contact
              data={data}
              errors={errors}
              update={update}
              onSubmit={submit}
              onBack={goBack}
              submitting={status === "submitting"}
            />
          )}
        </div>
      )}
    </div>
  );
}
