import React, {useState, useEffect} from "react";
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
// import { useHistory } from "react-router-dom";
import {useHistory} from "react-router-dom"
import { getProducts } from "../../actions/firebaseAction";


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

const Products = () => {

   const history = useHistory();

  const classes = useStyles();
  const [products, setProducts]=  useState([]);
  const [loading , setLoading] =  useState(false);

  

  useEffect(() => {
    setLoading(true);
    getProducts().then((data)=>{
     setProducts(data)
   })
   setLoading(false);
 }, []);



  return (
    <Widget>
      <div className="mt-4 w-full p-4 rounded-lg bg-white border border-grey-100 dark:bg-grey-895 dark:border-grey-890">
        <Section title="Reuse" description="All Products" />
      </div>
      <div className="w-full p-4 rounded-lg bg-white border border-grey-100 dark:bg-grey-895 dark:border-grey-890">
        {loading? (
          <Loader fill="#111" styles="" />
        ) : (
          <div>
            <Grid className={classes.grid} container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {products.length>0 ? (
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="left">
                            Image
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            Product
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            Category
                          </StyledTableCell>
                          <StyledTableCell align="left">Weight</StyledTableCell>
                          <StyledTableCell align="left">Location</StyledTableCell>
                          <StyledTableCell align="left">Description</StyledTableCell>
                          <StyledTableCell align="left">Status</StyledTableCell>

                          <StyledTableCell align="center">
                            Actions
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {products &&
                          products?.map((item) => (
                            <StyledTableRow key={item.id}>
                              <StyledTableCell align="left">
                                {item.data?.coverImage !== null ? (
                                  <User
                                    image={item.data.coverImage}
                                    alt={item.title}
                                  />
                                ) : null}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {item.data.title !== null
                                  ? item.data.title
                                  : "----"}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {item.data.category !== null
                                  ? item.data.category
                                  : "----"}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {item.data.estimatedWeight !== null
                                  ? item.data.estimatedWeight
                                  : "----"}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                              {item.data.estimatedPickUp !== null
                                  ? item.data.estimatedPickUp
                                  : "----"}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {item.data.description !== null
                                  ? item.data.description
                                  : "----"}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {item.data.status !== null
                                  ? item.data.status
                                  : "----"}
                              </StyledTableCell>

                              <StyledTableCell align="center">
                                <div className="flex items-center justify-center space-x-4">
                                  
                                  <button
                                    onClick={() => {
                                     history.push(`productdetails/${item.id}`)
                                    }}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  >
                                    View Details
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
export default Products;
