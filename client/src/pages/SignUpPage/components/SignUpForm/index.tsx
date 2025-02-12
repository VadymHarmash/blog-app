import React from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { signUpValidationSchema } from "../../../../validation/SignUpValidationSchema";
import { signUp } from "../../../../store/thunks/userThunk";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./signUpForm.module.scss";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.userReducer);

  const handleFormSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) => {
    try {
      await dispatch(
        signUp({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      ).unwrap();

      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={signUpValidationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting }: { isSubmitting: boolean }) => (
          <Form className={styles.signUpForm}>
            <Field
              type="text"
              name="name"
              placeholder="Name"
              className={styles.signUpForm__input}
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.signUpForm__error}
            />
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className={styles.signUpForm__input}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.signUpForm__error}
            />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className={styles.signUpForm__input}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.signUpForm__error}
            />
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className={styles.signUpForm__input}
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className={styles.signUpForm__error}
            />

            {loading ? (
              "Signing up..."
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.signUpForm__button}
              >
                Sign Up
              </button>
            )}
            {error && error.message && (
              <p className={styles.error}>{error.message}</p>
            )}

            <p className={styles.signUpForm__haveProfile}>
              If you have profile, go to <NavLink to={"/"}>login</NavLink>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};
