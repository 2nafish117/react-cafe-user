import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField'
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";


import { meal_entries } from 'api/endpoints_meal_entries.js'

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

export default function EmployeeManagement() {
  const classes = useStyles();

  const [_mealType, setMealType] = React.useState("")
  const [_cost, setCost] = React.useState("")
  const [_costHelper, setCostHelper] = React.useState("")
  const [_employeeCost, setEmployeeCost] = React.useState("")
  const [_employeeCostHelper, setEmployeeCostHelper] = React.useState("")
  const [_companyCost, setCompanyCost] = React.useState("")
  const [_companyCostHelper, setCompanyCostHelper] = React.useState("")
  const [_fromTime, setFromTime] = React.useState("")
  const [_toTime, setToTime] = React.useState("")
  const [_catererID, setCatererID] = React.useState("")

  function submitForm(event) {
    console.log('submitting')
    let data = {
      "meal_type": _mealType,
      "cost": _cost,
      "employee_cost": _employeeCost,
      "company_cost": _companyCost,
      // "from_time": _fromTime,
      // "to_time": _toTime,
      "caterer_id": _catererID
    }
    console.log(data)
    meal_entries.post(data).then(res => console.log(res))
  }

  function onChange(event) {
    let error;
    switch(event.target.id) {
      case 'meal-type':
        setMealType(event.target.value)
        break;
        
      case 'total-cost':
        setCost(event.target.value)
        error = /^[0-9]+$/.test(event.target.value)
        if(!error) {
          setCostHelper("Invalid Cost")
        }
        else {
          setCostHelper("")
          if(_employeeCost != "")
            setCompanyCost(String(event.target.value - _employeeCost))
        }
        break;
      
      case 'employee-cost':
        setEmployeeCost(event.target.value)
        error = /^[0-9]+$/.test(event.target.value)
        if(!error) {
          setEmployeeCostHelper("Invalid Employee Cost")
        }
        else {
          setEmployeeCostHelper("")
          if(_cost != "")
            setCompanyCost(String(_cost - event.target.value))
        }
        break;
      
      case 'caterer-id':
        setCatererID(event.target.value)
    }
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Meals</h4>
              <p className={classes.cardCategoryWhite}>Add a Meal type</p>
            </CardHeader>
            <CardBody>
              <GridContainer>

                <GridItem xs={12} sm={12} md={12}>
                  <TextField id="meal-type" label="Meal Type" 
                    value={_mealType}
                    onChange={onChange}
                    fullWidth
                  />
                </GridItem>
                </GridContainer>

                <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField id="total-cost" label="Total Cost" 
                    value={_cost}
                    onChange={onChange}
                    fullWidth
                    error={_costHelper.length !== 0}
                    helperText={_costHelper}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField id="employee-cost" label="Employee Cost" 
                    value={_employeeCost}
                    onChange={onChange}
                    fullWidth
                    error={_employeeCostHelper.length !== 0}
                    helperText={_employeeCostHelper}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField id="company-cost" label="Company Cost"
                    value={_companyCost}
                    fullWidth
                    disabled
                    error={_companyCostHelper.length !== 0}
                    helperText={_companyCostHelper}
                  />
                </GridItem>

              </GridContainer>

              <GridContainer>
                <GridItem>
                <TextField
                  id="time"
                  label="From Time"
                  type="time"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  value={_fromTime}
                  onChange={(event) => setFromTime(event.target.value)}
                />
                </GridItem>
                <GridItem>
                <TextField
                  id="time"
                  label="To Time"
                  type="time"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  value={_toTime}
                  onChange={(event) => setToTime(event.target.value)}
                />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="caterer-id" label="Caterer ID" 
                    value={_catererID}
                    onChange={onChange}
                    fullWidth
                  />
                </GridItem>
              </GridContainer>

            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={submitForm}>Add Meal Type</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}