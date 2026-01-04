"use client";

import { useEffect } from "react";
import { useCurrentMember } from "@/app/stores/MemberStore";

export function useAuthInit() {
  const { loadCurrentMember, currentMember } = useCurrentMember();
  
  useEffect(() => {
    // Only load if we don't already have a user
    if (!currentMember) {
      loadCurrentMember();
    }
  }, [loadCurrentMember, currentMember]);
}