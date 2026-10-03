import CategoryView from "@/components/categoryView";
import { DEFAULT_CATEGORY } from "@/lib/catalog";

// The store opens on the default category (a static site can't redirect).
export default function Home() {
  return <CategoryView category={DEFAULT_CATEGORY} />;
}
