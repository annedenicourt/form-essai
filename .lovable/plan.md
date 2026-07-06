## Objectif

Remplacer les icônes lucide-react de l'étape 1 par 6 petites images illustratives générées, intégrées en haut de chaque carte de choix, en gardant le rendu compact iframe.

## Fichiers modifiés

1. **`src/components/roof-form/Step1Problem.tsx`**
   - Retirer les imports lucide-react et la map `PROBLEM_ICONS`.
   - Nouvelle map `PROBLEM_IMAGES: Record<string, string>` pointant vers les 6 images générées (imports depuis `src/assets/roof-form/`).
   - Passer chaque image via une nouvelle prop `image` à `ChoiceCard`.
   - Libellés, valeurs, logique et ordre inchangés.

2. **`src/components/roof-form/form-primitives.tsx`** — `ChoiceCard`
   - Ajouter prop optionnelle `image?: string` (URL) en plus de `icon` (retrocompatibilité pour Step3).
   - Quand `image` est fourni :
     - Rendu vertical : `<img>` en haut (h ~80px, `w-full`, `object-cover`, `rounded-[10px]`), libellé centré dessous.
     - `<img loading="lazy" decoding="async" onError={hide}>` — en cas d'échec, l'image est masquée, la carte reste utilisable avec juste le libellé (fallback propre).
     - Padding carte ajusté (`p-2`) pour intégrer l'image proprement.
   - État sélectionné inchangé : bordure orange + halo `shadow-[0_0_0_1px_...]`.
   - Sans `image` ni `icon`, comportement identique à aujourd'hui.

3. **Nouvelles images générées** dans `src/assets/roof-form/` (fichiers `.webp` via imagegen, importés en ES modules — Vite optimise et cache) :
   - `roof-moss.webp` — tuiles avec mousse et traces noires légères
   - `roof-broken-tiles.webp` — tuiles fissurées ou déplacées
   - `roof-leak.webp` — goutte d'eau / trace d'infiltration
   - `roof-old.webp` — toiture ancienne, tuiles ternies
   - `roof-gutter.webp` — gouttière et débord de toit
   - `roof-unknown.webp` — toiture vue de dessus, ambiance neutre

   Style commun : réaliste, lumineux, propre, non dramatique, cadrage carré, cohérence visuelle entre les 6.

   Note : les images vont dans `src/assets/` (imports Vite optimisés) plutôt que `/public/images/roof-form/`, plus adapté à ce projet TanStack Start et permet le tree-shaking + hashing. Le rendu final reste identique.

## Grille et responsive

- Grille actuelle `grid-cols-3` conservée (fonctionne bien en colonne droite iframe).
- Ajouter `sm:grid-cols-3 grid-cols-2` pour tomber à 2 colonnes sur les iframes très étroites.
- Hauteur carte augmentée légèrement pour accueillir l'image (~ image 80px + label + padding), sans introduire de scroll interne.

## Contraintes respectées

- Aucune modification du schema, du payload, de `submitLead.ts`, du nombre d'étapes ni des libellés.
- Étapes 2, 3, 4 non touchées.
- `ChoiceCard` reste rétro-compatible avec Step3Project.
- Fallback : `onError` masque l'`<img>` cassée, le libellé reste visible.
