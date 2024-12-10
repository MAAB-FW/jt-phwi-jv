"use client";

import { LessonPage } from "@/components/LessonPage";
import React from "react";

const Page = ({ params }: { params: Promise<{ lessonNo: string }> }) => {
  const resolvedParams = React.use(params);
  return <LessonPage lessonNo={resolvedParams.lessonNo} />;
};
export default Page;
