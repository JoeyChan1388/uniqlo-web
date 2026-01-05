/**
 * Represents a uniqlo store location with optional coordinates.
 */
export type Location = {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country?: string;
  lat?: number;
  lng?: number;
};
