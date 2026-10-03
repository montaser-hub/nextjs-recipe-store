import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/Product";

type Props = {
  product: Product;
  /** Load eagerly: only for the cards visible on first paint. */
  priority?: boolean;
};

export default function ProductCard({ product, priority = false }: Props) {
  const { id, category, title, publisher, price, image_url, rating } = product;
  const roundedRating = Math.round(rating.rate);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md transition hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="relative w-full h-64 overflow-hidden  bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
        <Link href={`/recipes/${category}/${id}`}>
          <Image
            src={image_url}
            alt={title}
            fill
            priority={priority}
            className="object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </Link>
      </div>

      <div className="pt-5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium capitalize text-green-800 dark:bg-green-900 dark:text-green-300">
            {category}
          </span>
        </div>

        <h2 className="text-sm text-gray-500 dark:text-gray-400">
          By {publisher}
        </h2>

        <Link
          href={`/recipes/${category}/${id}`}
          className="block text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white line-clamp-2"
        >
          {title}
        </Link>

        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              className={`h-4 w-4 ${
                i < roundedRating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.172L12 18.897l-7.336 3.854 1.402-8.172-5.934-5.787 8.2-1.192z" />
            </svg>
          ))}
          <span className="text-gray-900 dark:text-white ml-1">
            {rating.rate.toFixed(1)}
          </span>
          <span className="text-gray-500 dark:text-gray-400 ml-1">
            ({rating.count})
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-2xl font-bold text-green-600">${price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
