/**
 * Represents a member with basic information.
 */
export type Member = {
  id: string;
  name: string;
  email: string;
  type: "regular" | "admin";
};
