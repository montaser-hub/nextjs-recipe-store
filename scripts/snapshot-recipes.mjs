// Downloads the catalogue from the Forkify API into src/data/recipes.json.
// The site is built from this snapshot, not from live API calls: pre-rendering
// ~950 pages at once gets rate-limited (429), and the demo keeps working even if
// the API goes away. Run `npm run snapshot` to refresh it (takes a few minutes).
import { readFile, writeFile } from "node:fs/promises";

const API = "https://forkify-api.herokuapp.com/api/v2/recipes";
const CATEGORIES = [
  "pizza", "pasta", "salad", "burger", "chicken", "beef", "fish", "soup",
  "dessert", "cake", "bread", "rice", "sandwich", "vegan", "vegetarian", "seafood",
];
// Forkify allows 500 requests an hour; 24 recipes a category keeps a full
// snapshot inside one window and each category page a reasonable length.
const PER_CATEGORY = 24;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url) {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(url);
    if (res.ok) return (await res.json()).data;
    if (res.status !== 429 || attempt === 8) throw new Error(`${res.status} for ${url}`);
    const wait = Number(res.headers.get("retry-after")) * 1000 || 15000 * attempt;
    console.log(`rate-limited, waiting ${wait / 1000}s`);
    await sleep(wait);
  }
}

// Progress is saved as it goes, so an interrupted run resumes where it stopped.
const PARTIAL = new URL("../.snapshot-partial.json", import.meta.url);
const saved = await readFile(PARTIAL, "utf8").then(JSON.parse).catch(() => ({ categories: {}, recipes: {} }));
const { categories, recipes } = saved;
const checkpoint = () => writeFile(PARTIAL, JSON.stringify(saved));
for (const category of CATEGORIES) {
  if (categories[category]) continue;
  const { recipes: list } = await get(`${API}?search=${category}`);
  categories[category] = list.slice(0, PER_CATEGORY).map(({ id, title, publisher, image_url }) => ({ id, title, publisher, image_url }));
  console.log(`${category}: ${list.length}`);
  await checkpoint();
  await sleep(300);
}
const ids = [...new Set(Object.values(categories).flat().map((r) => r.id))];
for (const [i, id] of ids.entries()) {
  if (recipes[id]) continue;
  const { recipe } = await get(`${API}/${id}`);
  const { title, publisher, image_url, ingredients, servings, cooking_time, source_url } = recipe;
  recipes[id] = { id, title, publisher, image_url, ingredients, servings, cooking_time, source_url };
  if ((i + 1) % 50 === 0) {
    console.log(`${i + 1}/${ids.length} recipes`);
    await checkpoint();
  }
  await sleep(300);
}

await writeFile(
  new URL("../src/data/recipes.json", import.meta.url),
  JSON.stringify({ fetchedAt: new Date().toISOString().slice(0, 10), categories, recipes })
);
await writeFile(PARTIAL, "{}").catch(() => {});
console.log(`Saved ${ids.length} recipes.`);
