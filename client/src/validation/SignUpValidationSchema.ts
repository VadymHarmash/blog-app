import { object, string } from "yup";

export const signUpValidationSchema = object({
  name: string()
    .required("Name is required")
    .min(5, "Name must have at least 5 characters"),
  email: string()
    .required("Email is required")
    .email("Invalid email format"),
  password: string()
    .required("Password is required")
    .min(8, "Password must have at least 8 characters"),
  confirmPassword: string()
    .required("Confirm password is required")
    .test("passwords-match", "Passwords must match", function(value) {
      return value === this.parent.password;
    }),
});
