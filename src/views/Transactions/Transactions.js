import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from '@material-ui/core/TextField'
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { admin_transactions } from 'api/endpoints_admin_transactions'
import { employee_transactions } from 'api/endpoints_employee_transactions'

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

export default function Transactions() {
    const classes = useStyles();

    const [_transactionType, setTransactionType] = React.useState("EmployeePayment");
    const [_employeeID, setEmployeeID] = React.useState("");
    const [_adminID, setAdminID] = React.useState("");
    const [_managerID, setManagerID] = React.useState("");
    const [_amount, setAmount] = React.useState("");
    const [_amountHelper, setAmountHelper] = React.useState("");
    const [_mode, setMode] = React.useState("Upi");
    const [_remarks, setRemarks] = React.useState("");

    function submitForm(event) {
        console.log('submitting')
        if(_transactionType === "EmployeePayment") {
            let data = {
                "transaction_type": _transactionType,
                "employee_id": _employeeID,
                "admin_id": _adminID,
                "amount": _amount,
                "mode": _mode,
                "remarks": _remarks,
            }
            console.log(data)
            admin_transactions.post(data).then(res => console.log(res))
            employee_transactions.post(data).then(res => console.log(res))
        } else {
            let data = {
                "transaction_type": _transactionType,
                "manager_id": _managerID,
                "admin_id": _adminID,
                "amount": _amount,
                "mode": _mode,
                "remarks": _remarks,
            }
            console.log(data)
            admin_transactions.post(data).then(res => console.log(res))
        }
    }
    function transactionTypeChangeHandler(event) {
        setTransactionType(event.target.value)
        setEmployeeID("")
        setAdminID("")
        setManagerID("")
    }

    function modeChangeHandler(event) {
        setMode(event.target.value)
    }

    function onChange(event) {
        let error;
        switch (event.target.id) {
            case 'employee-id':
                setEmployeeID(event.target.value)
                break;

            case 'admin-id':
                setAdminID(event.target.value)
                break;

            case 'manager-id':
                setManagerID(event.target.value)
                break;
            
            case 'amount':
                setAmount(event.target.value)
                error = /^[0-9]+$/.test(event.target.value)
                if(!error) {
                    setAmountHelper("Invalid Amount")
                } else {
                    setAmountHelper("")
                }
                break;

            case 'remarks':
                setRemarks(event.target.value)
                break;
        }
    }

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Transaction</h4>
                            <p className={classes.cardCategoryWhite}>transaction details</p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={5}>
                                    <InputLabel id="transaction-type-label">Transaction Type</InputLabel>
                                    <Select
                                        labelId="transaction-type"
                                        id="transaction-type"
                                        value={_transactionType}
                                        onChange={transactionTypeChangeHandler}
                                        fullWidth
                                    >
                                        <MenuItem id="transaction-type" value={"EmployeePayment"}>EmployeePayment</MenuItem>
                                        <MenuItem id="transaction-type" value={"AdminDeposit"}>AdminDeposit</MenuItem>
                                    </Select>
                                </GridItem>

                            </GridContainer>
                            <GridContainer>

                                <GridItem xs={12} sm={12} md={4}>
                                    <TextField id="employee-id" label="Employee ID"
                                        value={_employeeID}
                                        onChange={onChange}
                                        fullWidth
                                        disabled={_transactionType !== "EmployeePayment"}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={4}>
                                    <TextField id="admin-id" label="Admin ID" 
                                        value={_adminID}
                                        onChange={onChange}
                                        fullWidth
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={4}>
                                    <TextField id="manager-id" label="Manager ID" 
                                        value={_managerID}
                                        onChange={onChange}
                                        fullWidth
                                        disabled={_transactionType !== "AdminDeposit"}
                                    />
                                </GridItem>
                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <TextField id="amount" label="Amount" 
                                        value={_amount}
                                        onChange={onChange}
                                        fullWidth
                                        error={_amountHelper.length !== 0}
                                        helperText={_amountHelper}
                                    />
                                </GridItem>
                                <GridItem>
                                <InputLabel id="mode-label">Mode</InputLabel>
                                <Select
                                    id="mode"
                                    value={_mode}
                                    onChange={modeChangeHandler}
                                >
                                    <MenuItem value={"Upi"}>Upi</MenuItem>
                                    <MenuItem value={"CreditCard"}>CreditCard</MenuItem>
                                    <MenuItem value={"DebitCard"}>DebitCard</MenuItem>
                                    <MenuItem value={"Cash"}>Cash</MenuItem>
                                </Select>
                                </GridItem>
                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <TextField id="remarks" label="Remarks" 
                                        value={_remarks}
                                        onChange={onChange}
                                        fullWidth
                                        multiline
                                        rows={4}
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary" onClick={submitForm}>Make Transaction</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
