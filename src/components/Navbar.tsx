"use client";

import { getUserInfo } from "@/services/getData";
import { useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { data } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  // const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

  const { data: { image, role } = {} } = useQuery({
    queryKey: ["userRole", data?.user?.email],
    queryFn: async () => {
      if (data?.user?.email) {
        const userData = await getUserInfo(data.user.email);
        return userData;
      }
    },
    enabled: !!data?.user?.email,
  });
  console.log(pathname);
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-blue-400">
              Nihongo Nexus
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {/* User Links */}
              <Link
                href="/lesson"
                className={`${pathname === "/lesson" ? "text-green-500" : ""} rounded-md px-3 py-2 text-gray-300 hover:text-white`}
              >
                Lessons
              </Link>
              <Link
                href="/tutorials"
                className={`${pathname === "/tutorials" ? "text-green-500" : ""} rounded-md px-3 py-2 text-gray-300 hover:text-white`}
              >
                Tutorials
              </Link>

              {/* Admin Links */}
              {/* {role === "admin" && (
                <div className="relative">
                  <button
                    onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                    className="rounded-md px-3 py-2 text-gray-300 hover:text-white"
                  >
                    Admin
                  </button>
                  {isAdminMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link
                          href="/admin/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/admin/lessons"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Manage Lessons
                        </Link>
                        <Link
                          href="/admin/vocabularies"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Manage Vocabularies
                        </Link>
                        <Link
                          href="/admin/users"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Manage Users
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )} */}
              <div className="ml-4 flex items-center border-l border-gray-700 pl-4">
                <div
                  title={data?.user?.name || "User name not available"}
                  className="flex h-8 w-8 items-center justify-center rounded-full font-semibold text-white"
                  style={{
                    backgroundImage: `url(${image || ""})`,
                    backgroundSize: "cover",
                  }}
                />
              </div>

              {role === "admin" && pathname !== "/dashboard" && (
                <Link
                  href="/dashboard"
                  className="ml-4 rounded-md px-3 py-2 text-gray-300 hover:text-white"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={() => signOut()}
                className="rounded-md px-3 py-2 text-gray-300 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 md:px-3">
            <Link
              onClick={() => setIsOpen(false)}
              href="/lesson"
              className={`${pathname === "/lesson" ? "text-green-500" : ""} block rounded-md px-3 py-2 text-gray-300 hover:text-white`}
            >
              Lessons
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              href="/tutorials"
              className={`${pathname === "/tutorials" ? "text-green-500" : ""} block rounded-md px-3 py-2 text-gray-300 hover:text-white`}
            >
              Tutorials
            </Link>

            <div className="flex items-center border-t px-3 py-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 font-semibold text-white"
                style={{
                  backgroundImage: `url(${image || ""})`,
                  backgroundSize: "cover",
                }}
              />
              <span className="ml-2 text-gray-300">
                {data?.user?.name || "User"}
              </span>
            </div>
            {role === "admin" && pathname !== "/dashboard" && (
              <>
                <Link
                  onClick={() => setIsOpen(false)}
                  href="/dashboard"
                  className="block rounded-md px-3 py-2 text-gray-300 hover:text-white"
                >
                  Dashboard
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  href="/dashboard/lessons"
                  className={`${pathname === "/dashboard/lessons" ? "text-green-500" : ""} block rounded-md px-3 py-2 text-gray-300 hover:text-white`}
                >
                  Lessons
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  href="/dashboard/add-lessons"
                  className={`${pathname === "/dashboard/add-lessons" ? "text-green-500" : ""} block rounded-md px-3 py-2 text-gray-300 hover:text-white`}
                >
                  Add Lessons
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  href="/dashboard/add-vocabularies"
                  className={`${pathname === "/dashboard/add-vocabularies" ? "text-green-500" : ""} block rounded-md px-3 py-2 text-gray-300 hover:text-white`}
                >
                  Add Vocabularies
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  href="/dashboard/manage-users"
                  className={`${pathname === "/dashboard/manage-users" ? "text-green-500" : ""} block rounded-md px-3 py-2 text-gray-300 hover:text-white`}
                >
                  Manage Users
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  href="/dashboard/manage-lessons"
                  className={`${pathname === "/dashboard/manage-lessons" ? "text-green-500" : ""} block rounded-md px-3 py-2 text-gray-300 hover:text-white`}
                >
                  Manage Lessons
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  href="/dashboard/manage-vocabularies"
                  className={`${pathname === "/dashboard/manage-vocabularies" ? "text-green-500" : ""} block rounded-md px-3 py-2 text-gray-300 hover:text-white`}
                >
                  Manage Vocabularies
                </Link>
              </>
            )}
            <button
              onClick={() => signOut()}
              className="block rounded-md px-3 py-2 text-gray-300 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
