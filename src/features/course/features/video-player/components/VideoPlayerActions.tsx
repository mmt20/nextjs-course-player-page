"use client";
import { List, MessageCircle, HelpCircle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoPlayerActionsProps {
  onCurriculumClick: () => void;
  onCommentClick: () => void;
  onAskQuestionClick: () => void;
  onLeaderboardClick: () => void;
}

const VideoPlayerActions = ({
  onCurriculumClick,
  onCommentClick,
  onAskQuestionClick,
  onLeaderboardClick,
}: VideoPlayerActionsProps) => {
  return (
    <div className="flex items-center justify-start py-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={onCurriculumClick}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer"
        title="Curriculum"
      >
        <List className="h-5 w-5" />
        <span className="hidden sm:inline">Curriculum</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onCommentClick}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer"
        title="Comments"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">Comments</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onAskQuestionClick}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer"
        title="Ask a Question"
      >
        <HelpCircle className="h-5 w-5" />
        <span className="hidden sm:inline">Ask a Question</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onLeaderboardClick}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer"
        title="Leaderboard"
      >
        <Trophy className="h-5 w-5" />
        <span className="hidden sm:inline">Leaderboard</span>
      </Button>
    </div>
  );
};

export default VideoPlayerActions;
