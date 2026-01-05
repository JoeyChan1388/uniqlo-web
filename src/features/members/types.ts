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