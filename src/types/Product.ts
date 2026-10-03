export interface Ingredient {
  quantity?: number | null;
  unit?: string;
  description: string;
}

/** A Forkify recipe, presented as a product. */
export interface Product {
  id: string;
  publisher: string;
  title: string;
  category: string;
  image_url: string;
  /** Demo price and rating: derived from the id, so they are the same on every page. */
  price: number;
  rating: { rate: number; count: number };
}

export interface ProductDetail extends Product {
  ingredients: Ingredient[];
  servings: number;
  cookingTime: number;
  sourceUrl: string;
}
