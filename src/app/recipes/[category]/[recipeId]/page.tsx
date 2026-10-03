import Image from "next/image";
import Breadcrumb from "@/components/breadcrumb";
import { CATEGORIES, getRecipe, getRecipes } from "@/lib/catalog";
import type { Ingredient } from "@/types/Product";

type Props = { params: Promise<{ category: string; recipeId: string }> };

// Pre-render every recipe of every category.
export const dynamicParams = false;
export async function generateStaticParams() {
  const perCategory = await Promise.all(
    CATEGORIES.map(async (category) =>
      (await getRecipes(category)).map((recipe) => ({ category, recipeId: recipe.id }))
    )
  );
  return perCategory.flat();
}

export async function generateMetadata({ params }: Props) {
  const { category, recipeId } = await params;
  const { title } = await getRecipe(recipeId, category);
  return { title: `${title} · Recipe Store` };
}

export default async function RecipeDetailPage({ params }: Props) {
  const { category, recipeId } = await params;
  const { title, price, image_url, rating, publisher, ingredients, servings, cookingTime, sourceUrl } =
    await getRecipe(recipeId, category);
  const roundedRating = Math.round(rating.rate);

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
            sizes="(max-width: 1024px) 100vw, 50vw"
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
                className={`h-5 w-5 ${i < roundedRating ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.172L12 18.897l-7.336 3.854 1.402-8.172-5.934-5.787 8.2-1.192z" />
              </svg>
            ))}
            <p className="text-sm font-medium text-gray-900">{rating.rate.toFixed(1)}</p>
            <span className="text-sm text-gray-600 ml-2">({rating.count} reviews)</span>
          </div>

          <p className="text-3xl font-bold text-green-600">${price.toFixed(2)}</p>

          <dl className="flex gap-8 text-gray-700">
            <div>
              <dt className="text-sm text-gray-500">Servings</dt>
              <dd className="text-lg font-medium">{servings}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Cooking time</dt>
              <dd className="text-lg font-medium">{cookingTime} min</dd>
            </div>
          </dl>

          <div>
            <h3 className="text-lg font-medium mb-2">Ingredients</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              {ingredients.map((ing: Ingredient, index) => (
                <li key={index}>
                  {ing.quantity ?? ""} {ing.unit ?? ""} {ing.description}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start border border-green-600 text-green-600 hover:bg-green-50 px-5 py-2 rounded-lg transition-colors"
          >
            Full directions at {publisher}
          </a>
        </div>
      </div>
    </section>
  );
}
