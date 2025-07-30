import riddles, { type Riddle } from "@/data/riddles";
import groupby from "lodash.groupby";

export function getRandomRiddle(): Riddle {
  const randomIndex = Math.floor(Math.random() * riddles.length);
  return riddles[randomIndex];
}

export function getRiddleCount(): number {
  return riddles.length;
}

export function getRiddles(): Riddle[] {
  return riddles;
}

export function getCategories(): string[] {
  const byCategories = groupby(riddles, "category");
  return Object.keys(byCategories);
}

export function getCategory(category: string): Riddle {
  const byCategories = groupby(riddles, "category");
  const riddlesByCategory = byCategories[category];

  const randomIndex = Math.floor(Math.random() * riddlesByCategory.length);
  return riddlesByCategory[randomIndex];
}
