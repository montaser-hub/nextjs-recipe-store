import ProductsGrid from "@/components/products";
import Sidebar from "@/components/sidebar";
import { getRecipes } from "@/lib/catalog";

/** A category's recipes with the category filter beside them. */
export default async function CategoryView({ category }: { category: string }) {
  const products = await getRecipes(category);
  return (
    <div className="flex flex-col md:flex-row gap-6 bg-gray-50 min-h-screen p-4 md:p-6">
      <Sidebar active={category} />
      <div className="min-w-0 flex-1">
        <ProductsGrid products={products} category={category} />
      </div>
    </div>
  );
}
