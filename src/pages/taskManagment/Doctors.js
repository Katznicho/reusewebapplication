import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Widget from "../../components/social-feed/widget";

import {
  Alert,
  Button,
  Input,
  Loader,
  Modal,
  Section,
  User,
} from "../../components";

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
  add_amount,
  clearMessage,
  get_users,
  make_admin,
} from "../../actions/firebaseAction";
import { useDispatch, useSelector } from "react-redux";
import { FiAlertCircle } from "react-icons/fi";
import { XIcon } from "@heroicons/react/outline";

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

const Doctors = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState("");

  const { firebase } = useSelector((state) => ({
    firebase: state.firebase,
  }));
  const {
    users,
    get_firebase_users_loading,
    admin_loading,
    message,
    reason,
    amount_loading,
  } = {
    ...firebase,
  };
  const doctors = users?.filter((user) =>
    user.data.role === "doctor" ? user : null
  );

  React.useEffect(() => {
    dispatch(get_users());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(add_amount(currentId, amount));
  };

  return (
    <Widget>
      <div>
        {message && reason === "admin" ? (
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
      <div>
        {message && reason === "doctor_amount" ? (
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
        <Section title="SnapSkin" description="All Doctors" />
      </div>
      <div className="w-full p-4 rounded-lg bg-white border border-grey-100 dark:bg-grey-895 dark:border-grey-890">
        {get_firebase_users_loading ? (
          <Loader fill="#111" styles="" />
        ) : (
          <div>
            <Grid className={classes.grid} container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {doctors !== null ? (
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
                        {doctors &&
                          doctors?.map((item) => (
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
                                {item.data.status !== null ? (
                                  <div
                                    className={` p-2 rounded-lg flex items-center justify-center text-white ${
                                      item.data.status === "active"
                                        ? "bg-green-200 border"
                                        : ""
                                    }`}
                                  >
                                    {item.data.status}
                                  </div>
                                ) : (
                                  "----"
                                )}
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
                                      dispatch(make_admin(item.id));
                                      setCurrentId(item.id);
                                    }}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  >
                                    {currentId === item.id && admin_loading ? (
                                      <Loader />
                                    ) : (
                                      "Make Admin"
                                    )}
                                  </button>
                                  <button
                                    onClick={() => {
                                      setOpen(true);
                                      setCurrentId(item.id);
                                    }}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  >
                                    Add Amount
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

      <Modal
        title="Add Doctor's Amount"
        icon={<XIcon className="w-5 h-5 text-red-500 hover:text-red-600" />}
        open={open}
        setOpen={setOpen}
        handleSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 p-4">
          <Input
            title="Amount"
            name="enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            rows={5}
          />
          <div>
            <button
              className="btn btn-default btn-rounded btn-icon bg-tunziblue hover:bg-tunziblue text-white space-x-1"
              type="submit"
            >
              {amount_loading ? <Loader /> : <span>Submit</span>}
            </button>
          </div>
        </div>
      </Modal>
    </Widget>
  );
};
export default Doctors;
