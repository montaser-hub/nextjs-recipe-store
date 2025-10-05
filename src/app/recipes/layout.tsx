"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar = /^\/recipes\/[^/]+$/.test(pathname); // matches /recipes/[category]

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {showSidebar && (
        <aside className="w-72 fixed top-16 left-0 h-[calc(100vh-4rem)] p-6 bg-white z-20 overflow-y-auto">
          <Sidebar />
        </aside>
      )}

      <main className={showSidebar ? "ml-72 w-full p-6" : "w-full p-6"}>
        {children}
      </main>
    </div>
  );
}
