import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField'
import Search from "@material-ui/icons/Search";
import Table from "components/Table/Table.js";
// api
import { reports } from "api/endpoints_report";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function Reports() {
  const classes = useStyles();

  const [_reportType, setReportType] = React.useState("employee_transactions")
  const [_reportResults, setReportResults] = React.useState([])

  const [_employeeID, setEmployeeID] = React.useState("")
  const [_employeeIDHelper, setEmployeeIDHelper] = React.useState("")

  function submitForm(event) {
    console.log('submitting')
    switch(_reportType) {
      case 'employee_transactions':
        reports.getAll(_reportType).then(res => { 
          var results = res.payload.map( it => {
            var employee_id = it.employee_id
            var name = it.name
            var amount = it.amount
              return [name, employee_id, amount]
            })
          console.log(results)
          setReportResults(results)
        })
        break;
    }
    

    // let data = {
    //   "name": _name,
    //   "employee_id": _employeeID,
    //   "contact": _contact,
    //   "email": _email,
    //   // "join_date": _joinDate
    // }
    // console.log(data)
    // employees.post(data).then(res => console.log(res))
  }

  // function onChange(event) {
  //   let error;
  //   switch (event.target.id) {
  //     case 'employee-id':
  //       setEmployeeID(event.target.value)
  //       break;
  //   }
  // }

  function reportTypeChangeHandler(event) {
    setReportType(event.target.value)
    console.log(_reportType)
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Reports</h4>
              <p className={classes.cardCategoryWhite}>Get Reports</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <InputLabel id="report-type-label">Transaction Type</InputLabel>
                  <Select
                    labelId="report-type"
                    id="report-type"
                    value={_reportType}
                    onChange={reportTypeChangeHandler}
                    fullWidth
                  >
                    <MenuItem id="report-type" value={"employee_transactions"}>Employee Transactions</MenuItem>
                    <MenuItem id="report-type" value={"admin_transactions"}>Admin Transactions</MenuItem>
                    <MenuItem id="report-type" value={"meal_entries"}>MealEntries</MenuItem>
                  </Select>
                </GridItem>
              </GridContainer>

              {/* <GridItem xs={12} sm={12} md={6}>
                <TextField id="employee-id" label="Employee ID"
                    value={_employeeID}
                    onChange={onChange}
                    fullWidth
                  />
                </GridItem> */}

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["Name", "Employee ID", "Amount"]}
                    tableData={_reportResults}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={submitForm}>Get Reports</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
