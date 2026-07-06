import { createFileRoute } from "@tanstack/react-router";
import { RoofForm } from "@/components/roof-form/RoofForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Diagnostic toiture gratuit — Groupe HER ENR" },
      {
        name: "description",
        content:
          "Demandez un diagnostic toiture gratuit avec Groupe HER ENR. Réponse sous 24h, sans engagement.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: IframePage,
});

function IframePage() {
  // Page destinée à être embarquée en iframe : padding minimal,
  // pas de min-h-screen, body transparent (défini dans styles.css).
  return (
    <div className="p-3">
      <RoofForm />
    </div>
  );
}
