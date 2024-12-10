"use client";

import { getUserRole } from "@/services/getData";
import { useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

  const { data: role } = useQuery({
    queryKey: ["userRole", data?.user?.email],
    queryFn: async () => {
      if (data?.user?.email) {
        const { role } = await getUserRole(data.user.email);
        return role;
      }
    },
    enabled: !!data?.user?.email,
  });

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-blue-400">
              Nihongo Nexus
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:block">
            <div className="ml-10 flex items-center space-x-4">
              {/* User Links */}
              <Link
                href="/lessons"
                className="rounded-md px-3 py-2 text-gray-300 hover:text-white"
              >
                Lessons
              </Link>
              <Link
                href="/tutorials"
                className="rounded-md px-3 py-2 text-gray-300 hover:text-white"
              >
                Tutorials
              </Link>

              {/* Admin Links */}
              {role === "admin" && (
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
              )}

              {/* Auth Links */}
              <button
                onClick={() => signOut()}
                className="rounded-md px-3 py-2 text-gray-300 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
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
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <Link
              href="/lessons"
              className="block rounded-md px-3 py-2 text-gray-300 hover:text-white"
            >
              Lessons
            </Link>
            <Link
              href="/tutorials"
              className="block rounded-md px-3 py-2 text-gray-300 hover:text-white"
            >
              Tutorials
            </Link>
            {role === "admin" && (
              <>
                <Link
                  href="/admin/dashboard"
                  className="block rounded-md px-3 py-2 text-gray-300 hover:text-white"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/lessons"
                  className="block rounded-md px-3 py-2 text-gray-300 hover:text-white"
                >
                  Manage Lessons
                </Link>
                <Link
                  href="/admin/vocabularies"
                  className="block rounded-md px-3 py-2 text-gray-300 hover:text-white"
                >
                  Manage Vocabularies
                </Link>
                <Link
                  href="/admin/users"
                  className="block rounded-md px-3 py-2 text-gray-300 hover:text-white"
                >
                  Manage Users
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
