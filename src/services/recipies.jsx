export const recipe = async (recipeId) => {
  const res = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}?key=ed2561ba-c4b0-45f4-86b9-9968b699394d`
  );

  if (!res.ok) throw new Error("Failed to fetch recipe");

  const data = await res.json();
  const recipe = data?.data?.recipe;
  return recipe;
};

export const recipes = async (category) => {
  const res = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${category}&key=ed2561ba-c4b0-45f4-86b9-9968b699394d`,
    { next: { revalidate: 60 } } // ISR
  );
  const data = await res.json();
  return data.data.recipes;
};