"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import { Comment } from "@/features/course/types";
import Image from "next/image";

interface CourseCommentsProps {
  comments: Comment[];
}

export function CourseComments({ comments }: CourseCommentsProps) {
  const [newComment, setNewComment] = useState("");
  const isLastComment = (index: number) => index === comments.length - 1;

  const handleSubmit = () => {
    console.log("New comment:", newComment);
    setNewComment("");
  };
  const shouldShowBorder = (index: number) => {
    return !isLastComment(index);
  };
  return (
    <div className="space-y-8">
      <div className="space-y-8">
        {comments.map((comment, index) => (
          <div
            key={comment.id}
            className={`flex gap-4  ${shouldShowBorder(index) && "border-b border-gray-200"}     pb-6 `}
          >
            <Image
              src={comment.avatar}
              alt={comment.name}
              width={56}
              height={56}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{comment.name}</h4>
              <p className="text-sm text-gray-500 mb-2">{comment.date}</p>
              <p className="text-gray-600 text-[15px] leading-relaxed">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 space-y-4 py-8">
        <Textarea
          placeholder="Write a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[120px] rounded-lg border-gray-200 focus:ring-0 focus:border-gray-300 text-gray-800 placeholder:text-gray-400"
        />
        <Button
          onClick={handleSubmit}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-sm font-medium flex items-center gap-2 cursor-pointer w-f h-12"
        >
          Submit Review <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
