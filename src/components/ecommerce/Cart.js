import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Input, Button  , Tooltip } from "@material-ui/core";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import Nav from "../Layout/Nav";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider, Grid, Paper } from "@material-ui/core";
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { addToCart } from '../../actions'
import { connect } from 'react-redux'
import OrderSummary from "./OrderSummary";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#752205"
    },
    secondary: {
      main: "#363636"
    },
    text: {
      primary: "#363636"
    }
  },
});

const useStyles = makeStyles(theme => ({
  img: {
    width: "100%"
  },
  imgPaper: {
    padding: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  summaryItems: {
    padding: theme.spacing(2),
    fontSize: "0.8 rem"
  }
}));

function Cart(props) {
  const classes = useStyles();
  const [data, setData] = React.useState([])

  React.useEffect(()=>{
    setData(props.cartItems)
  }, [props])

  const save = event => {
    props.addToCart(data)
  }

  const deleteItem = id => event => {
    props.addToCart([...data.filter(item => item.id !== id)])
  }

  const quantityChanged = event => {
    let changedData = data
    changedData = changedData.map(item => {
      if(item.id === event.target.id){
        item['quantity'] = parseInt(event.target.value)
      }
      return item
    })
    setData(changedData)
  }
  return (
    <MuiThemeProvider theme={theme}>
      <Nav />
      <Grid container style={{ marginTop: 100 }}>
        <Grid item xs={12}>
          <Typography
            style={{ margin: 20, fontSize: "1.2rem", fontWeight: 500 }}
          >
            YOUR SHOPPING CART
        </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={8}>
          {data.length === 0 ? (
            <Typography style={{ marginTop: "25vh", marginLeft: "40%" }}>
              No items in your cart
            </Typography>
          ) : (
              data.map((row, index) => {
                return (
                  <Paper key={index} className={classes.paper}>
                    <Grid
                      container
                      justify="center"
                      align="center"
                      alignItems="center"
                    >
                      <Grid item xs={12} sm={12} md={3}>
                        <Paper className={classes.imgPaper}>
                          <img
                            alt="img"
                            className={classes.img}
                            src={row.pictures[0]}
                          />
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} style={{ padding: 5 }}>
                        <Typography
                          color="textPrimary"
                          style={{ fontWeight: 500, fontSize: "1.2rem" }}
                        >
                          {row.specs.year +
                            " " +
                            row.specs.make.value +
                            " " +
                            row.carName}
                        </Typography>
                        <div
                          style={{
                            display: "inline-flex",
                            padding: 2,
                            paddingTop: 5
                          }}
                        >
                          <Typography>Ext. Color: </Typography>
                          <div
                            style={{
                              width: 15,
                              height: 15,
                              background: row.specs.exteriorColor,
                              margin: 5
                            }}
                          />
                          <Typography>
                            {" " + row.specs.exteriorColor} |
                        </Typography>
                        </div>
                        <div
                          style={{
                            display: "inline-flex",
                            padding: 2,
                            paddingBottom: 10
                          }}
                        >
                          <Typography>Int. Color: </Typography>
                          <div
                            style={{
                              width: 15,
                              height: 15,
                              background: row.specs.interiorColor,
                              margin: 5
                            }}
                          />
                          <Typography>
                            {" " + row.specs.interiorColor}{" "}
                          </Typography>
                        </div>
                        <Typography>
                          <strong>Mileage:</strong>
                        </Typography>
                        <Typography>
                          City: {row.specs.mileage.city} <br />
                          Highway: {row.specs.mileage.highway}
                          <br />
                          Combine: {row.specs.mileage.combined}
                          <br />
                        </Typography>
                        <Typography>
                          <strong>Transmission</strong>: {row.specs.transmission}
                        </Typography>
                        <Typography>
                          <strong>Driveterrain</strong>: {row.specs.driveterrain}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2}>
                        <Typography>
                          <strong>Price</strong>
                        </Typography>
                        <Typography>$ {row.carPrice}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2}>
                        <Grid item xs={12}>
                          <Typography>
                            <strong>QUANTITY</strong>
                          </Typography>
                          <Typography />
                          <Input
                            style={{ width: 40 }}
                            type="number"
                            value={row.quantity}
                            id={row.id}
                            onChange={quantityChanged}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Tooltip title='Save'>
                            <Button
                              style={{ margin: 6, border: 0, padding: 0, minWidth: 10 }}
                              variant="outlined"
                              color="secondary"
                              onClick={save}
                            >
                              <SaveRoundedIcon />
                            </Button>
                          </Tooltip>
                          <Tooltip title='Remove item'>
                            <Button 
                              variant="outlined" 
                              color="primary" 
                              style={{ border: 0, padding: 0, minWidth: 10 }}
                              onClick={deleteItem(row.id)}
                            >
                              <DeleteForeverRoundedIcon />
                            </Button>
                          </Tooltip>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2}>
                        <Typography>
                          <strong>TOTAL</strong>
                        </Typography>
                        <Typography>$ {row.quantity * row.carPrice}</Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                );
              })
            )}
        </Grid>
        <Grid item xs={12} md={4}>
          <OrderSummary/>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}

const mapStateToProps = state => ({
  cartItems: state.cart.cartItems
})

export default connect(mapStateToProps, { addToCart })(Cart);