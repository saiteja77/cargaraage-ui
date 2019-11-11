import React, { Fragment } from "react"
import { Typography, Paper, Button } from "@material-ui/core";
import AddShoppingCartSharpIcon from '@material-ui/icons/AddShoppingCartSharp';
import Snackbar from "@material-ui/core/Snackbar";
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import { addToCart } from '../../actions'
import { connect } from 'react-redux'

function CarDetails(props) {
    const car = props.data
    const [open, setOpen] = React.useState(false);

    const handleSelectedImage = index => event => {
        event.preventDefault()
        props.onIndexChange(index)
    }

    const addToCart = event => {
        if(props.cartItems.length === 0){
            props.addToCart([{...car, quantity: 1}])
            setOpen(true)
        } else {
            let items = props.cartItems
            let pushed = false
            items.map((item)=>{
                if(item.id === car.id){
                    item['quantity'] = item.quantity + 1
                    pushed=true
                }
                return item
            })
            if(pushed){
                props.addToCart(items)
                setOpen(true)
            } else {
                props.addToCart([...items, {...car, quantity: 1}])
                setOpen(true)
            }
        }
    }

    return (
        <Paper style={{ padding: 10 }}>
            <Typography color="textPrimary" style={{ fontWeight: 500, fontSize: "1.2rem" }}>
                {car.specs.year + " " + car.specs.make.value + " " + car.carName}
            </Typography>
            <Typography color="textSecondary" style={{ fontSize: "1.5rem" }}>
                US$ {car.carPrice}
            </Typography>
            <div style={{ display: "flex", paddingTop: 5 }}>
                <Typography>Ext. Color: </Typography>
                <div style={{ width: 15, height: 15, background: car.specs.exteriorColor, margin: 5 }}></div>
                <Typography>{" " + car.specs.exteriorColor} </Typography>
            </div>
            <div style={{ display: "flex", paddingBottom: 10 }}>
                <Typography>Int. Color: </Typography>
                <div style={{ width: 15, height: 15, background: car.specs.interiorColor, margin: 5 }}></div>
                <Typography>{" " + car.specs.interiorColor} </Typography>
            </div>
            <div>
                {car.pictures.map((url, index) => {
                    return (
                        <div key={index} style={{ display: "inline", padding: 1, }}>
                            <img style={{ cursor: "pointer" }} onClick={handleSelectedImage(index)} height="50" src={url} />
                        </div>
                    )
                })}
            </div>
            <Button color="primary" onClick={addToCart} variant="contained" style={{ margin: 10 }}><AddShoppingCartSharpIcon />Add to Cart</Button>
            <Button color="secondary" variant="contained" style={{ margin: 10 }}>Buy Now</Button>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message={
                    <Fragment>
                        <CheckCircleOutlineRoundedIcon/>
                        <span id="message-id"> Successfully added to cart</span>
                    </Fragment>
                }
            />
        </Paper>
    )
}

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems
})
export default connect(mapStateToProps, {addToCart}) (CarDetails);