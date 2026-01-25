// ======================================
// THE HORSE PROJECT - TYPE DEFINITIONS
// ======================================

/**
 * Horse adoption/sanctuary status
 */
export type HorseStatus = "Available" | "Sanctuary" | "Adopted";

/**
 * Raw horse data from JSON
 */
export interface IHorseData {
  id: string;
  name: string;
  breed: string;
  birthYear: number;
  status: HorseStatus;
  bio: string;
  image: string;
  sponsorshipTier?: string;
}

/**
 * Volunteer form submission data
 */
export interface IVolunteerForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  availability: VolunteerShift[];
  orientationDate: string;
  referralSource: string;
}

/**
 * Available volunteer shifts
 */
export type VolunteerShift = "mon_am" | "mon_pm" | "thu_am" | "fri_am" | "sat_am" | "sun_am";

/**
 * Donation frequency
 */
export type DonationFrequency = "one-time" | "monthly";

/**
 * Donation tier for "Sanctuary Horse's Circle"
 */
export interface IDonationTier {
  amount: number;
  name: string;
  benefit: string;
}

/**
 * Navigation link item
 */
export interface INavLink {
  label: string;
  href: string;
}
