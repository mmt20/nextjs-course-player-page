"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, Medal } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { Modal, ModalPortal, ModalClose, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { useLeaderboardLogic } from "../hooks";
import type { LeaderboardEntry, studentLevel } from "../types";
import { mockLeaderboard } from "../utils";
import Image from "next/image";

interface LeaderboardModalProps {
  leaderboardId: string;
  courseName: string;
  instructorName: string;
  isOpen: boolean;
  onClose: () => void;
  studentLevel?: studentLevel;
}

export function LeaderboardModal({
  leaderboardId,
  courseName,
  instructorName,
  isOpen,
  onClose,
  studentLevel = "intermediate",
}: LeaderboardModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { motivationalMessage } = useLeaderboardLogic(studentLevel, isOpen);

  useEffect(() => {
    if (isOpen) {
      const current = new URLSearchParams(searchParams.toString());
      current.set("leaderboardId", leaderboardId);
      router.replace(`?${current.toString()}`);
    }
  }, [isOpen, leaderboardId, router, searchParams]);

  const handleClose = () => {
    const current = new URLSearchParams(searchParams.toString());
    current.delete("leaderboardId");
    router.replace(`?${current.toString()}`);
    onClose();
  };

  return (
    <Modal open={isOpen} onOpenChange={handleClose}>
      <ModalPortal>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Hidden title and description for accessibility */}
            <VisuallyHidden.Root>
              <ModalTitle>Leaderboard</ModalTitle>
              <ModalDescription>Course leaderboard showing student rankings and scores</ModalDescription>
            </VisuallyHidden.Root>

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="text-center flex-1">
                <p className="text-xs text-gray-500 mb-1">{courseName}</p>
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-lg font-bold text-gray-900">Leaderboard</h2>
                </div>
              </div>
              <ModalClose asChild>
                <Button variant="ghost" size="icon" className="flex-shrink-0 cursor-pointer">
                  <X className="h-5 w-5" />
                </Button>
              </ModalClose>
            </div>

            {/* Motivational Message Card */}
            <div className="bg-gray-50 p-6 flex items-start gap-4 justify-between border-b border-gray-200">
              <div className="flex-1">
                <p className=" text-sm text-balance text-accent-foreground text-center rtl:text-right">
                  {motivationalMessage.text}
                </p>
                <p className="text-xs text-gray-500 mt-3 rtl:text-right">{instructorName}</p>
              </div>
              <div className="text-4xl flex-shrink-0">{motivationalMessage.emoji}</div>
            </div>

            {/* Leaderboard Rankings */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {mockLeaderboard.map((entry: LeaderboardEntry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    entry.name === "You" ? "bg-teal-50 border-teal-200" : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {/* Rank Badge */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 font-bold text-sm flex-shrink-0">
                    {entry.rank === 1 && <Medal className="h-5 w-5 text-yellow-500" />}
                    {entry.rank === 2 && <Medal className="h-5 w-5 text-gray-400" />}
                    {entry.rank === 3 && <Medal className="h-5 w-5 text-orange-400" />}
                    {entry.rank > 3 && <span className="text-gray-600">{entry.rank}</span>}
                  </div>

                  {/* Avatar */}
                  <Image
                    src={entry.avatar}
                    alt={entry.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover flex-shrink-0"
                  />
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900">{entry.name}</p>
                    <p className="text-xs text-gray-500">{entry.level}</p>
                  </div>

                  {/* Score */}
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-base text-teal-600">{entry.score}</p>
                    <p className="text-xs text-gray-400">pts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ModalPortal>
    </Modal>
  );
}
