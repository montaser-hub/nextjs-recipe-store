"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

const CATEGORIES = [
  "pizza", // default
  "pasta",
  "salad",
  "burger",
  "chicken",
  "beef",
  "fish",
  "soup",
  "dessert",
  "cake",
  "bread",
  "rice",
  "sandwich",
  "vegan",
  "vegetarian",
  "seafood",
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  // Detect active category from the URL, default to "pizza"
  const activeCategory = useMemo(() => {
    const parts = pathname?.split("/") ?? [];
    return parts.length >= 3 && parts[2] ? parts[2] : "pizza";
  }, [pathname]);

  function handleSelect(cat: string) {
    if (cat === "pizza") {
      // Default route → /recipes
      router.push("/recipes");
    } else {
      router.push(`/recipes/${encodeURIComponent(cat)}`);
    }
  }

  return (
    <aside className="w-56 bg-gray-50 border-r border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-4">Filter by category</h3>
      <ul className="space-y-2">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;

          return (
            <li key={cat}>
              <button
                onClick={() => handleSelect(cat)}
                className={`flex items-center w-full text-left capitalize px-3 py-2 rounded-md transition-colors
                  ${
                    isActive
                      ? "bg-green-500 text-white font-semibold"
                      : "hover:bg-gray-200 text-gray-800"
                  }`}
              >
                {cat}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
