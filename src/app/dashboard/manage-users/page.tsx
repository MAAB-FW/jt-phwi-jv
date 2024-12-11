"use client";

import { getAllUsers, updateUserRole } from "@/services/getData";
import { queryClient } from "@/services/providers";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

const ManageUsersPage = () => {
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { users } = await getAllUsers();
      return users;
    },
  });

  const { mutate: handleRoleUpdate } = useMutation<
    { _id: string; role: "admin" | "user"; modifiedCount: number },
    Error,
    { _id: string; role: "admin" | "user" }
  >({
    mutationKey: ["update-role"],
    mutationFn: async ({
      _id,
      role,
    }: {
      _id: string;
      role: "admin" | "user";
    }) => {
      const res = await updateUserRole(_id, role);
      return res;
    },
    onSuccess: (data) => {
      if (data.modifiedCount) {
        toast.success("Role updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["users"] });
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Manage Users</h1>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6 md:table-cell"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users?.map((user) => (
                <tr key={user._id} className="max-w-[300px] hover:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900 sm:px-6">
                    {user.name}
                  </td>
                  <td className="hidden whitespace-nowrap px-4 py-4 text-sm text-gray-500 sm:px-6 md:table-cell">
                    {user.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm sm:px-6">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs ${
                        user.role === "admin"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm sm:px-6">
                    {user.role === "admin" ? (
                      <button
                        onClick={() =>
                          handleRoleUpdate({ _id: user._id, role: "user" })
                        }
                        className="rounded-md bg-red-500 px-3 py-1.5 text-xs text-white hover:bg-red-600 sm:px-4 sm:py-2 sm:text-sm"
                      >
                        Demote
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleRoleUpdate({ _id: user._id, role: "admin" })
                        }
                        className="rounded-md bg-blue-500 px-3 py-1.5 text-xs text-white hover:bg-blue-600 sm:px-4 sm:py-2 sm:text-sm"
                      >
                        Promote
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ManageUsersPage;
