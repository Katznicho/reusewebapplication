import React from "react";
import { Redirect, Route } from "react-router-dom";

export const AuthenticationRoute = ({ component: Component, ...others }) => {
  return (
    <Route
      {...others}
      render={(props) => {
        if (
          window.localStorage.getItem("user_token") === null ||
          window.localStorage.getItem("user_token") === undefined
        ) {
          return <Redirect to="/auth/login" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};
