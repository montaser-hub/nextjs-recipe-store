import Link from "next/link";
import { CATEGORIES, DEFAULT_CATEGORY } from "@/lib/catalog";

/** Category filter: a column on desktop, a scrollable row of chips on phones. */
export default function Sidebar({ active }: { active: string }) {
  return (
    <nav aria-label="Recipe categories" className="md:w-56 md:shrink-0">
      <h3 className="hidden md:block text-lg font-semibold mb-4">Filter by category</h3>
      <ul className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
        {CATEGORIES.map((cat) => {
          const isActive = active === cat;
          return (
            <li key={cat} className="shrink-0">
              <Link
                href={cat === DEFAULT_CATEGORY ? "/recipes" : `/recipes/${cat}`}
                aria-current={isActive ? "page" : undefined}
                className={`block capitalize px-3 py-2 rounded-md transition-colors whitespace-nowrap ${
                  isActive ? "bg-green-500 text-white font-semibold" : "bg-white md:bg-transparent hover:bg-gray-200 text-gray-800"
                }`}
              >
                {cat}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
