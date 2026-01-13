export type Category = "naturaleza" | "paseos" | "museos" | "gastronomia" | "aventura" | "relax" | "entretenimiento" | "cultura";
export type Budget = "gratis" | "bajo" | "medio" | "alto";
export type Duration = "1-2h" | "medio-dia" | "dia-completo";
export type LocationType = "entrance" | "area";

export type PlaceTips = {
  id: string;
  title: string;
  description: string;
};

export type Place = {
  slug: string;
  name: string;
  category: Category;
  shortDescription: string; //cards
  longDescription: string[]; //detalle
  duration: Duration;
  budget: Budget;
  zone?: string;
  tags: string[];
  address?: string;
  website?: string;
  tips: PlaceTips[];
  lat?: number;
  lng?: number;
  locationType?: LocationType;
  coverImage: string;
  gallery: string[];
};

export type Button = {
  label: string;
  url: string;
};
