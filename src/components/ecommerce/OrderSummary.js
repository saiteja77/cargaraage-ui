import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Divider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider, Grid, Paper } from "@material-ui/core";
import { Link, useHistory } from 'react-router-dom'

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

function OrderSummary(props) {
    const data = props.cartItems
    const classes = useStyles()
    let history = useHistory();
    const proceedToPayment = event => {
        if(props.decodedToken.hasOwnProperty('group') && props.decodedToken.group.includes('USER')){
            history.push("/cars_for_sale/payment")
        } else {
            alert('Please Log In')
        }
    }

    return (
        <MuiThemeProvider theme={theme}>
            <Paper className={classes.paper}>
                <Typography style={{ fontSize: "1.3rem", fontWeight: 500 }}>
                    Order Summary
                </Typography>
                <Grid container className={classes.summaryItems}>
                    <Grid item xs={6}>
                        <Typography>SUB TOTAL</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>
                            $ {data.map(car => car.carPrice).reduce((a, b) => a + b, 0)}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container className={classes.summaryItems}>
                    <Grid item xs={6}>
                        <Typography>ESTIMATED SHIPPING</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        ${" "}
                        {data.map(car => car.quantity).reduce((a, b) => a + b, 0) * 800}
                    </Grid>
                </Grid>
                <Grid container className={classes.summaryItems}>
                    <Grid item xs={6}>
                        <Typography>ESTIMATED TAX</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>
                            ${" "}
                            {(data.map(car => car.carPrice).reduce((a, b) => a + b, 0) * 9) /
                                100}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container className={classes.summaryItems}>
                    <Grid item xs={6}>
                        <Typography>TOTAL</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>
                            ${" "}
                            {data.map(car => car.carPrice).reduce((a, b) => a + b, 0) +
                                data.map(car => car.quantity).reduce((a, b) => a + b, 0) *
                                800 +
                                (data.map(car => car.carPrice).reduce((a, b) => a + b, 0) *
                                    9) /
                                100}
                        </Typography>
                    </Grid>
                </Grid>
                <Link to='/cars_for_sale'>
                    <Button 
                        variant="contained" 
                        color="primary"
                        style={{ width: "45%" }}
                    >
                        Continue Shopping
                    </Button>
                </Link>
                {!props.payment && <Button
                    variant="contained"
                    color="secondary"
                    style={{ width: "45%", marginLeft: 10 }}
                    onClick={proceedToPayment}
                    disabled ={data.length === 0 ? true : false}
                >
                    Proceed to Payment
                </Button>}
            </Paper>
        </MuiThemeProvider>
    )
}

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems,
    decodedToken: state.authReducer.decodedToken,
})

export default connect(mapStateToProps)(OrderSummary);