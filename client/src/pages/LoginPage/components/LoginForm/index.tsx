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
    helpers: FormikHelpers<FormValues>,
  ) => {
    dispatch(
      login({
        email: values.email,
        password: values.password,
      }),
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
        {({ isSubmitting }) => {
          return (
            <Form className={styles.loginForm}>
              <h2>Login</h2>
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
                <p>"Logging in..."</p>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.loginForm__button}
                >
                  Login
                </button>
              )}
              {error && error.message && (
                <p className={styles.error}>{error.message}</p>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
