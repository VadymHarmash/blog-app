import React from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { loginValidationSchema } from "../../../../validation/LoginValidationSchema";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { login } from "../../../../store/thunks/userThunk";
import styles from "./loginForm.module.scss";

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = { email: "", password: "" };

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.userReducer);

  const handleLogin = (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    dispatch(
      login({
        email: values.email,
        password: values.password,
      })
    );
    helpers.setSubmitting(false);
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={(values, helpers) => {
          handleLogin(values, helpers);
        }}
      >
        {({ isSubmitting }: any) => {
          return (
            <Form className={styles.loginForm}>
              <Field
                type="text"
                name="email"
                placeholder="Email"
                className={styles.loginForm__input}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.loginForm__error}
              />
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className={styles.loginForm__input}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.loginForm__error}
              />
              {loading ? (
                "Logging in..."
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.loginForm__button}
                >
                  Login
                </button>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
