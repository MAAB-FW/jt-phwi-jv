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
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg border border-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Current Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <span
                    className={`rounded-full px-2 py-1 text-sm ${
                      user.role === "admin"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {user.role === "admin" ? (
                    <button
                      onClick={() =>
                        handleRoleUpdate({ _id: user._id, role: "user" })
                      }
                      className="rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                    >
                      Demote to User
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleRoleUpdate({ _id: user._id, role: "admin" })
                      }
                      className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                    >
                      Promote to admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageUsersPage;
