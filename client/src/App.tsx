import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { checkAuth } from "./store/thunks/userThunk";

export const App = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{
            fontSize: '1.75em'
          }}>
            Loading...
          </p>
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
};
