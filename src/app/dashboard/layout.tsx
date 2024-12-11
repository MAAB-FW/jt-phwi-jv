"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/dashboard";

  return (
    <div className="flex min-h-screen">
      {showSidebar && (
        <aside className="hidden w-64 bg-gray-800 p-6 text-white md:block">
          <nav className="space-y-4 text-nowrap">
            <Link
              href="/dashboard"
              className="block border-b text-center font-bold"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/lessons"
              className={`${pathname === "/dashboard/lessons" ? "text-green-500" : ""} block hover:text-gray-300`}
            >
              Lessons
            </Link>
            <Link
              href="/dashboard/add-lessons"
              className={`${pathname === "/dashboard/add-lessons" ? "text-green-500" : ""} block hover:text-gray-300`}
            >
              Add Lessons
            </Link>
            <Link
              href="/dashboard/add-vocabularies"
              className={`${pathname === "/dashboard/add-vocabularies" ? "text-green-500" : ""} block hover:text-gray-300`}
            >
              Add Vocabularies
            </Link>
            <Link
              href="/dashboard/manage-users"
              className={`${pathname === "/dashboard/manage-users" ? "text-green-500" : ""} block hover:text-gray-300`}
            >
              Manage Users
            </Link>
            <Link
              href="/dashboard/manage-lessons"
              className={`${pathname === "/dashboard/manage-lessons" ? "text-green-500" : ""} block hover:text-gray-300`}
            >
              Manage Lessons
            </Link>
            <Link
              href="/dashboard/manage-vocabularies"
              className={`${pathname === "/dashboard/manage-vocabularies" ? "text-green-500" : ""} block hover:text-gray-300`}
            >
              Manage Vocabularies
            </Link>
          </nav>
        </aside>
      )}
      <main className="flex-1 p-3 lg:p-8">{children}</main>
    </div>
  );
}
