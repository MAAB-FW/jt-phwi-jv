"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLessons, getVocabularyCountALesson } from "@/services/getData";
import { useQuery } from "@tanstack/react-query";

interface Lesson {
  _id: string;
  name: string;
  lessonNo: number;
}

const LessonsPage = () => {
  const { data: lessons = [], isLoading } = useQuery<Lesson[]>({
    queryKey: ["get-lessons"],
    queryFn: async () => {
      const { lessons } = await getLessons();
      return lessons;
    },
  });

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Lessons Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-48 items-center justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lesson Number</TableHead>
                  <TableHead>Lesson Name</TableHead>
                  <TableHead>Vocabulary Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lessons.map((lesson) => (
                  <TableData key={lesson._id} lesson={lesson}></TableData>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonsPage;

const TableData = ({ lesson }: { lesson: Lesson }) => {
  const { data: vocabularyCount = 0 } = useQuery({
    queryKey: ["get-vocabulary-count", lesson.lessonNo],
    queryFn: async () => {
      const { count } = await getVocabularyCountALesson(lesson.lessonNo);
      return count;
    },
  });

  return (
    <TableRow>
      <TableCell>{lesson.lessonNo}</TableCell>
      <TableCell>{lesson.name}</TableCell>
      <TableCell>{vocabularyCount}</TableCell>
    </TableRow>
  );
};
