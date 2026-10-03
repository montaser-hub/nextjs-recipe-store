"use client";
import Link from "next/link";

interface BreadcrumbProps {
  category: string;
  title: string;
}

export default function Breadcrumb({ category, title }: BreadcrumbProps) {

  const items = [
    { label: "Home", href: "/" },
    { label: "Recipes", href: "/recipes" },
    { label: category, href: `/recipes/${category}` },
    { label: title, current: true },
  ];

  const HomeIcon = () => (
    <svg
      className="me-2.5 h-4 w-4"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
    </svg>
  );

  const ArrowIcon = () => (
    <svg
      className="h-5 w-5 text-gray-400 rtl:rotate-180"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m9 5 7 7-7 7"
      />
    </svg>
  );

  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-y-1 space-x-1 md:space-x-2 rtl:space-x-reverse">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            {idx === 0 ? (
              <Link
                href={item.href as string}
                className="flex items-center text-gray-700 hover:text-primary-600"
              >
                <HomeIcon />
                <span className="ms-1 text-sm font-medium">Home</span>
              </Link>
            ) : (
              <>
                <ArrowIcon />
                {item.current ? (
                  <span className="ms-1 text-sm font-medium text-emerald-500">
                    {item.label}
                  </span>
                ) : (
                  (typeof item.href === "string" ? (
                    <Link
                      href={item.href as string}
                      className="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 capitalize"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="ms-1 text-sm font-medium text-gray-700 capitalize">
                      {item.label}
                    </span>
                  ))
                )}
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
