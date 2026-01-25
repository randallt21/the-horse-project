import { z } from "zod";

/**
 * Volunteer form validation schema
 */
export const volunteerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  bio: z.string().max(500, "Bio must be 500 characters or less").optional(),
  availability: z
    .array(z.enum(["mon_am", "mon_pm", "thu_am", "fri_am", "sat_am", "sun_am"]))
    .min(1, "Please select at least one shift"),
  orientationDate: z.string().optional(),
  referralSource: z.string().optional(),
});

export type VolunteerFormData = z.infer<typeof volunteerSchema>;

/**
 * Donation amount validation schema
 */
export const donationSchema = z.object({
  amount: z.number().min(1, "Minimum donation is $1").max(10000, "Maximum donation is $10,000"),
  frequency: z.enum(["one-time", "monthly"]),
  coverFees: z.boolean().optional(),
});

export type DonationFormData = z.infer<typeof donationSchema>;
