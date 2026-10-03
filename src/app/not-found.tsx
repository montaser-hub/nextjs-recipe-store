import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center mt-24 space-y-4">
      <h1 className="text-gray-800 text-3xl font-bold">Page not found</h1>
      <Link href="/recipes" className="text-green-600 underline">
        Browse recipes
      </Link>
    </div>
  );
}
