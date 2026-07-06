// URL du webhook Google Apps Script.
// Remplacer par l'URL réelle de votre script pour activer l'envoi.
export const GOOGLE_SHEETS_WEBHOOK_URL = "";

export type LeadPayload = {
  created_at: string;
  source: "landing-page-toiture";
  problem_type: string;
  project_type: string;
  callback_preference: string;
  address: string;
  postal_code: string;
  city: string;
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  page_url: string;
};

export type LeadFormFields = Omit<
  LeadPayload,
  | "created_at"
  | "source"
  | "utm_source"
  | "utm_medium"
  | "utm_campaign"
  | "utm_content"
  | "utm_term"
  | "page_url"
>;

export function collectUtmAndPageUrl() {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      page_url: "",
    };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    utm_content: params.get("utm_content") ?? "",
    utm_term: params.get("utm_term") ?? "",
    page_url: window.location.href,
  };
}

export function buildLeadPayload(fields: LeadFormFields): LeadPayload {
  return {
    created_at: new Date().toISOString(),
    source: "landing-page-toiture",
    ...fields,
    ...collectUtmAndPageUrl(),
  };
}

export async function submitLeadToGoogleSheets(
  fields: LeadFormFields,
): Promise<void> {
  const payload = buildLeadPayload(fields);

  if (!GOOGLE_SHEETS_WEBHOOK_URL) {
    // Pas d'URL configurée : on log le payload et on simule un succès
    // pour ne pas bloquer l'interface pendant les tests.
    // eslint-disable-next-line no-console
    console.log("[RoofForm] GOOGLE_SHEETS_WEBHOOK_URL vide — payload:", payload);
    await new Promise((resolve) => setTimeout(resolve, 600));
    return;
  }

  // Google Apps Script accepte les POST cross-origin en mode "no-cors".
  // La réponse est opaque : absence d'exception réseau = succès.
  await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
