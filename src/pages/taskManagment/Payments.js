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

import { get_payments } from "../../actions/firebaseAction";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

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

const Payments = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { firebase } = useSelector((state) => ({
    firebase: state.firebase,
  }));
  const { payments, get_payments_loading } = {
    ...firebase,
  };

  console.log(payments);

  React.useEffect(() => {
    dispatch(get_payments());
  }, [dispatch]);

  return (
    <Widget>
      <div className="mt-4 w-full p-4 rounded-lg bg-white border border-grey-100 dark:bg-grey-895 dark:border-grey-890">
        <Section title="Reuse" description="All Payments" />
      </div>
      <div className="w-full p-4 rounded-lg bg-white border border-grey-100 dark:bg-grey-895 dark:border-grey-890">
        {get_payments_loading ? (
          <Loader fill="#111" styles="" />
        ) : (
          <div>
            <Grid className={classes.grid} container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {payments !== null ? (
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow>
                          {[
                            "Profile",
                            "User Name",
                            "Amount",
                            "Paid At",
                            "Phone Number",
                            "Description",
                            "Status",
                            "Reference",
                          ].map((item, i) => (
                            <StyledTableCell align="left" key={i}>
                              {item}
                            </StyledTableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {payments &&
                          payments?.map((item) => (
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
                                {item.data.item.userInfo.firstName !== null
                                  ? `${item.data.item.userInfo.firstName} ${item.data.item.userInfo.lastName}`
                                  : "----"}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {item.data.amount !== null
                                  ? item.data.amount
                                  : "----"}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {item.data.createdAt !== null
                                  ? moment(item?.data.createdAt).toString()
                                  : "----"}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {item.data.phoneNumber !== null
                                  ? item.data.phoneNumber
                                  : "----"}
                              </StyledTableCell>

                              <StyledTableCell align="left">
                                {item.data.description !== null
                                  ? item.data.description
                                  : "----"}
                              </StyledTableCell>

                              <StyledTableCell align="left">
                                {item.data.status !== null ? (
                                  <div
                                    className={`p-2 rounded-lg flex items-center justify-center text-white ${
                                      item.data.status === "Completed"
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
                              <StyledTableCell align="left">
                                {item.data.reference !== null
                                  ? item.data.reference
                                  : "----"}
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
export default Payments;
