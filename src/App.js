import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layouts from "./layouts";
import Routes from "./Routes";
import "./css/tailwind.css";
import "./css/main.css";
import "./css/animate.css";
import "./css/_components.css";
import { useDispatch, useSelector } from "react-redux";
import {
  current_user,
  get_users,
  get_user_data,
} from "./actions/firebaseAction";
import { createBrowserHistory } from "history";

var history = createBrowserHistory();

const Wrapper = ({ children }) => {
  return <Layouts>{children}</Layouts>;
};

const App = () => {
  const token = localStorage.getItem("user_token");
  const dispatch = useDispatch();
  const { firebase } = useSelector((state) => ({
    firebase: state.firebase,
  }));

  const { currentUser } = { ...firebase };
  console.log(currentUser);
  React.useEffect(() => {
    if (token !== null && token !== undefined) {
      dispatch(get_users());
    }
  }, [dispatch, token]);

  React.useEffect(() => {
    dispatch(current_user());
  }, [dispatch]);

  React.useEffect(() => {
    if (currentUser) {
      dispatch(get_user_data(currentUser));
    }
  }, [currentUser, dispatch]);

  return (
    <Router history={history}>
      <Wrapper>
        <Routes />
      </Wrapper>
    </Router>
  );
};
export default App;
