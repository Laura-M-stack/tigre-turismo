import { describe, expect, it } from "vitest";

import { places } from "../data/places";

import { estimateTotalMinutes, formatMinutes, planSuggestion } from "./itinerary";
import { metaLine } from "./labels";
import { googleMapsDirectionsUrl, googleMapsSearchUrl } from "./maps";
import { buildItineraryShareText } from "./share";
import { buildPlaceJsonLd } from "./structuredData";

const p = (slug: string) => places.find((x) => x.slug === slug)!;

describe("itinerary", () => {
  it("suma minutos por duración", () => {
    expect(estimateTotalMinutes([])).toBe(0);
    expect(formatMinutes(90)).toBe("1 h 30 min");
    expect(formatMinutes(120)).toBe("2 h");
    expect(formatMinutes(45)).toBe("45 min");
    expect(planSuggestion(100)).toBe("Plan corto (1–2 horas)");
    expect(planSuggestion(240)).toBe("Medio día");
    expect(planSuggestion(600)).toBe("Día completo");
  });
});

describe("labels", () => {
  it("arma la meta legible", () => {
    expect(metaLine({ category: "paseos", duration: "1-2h", budget: "gratis" })).toBe("Paseos · 1–2 h · Gratis");
    expect(metaLine({ category: "gastronomia", duration: "medio-dia", budget: "medio" })).toBe(
      "Gastronomía · Medio día · $$",
    );
  });
});

describe("maps", () => {
  it("genera URLs válidas y rechaza datos inválidos", () => {
    expect(googleMapsDirectionsUrl(-34.4, -58.5)).toBe(
      "https://www.google.com/maps/dir/?api=1&destination=-34.4%2C-58.5",
    );
    expect(googleMapsSearchUrl("Puerto de Frutos")).toContain("query=Puerto%20de%20Frutos");
    expect(() => googleMapsDirectionsUrl(Number.NaN, 1)).toThrow();
    expect(() => googleMapsSearchUrl(" ")).toThrow();
  });
});

describe("share", () => {
  it("numera los lugares con links de HashRouter", () => {
    const text = buildItineraryShareText([p("puerto-de-frutos"), p("paseo-victorica")], "https://x.dev/tigre-turismo");
    expect(text).toContain("1) Puerto de Frutos");
    expect(text).toContain("https://x.dev/tigre-turismo/#/lugares/paseo-victorica");
  });
});

describe("structuredData", () => {
  it("incluye geo solo con coordenadas válidas", () => {
    expect(buildPlaceJsonLd({ name: "A", lat: -34.4, lng: -58.5 })).toHaveProperty("geo");
    expect(buildPlaceJsonLd({ name: "A" })).not.toHaveProperty("geo");
  });
});
