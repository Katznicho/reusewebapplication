import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Login,
  NotFound,
  Dashboard,
  Users,
  VerifyPage,
  Admins,
  Payments,
  Notifications,
} from "./pages";
import { AuthenticationRoute } from "./components";
import Products from "./pages/taskManagment/Products";
import Community from "./pages/taskManagment/Community";
import Donors from "./pages/taskManagment/Donors";
import ProductDetails from "./pages/taskManagment/ProductDetails";
const Routes = () => {
  return (
    <Switch>
      <AuthenticationRoute exact path="/dashboard" component={Dashboard} />
      <AuthenticationRoute exact path="/" component={Dashboard} />
      <AuthenticationRoute path="/donors" component={Donors} />/
      <AuthenticationRoute path="/communities" component={Community} />/
      <AuthenticationRoute path="/verify-page" component={VerifyPage} />
      <AuthenticationRoute path="/productdetails/:id" component={ProductDetails} />
      
      <AuthenticationRoute path="/admins" component={Admins} />
      <AuthenticationRoute path="/payments" component={Payments} />
      <AuthenticationRoute path="/notifications" component={Notifications} />
      <AuthenticationRoute path="/products" component={Products} />
      <Route path="/auth/login" component={Login} />
      <Route path="/error-page" component={NotFound} />
    </Switch>
  );
};
export default Routes;
