import React, { useState, useEffect } from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { ImportExportTwoTone } from "@material-ui/icons";
import SignUp from "../../components/signup";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Dashboard(props) {
  const [data, setData] = useState();
  useEffect(() => {
    // Update the document title using the browser API
    (async function () {
      const result = await axios.get("http://localhost:4000/users");
      console.log(result.data);
      setData(result.data);
    })();
  }, []);

  const onSignInFormSubmit = (formData) => {
    // Create New Data Array with new row from formData
    formData.id = 2333;
    setData(data.concat(formData));
  };
  return (
    <div>
      <SignUp onSubmit={onSignInFormSubmit} />
      <Grid container>
        <Grid
          container
          item
          justify={"center"}
          alignItems={"center"}
          className="pt-24"
        >
          <TableContainer component={Paper}>
            {data && (
              <Table className="classe" aria-label="simple table">
                {/* {JSON.stringify(data)} */}
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="right">first_name</TableCell>
                    <TableCell align="right">last_name</TableCell>
                    <TableCell align="right">email</TableCell>
                    <TableCell align="right">phone</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((value) => (
                    <TableRow key={value.id}>
                      <TableCell component="th" scope="row">
                        {value.id}
                      </TableCell>
                      <TableCell align="right">{value.first_name}</TableCell>
                      <TableCell align="right">{value.last_name}</TableCell>
                      <TableCell align="right">{value.email}</TableCell>
                      <TableCell align="right">{value.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
