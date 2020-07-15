import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Search from "@material-ui/icons/Search";
import Table from "components/Table/Table.js";

import TextField from '@material-ui/core/TextField'
import { caterers } from "api/endpoints_caterers";
import { search } from "api/endpoint_search";

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

export default function CatererManagement() {
  const classes = useStyles();

  const [_search, setSearch] = React.useState("")
  const [_searchResults, setSearchResults] = React.useState([])

  const [_name, setName] = React.useState("")
  const [_catererID, setCatererID] = React.useState("")
  const [_contact, setContact] = React.useState("")
  const [_contactHelper, setContactHelper] = React.useState("")
  const [_joinDate, setJoinDate] = React.useState("")
  const [_email, setEmail] = React.useState("")
  const [_emailHelper, setEmailHelper] = React.useState("")
  const [_price, setPrice] = React.useState("")
  const [_priceHelper, setPriceHelper] = React.useState("")

  function submitForm(event) {
    console.log('submitting')
    let data = {
      "name": _name,
      "caterer_id": _catererID,
      "contact": _contact,
      // "join_date": _joinDate,
      "email": _email,
      "price": _price
    }
    console.log(data)
    caterers.post(data).then(res => console.log(res))
  }

  function onChange(event) {
    let error;
    switch(event.target.id) {
      case 'caterer-name':
        setName(event.target.value)
        break;
        
      case 'caterer-id':
        setCatererID(event.target.value)
        break;
      
      case 'contact':
        setContact(event.target.value)
        error = /^[0-9]{10}$/.test(event.target.value)
        if(!error) {
          setContactHelper("Invalid Phone Number")
        }
        else {
          setContactHelper("")
        }
        break;

      case 'email':
        setEmail(event.target.value)
        error = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$/.test(event.target.value)
        if(!error) {
          setEmailHelper("Invalid Email")
        }
        else {
          setEmailHelper("")
        }
        break;

      case 'price':
        setPrice(event.target.value)
        error = /^[0-9]+$/.test(event.target.value)
        if(!error) {
          setPriceHelper("Invalid Price")
        }
        else {
          setPriceHelper("")
        }
        break;
    }
  }

  function searchQuery() {
    search.getAll('caterers', _search).then(res => { 
      var results = res.payload.map( it => {
          var name = it.name
          var employee_id = it.employee_id
          var email = it.email
          var contact = it.contact
          return [name, employee_id, email, contact]
        })
      console.log(results)
      setSearchResults(results)
    })
  }

  return (
    <div>
      <GridContainer>

      <GridItem xs={12} sm={12} md={12}>
          <Card profile>
            <CardBody profile>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="search" 
                    placeholder="Search Caterers" 
                    value={_search}
                    onChange={event => setSearch(event.target.value)}
                    fullWidth
                  />
                </GridItem>
                <Button color="white" aria-label="edit" justIcon round onClick={searchQuery}>
                  <Search />
                </Button>
              </GridContainer>
              <GridContainer>
              <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Caterer ID", "Email", "Contact"]}
              tableData={_searchResults}
            />
            </GridContainer>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
        <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Caterer</h4>
              <p className={classes.cardCategoryWhite}>Add a Caterer</p>
            </CardHeader>
            <CardBody>
              <GridContainer>

                <GridItem xs={12} sm={12} md={5}>
                  <TextField id="caterer-name" label="Caterer Name" 
                    value={_name}
                    onChange={onChange}
                    fullWidth
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={5}>
                  <TextField id="caterer-id" label="Caterer ID" 
                    value={_catererID}
                    onChange={onChange}
                    fullWidth
                  />
                </GridItem>
                </GridContainer>

                <GridContainer>

                <GridItem xs={12} sm={12} md={5}>
                  <TextField id="contact" label="Contact" 
                    value={_contact}
                    onChange={onChange}
                    fullWidth
                    error={_contactHelper.length !== 0}
                    helperText={_contactHelper}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={5}>
                <TextField id="email" label="Email" 
                    value={_email}
                    onChange={onChange}
                    fullWidth
                    error={_emailHelper.length !== 0}
                    helperText={_emailHelper}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <TextField
                  id="datetime-local"
                  label="Join Date"
                  type="datetime-local"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={_joinDate}
                  onChange={(event) => setJoinDate(event.target.value)}
                />
                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="price" label="Price" 
                    value={_price}
                    onChange={onChange}
                    fullWidth
                    error={_priceHelper.length !== 0}
                    helperText={_priceHelper}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={submitForm}>Add Caterer</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
