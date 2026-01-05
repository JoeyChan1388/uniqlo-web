/**
 * Represents the form fields for a member login request.
 */
export type loginFormFields = {
  email: string;
  password: string;
};

// ------------------------------------------------------------------

/**
 * Represents the form fields for a member signup request.
 */
export type signupFormFields = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

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
