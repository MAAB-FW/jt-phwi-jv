"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBook,
  FaCogs,
  FaHome,
  FaLanguage,
  FaListAlt,
  FaPlus,
  FaUsers,
  FaVideo,
  FaYoutube,
} from "react-icons/fa";

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
              <div className="flex items-center justify-center gap-2">
                <FaHome /> Dashboard
              </div>
            </Link>
            <Link
              href="/dashboard/lessons"
              className={`${pathname === "/dashboard/lessons" ? "text-green-500" : ""} block hover:text-gray-300`}
            >
              <div className="flex items-center gap-2">
                <FaBook /> Lessons
              </div>
            </Link>
            <Link
              href="/dashboard/add-lessons"
              className={`${pathname === "/dashboard/add-lessons" ? "text-green-500" : ""} block hover:text-gray-300`}
            >
              <div className="flex items-center gap-2">
                <FaPlus /> Add Lessons
              </div>
            </Link>
            <Link
              href="/dashboard/add-vocabularies"
              className={`${pathname === "/dashboard/add-vocabularies" ? "text-green-500" : ""} block hover:text-gray-300`}
            >
              <div className="flex items-center gap-2">
                <FaLanguage /> Add Vocabularies
              </div>
            </Link>
            <Link
              href="/dashboard/add-tutorials"
              className={`${pathname === "/dashboard/add-tutorials" ? "text-green-500" : ""} block hover:text-gray-300`}
            >
              <div className="flex items-center gap-2">
                <FaYoutube /> Add Tutorials
              </div>
            </Link>
            <Link
              href="/dashboard/manage-users"
              className={`${pathname === "/dashboard/manage-users" ? "text-green-500" : ""} block hover:text-gray-300`}
            >
              <div className="flex items-center gap-2">
                <FaUsers /> Manage Users
              </div>
            </Link>
            <Link
              href="/dashboard/manage-lessons"
              className={`${pathname === "/dashboard/manage-lessons" ? "text-green-500" : ""} block hover:text-gray-300`}
            >
              <div className="flex items-center gap-2">
                <FaCogs /> Manage Lessons
              </div>
            </Link>
            <Link
              href="/dashboard/manage-vocabularies"
              className={`${pathname === "/dashboard/manage-vocabularies" ? "text-green-500" : ""} block hover:text-gray-300`}
            >
              <div className="flex items-center gap-2">
                <FaListAlt /> Manage Vocabularies
              </div>
            </Link>
            <Link
              href="/dashboard/manage-tutorials"
              className={`${pathname === "/dashboard/manage-tutorials" ? "text-green-500" : ""} block hover:text-gray-300`}
            >
              <div className="flex items-center gap-2">
                <FaVideo /> Manage Tutorials
              </div>
            </Link>
          </nav>
        </aside>
      )}
      <main className="container mx-auto flex-1">{children}</main>
    </div>
  );
}
