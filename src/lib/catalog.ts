import type { Ingredient, Product, ProductDetail } from "@/types/Product";
// Snapshot of the Forkify API made by scripts/snapshot-recipes.mjs (see README).
import data from "@/data/recipes.json";

export const CATEGORIES = [
  "pizza", "pasta", "salad", "burger", "chicken", "beef", "fish", "soup",
  "dessert", "cake", "bread", "rice", "sandwich", "vegan", "vegetarian", "seafood",
] as const;

export const DEFAULT_CATEGORY = "pizza";


interface ForkifySummary {
  id: string;
  title: string;
  publisher: string;
  image_url: string;
}

interface ForkifyRecipe extends ForkifySummary {
  ingredients: Ingredient[];
  servings: number;
  cooking_time: number;
  source_url: string;
}

const snapshot = data as {
  categories: Record<string, ForkifySummary[]>;
  recipes: Record<string, ForkifyRecipe>;
};

/**
 * Forkify has no prices or ratings; derive stable demo values from the id.
 * Ids often differ only in their last characters, so the hash must mix every
 * bit (FNV-1a, then a Murmur3 finalizer per value) or they all come out alike.
 */
function seeded(id: string) {
  let hash = 0x811c9dc5;
  for (const char of id) hash = Math.imul(hash ^ char.charCodeAt(0), 0x01000193);
  return (salt: number) => {
    let x = (hash + Math.imul(salt, 0x9e3779b9)) | 0;
    x = Math.imul(x ^ (x >>> 16), 0x85ebca6b);
    x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
    return ((x ^ (x >>> 16)) >>> 0) / 2 ** 32;
  };
}

function toProduct(recipe: ForkifySummary, category: string): Product {
  const random = seeded(recipe.id);
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    category,
    // The API returns http:// image URLs; the same files are served over https.
    image_url: recipe.image_url.replace(/^http:/, "https:"),
    price: Math.round((10 + random(1) * 40) * 100) / 100,
    rating: {
      rate: Math.round((3 + random(2) * 2) * 10) / 10,
      count: 1 + Math.floor(random(3) * 500),
    },
  };
}

export async function getRecipes(category: string): Promise<Product[]> {
  return (snapshot.categories[category] ?? []).map((recipe) => toProduct(recipe, category));
}

export async function getRecipe(id: string, category: string): Promise<ProductDetail> {
  const recipe = snapshot.recipes[id];
  if (!recipe) throw new Error(`Unknown recipe ${id}`);
  return {
    ...toProduct(recipe, category),
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    sourceUrl: recipe.source_url,
  };
}

export const label = (category: string) => category[0].toUpperCase() + category.slice(1);
