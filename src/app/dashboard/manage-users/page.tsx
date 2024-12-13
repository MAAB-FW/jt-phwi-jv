"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUsers, updateUserRole } from "@/services/getData";
import { queryClient } from "@/services/providers";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface User {
  readonly _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

const ManageUsersPage = () => {
  const {
    data: users,
    isLoading,
    isFetching,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { users } = await getAllUsers();
      return users;
    },
  });

  const { mutate: handleRoleUpdate, isPending } = useMutation<
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

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
      </div>

      <div className="rounded-md border bg-white shadow">
        {isLoading ? (
          <div className="flex h-48 flex-col items-center justify-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900" />
            <p className="text-sm text-muted-foreground">Loading users...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-center">No</TableHead>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="w-[100px]">Role</TableHead>
                <TableHead className="w-[100px] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="text-center font-medium">
                    {users.indexOf(user) + 1}
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {user.role === "admin" ? (
                      <button
                        disabled={isPending || isFetching}
                        onClick={() =>
                          handleRoleUpdate({ _id: user._id, role: "user" })
                        }
                        className="inline-flex h-8 items-center rounded-md bg-destructive px-3 text-xs font-medium text-destructive-foreground hover:bg-destructive/90 disabled:pointer-events-none disabled:opacity-50"
                      >
                        Demote
                      </button>
                    ) : (
                      <button
                        disabled={isPending || isFetching}
                        onClick={() =>
                          handleRoleUpdate({ _id: user._id, role: "admin" })
                        }
                        className="inline-flex h-8 items-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
                      >
                        Promote
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ManageUsersPage;
