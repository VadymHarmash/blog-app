import React from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { loginValidationSchema } from "../../../../validation/LoginValidationSchema";
import { useAppDispatch } from "../../../../hooks/redux";
import { login } from "../../../../store/reducers/userSlice";
import styles from "./loginForm.module.scss";

interface FormValues {
  name: string;
  password: string;
}

const initialValues: FormValues = { name: "", password: "" };

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) => {
    setTimeout(() => {
      dispatch(
        login({
          name: values.name,
          password: values.password,
        }),
      );
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting }: { isSubmitting: boolean }) => (
          <Form className={styles.loginForm}>
            <Field
              type="text"
              name="name"
              placeholder="Name"
              className={styles.loginForm__input}
            />
            <ErrorMessage
              name="name"
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
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.loginForm__button}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
