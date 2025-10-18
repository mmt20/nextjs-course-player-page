import { useState, useEffect } from "react";
import { studentLevel } from "../types";
import { getMotivationalMessage } from "../utils";

export const useLeaderboardLogic = (studentLevel: studentLevel = "intermediate", isOpen: boolean = false) => {
  const [motivationalMessage, setMotivationalMessage] = useState(() => getMotivationalMessage(studentLevel));

  // Only update motivational message when modal opens, not on every render
  useEffect(() => {
    if (isOpen) {
      setMotivationalMessage(getMotivationalMessage(studentLevel));
    }
  }, [isOpen, studentLevel]);

  return {
    motivationalMessage,
    studentLevel,
  };
};
