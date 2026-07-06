import { useEffect, useRef, useState } from "react";

// API officielle Base Adresse Nationale (gratuite, sans clé, CORS ouvert).
// Swap possible vers l'IGN Géoplateforme en changeant uniquement cette URL.
const ADDRESS_API_URL = "https://api-adresse.data.gouv.fr/search/";

export type AddressSuggestion = {
  label: string;
  address: string;
  postal_code: string;
  city: string;
  citycode?: string;
  lat?: number;
  lng?: number;
};

type BanFeature = {
  properties: {
    label?: string;
    name?: string;
    postcode?: string;
    city?: string;
    citycode?: string;
  };
  geometry?: {
    coordinates?: [number, number];
  };
};

export async function searchFrenchAddresses(
  query: string,
  signal?: AbortSignal,
): Promise<AddressSuggestion[]> {
  const q = query.trim();
  if (q.length < 3) return [];

  try {
    const url = `${ADDRESS_API_URL}?q=${encodeURIComponent(q)}&limit=5&autocomplete=1`;
    const res = await fetch(url, { signal });
    if (!res.ok) return [];
    const json = (await res.json()) as { features?: BanFeature[] };
    if (!json.features) return [];
    return json.features.map((f): AddressSuggestion => {
      const p = f.properties || {};
      const coords = f.geometry?.coordinates;
      return {
        label: p.label ?? [p.name, p.postcode, p.city].filter(Boolean).join(" "),
        address: p.name ?? "",
        postal_code: p.postcode ?? "",
        city: p.city ?? "",
        citycode: p.citycode,
        lng: coords?.[0],
        lat: coords?.[1],
      };
    });
  } catch (err) {
    if ((err as { name?: string })?.name === "AbortError") return [];
    return [];
  }
}

export function useAddressAutocomplete(query: string) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 3) {
      setSuggestions([]);
      setLoading(false);
      controllerRef.current?.abort();
      return;
    }

    const timer = setTimeout(() => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;
      setLoading(true);
      searchFrenchAddresses(q, controller.signal)
        .then((results) => {
          if (!controller.signal.aborted) setSuggestions(results);
        })
        .finally(() => {
          if (!controller.signal.aborted) setLoading(false);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return { suggestions, loading };
}
