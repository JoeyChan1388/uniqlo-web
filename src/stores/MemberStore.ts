import { create } from "zustand";
import { Member } from "@/types/members";

// ------------------------------------------------------------------

/**
 * Represents the store for managing the state of the current member.
 */
export type MemberStore = {
  currentMember: Member | undefined;
  loading: boolean;
  emptyCurrentMember: () => void;
  setCurrentMember: (currentMember: Member) => void;
  loadCurrentMember: () => Promise<{ message: string }>;
  login: (email: string, password: string) => Promise<{ message: string }>;
  logout: () => Promise<{ message: string }>;
};

// ------------------------------------------------------------------

/**
 * Zustand store for managing the selected uniqlo store location.
 *
 * - `currentMember`: The currently logged in member.
 * - `setCurrentMember`: A function to set the current member.
 * - `emptyCurrentMember`: A function to reset the current member to undefined.
 * - `loadCurrentMember`: A function to load the current member from the server. (/me endpoint)
 * - `login`: A function to log in a member with email and password. 
 * - `logout`: A function to log out the current member.
 */
export const useCurrentMember = create<MemberStore>((set) => ({
  currentMember: undefined,
  loading: false,

  setCurrentMember: (currentMember: Member) => set({ currentMember }),

  emptyCurrentMember: () =>
    set({
      currentMember: undefined,
    }),

  login: async (email: string, password: string) => {
    set({ loading: true });

    try {
      const res = await fetch("/api/members/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      // Parse the returned member data and update the store
      const member: Member = (await res.json()).member;

      // Set the current member in the store and mark loading as false
      set({ currentMember: member, loading: false });

      return {
        message: "Login successful.",
      };
    } catch (err) {
      // On error, mark loading as false
      set({ loading: false });

      return {
        message: `Login failed: ${(err as Error).message}`,
      };
    }
  },

  loadCurrentMember: async () => {
    set({ loading: true });

    try {
      const res = await fetch("/api/members/me");

      if (res.ok) {
        // Parse the returned member data
        const data = await res.json();

        // If authenticated, set current member and mark loading as false
        set({ currentMember: data.member, loading: false });

        // Return success message
        return {
          message: `Member authenticated.`,
        };
      } else {
        // If not authenticated, clear current member and mark loading as false
        set({ currentMember: undefined, loading: false });

        // Return invalid message
        return {
          message: `Member not authenticated.`,
        };
      }
    } catch {
      // On error, clear current member and mark loading as false
      set({ currentMember: undefined, loading: false });

      // Return error message
      return {
        message: `Failed to load current member.`,
      };
    }
  },

  logout: async () => {
    set({ loading: true });

    try {
      const res = await fetch("/api/members/logout", { method: "POST" });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      } else {
        // Clear current member from state
        set({ currentMember: undefined, loading: false });

        // Return success message
        return {
          message: `Logout successful.`,
        };
      }
    } catch (err) {
      set({ loading: false });

      // Return error message
      return {
        message: `Logout failed: ${(err as Error).message}`,
      };
    }
  },
}));
