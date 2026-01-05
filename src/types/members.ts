/**
 * Represents a member with basic information.
 */
export type Member = {
  id: string;
  name: string;
  email: string;
  type: "regular" | "admin";
};

// ------------------------------------------------------------------

/**
 * Represents the structure of a decoded member token.
 */
export type DecodedMemberToken = {
  memberId: string;
  email: string;
  type: "admin" | "regular";
};

// ------------------------------------------------------------------