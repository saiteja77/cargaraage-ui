import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { MuiThemeProvider, Grid, Paper, Typography, Button } from "@material-ui/core";
import OrderSummary from "./OrderSummary";
import Nav from "../Layout/Nav";
import { connect } from 'react-redux'
import { createMuiTheme } from "@material-ui/core/styles";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Axios from "axios";
import { addToCart } from '../../actions';

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
    root: {
        marginTop: 100,
        padding: theme.spacing(3)
    },
    item: {
        margin: theme.spacing(2)
    },
    cardDetails: {
        borderRadius: 5,
        padding: theme.spacing(1),
        paddingRight: theme.spacing(2),
    },
    textField: {
        margin: 5,
        marginTop: 15
    },
    heading: {
        fontSize: "1.2rem",
        fontWeight: 500,
        textAlign: "center",
        padding: 10
    },
    float:{
        float: 'right'
    }
}));

function Payment(props) {
    const [error, setError] = React.useState(false)
    const [checkoutSuccessful, setCheckoutSuccessful] = React.useState(false)
    const [orderId, setOrderId] = React.useState(0)
    const [paymentDetails, setPaymentDetails] = React.useState({
        card: '',
        exp: '',
        cvc: '',
        name: '',
        total: props.cartItems.map(car => car.carPrice).reduce((a, b) => a + b, 0) +
        props.cartItems.map(car => car.quantity).reduce((a, b) => a + b, 0) *
            800 +
            (props.cartItems.map(car => car.carPrice).reduce((a, b) => a + b, 0) *
                9) /
            100
    })
    const [shippingDetails, setShippingDetails] = React.useState({
        street: '',
        unit: '',
        city: '',
        state: '',
        country: '',
        zipcode: ''
    })
    const classes = useStyles();

    const handleChange = event => {
        switch (event.target.name) {
            case 'card':
                setPaymentDetails({
                    ...paymentDetails,
                    card: parseInt(event.target.value)
                })
                break;
            case 'exp':
                setPaymentDetails({
                    ...paymentDetails,
                    exp: event.target.value
                })
                break;
            case 'cvc':
                setPaymentDetails({
                    ...paymentDetails,
                    cvc: parseInt(event.target.value)
                })
                break;
            case 'name':
                setPaymentDetails({
                    ...paymentDetails,
                    name: event.target.value
                })
                break;
            case 'street':
                setShippingDetails({
                    ...shippingDetails,
                    street: event.target.value
                })
                break;
            case 'unit':
                setShippingDetails({
                    ...shippingDetails,
                    unit: parseInt(event.target.value)
                })
                break;
            case 'city':
                setShippingDetails({
                    ...shippingDetails,
                    city: event.target.value
                })
                break;
            case 'country':
                setShippingDetails({
                    ...shippingDetails,
                    country: event.target.value
                })
                break;
            case 'state':
                setShippingDetails({
                    ...shippingDetails,
                    state: event.target.value
                })
                break;
            case 'zipcode':
                setShippingDetails({
                    ...shippingDetails,
                    zipcode: parseInt(event.target.value)
                })
                break;
            default:
                break;
        }
    }

    const checkout = event => {
        let orders = props.cartItems.map(item => {
            return {
            carId: item.id,
            price: item.carPrice,
            quantity: item.quantity
            }
        })
        let payload = {
            userId: props.decodedToken.userId,
            orderDate: Date.now(),
            orderDetails: [...orders],
            payment: paymentDetails,
            shippingAddress: shippingDetails
        }
        Axios.post('http://localhost:8080/api/orders/', payload, {
            headers: {
              'access-token': localStorage.getItem('cg-tk'),
              'Content-Type': 'application/json',
            },
          }).then(response => {
              setOrderId(response.data)
              setError(false)
              console.log(response)
              setCheckoutSuccessful(true)
            props.addToCart([])
          }).catch(err => {
              setError(true)
              setCheckoutSuccessful(false)
          })
    }

    return (
        <MuiThemeProvider theme={theme}>
            <Nav />
            {checkoutSuccessful? (
                <Grid container >
                <Grid item className={classes.root}>
                    <Typography style={{fontSize: '2rem', fontWeight:250}}>Order placed Succesfully. Your order number is {orderId}</Typography>
                </Grid>
            </Grid>
            ) : (
                <Fragment>
                <Grid container >
                <Grid item className={classes.root}>
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        onClick={checkout}
                        disabled={props.cartItems.length===0? true: false}
                    >
                        Checkout <ArrowForwardIcon/>
                    </Button>
                </Grid>
            </Grid>
            <Grid container >
                <Grid item xs={12} sm={6} md={4} className={classes.item}>
                    <Paper className={classes.cardDetails}>
                        <Typography className={classes.heading}>Payment Details</Typography>
                        {error && <Typography style={{color:"red"}}><sup>* </sup>Payment did not go through. Please use another card</Typography>}
                        <TextField
                            label="Credit/Debit Card"
                            className={classes.textField}
                            name='card'
                            fullWidth
                            required
                            variant="filled"
                            onChange={handleChange}
                            type="number"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <CreditCardIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            label="Expiry Date (MM/YY)"
                            className={classes.textField}
                            variant="filled"
                            required
                            name='exp'
                            onChange={handleChange}
                        />
                        <TextField
                            label="CVC"
                            className={classes.textField}
                            variant="filled"
                            required
                            name='cvc'
                            type="number"
                            onChange={handleChange}
                        />
                        <TextField
                            label="Name On Card"
                            className={classes.textField}
                            fullWidth
                            variant="filled"
                            required
                            name='name'
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <AccountCircleIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4} className={classes.item}>
                    <Paper className={classes.cardDetails}>
                        <Typography className={classes.heading}>Shipping Details</Typography>
                        <TextField
                            label="Street Address"
                            className={classes.textField}
                            fullWidth
                            variant="filled"
                            required
                            name='street'
                            onChange={handleChange}
                        />
                        <TextField
                            label="Unit"
                            className={classes.textField}
                            variant="filled"
                            name='unit'
                            type="number"
                            onChange={handleChange}
                        />
                        <TextField
                            label="City"
                            className={classes.textField}
                            variant="filled"
                            required
                            name='city'
                            onChange={handleChange}
                        />
                        <TextField
                            label="State"
                            className={classes.textField}
                            variant="filled"
                            required
                            name='state'
                            onChange={handleChange}
                        />
                        <TextField
                            label="Country"
                            className={classes.textField}
                            variant="filled"
                            required
                            name='country'
                            onChange={handleChange}
                        />
                        <TextField
                            label="Zip Code"
                            className={classes.textField}
                            variant="filled"
                            required
                            name='zipcode'
                            type="number"
                            onChange={handleChange}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <OrderSummary payment={true}/>
                </Grid>
            </Grid>
                </Fragment>
            )}
        </MuiThemeProvider>
    );
}

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems,
    decodedToken: state.authReducer.decodedToken,
})

export default connect(mapStateToProps, {addToCart})(Payment);