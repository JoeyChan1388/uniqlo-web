"use client";

import { useEffect } from "react";
import { useCurrentMember } from "@/stores/MemberStore";

// ------------------------------------------------------------------

/**
 * Custom hook to initialize authentication state by loading the current member from the MemberStore.
 */
export function useAuthInit() {
  const { loadCurrentMember, currentMember } = useCurrentMember();

  useEffect(() => {
    // Only load if we don't already have a user
    if (!currentMember) {
      loadCurrentMember();
    }
  }, [loadCurrentMember, currentMember]);
}
