export interface Ingredient {
  quantity?: number;
  unit?: string;
  description: string;
}

export interface Product {
  id: number;
  publisher: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
  ingredients: Ingredient[];
  rating: {
    rate: number;
    count: number;
  };
}
