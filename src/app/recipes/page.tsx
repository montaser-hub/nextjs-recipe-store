import CategoryView from "@/components/categoryView";
import { DEFAULT_CATEGORY } from "@/lib/catalog";

export default function RecipesRoot() {
  return <CategoryView category={DEFAULT_CATEGORY} />;
}
