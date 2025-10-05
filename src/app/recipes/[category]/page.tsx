import { Product } from "@/types/Product";
import ProductsGrid from "@/components/products";
import { recipes as fetchRecipes } from "@/services/recipies";

interface Props {
  params?: Promise<{ category?: string }>;
}

export async function generateMetadata({ params }: Props) {
  const category = await params
  return {
    title: `Recipes: ${category}`,
  };
}

export default async function RecipesPage({ params }: { params: Promise<{ category?: string }> }) {
  const { category } = await params;
  const selected = category || "pizza"; 

  const recipes = await fetchRecipes(selected);

  // Map Forkify recipes → Product type
  const products: Product[] = recipes.map((recipe: Product) => ({
    id: recipe.id,
    publisher: recipe.publisher,
    title: recipe.title,
    image_url: recipe.image_url || "https://via.placeholder.com/150",

    // random/fake fields
    price: parseFloat((Math.random() * 50 + 10).toFixed(2)),
    description: `Delicious ${recipe.title} made by ${recipe.publisher}. Perfect for food lovers!`,
    category: selected,
    rating: {
      rate: parseFloat((Math.random() * 5).toFixed(1)),
      count: Math.floor(Math.random() * 500) + 1,
    },
  }));

  return <ProductsGrid products={products} category={selected} />;
}
