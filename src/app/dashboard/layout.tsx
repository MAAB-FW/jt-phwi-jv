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

  const getLinkClassName = (currentPath: string, targetPath: string) => {
    const baseClasses =
      "block w-full rounded-md px-3 py-2 transition-all duration-200";
    const activeClasses =
      "bg-green-500/10 text-green-500 font-medium border-l-4 border-green-500";
    const inactiveClasses = "hover:bg-gray-700/30 hover:text-gray-200";

    return `${baseClasses} ${currentPath === targetPath ? activeClasses : inactiveClasses}`;
  };

  return (
    <div className="flex min-h-screen">
      {showSidebar && (
        <aside className="hidden w-64 bg-gray-800 p-6 text-white md:block">
          <nav className="space-y-1 text-nowrap">
            <Link
              href="/dashboard"
              className={`"hover:bg-gray-700/30 block w-full rounded-md px-3 py-2 font-bold transition-all duration-200 hover:text-gray-200`}
            >
              <div className="flex items-center gap-2">
                <FaHome /> Dashboard
              </div>
            </Link>
            <Link
              href="/dashboard/lessons"
              className={getLinkClassName(pathname, "/dashboard/lessons")}
            >
              <div className="flex items-center gap-2">
                <FaBook /> Lessons
              </div>
            </Link>
            <Link
              href="/dashboard/add-lessons"
              className={getLinkClassName(pathname, "/dashboard/add-lessons")}
            >
              <div className="flex items-center gap-2">
                <FaPlus /> Add Lessons
              </div>
            </Link>
            <Link
              href="/dashboard/add-vocabularies"
              className={getLinkClassName(
                pathname,
                "/dashboard/add-vocabularies"
              )}
            >
              <div className="flex items-center gap-2">
                <FaLanguage /> Add Vocabularies
              </div>
            </Link>
            <Link
              href="/dashboard/add-tutorials"
              className={getLinkClassName(pathname, "/dashboard/add-tutorials")}
            >
              <div className="flex items-center gap-2">
                <FaYoutube /> Add Tutorials
              </div>
            </Link>
            <Link
              href="/dashboard/manage-users"
              className={getLinkClassName(pathname, "/dashboard/manage-users")}
            >
              <div className="flex items-center gap-2">
                <FaUsers /> Manage Users
              </div>
            </Link>
            <Link
              href="/dashboard/manage-lessons"
              className={getLinkClassName(
                pathname,
                "/dashboard/manage-lessons"
              )}
            >
              <div className="flex items-center gap-2">
                <FaCogs /> Manage Lessons
              </div>
            </Link>
            <Link
              href="/dashboard/manage-vocabularies"
              className={getLinkClassName(
                pathname,
                "/dashboard/manage-vocabularies"
              )}
            >
              <div className="flex items-center gap-2">
                <FaListAlt /> Manage Vocabularies
              </div>
            </Link>
            <Link
              href="/dashboard/manage-tutorials"
              className={getLinkClassName(
                pathname,
                "/dashboard/manage-tutorials"
              )}
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
