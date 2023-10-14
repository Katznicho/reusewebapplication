import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Widget from "../../components/social-feed/widget";

import { Alert, Button, Loader, Section, User } from "../../components";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Paper,
} from "@material-ui/core";

import {
  clearMessage,
  get_users,
  remove_admin,
} from "../../actions/firebaseAction";
import { useDispatch, useSelector } from "react-redux";
import { FiAlertCircle } from "react-icons/fi";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#2d2d2d",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
    "& thead th": {
      fontWeight: "600",
      color: "#fff",
      backgroundColor: "#202A44",
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
  grid: {
    marginBottom: "50px",
    marginTop: "10px",
  },
  schedule_grid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    alignItems: "left",
    marginBottom: "30px",
    marginTop: "5px",
  },
}));

const Donors = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = React.useState(null);
  const { firebase } = useSelector((state) => ({
    firebase: state.firebase,
  }));
  const {
    users,
    get_firebase_users_loading,
    remove_admin_loading,
    message,
    reason,
  } = {
    ...firebase,
  };
  const admins = users?.filter((user) => (user.data.isAdmin ? user : null));

  React.useEffect(() => {
    dispatch(get_users());
  }, [dispatch]);

  return (
    <Widget>
      <div>
        {message && reason === "not-admin" ? (
          <div className="w-full mb-4">
            {(message !== null || message !== undefined) && (
              <Alert
                error={`text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800`}
                icon={<FiAlertCircle className="mr-2 stroke-current h-4 w-4" />}
                onClick={() => dispatch(clearMessage())}
              >
                {message}
              </Alert>
            )}
          </div>
        ) : null}
      </div>
      <div className="mt-4 w-full p-4 rounded-lg bg-white border border-grey-100 dark:bg-grey-895 dark:border-grey-890">
        <Section title="SnapSkin" description="All users" />
      </div>
      <div className="w-full p-4 rounded-lg bg-white border border-grey-100 dark:bg-grey-895 dark:border-grey-890">
        {get_firebase_users_loading ? (
          <Loader fill="#111" styles="" />
        ) : (
          <div>
            <Grid className={classes.grid} container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {admins !== null ? (
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="left">
                            Profile
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            First Name
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            Last Name
                          </StyledTableCell>
                          <StyledTableCell align="left">Email</StyledTableCell>
                          <StyledTableCell align="left">Role</StyledTableCell>
                          <StyledTableCell align="left">Dob</StyledTableCell>
                          <StyledTableCell align="left">Status</StyledTableCell>

                          <StyledTableCell align="center">
                            Actions
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {admins &&
                          admins?.map((item) => (
                            <StyledTableRow key={item.id}>
                              <StyledTableCell align="left">
                                {item.data.photoURL !== null ? (
                                  <User
                                    image={item.data.photoURL}
                                    alt={item.firstName}
                                  />
                                ) : null}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {item.data.firstName !== null
                                  ? item.data.firstName
                                  : "----"}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {item.data.lastName !== null
                                  ? item.data.lastName
                                  : "----"}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {item.data.email !== null
                                  ? item.data.email
                                  : "----"}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {item.data.role !== null ? (
                                  <div
                                    className={` p-2 rounded-lg flex items-center justify-center text-white ${
                                      item.data.role === "user" ||
                                      item.data.role === "doctor"
                                        ? item.data.role === "user"
                                          ? "bg-pink-200 border"
                                          : "bg-blue-200 border"
                                        : ""
                                    }`}
                                  >
                                    {item.data.role}
                                  </div>
                                ) : (
                                  "----"
                                )}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {item.data.dob !== null
                                  ? item.data.dob
                                  : "----"}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {item.data.status !== null
                                  ? item.data.status
                                  : "----"}
                              </StyledTableCell>

                              <StyledTableCell align="center">
                                <div className="flex items-center justify-center space-x-4">
                                  <Button
                                    text={
                                      item.data.isVerified
                                        ? "Verified"
                                        : "Unverified"
                                    }
                                    bg={`cursor-pointer ${
                                      item.data.isVerified
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                    }`}
                                    to={{
                                      pathname: "/verify-page",
                                      state: item.id,
                                    }}
                                  />
                                  <button
                                    onClick={() => {
                                      dispatch(remove_admin(item.id));
                                      setCurrentId(item.id);
                                    }}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  >
                                    {currentId === item.id &&
                                    remove_admin_loading ? (
                                      <Loader />
                                    ) : (
                                      "Remove Admin privilege"
                                    )}
                                  </button>
                                </div>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : null}
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </Widget>
  );
};
export default Donors;
