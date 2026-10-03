import Link from "next/link";
import Image from "next/image";
import logo from "@/app/icon.png";

export default function NavBar() {
  const navItems = [{ name: "Recipes", href: "/recipes" }];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-neutral-900 shadow z-50">
      <div className="grid grid-cols-[auto_1fr_auto] items-center px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center mx-2 sm:mx-10">
          <Image
            src={logo}
            alt="Recipe Store home"
            className="h-12 w-12 rounded-full"
            priority
          />
        </Link>

        <ul className="flex items-center gap-6">
          {navItems.map(({ name, href }) => (
            <li key={name}>
              <Link
                href={href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
