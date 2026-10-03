import CategoryView from "@/components/categoryView";
import { CATEGORIES, label } from "@/lib/catalog";

type Props = { params: Promise<{ category: string }> };

// Every category is pre-rendered; anything else is a 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  return { title: `${label(category)} recipes · Recipe Store` };
}

export default async function RecipesPage({ params }: Props) {
  const { category } = await params;
  return <CategoryView category={category} />;
}
