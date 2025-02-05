"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteVocabulary,
  getAllLessonsNo,
  getVocabularies,
  updateVocabulary,
} from "@/services/getData";
import { queryClient } from "@/services/providers";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { JSX, useState } from "react";
import toast from "react-hot-toast";

export interface Vocabulary {
  readonly _id: string;
  lessonNo: number;
  word: string;
  meaning: string;
  pronunciation: string;
  whenToSay: string;
  example: string;
  exampleMeaning: string;
  adminMail: string;
}

export default function ManageVocabularies(): JSX.Element {
  const [vocabularyToDelete, setVocabularyToDelete] = useState<string | null>(
    null
  );
  const [vocabularyToEdit, setVocabularyToEdit] = useState<Vocabulary | null>(
    null
  );

  const { data: vocabularies = [], isLoading } = useQuery<Vocabulary[]>({
    queryKey: ["get-vocabularies"],
    queryFn: async (): Promise<Vocabulary[]> => {
      const { vocabularies } = await getVocabularies();
      return vocabularies;
    },
  });

  const { data: lessonsNos = [] } = useQuery({
    queryKey: ["get-lessons-nos"],
    queryFn: async () => {
      const { lessons } = await getAllLessonsNo();
      return lessons;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["delete-vocabulary"],
    mutationFn: async (_id: string): Promise<{ deletedCount: number }> => {
      setVocabularyToDelete(null);
      const res = await deleteVocabulary(_id);
      return { deletedCount: res.deletedCount };
    },
    onSuccess: (data: { deletedCount: number }) => {
      if (data.deletedCount) {
        toast.success("Vocabulary deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["get-vocabularies"] });
      } else {
        toast.error("Something went wrong!");
      }
      setVocabularyToDelete(null);
    },
  });

  const { mutate: handleUpdateSubmit } = useMutation({
    mutationKey: ["update-vocabulary"],
    mutationFn: async (
      vocabulary: Vocabulary
    ): Promise<{ message: string; modifiedCount: number }> => {
      toast.loading("Updating...");
      const res = await updateVocabulary(vocabulary);
      return res;
    },
    onSuccess: ({
      message,
      modifiedCount,
    }: {
      message: string;
      modifiedCount: number;
    }) => {
      if (modifiedCount) {
        toast.dismiss();
        toast.success("Vocabulary updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["get-vocabularies"] });
        setVocabularyToEdit(null);
      } else {
        setVocabularyToEdit(null);
        toast.dismiss();
        toast.error(message);
      }
    },
  });

  return (
    <div className="h-full space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Manage Vocabularies
        </h1>
        <Link
          href="/dashboard/add-vocabularies"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Add New Vocabulary
        </Link>
      </div>

      <div className="mx-auto max-h-[90vh] overflow-auto rounded-lg border md:max-w-md lg:max-w-3xl xl:max-w-5xl 2xl:max-w-full">
        {isLoading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="text-sm text-muted-foreground">
                Loading vocabularies...
              </p>
            </div>
          </div>
        ) : (
          <>
            {vocabularies.length === 0 ? (
              <div className="flex h-48 items-center justify-center py-10 text-center">
                <p className="text-muted-foreground">
                  No vocabularies found. Add your first vocabulary to get
                  started.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="text-nowrap">
                    <TableHead>Lesson No</TableHead>
                    <TableHead>Word</TableHead>
                    <TableHead>Meaning</TableHead>
                    <TableHead>Pronunciation</TableHead>
                    <TableHead>When To Say</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vocabularies.map((vocabulary) => (
                    <TableRow key={vocabulary._id} className="text-nowrap">
                      <TableCell className="text-center">
                        {vocabulary.lessonNo}
                      </TableCell>
                      <TableCell className="font-medium">
                        {vocabulary.word}
                      </TableCell>
                      <TableCell>{vocabulary.meaning}</TableCell>
                      <TableCell>{vocabulary.pronunciation}</TableCell>
                      <TableCell>{vocabulary.whenToSay}</TableCell>
                      <TableCell className="flex flex-col gap-2 text-right md:flex-row">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setVocabularyToEdit(vocabulary)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setVocabularyToDelete(vocabulary._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog
        open={!!vocabularyToEdit}
        onOpenChange={() => setVocabularyToEdit(null)}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Vocabulary</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (vocabularyToEdit) handleUpdateSubmit(vocabularyToEdit);
            }}
          >
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Lesson Number</label>
                <Select
                  value={vocabularyToEdit?.lessonNo?.toString() || ""}
                  onValueChange={(value) =>
                    vocabularyToEdit &&
                    setVocabularyToEdit({
                      ...vocabularyToEdit,
                      lessonNo: parseInt(value),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select lesson" />
                  </SelectTrigger>
                  <SelectContent>
                    {lessonsNos?.map(
                      (lesson: {
                        _id: string;
                        lessonNo: number;
                        name: string;
                      }) => (
                        <SelectItem
                          key={lesson._id}
                          value={lesson.lessonNo.toString()}
                        >
                          Lesson {lesson.lessonNo} - {lesson.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Word</label>
                <Input
                  value={vocabularyToEdit?.word || ""}
                  onChange={(e) =>
                    vocabularyToEdit &&
                    setVocabularyToEdit({
                      ...vocabularyToEdit,
                      word: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Meaning</label>
                <Input
                  value={vocabularyToEdit?.meaning || ""}
                  onChange={(e) =>
                    vocabularyToEdit &&
                    setVocabularyToEdit({
                      ...vocabularyToEdit,
                      meaning: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Pronunciation</label>
                <Input
                  value={vocabularyToEdit?.pronunciation || ""}
                  onChange={(e) =>
                    vocabularyToEdit &&
                    setVocabularyToEdit({
                      ...vocabularyToEdit,
                      pronunciation: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">When To Say</label>
                <Input
                  value={vocabularyToEdit?.whenToSay || ""}
                  onChange={(e) =>
                    vocabularyToEdit &&
                    setVocabularyToEdit({
                      ...vocabularyToEdit,
                      whenToSay: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Example</label>
                <Input
                  value={vocabularyToEdit?.example || ""}
                  onChange={(e) =>
                    vocabularyToEdit &&
                    setVocabularyToEdit({
                      ...vocabularyToEdit,
                      example: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Example Meaning</label>
                <Input
                  value={vocabularyToEdit?.exampleMeaning || ""}
                  onChange={(e) =>
                    vocabularyToEdit &&
                    setVocabularyToEdit({
                      ...vocabularyToEdit,
                      exampleMeaning: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={!!vocabularyToDelete}
        onOpenChange={() => setVocabularyToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Vocabulary</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this vocabulary? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setVocabularyToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => vocabularyToDelete && mutate(vocabularyToDelete)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
