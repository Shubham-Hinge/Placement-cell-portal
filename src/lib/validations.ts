import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50),

  email: z
    .string()
    .email("Invalid email address")
    .refine(
      (email) => {
        const blocked = [
          "tempmail",
          "10minutemail",
          "guerrillamail",
          "mailinator",
        ];

        return !blocked.some((item) =>
          email.toLowerCase().includes(item)
        );
      },
      {
        message:
          "Temporary email addresses are not allowed",
      }
    ),

  password: z
    .string()
    .min(
      8,
      "Password must be at least 8 characters"
    )
    .regex(
      /[A-Z]/,
      "Password must contain uppercase letter"
    )
    .regex(
      /[a-z]/,
      "Password must contain lowercase letter"
    )
    .regex(
      /[0-9]/,
      "Password must contain a number"
    )
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain special character"
    ),

  role: z.enum([
    "student",
    "company",
    "mentor",
    "admin",
  ]),
});