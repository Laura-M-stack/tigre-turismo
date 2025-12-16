export type Category = "naturaleza" | "paseos" | "museos" | "gastronomia";
export type Budget = "gratis" | "bajo" | "medio" | "alto";
export type Duration = "1-2h" | "medio-dia" | "dia-completo";

export type LocationType = "entrance" | "area";

export type Place = {
  slug: string;
  name: string;
  category: Category;
  shortDescription: string;
  description: string;
  duration: Duration;
  budget: Budget;
  zone?: string;
  tags: string[];
  address?: string;
  website?: string;

  lat?: number;
  lng?: number;
  locationType?: LocationType;
};