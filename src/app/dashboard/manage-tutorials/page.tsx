"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteTutorial,
  getAllTutorials,
  updateTutorial,
} from "@/services/getData";
import { queryClient } from "@/services/providers";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { JSX, useState } from "react";
import toast from "react-hot-toast";

export interface Tutorial {
  readonly _id: string;
  title: string;
  videoId: string;
}

export default function ManageTutorials(): JSX.Element {
  const [tutorialToDelete, setTutorialToDelete] = useState<string | null>(null);
  const [tutorialToEdit, setTutorialToEdit] = useState<Tutorial | null>(null);

  const { data: tutorials = [], isLoading } = useQuery<Tutorial[]>({
    queryKey: ["get-tutorials"],
    queryFn: async (): Promise<Tutorial[]> => {
      const { tutorials } = await getAllTutorials();
      return tutorials;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["delete-tutorial"],
    mutationFn: async (id: string): Promise<{ deletedCount: number }> => {
      setTutorialToDelete(null);
      const res = await deleteTutorial(id);
      return { deletedCount: res.deletedCount };
    },
    onSuccess: (data: { deletedCount: number }) => {
      if (data.deletedCount) {
        toast.success("Tutorial deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["get-tutorials"] });
      } else {
        toast.error("Something went wrong!");
      }
      setTutorialToDelete(null);
    },
  });

  const { mutate: handleUpdateSubmit } = useMutation({
    mutationKey: ["update-tutorial"],
    mutationFn: async (
      tutorial: Tutorial
    ): Promise<{ modifiedCount: number }> => {
      toast.loading("Updating...");
      const res = await updateTutorial(tutorial);
      return res;
    },
    onSuccess: ({ modifiedCount }: { modifiedCount: number }) => {
      if (modifiedCount) {
        toast.dismiss();
        toast.success("Tutorial updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["get-tutorials"] });
        setTutorialToEdit(null);
      } else {
        setTutorialToEdit(null);
        toast.dismiss();
      }
    },
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manage Tutorials</h1>
        <Link
          href="/dashboard/add-tutorials"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Add New Tutorial
        </Link>
      </div>

      <div className="rounded-md border bg-white shadow">
        {isLoading ? (
          <div className="flex h-48 flex-col items-center justify-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">
              Loading tutorials.....
            </p>
          </div>
        ) : (
          <>
            {tutorials.length === 0 ? (
              <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
                No tutorials found. Add your first tutorial to get started.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Video ID</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tutorials?.map((tutorial) => (
                    <TableRow key={tutorial._id}>
                      <TableCell>{tutorials.indexOf(tutorial) + 1}</TableCell>
                      <TableCell>{tutorial.title}</TableCell>
                      <TableCell>{tutorial.videoId}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setTutorialToEdit(tutorial)}
                            className="inline-flex h-8 items-center rounded-md bg-primary/10 px-3 text-xs font-medium text-primary hover:bg-primary/20"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setTutorialToDelete(tutorial._id)}
                            className="inline-flex h-8 items-center rounded-md bg-destructive/10 px-3 text-xs font-medium text-destructive hover:bg-destructive/20"
                          >
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </>
        )}
      </div>

      {/* Edit Modal */}
      {tutorialToEdit && (
        <Dialog
          open={!!tutorialToEdit}
          onOpenChange={() => setTutorialToEdit(null)}
        >
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Tutorial</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!tutorialToEdit.title || !tutorialToEdit.videoId) {
                  return toast.error("Please fill in all fields");
                }
                handleUpdateSubmit(tutorialToEdit);
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={tutorialToEdit.title}
                    onChange={(e) =>
                      setTutorialToEdit({
                        ...tutorialToEdit,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="videoId">Video ID</Label>
                  <Input
                    id="videoId"
                    value={tutorialToEdit.videoId}
                    onChange={(e) =>
                      setTutorialToEdit({
                        ...tutorialToEdit,
                        videoId: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setTutorialToEdit(null)}
                >
                  Cancel
                </Button>
                <Button type="submit">Update</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Modal */}
      {tutorialToDelete && (
        <AlertDialog
          open={!!tutorialToDelete}
          onOpenChange={() => setTutorialToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Tutorial</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this tutorial? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => mutate(tutorialToDelete)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
