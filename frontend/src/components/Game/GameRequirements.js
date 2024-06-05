import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

function BasicTable({ requirements }) {
  const parseRequirements = (req) => {
    if (req !== "Not available") {
      const reqObj = {};
      const reqList = req.split(/(?=[A-Z][a-z]+:)/).map((item) => item.trim());
      reqList.forEach((item) => {
        const [key, ...value] = item.split(": ");
        reqObj[key] = value.join(": ");
      });
      return reqObj;
    }
  };

  const minimumReqs = parseRequirements(
    requirements.minimum || "Not available"
  );
  const recommendedReqs = parseRequirements(
    requirements.recommended || "Not available"
  );

  const components = ["Processor", "Memory", "Graphics", "Storage"];

  const rows = components.map((component) => ({
    component,
    minimum:
      minimumReqs && minimumReqs[component]
        ? minimumReqs[component]
        : "Not Available",
    recommended:
      recommendedReqs && recommendedReqs[component]
        ? recommendedReqs[component]
        : "Not Available",
  }));

  return (
    <>
      {requirements === "Not available" || !rows ? (
        <Typography component={"div"} variant="h4" color={"red"}>
          No System Requirements Available
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: "15px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <h3>Component</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>Minimum</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>Recommended</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.component}
                    </TableCell>
                    <TableCell align="right">{row.minimum}</TableCell>
                    <TableCell align="right">{row.recommended}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default BasicTable;
