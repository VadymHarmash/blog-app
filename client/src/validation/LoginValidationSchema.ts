import { object, string } from "yup";

export const loginValidationSchema = object({
  name: string()
    .required("Name is required")
    .min(5, "Name must have at least 5 characters"),
  password: string()
    .required("Password is required")
    .min(8, "Password must have at least 8 characters"),
});
