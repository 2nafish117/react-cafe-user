import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField'
import Search from "@material-ui/icons/Search";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
// api
import { meal_entries } from 'api/endpoints_meal_entries.js'
import { employees } from "api/endpoints_employees";

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

export default function MealEntry() {
  const classes = useStyles();

  const [_name, setName] = React.useState("")

  const [_employeeID, setEmployeeID] = React.useState("")
  const [_employeeIDHelper, setEmployeeIDHelper] = React.useState("")
  
  const [_errorMessage, setErrorMessage] = React.useState('Enter Your Employee Id For Sustenence!')
  const [_errorLevel, setErrorLevel] = React.useState()

    function onResponse(res) {
        console.log(res)
        switch(res.status.description) {
            case '':
                employees.get(_employeeID).then(res => setName(res.payload.name))
                setErrorMessage('Enjoy Your Meal! ' + _name)
                setErrorLevel("success")
                break;
            default:
                setErrorMessage("Something Went Wrong! " + res.status.description)
                setErrorLevel("danger")
        }
    }

  function submitForm(event) {
    console.log('submitting')
    let data = {
      "employee_id": _employeeID
    }
    console.log(data)
    meal_entries.post(data).then(res => onResponse(res))
    setEmployeeID('')
  }

  function onChange(event) {
    let error;
    switch(event.target.id) {
      case 'employee-id':
        setEmployeeID(event.target.value)
        break;
    }
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Get A Meal</h4>
              <p className={classes.cardCategoryWhite}>Get Your Meal</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                <TextField id="employee-id" label="Employee ID" 
                    value={_employeeID}
                    onChange={onChange}
                    fullWidth
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <h6 className={classes.cardCategory}>{}</h6>
              </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
              <SnackbarContent
                message={_errorMessage}
                color={_errorLevel}
            />
            </GridItem>
            </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={submitForm}>Submit</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
