import { Product, Ingredient } from "@/types/Product";
import {recipe as fetchRecipe} from "../../../../services/recipies.jsx";
import Image from "next/image";
import Breadcrumb from "@/components/breadcrumb";
import TextExpander from "@/components/textExpander";
interface Props {
  params: Promise<{ category: string; recipeId: string }>; // dynamic route params
}

// Fetch and normalize recipe into your Product type
const fetchProduct = async (recipeId: string): Promise<Product> => {
  const recipeData = await fetchRecipe(recipeId);

  // Normalize into Product
  return {
    id: recipeData.id,
    title: recipeData.title,
    publisher: recipeData.publisher,
    image_url: recipeData.image_url,
    category: recipeData.category || "Pizza",
    description: `Delicious ${recipeData.title} made by ${recipeData.publisher}.`,
    ingredients: recipeData.ingredients || [],
    price: parseFloat((Math.random() * 50 + 10).toFixed(2)), // fake price
    rating: {
      rate: parseFloat((Math.random() * 5).toFixed(1)), // fake rating
      count: Math.floor(Math.random() * 500) + 1, // fake reviews
    },
  };
};

export async function generateMetadata({ params }: Props) {
  const { recipeId } = await params;
  const recipe: Product = await fetchProduct(recipeId);

  return {
    title: `Recipe: ${recipe.title}`,
  };
}

// Page Component
export default async function RecipeDetailPage({ params }: Props) {
  const { recipeId } = await params; 
  const {
    title,
    price,
    image_url,
    rating,
    category,
    description,
    ingredients,
    publisher,
  } = await fetchProduct(recipeId);

  const roundedRating = Math.round(rating?.rate || 0);

  return (
    <section className="max-w-screen-lg mx-auto px-4 py-10 space-y-10">
      <Breadcrumb category={category} title={title} />

      <div className="flex flex-col lg:flex-row lg:gap-8 items-start">
        <div className="w-full lg:w-1/2 relative aspect-square overflow-hidden shadow-md bg-white">
          <Image
            src={image_url}
            alt={title}
            fill
            priority
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="lg:w-1/2 w-full mt-8 lg:mt-0 lg:ml-4 flex flex-col gap-4">
          <h1 className="text-4xl font-semibold text-gray-800">{title}</h1>
          <p className="text-gray-500 capitalize">{category}</p>
          <p className="text-gray-500">By {publisher}</p>

          <div className="flex items-center gap-2 text-yellow-500 text-lg">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 ${
                  i < roundedRating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.172L12 18.897l-7.336 3.854 1.402-8.172-5.934-5.787 8.2-1.192z" />
              </svg>
            ))}
            <p className="text-sm font-medium text-gray-900">
              {rating.rate.toFixed(1)}
            </p>
            <span className="text-sm text-gray-600 ml-2">
              ({rating.count} reviews)
            </span>
          </div>

          <p className="text-3xl font-bold text-green-600">
            ${price.toFixed(2)}
          </p>
          
          <p className="text-gray-700 leading-relaxed"><TextExpander>{description}</TextExpander></p>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Ingredients</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              {ingredients.map((ing: Ingredient, index) => (
                <li key={index}>
                  {ing.quantity || ""} {ing.unit || ""} {ing.description}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 mt-6">
            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md transition-colors">
              Order Now
            </button>
            <button className="border border-green-600 text-green-600 hover:bg-green-50 px-5 py-2 rounded-lg transition-colors">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
