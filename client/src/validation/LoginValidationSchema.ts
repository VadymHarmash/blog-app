import { object, string } from "yup";

export const loginValidationSchema = object({
  email: string()
    .required("Email is required")
    .email("Invalid email format"),
  password: string()
    .required("Password is required")
    .min(8, "Password must have at least 8 characters"),
});
