"use client";

import { getUserInfo } from "@/services/getData";
import { useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex text-2xl font-extrabold tracking-tight text-blue-400 transition-colors hover:text-blue-300"
            >
              <Image
                src={"/favicon.ico"}
                alt="Nihongo Nexus"
                width={25}
                height={25}
                className="-mr-px object-cover"
              />
              ihongo Nexus
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                href="/lesson"
                className={`${
                  pathname === "/lesson"
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                } rounded-md px-3 py-2 text-sm font-medium transition-colors`}
              >
                Lessons
              </Link>
              <Link
                href="/tutorials"
                className={`${
                  pathname === "/tutorials"
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                } rounded-md px-3 py-2 text-sm font-medium transition-colors`}
              >
                Tutorials
              </Link>

              <div className="ml-6 flex items-center space-x-4 border-l border-gray-700 pl-6">
                {data?.user?.email ? (
                  <>
                    <div className="flex items-center gap-3">
                      <div
                        title={data?.user?.name || "User"}
                        className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-blue-500"
                      >
                        <div
                          className="h-full w-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${image || ""})` }}
                        />
                      </div>
                      {role === "admin" && (
                        <span className="rounded-full bg-gray-700 px-2 py-1 text-xs font-medium text-gray-300">
                          Admin
                        </span>
                      )}
                    </div>
                    {role === "admin" && (
                      <Link
                        href="/dashboard"
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => signOut()}
                      className="rounded-md bg-gray-700 px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-600 hover:text-white"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
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
          <div className="space-y-1 px-3 pb-3 pt-2">
            <Link
              href="/lesson"
              className={`${
                pathname === "/lesson"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              } block rounded-md px-3 py-2 text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              Lessons
            </Link>
            <Link
              href="/tutorials"
              className={`${
                pathname === "/tutorials"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              } block rounded-md px-3 py-2 text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              Tutorials
            </Link>

            <div className="border-t border-gray-700 pt-4">
              {data?.user?.email ? (
                <>
                  <div className="flex items-center px-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-blue-500">
                        {image ? (
                          <div
                            className="h-full w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${image})` }}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-blue-500 text-white">
                            {data?.user?.name?.[0] || "U"}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-base font-medium text-white">
                          {data?.user?.name}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium text-gray-400">
                            {data?.user?.email}
                          </div>
                          {role === "admin" && (
                            <span className="rounded-full bg-gray-700 px-2 py-1 text-xs font-medium text-gray-300">
                              Admin
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link
                      href="/dashboard"
                      className={`${
                        pathname === "/dashboard"
                          ? "bg-gray-700 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      } block rounded-md px-3 py-2 text-base font-medium`}
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    {/* {role === "admin" && pathname !== "/dashboard" && (
                  <>
                    <Link
                      href="/dashboard/lessons"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      Lessons
                    </Link>
                    <Link
                      href="/dashboard/add-lessons"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      Add Lessons
                    </Link>
                    <Link
                      href="/dashboard/add-vocabularies"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      Add Vocabularies
                    </Link>
                    <Link
                      href="/dashboard/manage-users"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      Manage Users
                    </Link>
                    <Link
                      href="/dashboard/manage-lessons"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      Manage Lessons
                    </Link>
                    <Link
                      href="/dashboard/manage-vocabularies"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      Manage Vocabularies
                    </Link>
                  </>
                )} */}
                    <button
                      onClick={() => signOut()}
                      className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href={"/login"}
                    className="block w-full rounded-md bg-blue-600 px-3 py-2 text-left text-base font-medium text-gray-300 transition-colors hover:bg-blue-700 hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    href={"/register"}
                    className="block w-full rounded-md bg-green-600 px-3 py-2 text-left text-base font-medium text-gray-300 transition-colors hover:bg-green-700 hover:text-white"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
