import React, { useState, useEffect } from "react";
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

import {  getNotifications } from "../../actions/firebaseAction";
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

const Notifications = () => {
  const classes = useStyles();


  const [loading , setLoading] =  useState(false);
  const [notifications , setNotifications] = useState([]);


  console.log(notifications);

  useEffect(() => {
     setLoading(true);
    getNotifications().then((data)=>{
      setNotifications(data)
    })
    setLoading(false);
  }, []);

  return (
    <Widget>
      <div className="mt-4 w-full p-4 rounded-lg bg-white border border-grey-100 dark:bg-grey-895 dark:border-grey-890">
        <Section title="Reuse" description="Notifications" />
      </div>
      <div className="w-full p-4 rounded-lg bg-white border border-grey-100 dark:bg-grey-895 dark:border-grey-890">
        {loading ? (
          <Loader fill="#111" styles="" />
        ) : (
          <div>
            <Grid className={classes.grid} container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {notifications.length>0 ? (
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow>
                          {["Title", "Description" , "Status",  "Is Read"].map((item, i) => (
                            <StyledTableCell align="left" key={i}>
                              {item}
                            </StyledTableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {notifications.length>0 &&
                          notifications?.map((item) => (
                            <StyledTableRow key={item?.id}>

                              <StyledTableCell align="left">
                                {item.data.message !== null
                                  ? item?.data?.title
                                  : "----"}
                              </StyledTableCell>

                              <StyledTableCell align="left">
                                {item.data.message !== null
                                  ? item?.data?.description
                                  : "----"}
                              </StyledTableCell>

                              <StyledTableCell align="left">
                                {item.data.time !== null
                                  ? item?.data?.status
                                  : "----"}
                              </StyledTableCell>

                              <StyledTableCell align="left">
                                {item.data.message !== null
                                  ? item?.data?.unRead
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
export default Notifications;
