import { redirect } from "next/navigation";

export default function RecipesRoot() {
  redirect("/recipes/pizza");
}
