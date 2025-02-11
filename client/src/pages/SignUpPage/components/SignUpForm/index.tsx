import React from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { useAppDispatch } from "../../../../hooks/redux";
import { signUpValidationSchema } from "../../../../validation/SignUpValidationSchema";
import { signUp } from "../../../../store/reducers/userSlice";
import { useNavigate } from "react-router-dom";
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

  const handleFormSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) => {
    setTimeout(() => {
      dispatch(
        signUp({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      );
      setSubmitting(false);
      navigate("/");
    }, 400);
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
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.signUpForm__button}
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
