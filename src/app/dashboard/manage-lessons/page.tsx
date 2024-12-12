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
import { Textarea } from "@/components/ui/textarea";
import { deleteLesson, getLessons, updateLesson } from "@/services/getData";
import { queryClient } from "@/services/providers";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { JSX, useState } from "react";
import toast from "react-hot-toast";

interface Lesson {
  lessonNo: number;
  name: string;
  description: string;
}

export default function ManageLessons(): JSX.Element {
  const [lessonToDelete, setLessonToDelete] = useState<number | null>(null);
  const [lessonToEdit, setLessonToEdit] = useState<Lesson | null>(null);

  const { data: lessons = [] } = useQuery<Lesson[]>({
    queryKey: ["get-lessons"],
    queryFn: async (): Promise<Lesson[]> => {
      const { lessons } = await getLessons();
      return lessons;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["delete-lesson"],
    mutationFn: async (lessonNo: number): Promise<{ deletedCount: number }> => {
      setLessonToDelete(null);
      const res = await deleteLesson(lessonNo);
      console.log(res);
      return { deletedCount: res.deletedCount };
    },
    onSuccess: (data: { deletedCount: number }) => {
      if (data.deletedCount) {
        toast.success("Lesson deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["get-lessons"] });
      } else {
        toast.error("Something went wrong!");
      }
      setLessonToDelete(null);
    },
  });

  const { mutate: handleUpdateSubmit } = useMutation({
    mutationKey: ["update-lesson"],
    mutationFn: async (lesson: Lesson): Promise<{ modifiedCount: number }> => {
      toast.loading("Updating...");

      const res = await updateLesson(lesson);
      return res;
    },
    onSuccess: ({ modifiedCount }: { modifiedCount: number }) => {
      if (modifiedCount) {
        toast.dismiss();
        toast.success("Lesson updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["get-lessons"] });
        setLessonToEdit(null);
      } else {
        setLessonToEdit(null);
        toast.dismiss();
      }
    },
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manage Lessons</h1>
        <Link
          href="/dashboard/add-lessons"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Add New Lesson
        </Link>
      </div>

      <div className="rounded-md border bg-white shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lesson No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">
                Description
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons?.map((lesson) => (
              <TableRow key={lesson.lessonNo}>
                <TableCell className="font-medium">{lesson.lessonNo}</TableCell>
                <TableCell>{lesson.name}</TableCell>
                <TableCell className="hidden max-w-[200px] truncate md:table-cell">
                  {lesson.description}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setLessonToEdit(lesson)}
                      className="inline-flex h-8 items-center rounded-md bg-primary/10 px-3 text-xs font-medium text-primary hover:bg-primary/20"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setLessonToDelete(lesson.lessonNo)}
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

        {lessons.length === 0 && (
          <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
            No lessons found. Add your first lesson to get started.
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {lessonToEdit && (
        <Dialog
          open={!!lessonToEdit}
          onOpenChange={() => setLessonToEdit(null)}
        >
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Lesson</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!lessonToEdit.name || !lessonToEdit.description) {
                  return toast.error("Please fill in all fields");
                }
                handleUpdateSubmit(lessonToEdit);
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="lessonNo">Lesson Number</Label>
                  <Input
                    id="lessonNo"
                    type="number"
                    value={lessonToEdit.lessonNo}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={lessonToEdit.name}
                    onChange={(e) =>
                      setLessonToEdit({
                        ...lessonToEdit,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={lessonToEdit.description}
                    onChange={(e) =>
                      setLessonToEdit({
                        ...lessonToEdit,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLessonToEdit(null)}
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
      {lessonToDelete && (
        <AlertDialog
          open={!!lessonToDelete}
          onOpenChange={() => setLessonToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Lesson</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this lesson? This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => mutate(lessonToDelete)}
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
