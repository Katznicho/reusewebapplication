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
import { APP_USERS } from "../../utils/constants";

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

const Community = () => {
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
  const admins = users?.filter((user) => (user.data.userType==APP_USERS.RECEIVER));

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
        <Section title="Reuse" description="All  Communities" />
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
                             Community Name
                          </StyledTableCell>
                          <StyledTableCell align="left">Email</StyledTableCell>
                          <StyledTableCell align="left">UserName</StyledTableCell>
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
                                {item.data.lastName !== null
                                  ? item.data.communityName
                                  : "----"}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {item.data.email !== null
                                  ? item.data.email
                                  : "----"}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {item.data.username !== null
                                  ? item.data.username
                                  : "----"}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {
                                  item.data.isVerified ? (
                                    <span className="text-green-500">
                                      Verified
                                    </span>
                                  ) : (
                                    <span className="text-red-500">
                                      Not Verified
                                    </span>
                                  )
                                  
                                }
                              </StyledTableCell>

                              <StyledTableCell align="center">
                                <div className="flex items-center justify-center space-x-4">
                                  <Button
                                    text={
                                      item.data.isVerified
                                        ? "Unverify"
                                        : "Verify"
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
export default Community;
